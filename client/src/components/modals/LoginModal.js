import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './LoginModal.css';

function Login({ isOpen, close, open }) {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: '',
    });

    const [isLogin, setIsLogin] = useState({
        isLogin: false,
    });

    const [isLoginOrSignupModalOn, setIsLoginOrSignupModalOn] = useState(false);

    const inputHandler = (e) => {
        setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
    };
    const loginHandler = () => {
        setIsLogin(true);
    };
    const handleLoginOrSignupModal = () => {
        setIsLoginOrSignupModalOn(true);
    };
    const loginRequestHandler = () => {
        axios
            .post(
                'https://localhost:4000/login',
                {
                    email: loginInfo.email,
                    password: loginInfo.password,
                },
                { 'Content-Type': 'application/json', withCredentials: true },
            )
            .then((res) => {
                if (res.message === 'ok') return loginHandler(true);
            })
            .catch((err) => alert(err));
    };
    return (
        <>
            {isOpen === true ? (
                <div className="modal">
                    <div className="loginModal">
                        <button className="closeBtn" onClick={close}>
                            X
                        </button>

                        <div className="modalContents">
                            <span className="title">Login</span>
                            <input
                                name="email"
                                className="loginId"
                                type="text"
                                placeholder="email"
                                onChange={(e) => inputHandler(e)}
                                value={loginInfo.email}
                            />
                            <input
                                name="password"
                                className="loginPw"
                                type="password"
                                placeholder="password"
                                onChange={(e) => inputHandler(e)}
                                value={loginInfo.password}
                            />
                            <button className="loginBtn" onClick={loginRequestHandler}>
                                로그인
                            </button>
                            <button className="kakaoBtn">
                                <img
                                    className="kakaoLogo"
                                    src="https://developers.kakao.com/tool/resource/static/img/button/kakaolink/kakaolink_btn_medium.png"
                                />
                                <div className="kakaoText">카카오 계정으로 가입</div>
                            </button>
                            <div className="signUpLine">
                                회원이 아니신가요?
                                <Link to="/signup" onClick={close}>
                                    회원가입
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}

export default Login;