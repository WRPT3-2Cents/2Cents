import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateUser } from '../../redux/reducer';
import { Link } from 'react-router-dom';
import { MDBIcon } from 'mdbreact';
import './follows.css';

const Follows = (props) => {
    const [ titles, setTitles ] = useState([]);
    const [ isFollowing, setIsFollowing] = useState(false);

    const removeFromFollows = (id) => {
        const {loggedIn, ...userProperties} = props.state;
        const indexToRemove = userProperties.follows.findIndex(titleId => +titleId === id);
        const updatedFollows = [...userProperties.follows];
        updatedFollows.splice(indexToRemove, 1);
        const user = {...userProperties, follows: updatedFollows};
        props.updateUser(user);
    }

    useEffect(() => {
        axios.get('/api/titles')
            .then(res => setTitles(res.data))
            .catch(err => console.log(err));
        
        if (props.state.follows !== null && props.state.follows[0] !== undefined){
            console.log(props.state.follows);
            setIsFollowing(true);
        }
        
    }, [])

    return (
        <>
            <h1 className='follows-title'>Follows</h1>
            
            <ul className='flex-box-follows-box'>
            {isFollowing && 
                props.state.follows.map(titleId => {
                    const title = titles.find(title => title.title_id === +titleId)
                    if (title){
                        return (<li key={title.title_id} className='titles follows-titles'>
                                    <button className='delete-follows' onClick={() => removeFromFollows(title.title_id)}><MDBIcon far icon="trash-alt" /></button>
                                    <Link to={`Title/${title.name}/${title.title_id}`} className='title-details'>
                                        <img src={title.poster} alt = "title poster" className='img-title'/>
                                        <h2>{title.name}</h2>
                                        <h6>{title.genre}</h6>
                                        <h6>{title.type}</h6>
                                    </Link></li>)
                            }
                })}
            {!isFollowing && <section className='follows-message'>
                            <h2>It looks like you're not following any titles yet!</h2>
                            <h3>Head to the home page and start a conversation! </h3>
                            <Link to='/' className='home-link-btn'>HOME</Link>
                            </section>}
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

export default connect(mapStateToProps, mapDispatchToProps)(Follows);