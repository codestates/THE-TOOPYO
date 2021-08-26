import React from 'react';
import { Link } from 'react-router-dom';
import SidebarItem from './Sidebaritem';
import './SideBar.css';

function Sidebar() {
    const menus = [
        { name: '홈', path: '/' },
        { name: '회원가입', path: '/signup' },
        { name: '새 글 작성', path: '/content' },
    ];

    return (
        <div className="sidebar">
            <div className="sidebarContents">
                <img src="/img/kakao.png" />
                {menus.map((menu, index) => {
                    return (
                        <Link to={menu.path} key={index}>
                            <SidebarItem menu={menu} />
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
export default Sidebar;
