import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './follows.css';

const Follows = (props) => {
    const [ titles, setTitles ] = useState([]);

    useEffect(() => {
        axios.get('/api/titles')
            .then(res => setTitles(res.data))
            .catch(err => console.log(err));
        
    }, [])

    return (
        <>
            <h1>Follows</h1>
            <ul>

            {props.state.follows.map(titleId => {
                const title = titles.find(title => title.title_id === +titleId)
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

export default connect(mapStateToProps)(Follows);