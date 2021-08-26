import React from 'react';
import LoginButton from './components/modals/LoginBtn';
import SignUpButton from '../src/pages/SignUp/SignUpBtn';
import axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './components/modals/LoginModal';
import Sidebar from '../src/components/SideBar/SideBar';
import SignupPage from './pages/SignUp/SignUpPage';

axios.defaults.withCredentials = true;

const App = () => {
    return (
        <>
            <BrowserRouter>
                <LoginButton />
                <Sidebar />
                <SignUpButton />
                <Route path="/" component={Login} />
                <Route exact path="/signup" component={SignupPage} />
            </BrowserRouter>
        </>
    );
};
export default App;
