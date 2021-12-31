import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './profile.css';

const Profile = (props) => {
    const [ titles, setTitles] = useState([]);

    useEffect(() => {
        axios.get('/api/titles')
            .then(res => setTitles(res.data))
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
                    return <li key={title.title_id}>{title.name}</li>
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

export default connect(mapStateToProps)(Profile);