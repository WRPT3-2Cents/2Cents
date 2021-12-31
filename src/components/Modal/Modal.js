import React from 'react';
import './modal.css';

const Modal = ({ children }) => {
    return (
        <div className='custom-modal'>
            <div className='custom-modal-content'>
                {children}
            </div>
        </div>
    )
}

export default Modal;