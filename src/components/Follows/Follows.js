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
            
            <ul className='flex-box-follows'>
            {isFollowing && 
                state.follows.map(titleId => {
                    const title = titles.find(title => title.title_id === +titleId)
                    if (title){
                        return (<li key={title.title_id} className='titles follows-titles'>
                                    <Link to={`Title/${title.name}/${title.title_id}`} className='title-details'>
                                        <img src={title.poster} alt = "title poster" className='img-title'/>
                                        <h2>{title.name}</h2>
                                        <h6>{title.genre}</h6>
                                        <h6>{title.type}</h6>
                                    </Link></li>)
                            }
                })}
            {!isFollowing && <>
                            <h2>It looks like you're not following any titles yet! Head to the home page and start a conversation! </h2>
                            <Link to='/' className='home-link-btn'>HOME</Link>
                            </>}
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