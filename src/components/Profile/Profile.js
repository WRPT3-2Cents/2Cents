import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../redux/reducer';
import { Link } from 'react-router-dom';
import './profile.css';
import { MDBIcon, MDBTypography } from 'mdbreact';


const Profile = (props) => {
    const [ titles, setTitles] = useState([]);
    const [ recommendations, setRecommendations] = useState(false);
    const [ watchlist, setWatchlist] = useState(false);
    const [ username, setUsername ] = useState('')
    const [ editButton, setEditButton ] = useState(false);

    const removeFromWatchlist = (id) => {
        const {loggedIn, ...userProperties} = props.state;
        const indexToRemove = userProperties.watchlist.findIndex(titleId => +titleId === id);
        const updatedWatchlist = [...userProperties.watchlist];
        updatedWatchlist.splice(indexToRemove, 1);
        const user = {...userProperties, watchlist: updatedWatchlist};
        props.updateUser(user);
    }

    const updateUsername= () => {
        const {loggedIn, ...userProperties} = props.state;
        const user = {...userProperties, username};
        props.updateUser(user)
    }

    useEffect(() => {
        axios.get('/api/titles')
            .then(res => {
                setTitles(res.data);
            })
            .catch(err => console.log(err));

        if (props.state.recommendations !== null){
                setRecommendations(true);
            }

        if (props.state.watchlist !== null){
                setWatchlist(true);
            }
    }, [])
    return (
        <>
            <h1 className='profile-title'>My Profile</h1>
        <section className='profile-background'>
            <section>
            <section className='username'>
            <MDBTypography tag='h3'className='username-title text-center'>My Username</MDBTypography>
                <div className='username-cont'>
                    <h4>{props.state.username}</h4>
        
                {props.state.username !== 'guest' &&
                    <div className='usernameUpdateField'>
                    {props.state.loggedIn && editButton ? (
                            <div >
                                        <input
                                        type="text"
                                        placeholder="Enter New Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className='input-username'
                                    />
                                    <button className='edit-button'type="submit" id="reg" onClick={updateUsername}>Change</button>
                            </div>
                        ) : (
                            <button  className='edit-button' onClick={setEditButton}><MDBIcon far icon="edit" /></button>
                        )}
                    </div>

                    }</div>
                </section>
            <section className='recommendations-section'>
            <MDBTypography tag='h3'className='recommendation-title text-center'>My Recommendations <MDBIcon far icon="thumbs-up" /></MDBTypography>
            <ul className='recommendations'>

            {recommendations && props.state.recommendations.map(titleId  => {
                const title = titles.find(title => title.title_id === +titleId);
                if (title){
                    return <li className='r-list'key={title.title_id}>{title.name}</li>
                }
            })}
            
            </ul>
            </section>
        </section>
            
            <section className='watchlist-section'>
            <MDBTypography tag='h2'className='watchlist-title text-center'>My Watchlist</MDBTypography>
            <ul className='watchlist'>
            {watchlist && props.state.watchlist.map(titleId => {
                const title = titles.find(title => title.title_id === +titleId);
                if (title){
                    return (<li className='watchlist-cont' key={title.title_id}>
                                <button className='delete-watchlist'onClick={() => removeFromWatchlist(title.title_id)}><MDBIcon far icon="trash-alt" /></button>
                                <Link to={`Title/${title.name}/${title.title_id}`}>
                                <div className='profile-list'>
                                    <img src={title.poster} alt='title' className='profile-img-title' />
                                    <h3>{title.name}</h3>
                                    <h6>{title.genre}</h6>
                                </div>
                                </Link>
                            </li>)
                }
            })}
            </ul>
                </section>
            </section>
            <style jsx>
                {`
                .remove-button {
                    background-color: black;
                    color: white;
                    font-size: 16px;
                    border-radius: 14px;
                    width: 36px;
                }

                .remove-button:hover {
                    background-color: red;
                    color: white;
                }
                `}
            </style>
            
        </>
    )
}

const mapStateToProps = (reduxState) => {
    return {
        state: reduxState,
    }
}

const mapDispatchToProps = { updateUser };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

                                
                                