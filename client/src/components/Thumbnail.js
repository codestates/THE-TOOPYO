import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import CurContent from '../pages/CurContent/CurContent';

function Thumbnail({ list }) {
    const [content, setContent] = useState({}); // 게시글 정보
    const [writer, setWriter] = useState({}); // 작성자 정보

    const getContentDetail = () => {
        axios.get(`https://localhost:4000/content/:${list.id}`, { headers: { authorization: '' } }).then((res) => {
            setContent(res.data.content);
            setWriter(res.data.writer);
        });
    };

    return (
        <Link to="/CurContent">
            <CurContent id={list.id} writer={writer} content={content}>
                <div onClick={getContentDetail}>
                    <h1>{list.title}title</h1>
                    <img className="picture_1" src={list.picture_1}></img>
                    <img className="picture_2" src={list.picture_2}></img>
                    <div className="descript">{list.description}</div>
                </div>
            </CurContent>
        </Link>
    );
}

export default Thumbnail;
