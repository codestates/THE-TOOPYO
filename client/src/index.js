import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import App from './App';
import './index.css';
import Mypage from './pages/Mypage/Mypage';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Mypage />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root'),
);
