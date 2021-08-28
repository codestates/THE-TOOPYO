import axios from 'axios';
import React, { useState } from 'react';
import Thumbnail from '../../components/Thumbnail';

export default function Mycontent(props) {
    const info = props.userInfo;
    const [contentList, setContentList] = useState([]);
    const [auth, setAuth] = useState('');
    // const [isAuthOk, setIsAuthOk] = useState(false); // session id 를 보내고 인증이 완료되어 투표한 경우
    // const [isAuthNot, setIsAuthNot] = useState(false);

    // const isAuthOkHandler = () => {
    //     setIsAuthOk(isAuthOk ? false : true);
    // };

    // const isAuthNotHandler = () => {
    //     setIsAuthNot(isAuthNot ? false : true);
    // };

    // const deleteContent = () => {
    //     axios.delete(`https://localhost:4000/content/:${id}`, { headers: { auth: auth.id } }).then((res) => {
    //         if (res.message === 'delete complete') {
    //             isAuthOkHandler();
    //         } else {
    //             isAuthNotHandler();
    //         }
    //     });
    // }; // curcontent에 있는거 사용 복붙했는데 이게 맞나 암튼 썸네일로 보이는 곳에 버튼 만들어주고 그거 누르면 해당 게시글 삭제.

    const getContentList = () => {
        axios.get('https://localhost:4000/content').then((res) => {
            setContentList(res.data.content);
        });
    };
    const filteredContents = contentList.filter((el) => {
        return el.writer.id === info.nickName;
    });
    getContentList();
    return (
        <>
            <h1>안녕하세요 info.name님</h1>
            <div>
                <ul>
                    {filteredContents.map((list) => {
                        <li>
                            <Thumbnail list={list} auth={auth}>
                                {/* <button className="deleteContent" onClick={deleteContent}>
                                    삭제
                                </button> */}
                            </Thumbnail>
                        </li>;
                    })}
                </ul>
            </div>
        </>
    );
}
