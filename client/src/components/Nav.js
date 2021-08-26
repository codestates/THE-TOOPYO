import { useState } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import './Nav.css';

function Nav(isLogin) {
    return (
        <nav>
            <div className="nav_inner">
                <div className="logo_container">
                    <Route exact path="/">
                        <App>
                            <h1>
                                <img className="logo" src=""></img>
                            </h1>
                        </App>
                    </Route>
                    <div id="logo"></div>
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
                                <button className="new_Content_Btn">새 글 작성</button>
                            </Link>
                        </li>
                        {isLogin ? (
                            <li>
                                <Link to="/Mypage">
                                    <button>my page</button>
                                </Link>
                            </li>
                        ) : (
                            <li>
                                <Link to="/Login">
                                    <button>login</button>
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
export default Nav;
