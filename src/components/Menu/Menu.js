import React from 'react';
import { Link } from 'react-router-dom';
import './menu.css';

const Menu = () => {

    return (
        // links.map(link => {
        //     if (link === 'Home'){
        //         return <li><Link to='/'>Home</Link></li>
        //     }
            
        //     return <li><Link to={`/${link}`}>{link}</Link></li>
        // })
        <div className='menu'>
            <ul className='nav-links'>
                <li><h4><Link to='/'>Home</Link></h4></li>
                <li><h4><Link to='/Follows'>Follows</Link></h4></li>
                <li><h4><Link to='/Profile'>Profile</Link></h4></li>
                <li><h4><Link to='/About'>About</Link></h4></li>
                {/* <li><h4 onClick={logout} className='log-out'>Log-out</h4></li> */}
            </ul>
        </div>
    )
}

export default Menu;