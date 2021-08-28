import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './NewContent.css';

function NewContent() {
    const [information, setInformation] = useState({
        title: '',
        description: '',
        picture_1: '',
        picture_2: '',
        description: '',
        votingDeadLine: '',
    });

    const [isErr, setIsErr] = useState(false);
    const isErrHandler = () => {
        setIsErr(isErr ? false : true);
    };

    const handleInputValue = (key) => (e) => {
        setInformation({ ...information, [key]: e.target.value });
    };

    const uploadHandler = () => {
        //if()
        axios
            .post('https://localhost:4000/content', {
                userId: '',
                title: information.title,
                picture_1: information.picture_1,
                picture_2: information.picture_2,
                description: information.description,
                votingDeadLine: information.votingDeadLine,
            })
            .then((res) => {
                if (res.message === 'please rewrite') return isErrHandler();
            });
    };

    return (
        <div id="inner">
            <h1 id="newTitle">새 글 작성</h1>
            <form action="" method="post">
                {/*action="데이터보낼 서버의 파일"*/}
                <input
                    className="title"
                    maxlength="20"
                    autoFocus
                    required
                    placeholder="제목을 입력하세요"
                    onChange={handleInputValue}></input>
                <button type="submit" onClick={uploadHandler}>
                    <img
                        src="https://cdn.discordapp.com/attachments/877171336508739646/880754762616819732/NewSubmitBtn.png"
                        id="NewSubmit"></img>
                </button>
                <div className="NewContentFrame">
                    <div className="pic Left">
                        <img className="picBg"></img>
                        <input id="pic_1" type="file"></input>
                    </div>
                    {/* <progress id="uploadPic_1" max="100"></progress> */}
                    <div className="pic Right">
                        <img className="picBg" src=""></img>
                        <input id="pic_2" type="file"></input>
                    </div>
                    <input className="NewDesc" type="text" placeholder="설명을 입력해주세요."></input>
                </div>
            </form>
        </div>
    );
}

export default NewContent;
