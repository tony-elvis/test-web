import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const BaseMap = () => {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoic2NvdHRlcnJhbmQiLCJhIjoiY2w0cmZ0ZGo0MDBtNjNrcXF3bjBoMGVybCJ9.xtMXk8awi-U350aVlZYLGQ';

  useEffect(() => {
    new mapboxgl.Map({
      container: 'mapContainer',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.5, 40],
      zoom: 9
    });
  }, []);

  return <div id="mapContainer" className="map"></div>;
};

export default BaseMap;
