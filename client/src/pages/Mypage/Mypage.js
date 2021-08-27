import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import './Mypage.css';

const TabMenu = styled.ul`
    background-color: rgba(102, 102, 102, 0.5);
    font-weight: bold;
    display: flex;
    flex-direction: row;
    justify-items: center;
    align-items: center;
    list-style: none;
    margin-bottom: 7rem;

    & div.desc {
        text-align: center;
    }
`;

const Desc = styled.div`
    text-align: center;
`;
export default function Mypage(props) {
    const [contentList, setContentList] = useState([]);

    const getContentList = () => {
        axios.get('https://localhost:4000/content').then((res) => {
            setContentList(res.data.content);
        });
    };
    const info = props.userInfo;

    const [isClick, setIsClick] = useState(false);

    const [currentTab, setCurrentTab] = useState(0);

    const [patchInfo, setPatchInfo] = useState({
        nickName: '',
        email: '',
        password: '',
        profile_img: '',
        phone: '',
    });
    // const filteredContents = info.filter((el) => {
    //     return el.phone === info.phone;
    // });
    const clickHandler = () => {
        setIsClick(!isClick);
    };

    const inputHandler = (e) => {
        setPatchInfo({ ...patchInfo, [e.target.name]: e.target.value });
    };

    const patchRequestHandler = () => {
        if (
            !patchInfo.nickname ||
            !patchInfo.email ||
            !patchInfo.password ||
            !patchInfo.email ||
            !patchInfo.profile_img ||
            !patchInfo.phone
        ) {
        } else {
            axios.post('https://localhost:4000/user/:id', {});
        }
    };
    // 수정 버튼을 클릭하면 컨텐츠 수정으로 변경
    // 원래는 정보만 표시
    const tabMenu = [
        {
            name: 'mypage',
            input: (
                <form>
                    <div className="pf-input-area">
                        <a className="profile_img">
                            <div className="label">프로필 사진</div>
                            <input
                                name="picture"
                                type="file"
                                className="avatar"
                                onChange={(e) => inputHandler(e)}
                                value={patchInfo.profile_img}></input>
                        </a>
                        <div className="id">
                            <div className="label">아이디</div>
                            <div>info.id</div>
                        </div>
                        <div className="password">
                            <div className="label">비밀번호</div>
                            <input
                                name="password"
                                type="password"
                                placeholder="비밀번호를 입력해주세요"
                                onChange={(e) => inputHandler(e)}
                                value={patchInfo.password}></input>
                        </div>
                        <div className="nickName">
                            <div className="label">닉네임</div>
                            <input
                                name="nickName"
                                type="text"
                                maxLength="20"
                                placeholder="닉네임을 입력해주세요"
                                onChange={(e) => inputHandler(e)}
                                value={patchInfo.nickName}></input>
                        </div>
                        <div className="email">
                            <div className="label">이메일</div>
                            <input
                                name="email"
                                type="text"
                                maxLength="20"
                                placeholder="이메일을 입력해주세요"
                                onChange={(e) => inputHandler(e)}
                                value={patchInfo.email}></input>
                        </div>
                        <div className="phone">
                            <div className="label">전화번호</div>
                            <input
                                name="phone"
                                type="text"
                                maxLength="20"
                                placeholder="전화번호를 입력해주세요"
                                onChange={(e) => inputHandler(e)}
                                value={patchInfo.phone}></input>
                        </div>
                        <input type="submit" value="저장" />
                    </div>
                </form>
            ),
            content: (
                <div className="pf-input-area">
                    <a className="profile_img">
                        <div className="label">프로필 사진</div>
                        <div type="file" className="avatar">
                            img
                        </div>
                    </a>
                    <div className="id">
                        <div className="label">아이디</div>
                        <div>ID1234</div>
                    </div>
                    <div className="nickName">
                        <div className="label">닉네임</div>
                        <div>info.nickName</div>
                    </div>
                    <div className="email">
                        <div className="label">이메일</div>
                        <div>info.email</div>
                    </div>
                    <div className="phone">
                        <div className="label">전화번호</div>
                        <div>info.phone</div>
                        <button classname="editBtn" onClick={clickHandler}>
                            수정
                        </button>
                    </div>
                </div>
            ),
        },
        { name: 'mycontent', content: 'mycontent ok', input: 'mycontent ok' },
    ];
    const selectMenuHandler = (index) => {
        setCurrentTab(index);
    };
    return (
        <div className="wraper">
            <center>
                <h1>Nav 자리</h1>
                <div>
                    <TabMenu>
                        {tabMenu.map((el, index) => {
                            return (
                                <li
                                    className={currentTab === index ? 'mypage' : 'mycontent'}
                                    onClick={() => selectMenuHandler(index)}>
                                    {el.name}
                                </li>
                            );
                        })}
                    </TabMenu>
                    <div className="hello">
                        안녕하세요. <span className="name">info.nickName</span>님!
                    </div>
                </div>
                <div>
                    <Desc>{isClick ? <p>{tabMenu[currentTab].input}</p> : <p>{tabMenu[currentTab].content}</p>}</Desc>
                </div>
            </center>
        </div>
    );
}
