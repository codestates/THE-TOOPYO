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
        <div>
            <form action="" method="post">
                {/*action="데이터보낼 서버의 파일"*/}
                <input className="title" maxlength="20" autoFocus required placeholder="제목을 입력하세요"></input>
                <button type="submit" onClick={uploadHandler}>
                    <img src="./NewSubmitBtn" id="NewSubmit"></img>
                </button>
                <div className="NewContentFrame">
                    <input id="pic_1" type="file"></input>
                    <label for="uploadPic_1">uploading </label>
                    <progress id="uploadPic_1" max="100"></progress>
                    <input id="pic_2" type="file"></input>
                    <input className="NewDesc" type="text" placeholder="설명을 입력해주세요."></input>
                </div>
            </form>
        </div>
    );
}

export default NewContent;
