import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import RoutesApp from './routes/Routes';
import './assets/fonts/Apercu/Apercu-Bold.otf';
import './assets/fonts/Apercu/Apercu-Light.otf';
import './assets/fonts/Apercu/Apercu-Medium.otf';
import './assets/fonts/Apercu/Apercu-Regular.otf';
import 'react-datepicker/dist/react-datepicker.css';
import ReactModal from 'react-modal';

const root = ReactDOM.createRoot(document.getElementById('root'));
ReactModal.setAppElement('#root');
root.render(
  <React.StrictMode>
    <RoutesApp />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
