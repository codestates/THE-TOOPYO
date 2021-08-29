import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SidebarItem from './Sidebaritem';
import './SideBar.css';
import SignUpButton from '../Modals/SignUpBtn';

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
            <div class="btn-menu">
                <a class="sidebarBtn" onClick={sidebarHandler}>
                    <svg width="4vh" height="4vw" viewBox="0 0 18 14" fill="none">
                        <rect y="0.1vh" width="4.5vh" height="0.25vw" fill="white"></rect>
                        <rect x="0.6vh" y="1.25vh" width="3vh" height="0.25vw" fill="white"></rect>
                        <rect y="2.4vh" width="4.5vh" height="0.25vw" fill="white"></rect>
                    </svg>
                </a>
            </div>
            {isOpen === true ? (
                <div className="sidebarBack" onClick={sidebarHandler}>
                    <div className="sidebarContents">
                        <button className="sidebarCloseBtn" onClick={sidebarHandler}>
                            X
                        </button>
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
