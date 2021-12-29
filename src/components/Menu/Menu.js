import React from 'react';
import { Link } from 'react-router-dom';
import './menu.css';



const Menu = () => {
    

    return (
        <div className='menu'>
          <ul className='nav-links'>
                <div className='nav-links'>
                    <li><h4><Link to='/'>Home</Link></h4></li>
                    <li><h4><Link to='/Follows'>Follows</Link></h4></li>
                    <li><h4><Link to='/Profile'>Profile</Link></h4></li>
                    <li><h4><Link to='/About'>About</Link></h4></li>
                </div>
                <div className='nav-links'>
                    <li><h4><Link to='/Sign-up'>Sign-Up</Link></h4></li>
                    <li><h4><Link to='/Login'>Login</Link></h4></li>
                </div>
           </ul>
        </div>
    )
}
                
            

export default Menu;
                
                
                
                
                