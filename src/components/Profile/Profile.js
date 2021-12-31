import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const Profile = (props) => {
    const [ titles, setTitles] = useState([]);

    const getTitles = () => {
        const titleIds = [];
        props.state.recommendations.forEach(titleId => titleIds.push(titleId));
        props.state.watchlist.forEach(titleId => {
            if (!titleIds.includes(titleId)){
                titleIds.push(titleId);
            }
        })

        axios.get('/api/titles')
            .then(res => {
                setTitles(res.data);
            } ).catch(err => console.log(err));

        console.log(titles);
    }

    useEffect(() => {
        getTitles();
    }, [])

    return (
        <>
            <h1>Profile</h1>

            <h3>Username</h3>
            {props.state.username}

            <h4>Recommendations</h4>
            {/* {props.state.recommendations.map(titleId => {
                const title = titles.find(title => title.title_id === titleId);
                console.log(title);
                // return <li>{title.name}</li>
            })} */}
            
            <h4>Watchlist</h4>
            {props.state.watchlist.map(titleId => {
                const title = titles.find(title => title.title_id === titleId);
                // return <li>{title.name}</li>
                console.log(title);
            })}
        </>
    )
}

const mapStateToProps = (reduxState) => {
    return {
        state: reduxState,
    }
}

export default connect(mapStateToProps)(Profile);