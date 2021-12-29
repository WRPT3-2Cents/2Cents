import React from 'react';
import { Link } from 'react-router-dom';
import './menu.css';


const Menu = () => {

    return (
        <div className='menu'>
          <ul className='nav-links'>
                <div className='nav-links'>
                    <li><h4 className='main-logo'><Link to='/'>2Cents</Link></h4></li>
                    <li><h4 className='nav-link'><Link to='/Follows'>Follows</Link></h4></li>
                    <li><h4 className='nav-link'><Link to='/Profile'>Profile</Link></h4></li>
                    <li><h4 className='nav-link'><Link to='/About'>About</Link></h4></li>
                </div>
                <div className='nav-links'>
                    <li><h4 className='nav-link'><Link to='/Sign-up'>Sign-Up</Link></h4></li>
                    <li><h4 className='nav-link'><Link to='/Login'>Login</Link></h4></li>
                </div>
                {/* <li><h4 onClick={logout} className='log-out'>Log-out</h4></li> */}
           </ul>
        </div>
    )
}
                
            

export default Menu;