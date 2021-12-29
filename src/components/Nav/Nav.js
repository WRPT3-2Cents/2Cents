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
        <nav className='nav' onClick={toggleMenu}>
            { !menuStatus && 
                <div className='hamburger-menu'>
                    <img src="https://img.icons8.com/cotton/73/000000/menu.png"/>
                </div>}
            { menuStatus && <Menu /> }
        </nav>
    )
}

export default Nav;