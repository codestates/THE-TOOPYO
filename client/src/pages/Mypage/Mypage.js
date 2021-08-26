import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const TabMenu = styled.ul`
    background-color: #dcdcdc;
    color: rgba(73, 73, 73, 0.5);
    font-weight: bold;
    display: flex;
    flex-direction: row;
    justify-items: center;
    align-items: center;
    list-style: none;
    margin-bottom: 7rem;

    .submenu {
        width: 100%;
        padding: 15px;
        cursor: pointer;
    }

    .focused {
        background-color: #4000c7;
        transition: all 0.3s ease;
        color: white;
    }

    & div.desc {
        text-align: center;
    }
`;

const Desc = styled.div`
    text-align: center;
`;
export default function Mypage(props) {
    const info = props.useInfo;
    const [currentTab, setCurrentTab] = useState(0);
    const tabMenu = [
        { name: 'mypage', content: 'mypage ok' },
        { name: 'mycontent', content: 'mycontent ok' },
    ];
    const selectMenuHandler = (index) => {
        setCurrentTab(index);
    };
    return (
        <div>
            <center>
                <h1>Nav 자리</h1>
                <TabMenu>
                    {tabMenu.map((el, index) => {
                        return (
                            <li className={currentTab === index ? 'ok' : 'no'} onClick={() => selectMenuHandler(index)}>
                                {el.name}
                            </li>
                        );
                    })}
                </TabMenu>
                <div>
                    안녕하세요. <span className="name">00</span>님! 로그인이 완료되었습니다.
                </div>
                <Desc>
                    <p>{tabMenu[currentTab].content}</p>
                </Desc>
            </center>
        </div>
    );
}
// 탭 2개
// 내 정보 누르면 내 정보 페이지
//// 내 정보 받아서 표시하는 곳
//// 내 정보 수정 버튼
// 내 글 보기 누르면 내가 쓸 글 목록이 나오기
////내가 쓴 글 정보 받아서 리스트
//// 게시글 수정, 삭제
//// 클릭하면 id값에 맞게 curcontent로
