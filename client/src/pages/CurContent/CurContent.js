import { useState } from 'react';
import axios from 'axios';

function CurContent(id) {
    const [content, setContent] = useState({});
    const [writer, setWriter] = useState({});
    //      res = data: {
    //  "content":
    //     {
    //       "title": "title",
    //       "picture_1": "picture_1",
    //       "picture_2": "picture_2",
    //       "description": "description",
    //       "voting_deadline": "votingDeadline",
    //       "created_at": "created_at",
    //       "update_at": "update_at"
    //     },
    //   "writer":
    //     {
    //     "id": 1,
    //      "nickname": "방예은",
    //      "profile_img": "profile_img",
    //     }
    //}
    //

    const getContentDetail = () => {
        axios
            .get(`https://localhost:4000/content/:${id}`, { headers: { authorization: '' } }).then((res) => {
                setContent(res.data.content);
                setWriter(res.data.writer);
            });
    };

    const getAgree = () => {
        axios
            .get(`https://localhost:4000/content/agree/:${id}`, )
    }

    

    return (
        <div>
            <div className="location">
                Home <img id="" src=""></img> 현재 글
            </div>
            <div className="content">
                <h2>{content.title}</h2>
                <button className="editContent"></button>
                <button className="deleteContent"></button>
                <div className="contentMain">
                    <div className="contentInner">
                        <ul>
                            <li>
                                <img src={content.picture_1} alt={content.description} className="picture_1"></img>
                            </li>
                            <li className="versus">
                                <img src="" alt="versus"></img>
                            </li>
                            <li>
                                <img src={content.picture_2} alt={content.description} className="picture_2" onClick={}></img>
                            </li>
                        </ul>
                        <div className="contentInfo">
                            <div className="writer">
                                <img src={writer.profile_img} alt="작성자 프로필 사진" className="writerProfile"></img>
                                <span>작성자: {writer.nickname}</span>
                            </div>
                            <span>{content.description}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CurContent;
