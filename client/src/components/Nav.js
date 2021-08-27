import { useState } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import './Nav.css';
import App from '../App';
import LoginButton from './modals/LoginBtn';
import SignUpButton from './modals/SignUpBtn';
import Sidebar from './SideBar/SideBar';
import SearchButton from './search/SearchBtn';

function Nav({ isLogin, loginHandler }) {
    return (
        <nav>
            <div className="navInner">
                <Sidebar />
                <div className="logoContainer">
                    <h1>
                        <img className="logo" src=""></img>
                    </h1>
                </div>
                <div>
                    <ul className="buttonContainer">
                        <li>
                            <SearchButton />
                        </li>
                        <li>
                            <Link to="/content">
                                <button className="newContentBtn navBtn">새 글 작성</button>
                            </Link>
                        </li>{' '}
                        <li>
                            <SignUpButton loginHandler={loginHandler} />
                        </li>
                        {isLogin ? (
                            <li>
                                <Link to="/Mypage">
                                    <button className="navBtn">my page</button>
                                </Link>
                            </li>
                        ) : (
                            <div>
                                <LoginButton loginHandler={loginHandler} />
                            </div>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
export default Nav;
