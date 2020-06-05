import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ConversorMoedas from './conversor-moedas';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<ConversorMoedas />, document.getElementById('root'));

serviceWorker.unregister();
