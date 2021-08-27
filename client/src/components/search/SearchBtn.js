import React, { useState } from 'react';
import Search from '../search/Search';

function SearchButton() {
    const [isModalOpen, setIsModalOpen] = useState({
        isModalOpen: false,
    });

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <button onClick={openModal}>검색</button>
            <Search isOpen={isModalOpen} close={closeModal} />
        </>
    );
}

export default SearchButton;
