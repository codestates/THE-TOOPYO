import React, { useState } from 'react';
import Login from './LoginModal';

function LoginButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <button className="modalBtn" onClick={openModal}>
                로그인
            </button>
            <Login isOpen={isModalOpen} close={closeModal} open={openModal} />
        </>
    );
}

export default LoginButton;
