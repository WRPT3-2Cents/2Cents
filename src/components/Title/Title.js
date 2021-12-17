import React from 'react';
import List from '../List/List';
import './title.css';

const Title = () => {

    const comments = [ {
        comment_id: 0,
        message: 'This was a great movie!',
        date: '12-16-2021',
        previous_id: undefined,
        next_id: 1
    },
    {
        comment_id: 1,
        message: 'Totally agree!',
        date: '12-16-2021',
        previous_id: 0,
        next_id: undefined
    }
    ];

    return (
        <>
            <section className='header'>
                <button>ADD TO WATCHLIST</button>
                <button>ADD TO FOLLOWS </button>
                <h1> TITLE </h1>
                <button> RECOMMEND</button>
            </section>

            {comments.map(comment => {
                return (
                    <div className='comment-box'>
                        <p>{comment.message}</p>
                        <h6>{comment.date}</h6>
                    </div>
                )
            })}
        </>
    )
}

export default Title;