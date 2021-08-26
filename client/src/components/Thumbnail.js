import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import CurContent from '../pages/CurContent/CurContent';

function Thumbnail({ list }) {
    return (
        <Link to="/CurContent">
            <CurContent id={list.id}>
                <div>
                    <h1>{list.title}</h1>
                    <img className="picture_1" src={list.picture_1}></img>
                    <img className="picture_2" src={list.picture_2}></img>
                    <div className="descript">{list.description}</div>
                </div>
            </CurContent>
        </Link>
    );
}

export default Thumbnail;
