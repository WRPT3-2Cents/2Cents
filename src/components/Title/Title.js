import React, { useState, useEffect } from 'react';
import Comments from '../Comments/Comments';
import { useParams } from 'react-router-dom';
import './title.css';
import axios from 'axios';
import Badge from '../../bootstrap/Badge';
import Dropdown from '../../bootstrap/Dropdown';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { updateUser } from '../../redux/reducer';

const Title = (props) => {

    const { title_name, title_id } = useParams();
    const [ titleInfo, setTitleInfo ] = useState({});
    const [loggedInStatus, setLoggedInStatus] = useState(false);

    const addTitleToWatchlist = (title_id) => {
        if (!props.state.watchlist.includes(title_id)){
            const updatedWatchlist = [...props.state.watchlist, title_id];
            // spread in state from redux except for loggedIn property
            const {loggedIn, ...userProperties} = props.state;
            const user = {...userProperties, watchlist: updatedWatchlist}
            props.updateUser(user);
            toast.success("Added to watchlist!")
        }
    }

    
    const addTitleToFollows = (title_id) => {
        if (!props.state.follows.includes(title_id)){
            const updatedFollows = [...props.state.follows, title_id];
            // spread in state from redux except for loggedIn property
            const {loggedIn, ...userProperties} = props.state;
            const user = {...userProperties, follows: updatedFollows}
            props.updateUser(user);
            toast.success("Added to follows!")
        }
    }
    
    
    const addTitleToRecommendations = (title_id) => {
        if (!props.state.recommendations.includes(title_id)){
            const updatedRecommendations = [...props.state.recommendations, title_id];
            // spread in state from redux except for loggedIn property
            const {loggedIn, ...userProperties} = props.state;
            const user = {...userProperties, recommendations: updatedRecommendations}
            props.updateUser(user);
        }
    }

    const removeTitleFromRecommendations = (title_id) => {
        if (props.state.recommendations.includes(title_id)){
            const updatedRecommendations = [...props.state.recommendations];
            const titleIdToRemove = props.state.recommendations.findIndex(id => id === title_id);
            updatedRecommendations.splice(titleIdToRemove, 1);
            // spread in state from redux except for loggedIn property
            const {loggedIn, ...userProperties} = props.state;
            const user = {...userProperties, recommendations: updatedRecommendations}
            props.updateUser(user);
        }
    }

    useEffect(() => {
        // get all Title information for display on this page
        axios.get(`/api/titles/${title_id}`)
            .then(({data}) => {
                setTitleInfo(data);
            })
            .catch(err => console.log(err));
        setLoggedInStatus(props.state.loggedIn);
    }, [])

    const addRecommendation = () => {
        if (!props.state.recommendations.includes(title_id)){
            addTitleToRecommendations(title_id);
    
            const recommendations = titleInfo.recommendations + 1;
    
            axios.put(`/api/titles`, {...titleInfo, recommendations})
                .then(res => {
                    const title = res.data.filter(title => title.title_id === titleInfo.title_id)[0];
                    setTitleInfo(title);
                })
                .catch(err => console.log(err));
        }
    }

    const addNonRecommendation = () => {
        if (props.state.recommendations.includes(title_id)){
            removeTitleFromRecommendations(title_id);
        }

        const non_recommendations = titleInfo.non_recommendations + 1;

        axios.put(`/api/titles`, {...titleInfo, non_recommendations})
            .then(res => {
                const title = res.data.filter(title => title.title_id === titleInfo.title_id)[0];
                setTitleInfo(title);
            })
            .catch(err => console.log(err));
    }

    const recommendationRatio = Math.round((titleInfo.recommendations / (titleInfo.recommendations + titleInfo.non_recommendations))*100);
    const recommendationLevel = recommendationRatio > 50 ? 'success' : 'danger';

    return (
        <>
            <section className='header'>
                    
                    <section className='title-and-recommendation'>
                            
                        <h2 id='title'> {title_name} </h2>
                        <Badge level={`${recommendationLevel}`} text={`Audience Score: ${recommendationRatio}%`} />
                        
                    </section>


                    <section className='header-info'>
                        {loggedInStatus && 
                        <Dropdown 
                            addRecommendation={addRecommendation} 
                            addNonRecommendation={addNonRecommendation} 
                            addTitleToWatchlist={addTitleToWatchlist}
                            addTitleToFollows={addTitleToFollows}
                            id={title_id}/>}
                        <h6>{titleInfo.genre}</h6>
                        <h6>{titleInfo.type}</h6>
                    </section>
                    

                    <section className='title-summary'>
                        <h5>{titleInfo.summary}</h5>
                    </section>

            </section>

            <Comments title_id={title_id} />

        </>
    )
};

const mapStateToProps = (reduxState) => {

    return {
        state: reduxState,
    }
};

const mapDispatchToProps = { updateUser };

export default connect(mapStateToProps, mapDispatchToProps)(Title);