import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './follows.css';

const Follows = ({state}) => {
    const [ titles, setTitles ] = useState([]);
    const [ isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        axios.get('/api/titles')
            .then(res => setTitles(res.data))
            .catch(err => console.log(err));
        
        if (state.follows !== null){
            setIsFollowing(true);
        }
        
    }, [])

    return (
        <>
            <h1>Follows</h1>
            <ul>

            {isFollowing && 
                state.follows.map(titleId => {
                    const title = titles.find(title => title.title_id === +titleId)
                    if (title){
                        return (<li key={title.title_id} className='follows-title-details'>
                                    <Link to={`Title/${title.name}/${title.title_id}`}>
                                        <h2>{title.name}</h2>
                                        <h6>{title.genre}</h6>
                                        <h6>{title.type}</h6>
                                    </Link></li>)
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