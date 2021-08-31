import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './NewContent.css';
import CurContent from '../CurContent/CurContent';

function NewContent() {
    const [information, setInformation] = useState({
        title: '',
        description: '',
        picture_1: '',
        picture_2: '',
        votingDeadLine: true,
    });

    const [isOk, setIsOk] = useState(false);

    const isOkHandler = () => {
        setIsOk(isOk ? false : true);
    };

    const [isErr, setIsErr] = useState(false);
    const isErrHandler = () => {
        setIsErr(isErr ? false : true);
    };

    const handleInputValue = (e) => {
        setInformation({ ...information, [e.target.name]: e.target.value });
        console.log(information);
    };

    const fileEvent1 = (e) => {
        setInformation({ ...information, [e.target.name]: e.target.files[0] });
        console.log(information);
    };
    const fileEvent2 = (e) => {
        setInformation({ ...information, [e.target.name]: e.target.files[1] });
    };

    const uploadHandler = async () => {
        if (!information.title || !information.description || !information.picture_1 || !information.picture_2) {
            return isErrHandler();
        }
        await axios
            .post('http://localhost:80/content', {
                userId: '',
                title: information.title,
                picture_1: information.picture_1,
                picture_2: information.picture_2,
                description: information.description,
                votingDeadLine: information.votingDeadLine,
            })
            .then((res) => {
                console.log(res.message);
                if (res.message === 'please rewrite') return isErrHandler();
                else if (res.message === 'ok') {
                    isOkHandler();
                    return <CurContent id={res.data.content.id}></CurContent>;
                }
            });
        await axios.patch('http://localhost:80/uploads');
    };

    return (
        <div id="inner">
            <h1 id="newTitle">새 글 작성</h1>
            {isErr ? (
                <div className="errMsg" onClick={setIsErr}>
                    모든 항목을 채워서 다시 입력해주세요.
                </div>
            ) : null}
            {isOk ? <div>게시물 등록 완료</div> : null}
            <form action="" method="post">
                {/*action="데이터보낼 서버의 파일"*/}
                <input
                    className="inputTitle"
                    maxlength="20"
                    autoFocus
                    required
                    placeholder="제목을 입력하세요"
                    name="title"
                    onChange={(e) => handleInputValue(e)}></input>
                <button type="submit" onClick={uploadHandler}>
                    <img
                        src="https://cdn.discordapp.com/attachments/881710985335934979/881719851356409896/verify.png"
                        id="NewSubmit"></img>
                </button>
                {/* --------------------- 상단 제목과 버튼 부분 ----------------- */}
                <div className="NewContentFrame">
                    <div className="pic Left">
                        <img className="picBg"></img>
                        <input
                            id="pic_1"
                            name="picture_1"
                            type="file"
                            accept="image/png, image/jpeg"
                            onChange={fileEvent1}></input>
                    </div>
                    <img
                        id="newVersus"
                        src="https://cdn.discordapp.com/attachments/881710985335934979/881711027425787914/vs.png"></img>
                    <div className="pic Right">
                        <img className="picBg" src=""></img>
                        <input
                            id="pic_2"
                            name="picture_2"
                            type="file"
                            accept="image/png, image/jpeg"
                            onChange={fileEvent2}></input>
                    </div>
                    <input
                        className="NewDesc"
                        name="decription"
                        type="text"
                        required
                        placeholder="설명을 입력해주세요."
                        onChange={(e) => handleInputValue(e)}></input>
                </div>
            </form>
        </div>
    );
}

export default NewContent;
