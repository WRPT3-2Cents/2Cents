import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../redux/reducer';
import './profile.css';

const Profile = (props) => {
    const [ titles, setTitles] = useState([]);

    const removeFromWatchlist = (id) => {
        const {loggedIn, ...userProperties} = props.state;
        const indexToRemove = userProperties.watchlist.findIndex(titleId => +titleId === id);
        const updatedWatchlist = [...userProperties.watchlist];
        updatedWatchlist.splice(indexToRemove, 1);
        const user = {...userProperties, watchlist: updatedWatchlist};
        props.updateUser(user);
    }

    useEffect(() => {
        axios.get('/api/titles')
            .then(res => {
                setTitles(res.data);
            })
            .catch(err => console.log(err));
    }, [])

    return (
        <>
            <h1>Profile</h1>

            <section className='username'>
                <h3>Username: </h3>
                <h4>{props.state.username}</h4>
            </section>

            <h4>Recommendations</h4>
            <ul>

            {props.state.recommendations.map(titleId => {
                const title = titles.find(title => title.title_id === +titleId);
                if (title){
                    return <li key={title.title_id}>{title.name}</li>
                }
            })}
            
            </ul>
            
            <h4>Watchlist</h4>
            <ul>
            {props.state.watchlist.map(titleId => {
                const title = titles.find(title => title.title_id === +titleId);
                if (title){
                    return (<li className='profile-list' key={title.title_id}>
                                <div>{title.name}</div>
                                <button onClick={() => removeFromWatchlist(title.title_id)}>X</button>
                            </li>)
                }
            })}
            </ul>
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