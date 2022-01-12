import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../redux/reducer';
import './profile.css';

const Profile = (props) => {
    const [ titles, setTitles] = useState([]);
    const [ recommendations, setRecommendations] = useState(false);
    const [ watchlist, setWatchlist] = useState(false);

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

        if (props.state.recommendations !== null){
                setRecommendations(true);
            }

        if (props.state.watchlist !== null){
                setWatchlist(true);
            }
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

            {recommendations && props.state.recommendations.map(titleId => {
                const title = titles.find(title => title.title_id === +titleId);
                if (title){
                    return <li key={title.title_id}>{title.name}</li>
                }
            })}
            
            </ul>
            
            <h4>Watchlist</h4>
            <ul>
            {watchlist && props.state.watchlist.map(titleId => {
                const title = titles.find(title => title.title_id === +titleId);
                if (title){
                    return (<li className='profile-list' key={title.title_id}>
                                <img src={title.poster} alt='of sand' />
                                <div>{title.name}</div>
                                <button className='remove-button'onClick={() => removeFromWatchlist(title.title_id)}>X</button>
                            </li>)
                }
            })}
            </ul>
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