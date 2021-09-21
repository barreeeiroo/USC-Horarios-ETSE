import React from 'react';
import ReactDOM from 'react-dom';
import 'index.less';
import App from 'components/app';
import {ConfigProvider} from "antd";
import esES from 'antd/lib/locale/es_ES';
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={esES}>
      <App/>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('etse')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
