import React, { useState, useEffect } from 'react';
import Comments from '../Comments/Comments';
import { useParams } from 'react-router-dom';
import './title.css';
import axios from 'axios';

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

    const addRecommentation = () => {
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

    return (
        <>
            <section className='header'>

                    <h1> {title_name} </h1>
                    <h6 className='recommendation-ratio'>{recommendationRatio}%</h6>

                    <section className='header-info'>
                        <h5>{titleInfo.genre}</h5>
                        <h5>{titleInfo.summary}</h5>
                        <h5>{titleInfo.type}</h5>
                    </section>


                <section className='action-btns'>
                    <button>W</button>
                    <button>F </button>
                    <button onClick={addRecommentation}>^</button>
                    <button onClick={addNonRecommendation}>v</button>
                </section>

            </section>

            <Comments title_id={title_id} />

        </>
    )
}

export default Title;