import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {

    const links = ['Logo', 'Home', 'Follows', 'Profile', 'About', 'Sign-Up']

    return (
        links.map(link => {
            if (link === 'Home'){
                return <li><Link to='/'>Home</Link></li>
            }
            
            return <li><Link to={`/${link}`}>{link}</Link></li>
        })
    )
}

export default Menu;