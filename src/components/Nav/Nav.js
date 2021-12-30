import React, { useState, useEffect } from 'react';
import Menu from '../Menu/Menu';
import './nav.css';

const Nav = () => {
    const [ menuStatus, setMenuStatus] = useState(false);

    const toggleMenu = () => setMenuStatus(!menuStatus);

    const desktopView =window.matchMedia('(min-width: 1000px)');
    const tabletView = window.matchMedia('(min-width: 600px)');

    useEffect(() => {
        if (desktopView.matches || tabletView.matches){
            setMenuStatus(true);
        }
    })

    return (
        <nav className='main-nav' onClick={toggleMenu}>
            { !menuStatus && 
                <div className='hamburger-menu'>
                    <img src="https://img.icons8.com/material-rounded/24/000000/menu--v1.png" alt='menu-icon' />
                    <h6 className='menu-text'>MENU</h6>
                </div>}
            { menuStatus && <> 
                                <span className='close-btn'>X</span>
                                <Menu />
                            </> }
        </nav>
    )
}

export default Nav;