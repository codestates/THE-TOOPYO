import { useState } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import './Nav.css';
import App from '../App';
import LoginButton from './modals/LoginBtn';
import SignUpButton from './modals/SignUpBtn';

function Nav({ isLogin, loginHandler }) {
    return (
        <nav>
            <div className="nav_inner">
                <div className="logo_container">
                    <h1>
                        <img className="logo" src=""></img>
                    </h1>
                </div>
                <div>
                    <ul className="button_container">
                        <li>
                            <button>
                                <img src="./searchIcon.png"></img>
                            </button>
                        </li>
                        <li>
                            <Link to="NewContent">
                                <button className="new_Content_Btn nav_btn">새 글 작성</button>
                            </Link>
                        </li>{' '}
                        <li>
                            <SignUpButton loginHandler={loginHandler} />
                        </li>
                        {isLogin ? (
                            <li>
                                <Link to="/Mypage">
                                    <button className="nav_btn">my page</button>
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
