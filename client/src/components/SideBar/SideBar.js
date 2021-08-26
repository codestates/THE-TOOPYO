import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SidebarItem from './Sidebaritem';
import './SideBar.css';

function Sidebar() {
    const menus = [
        { name: '홈', path: '/' },
        { name: '회원가입', path: '/signup' },
        { name: '새 글 작성', path: '/content' },
    ];
    const [isOpen, setisOpen] = useState(false);
    const sidebarHandler = () => {
        setisOpen(!isOpen);
    };
    return (
        <div className="sidebar">
            <img
                className="sidebarIcon"
                src="https://developers.kakao.com/tool/resource/static/img/button/kakaolink/kakaolink_btn_medium.png"
                onClick={sidebarHandler}
            />
            {isOpen === true ? (
                <div className="back" onClick={sidebarHandler}>
                    <div className="sidebarContents">
                        <span>
                            {' '}
                            <button className="closeBtn" onClick={sidebarHandler}>
                                X
                            </button>
                        </span>
                        {menus.map((menu, index) => {
                            return (
                                <Link to={menu.path} key={index}>
                                    <SidebarItem menu={menu} />
                                </Link>
                            );
                        })}
                    </div>
                </div>
            ) : null}
        </div>
    );
}
export default Sidebar;
