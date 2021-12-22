import React, { useEffect } from 'react';
import Comments from '../Comments/Comments';
import { useParams } from 'react-router-dom';
import './title.css';

const Title = () => {

    // need to add functionality to add this title to the watchlist
    // need to add functionality to add this title to the follows list
    // need to add functionality to +1 / -1 to this titles recommendations/non-recommendations fields
    
    const { title_name, title_id } = useParams();

    useEffect(() => {
        // get all Title information for display on this page
    })

    return (
        <>
            <section className='header'>
                <h1> {title_name} </h1>

                <section className='action-btns'>
                    <button>W</button>
                    <button>F </button>
                    <button>^</button>
                    <button>v</button>
                </section>

            </section>

            <Comments title_id={title_id} />

        </>
    )
}

export default Title;