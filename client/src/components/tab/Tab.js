import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Mycontent from '../../pages/Mypage/Mycontent';
import MypageDetail from '../../pages/Mypage/MypageDetail';

const TabMenu = styled.ul`
    background-color: rgba(102, 102, 102, 0);
    font-weight: bold;
    color: white;
    display: flex;
    flex-direction: row;
    justify-items: center;
    align-items: center;
    list-style: none;
    margin-bottom: 7rem;
    text-align: center;

    & div.desc {
        text-align: center;
    }
`;

const Desc = styled.div`
    text-align: center;
`;

export default function Tab({ userInfo, getUserInfo, id, contentList, getContentDetail }) {
    console.log(userInfo);
    const [currentTab, setCurrentTab] = useState(0);
    const tabMenu = [
        { name: 'mypage', content: <MypageDetail getUserInfo={getUserInfo} userInfo={userInfo.userInfo} /> },
        {
            name: 'mycontent',
            content: (
                <Mycontent
                    content={userInfo.content}
                    userInfo={userInfo.userInfo}
                    id={id}
                    contentList={contentList}
                    getContentDetail={getContentDetail}
                />
            ),
        },
    ];
    const selectMenuHandler = (index) => {
        setCurrentTab(index);
    };

    return (
        <>
            <div>
                <TabMenu>
                    {tabMenu.map((el, index) => {
                        return (
                            <li
                                className={currentTab === index ? 'mypage' : 'mycontent'}
                                onClick={() => {
                                    selectMenuHandler(index);
                                    getUserInfo();
                                }}>
                                {el.name}
                            </li>
                        );
                    })}
                </TabMenu>
                <Desc>
                    <p>{tabMenu[currentTab].content}</p>
                </Desc>
            </div>
        </>
    );
}
