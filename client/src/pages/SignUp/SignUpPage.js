import React, { useState } from 'react';
import './SignUp.css';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

function SignupPage() {
    const [signupInfo, setSignupInfo] = useState({
        picture: '',
        provider: 'origin',
        nickName: '',
        email: '',
        password: '',
        phoneNumber: '',
    });
    const [errorMessage, setErrorMessage] = useState(false);
    const [isLogin, setIsLogin] = useState({
        isLogin: false,
    });
    const history = useHistory();

    const loginHandler = () => {
        setIsLogin(true);
    };

    const fileEvent = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            setSignupInfo({ ...signupInfo, [e.target.name]: e.target.picture });
            console.log('파일 업로드 완료.');
        };
        reader.readAsText(e.target.files[0]);
    };
    const inputHandler = (e) => {
        setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value });
    };

    const signUpRequestHandler = () => {
        if (
            // !signupInfo.picture ||
            !signupInfo.provider ||
            !signupInfo.nickName ||
            !signupInfo.email ||
            !signupInfo.password ||
            !signupInfo.phoneNumber
        ) {
            setErrorMessage(true);
            console.log(signupInfo);
        } else {
            console.log(signupInfo);
            axios
                .post(
                    'http://localhost:80/signup',
                    {
                        profile_img: 'signupInfo.picture',
                        provider: signupInfo.provider,
                        nickName: signupInfo.nickName,
                        email: signupInfo.email,
                        password: signupInfo.password,
                        phoneNumber: signupInfo.phoneNumber,
                    },
                    { 'Content-Type': 'application/json', withCredentials: true },
                )
                .then((res) => {
                    history.push('/');
                    if (res.message === 'ok') return loginHandler(true);
                    console.log('eeeeeee');
                });
        }
    };
    return (
        <>
            <div className="back">
                <div className="signupModal">
                    <Link to="/" className="closeB">
                        X
                    </Link>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="modalContents">
                            <img className="signUpIcon" />
                            <h1>Sign Up</h1>
                            <div>모든 항목은 필수입니다.</div>
                            <input
                                name="email"
                                className="signUpId"
                                type="email"
                                placeholder="email"
                                onChange={(e) => inputHandler(e)}
                                value={signupInfo.email}
                            />
                            <input
                                name="password"
                                className="signUpPw"
                                type="password"
                                placeholder="password"
                                onChange={(e) => inputHandler(e)}
                                value={signupInfo.password}
                            />
                            <input
                                name="nickName"
                                className="signUpNickName"
                                type="text"
                                placeholder="nickname"
                                onChange={(e) => inputHandler(e)}
                                value={signupInfo.nickName}
                            />
                            <input
                                name="phoneNumber"
                                className="signUpMobile"
                                type="tel"
                                placeholder="-없이 숫자만 입력하세요"
                                onChange={(e) => inputHandler(e)}
                                value={signupInfo.phoneNumber}
                            />
                            <div className="profileUploader">프로필 사진을 선택하세요.</div>
                            <input
                                name="picture"
                                className="signUpPic"
                                type="file"
                                placeholder="picture"
                                onChange={fileEvent}
                                value={signupInfo.picture}
                            />
                            <button className="signUpB" onClick={signUpRequestHandler}>
                                회원가입
                            </button>
                            <div className="loginLine">
                                이미 아이디가 있으신가요?
                                <Link to="/">로그인</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignupPage;
