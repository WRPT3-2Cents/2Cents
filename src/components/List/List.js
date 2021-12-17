import React from 'react';
import './list.css';

const List = ({list}) => {

    return (
        list.map(item => {
            return (
                <li className='item'>{item}</li>
            )
        })
    )
}

export default List;