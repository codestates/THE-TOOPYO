import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import CurContent from '../pages/CurContent/CurContent';

function NewContent() {
    const [information, setinformation] = useState({
        title: '',
        description: '',
    });

    const handleInputValue = (key) => (e) => {
        setinformation({ ...information, [key]: e.target.value });
    };

    const uploadHandler = () => {
        axios.post('https://localhost:4000/content', {
            userId: '',
            title: '',
            picture_1: '',
            picture_2: '',
            description: '',
            votingDeadLine,
        });
    };

    return (
        <div>
            <input className="title"></input>
            <button onClick={uploadHandler}>등록</button>
            <div className="NewContentFrame"></div>
        </div>
    );
}

export default NewContent;
