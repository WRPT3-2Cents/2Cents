import React, { useState, useEffect } from 'react';
import Comments from '../Comments/Comments';
import { useParams } from 'react-router-dom';
import './title.css';
import axios from 'axios';
import Badge from '../../bootstrap/Badge';
import Dropdown from '../../bootstrap/Dropdown';

const Title = () => {

    // need to add functionality to add this title to the watchlist
    // need to add functionality to add this title to the follows list
    
    const { title_name, title_id } = useParams();
    const [ titleInfo, setTitleInfo ] = useState({});

    useEffect(() => {
        // get all Title information for display on this page
        axios.get(`/api/titles/${title_id}`)
            .then(({data}) => {
                setTitleInfo(data);
            })
            .catch(err => console.log(err));
    }, [])

    const addRecommendation = () => {
        const recommendations = titleInfo.recommendations + 1;

        axios.put(`/api/titles`, {...titleInfo, recommendations})
            .then(res => {
                const title = res.data.filter(title => title.title_id === titleInfo.title_id)[0];
                setTitleInfo(title);
            })
            .catch(err => console.log(err));
    }

    const addNonRecommendation = () => {
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
                            
                        <h1 id='title'> {title_name} </h1>
                        <Badge level={`${recommendationLevel}`} text={`Audience Score: ${recommendationRatio}%`} />
                        
                    </section>


                    <section className='header-info'>
                        <Dropdown addRecommendation={addRecommendation} addNonRecommendation={addNonRecommendation} />
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

export default Title;