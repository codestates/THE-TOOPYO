import axios from 'axios';
import React, { useState } from 'react';
import './Search.css';
import Thumbnail from '../Thumbnail/Thumbnail';

export default function Search({ isOpen, close }) {
    const filteredContent = (data) => {
        data = data.filter((el) => {
            return el.data.nickName.indexOf(searchKeyword) > -1;
        });
        return data.map((list) => {
            return <Thumbnail list={list} />;
        });
    };
    // 컨텐츠리스트를 데이터로 받아서 그걸 필터하고 맵걸어서 썸네일에 그 값을 넣어 출력하는 함수
    // 저기에 리스트를 넣는게 맞는지 모르겠으나 앱 JS를 보고 일단 만듬.

    const [contentList, setContentList] = useState([]);
    const [searchKeyword, SetSearchKeyword] = useState('');
    const inputHandler = (e) => {
        SetSearchKeyword(([e.target.name] = e.target.value));
    };
    const searchRefresh = () => {
        SetSearchKeyword('');
    };
    // 검색해서 리턴하고나면 검색어가 공백이 되게하는 리프레시 함수... 잘 될지 모르겠음.
    // 이걸하면 모든 문자가 검색돼서 필터 걸리지않고 아마도 모든 게시물이 썸네일로 나올거임
    const getContentList = () => {
        axios.get('https://localhost:4000/content').then((res) => {
            setContentList(res.data.content);
        });
    };
    getContentList();
    return (
        <>
            {isOpen ? (
                <div className="searchModal">
                    <div className="inputWrapper">
                        <svg width="4vw" height="4vw" viewBox="0 0 20 20" fill="none">
                            <path
                                d="M12.3243 4.98201C14.3159 6.97369 14.3159 10.2028 12.3243 12.1945C10.3326 14.1862 7.10345 14.1862 5.11177 12.1945C3.1201 10.2028 3.1201 6.97369 5.11177 4.98201C7.10345 2.99034 10.3326 2.99034 12.3243 4.98201ZM14.8612 12.8929C16.9167 9.96687 16.6367 5.90038 14.0213 3.28496C11.0924 0.356024 6.34365 0.356024 3.41472 3.28496C0.485785 6.21389 0.485785 10.9626 3.41472 13.8916C6.07942 16.5563 10.2504 16.7967 13.1869 14.6127L17.8336 19.2595C18.3022 19.7281 19.062 19.7281 19.5307 19.2595C19.9993 18.7908 19.9993 18.031 19.5307 17.5624L14.8612 12.8929Z"
                                fill="#ccc"></path>
                        </svg>
                        <input
                            className="searchInput"
                            placeholder="검색하기"
                            name="searchKeyword"
                            onChange={inputHandler}
                            value={searchKeyword}></input>
                        <button className="closeBtn" onClick={close}>
                            X
                        </button>
                        <div>{contentList ? <div>{filteredContent(contentList)}</div> : '검색 결과가 없습니다.'}</div>
                    </div>
                </div>
            ) : null}
        </>
    );
}
