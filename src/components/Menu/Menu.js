import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './menu.css';
import { connect } from 'react-redux';

import { logoutUser } from '../../redux/reducer';


const Menu = (props) => {
    
    const navigate = useNavigate();

    const logout = () => {
        props.logoutUser();
        navigate("/");
    }

    return (
        <div className='menu'>
          <ul className='nav-links'>
                <div className='nav-links'>
                    <li><h4 id='main-logo'><Link to='/'>2Cents</Link></h4></li>

                    {props.state.loggedIn && <> 
                        <li><h4 className='nav-link'><Link to='/Follows'>Follows</Link></h4></li>
                        <li><h4 className='nav-link'><Link to='/Profile'>Profile</Link></h4></li>
                    </>}

                    <li><h4 className='nav-link'><Link to='/About'>About</Link></h4></li>

                </div>
                <div className='nav-links'>
                    {!props.state.loggedIn && <>
                    <li><h4 className='nav-link'><Link to='/Sign-up'>Sign-Up</Link></h4></li>
                    <li><h4 className='nav-link'><Link to='/Login'>Login</Link></h4></li>
                    </>}
                    {props.state.loggedIn && <>
                    {/* <li><h4 className='nav-link'><Link onClick={()=>props.logoutUser}to='/'>Logout</Link></h4></li> */}
                    <li><Link to='/'><button onClick={logout}>Logout</button></Link></li>
                    </>}
                </div>
           </ul>
        </div>
    )
}

const mapStateToProps = (reduxState) => {
    return {
        state: reduxState
    }
}


const mapDispatchToProps = { logoutUser };

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

