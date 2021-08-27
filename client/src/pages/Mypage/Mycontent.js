import axios from 'axios';
import React, { useState } from 'react';
import Thumbnail from '../../components/Thumbnail';

export default function Mycontent(props) {
    const info = props.userInfo;
    const [contentList, setContentList] = useState([]);
    const [auth, setAuth] = useState('');

    const getContentList = () => {
        axios.get('https://localhost:4000/content').then((res) => {
            setContentList(res.data.content);
        });
    };
    const filteredContents = contentList.filter((el) => {
        return el.writer.id === info.nickName;
    });
    return (
        <>
            <h1>안녕하세요 info.name님</h1>
            <div>
                <ul>
                    {filteredContents.map((list) => {
                        <li>
                            <Thumbnail list={list} auth={auth}></Thumbnail>
                        </li>;
                    })}
                </ul>
            </div>
        </>
    );
}
