import React, { useState, useEffect } from 'react';
import Comments from '../Comments/Comments';
import { useParams } from 'react-router-dom';
import './title.css';
import axios from 'axios';
import Badge from '../../bootstrap/Badge';
import Dropdown from '../../bootstrap/Dropdown';
import { connect } from 'react-redux';

const Title = () => {

    const { title_name, title_id } = useParams();
    const [ titleInfo, setTitleInfo ] = useState({});
    
    // need to add functionality to add this title to the watchlist
    const mockUserData = {
        user_id: 1,
        username: 'jp',
        email: 'jp@example.com',
        recommendations: [],
        watchlist: [],
        follows: []
    }
    
    const [ mockUser, updateMockUser ] = useState(mockUserData);

    const addTitleToWatchlist = (title_id) => {
        if (!mockUser.watchlist.includes(title_id)){
            const arr = mockUser.watchlist;
            console.log({arr})
            const updatedArr = [...arr, title_id];
            console.log({updatedArr});
            mockUser.watchlist = updatedArr;
            updateMockUser(mockUser);
            // axios.put('api/users', mockUser)
            //     .then(res => console.log(res.data))
            //     .catch(err => console.log(err));
        }
        console.log(mockUser);
    }

    // need to add functionality to add this title to the follows list
    const addTitleToFollows = (title_id) => {
        if (!mockUser.follows.includes(title_id)){
            mockUser.follows.push(title_id)
            updateMockUser(mockUser);
        }
        console.log(mockUser);
    }
    
    // need to add functionality to add this title to the recommendations list
    const addTitleToRecommendations = (title_id) => {
        if (!mockUser.recommendations.includes(title_id)){
            mockUser.recommendations.push(title_id)
            updateMockUser(mockUser);
        }
        console.log(mockUser);
    }

    const removeTitleFromRecommendations = (title_id) => {
        if (mockUser.recommendations.includes(title_id)){
            const titleIdIndexToRemove = mockUser.recommendations.find(id => id === title_id);
            mockUser.recommendations.splice(titleIdIndexToRemove, 1);
            updateMockUser(mockUser);
        }
        console.log(mockUser);
    }

    useEffect(() => {
        // get all Title information for display on this page
        axios.get(`/api/titles/${title_id}`)
            .then(({data}) => {
                setTitleInfo(data);
            })
            .catch(err => console.log(err));
    }, [])

    const addRecommendation = () => {
        
        addTitleToRecommendations(title_id);

        const recommendations = titleInfo.recommendations + 1;

        axios.put(`/api/titles`, {...titleInfo, recommendations})
            .then(res => {
                const title = res.data.filter(title => title.title_id === titleInfo.title_id)[0];
                setTitleInfo(title);
            })
            .catch(err => console.log(err));
    }

    const addNonRecommendation = () => {

        removeTitleFromRecommendations(title_id);

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
                        <Dropdown 
                            addRecommendation={addRecommendation} 
                            addNonRecommendation={addNonRecommendation} 
                            addTitleToWatchlist={addTitleToWatchlist}
                            addTitleToFollows={addTitleToFollows}
                            id={title_id}/>
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
}

const mapStateToProps = (reduxState) => {
    return {
        state: reduxState,
    }
}

export default connect(mapStateToProps)(Title);