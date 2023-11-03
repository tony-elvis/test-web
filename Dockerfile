FROM node:18.15.0-alpine3.16 as build-stage

WORKDIR /web-admin

ARG REACT_APP_BACKEND_URL
ARG REACT_APP_MAPBOX_PUBLIC_KEY

ENV NODE_ENV=production \
    GENERATE_SOURCEMAP=false \
    REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL \
    REACT_APP_MAPBOX_PUBLIC_KEY=$REACT_APP_MAPBOX_PUBLIC_KEY

COPY package*.json /web-admin/

RUN yarn install

COPY . /web-admin

RUN yarn build

FROM nginx:1.23.3-alpine as run-stage

WORKDIR /usr/share/nginx/html/

RUN chown -R nginx:nginx /usr/share/nginx/html/ && chmod -R 755 /usr/share/nginx/html/ && \
        chown -R nginx:nginx /var/cache/nginx && \
        chown -R nginx:nginx /var/log/nginx && \
        chown -R nginx:nginx /etc/nginx/conf.d

RUN touch /var/run/nginx.pid && \
        chown -R nginx:nginx /var/run/nginx.pid

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/default.conf /etc/nginx/conf.d

COPY --from=build-stage /web-admin/build /usr/share/nginx/html/

EXPOSE 3000

USER nginx

CMD ["nginx", "-g", "daemon off;"]