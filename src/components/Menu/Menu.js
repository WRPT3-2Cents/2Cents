import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {

    const links = ['Logo', 'Home', 'Follows', 'Profile', 'About']

    return (
        links.map(link => {
            return <li><Link to={`/${link}`}>{link}</Link></li>
        })
    )
}

export default Menu;