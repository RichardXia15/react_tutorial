import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import Layout from './components/layout/Layout';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Layout />, document.getElementById('root'));
registerServiceWorker();
