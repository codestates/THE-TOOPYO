import { useState } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import './Nav.css';
import LoginButton from '../Modals/LoginBtn';
import SignUpButton from '../Modals/SignUpBtn';
import Sidebar from '../SideBar/SideBar';
import SearchButton from '../Search/SearchBtn';

function Nav({ isLogin, loginHandler, contentList }) {
    return (
        <nav>
            <div className="navInner">
                <Sidebar />
                <div className="logoContainer">
                    <h1>
                        <img
                            className="logo"
                            src="https://cdn.discordapp.com/attachments/877171336508739646/881725307579674664/1.png"></img>
                    </h1>
                </div>
                <div>
                    <ul className="buttonContainer">
                        <li>
                            <SearchButton contentList={contentList} />
                        </li>
                        <li>
                            <Link to="/NewContent">
                                <button className="newContentBtn navBtn">새 글 작성</button>
                            </Link>
                        </li>
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
