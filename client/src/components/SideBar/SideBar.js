import React from 'react';
import { Link } from 'react-router-dom';
import SidebarItem from './Sidebaritem';

function Sidebar() {
    const menus = [
        { name: '홈', path: '/' },
        { name: '새 글 작성', path: '/content' },
    ];

    return (
        <div className="sidebar">
            {menus.map((menu, index) => {
                return (
                    <Link to={menu.path} key={index}>
                        <SidebarItem menu={menu} />
                    </Link>
                );
            })}
        </div>
    );
}
export default Sidebar;
