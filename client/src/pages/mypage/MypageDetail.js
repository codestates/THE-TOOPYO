import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Mypage.css';
import { useHistory } from 'react-router-dom';

export default function MypageDetail({ userInfo, setUserInfo }) {
    useEffect(() => {}, [userInfo]);
    const history = useHistory();
    const [img, setImg] = useState(null);
    const [isClick, setIsClick] = useState(false);
    const [patchInfo, setPatchInfo] = useState(userInfo);
    const clickHandler = () => {
        setIsClick(!isClick);
    };
    const fileEvent = async (e) => {
        setImg(e.target.files[0]);
    };

    const inputHandler = (e) => {
        setPatchInfo({ ...patchInfo, [e.target.name]: e.target.value });
    };

    const patchRequestHandler = async () => {
        let image;
        if (img) {
            image = img.name;
        } else {
            image = userInfo.profile_img;
        }
        if (patchInfo.nickName && patchInfo.password && patchInfo.phoneNumber && userInfo.email) {
            await axios
                .patch(`http://localhost:80/user`, {
                    nickName: patchInfo.nickName,
                    email: userInfo.email,
                    password: patchInfo.password,
                    profile_img: image,
                    phoneNumber: patchInfo.phoneNumber,
                })
                .then((res) => {
                    setUserInfo({
                        ...userInfo,
                        nickName: patchInfo.nickName,
                        email: userInfo.email,
                        password: patchInfo.password,
                        profile_img: image,
                        phoneNumber: patchInfo.phoneNumber,
                    });
                    history.push('/mypage');
                });
            const formData = new FormData();
            formData.append('file', img);
            await axios.patch('http://localhost:80/upload', formData);
        }
    };

    return (
        <>
            {isClick ? (
                <form onSubmit={(e) => e.preventDefault()}>
                    <h1 className="myHello">??????????????? {userInfo.nickName}??? ????</h1>
                    <div className="myDetailContainer">
                        <div className="pfAreaContainer">
                            <div className="pfArea">
                                <div className="label">????????? ??????</div>
                                <div className="profile">
                                    <div className="circle">
                                        <img
                                            src={`/upload/${userInfo.profile_img}`}
                                            alt={userInfo.nickName}
                                            name="profile_img"
                                            className="avatar"
                                            type="file"></img>
                                    </div>
                                    <div className="actions">
                                        <button className="editBtncon" type="submit" onClick={patchRequestHandler}>
                                            ??????
                                        </button>
                                    </div>
                                    <input
                                        name="profile_img"
                                        className="imgInputBtn"
                                        type="file"
                                        onChange={fileEvent}
                                    />
                                    <div className="infoContainer">
                                        <div className="labelContainer">
                                            <div className="label">?????????</div>
                                            <div className="email">{userInfo.email}</div>
                                        </div>
                                        <div className="labelContainer">
                                            <div className="label">????????????</div>
                                            <input
                                                className="inputBox"
                                                name="password"
                                                type="password"
                                                placeholder="??????????????? ??????????????????"
                                                onChange={(e) => inputHandler(e)}
                                                value={patchInfo.password}></input>
                                        </div>
                                        <div className="labelContainer">
                                            <div className="label">?????????</div>
                                            <input
                                                className="inputBox"
                                                name="nickName"
                                                type="text"
                                                maxLength="20"
                                                placeholder="???????????? ??????????????????"
                                                onChange={(e) => inputHandler(e)}
                                                value={patchInfo.nickName}></input>
                                        </div>
                                        <div className="labelContainer">
                                            <div className="label">????????????</div>
                                            <input
                                                className="inputBox"
                                                name="phoneNumber"
                                                type="text"
                                                maxLength="20"
                                                placeholder="??????????????? ??????????????????"
                                                onChange={(e) => inputHandler(e)}
                                                value={patchInfo.phoneNumber}></input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            ) : (
                <div id="mypageDetailContainer">
                    <h1 className="myHello">??????????????? {userInfo.nickName}??? ????</h1>
                    <div className="myDetailContainer">
                        <div className="pfAreaContainer">
                            <div className="pfArea">
                                <div className="label">?????????</div>
                                <div className="profile">
                                    <div className="circle">
                                        <img
                                            src={`/upload/${userInfo.profile_img}`}
                                            alt={userInfo.nickName}
                                            name="profile_img"
                                            className="avatar"
                                            type="file"></img>
                                    </div>
                                    <div className="actions">
                                        <button className="editBtncon" onClick={clickHandler}>
                                            ??????
                                        </button>
                                    </div>
                                    <div className="infoContainer">
                                        <div className="labelContainer">
                                            <div className="label">?????????</div>
                                            <div className="user">{userInfo.email}</div>
                                        </div>
                                        <div className="labelContainer">
                                            <div className="label">?????????</div>
                                            <div className="user">{userInfo.nickName}</div>
                                        </div>
                                        <div className="labelContainer">
                                            <div className="label">????????????</div>
                                            <div className="user">{userInfo.phoneNumber}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
