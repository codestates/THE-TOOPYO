import React, { useState } from 'react';

export default function Search({ isOpen, close }) {
    return (
        <>
            {isOpen ? (
                <div className="searchModal">
                    <div>
                        <button className="closeBtn" onClick={close}>
                            X
                        </button>
                    </div>
                </div>
            ) : null}
        </>
    );
}
// 콘텐츠 정보를 받고
// 그걸 검색어랑 비교해서 없으면 검색 없음.
//
