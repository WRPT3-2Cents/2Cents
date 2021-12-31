import React from 'react';
import List from '../List/List';
const Follows = () => {
    const testList = ['movie', 'tv show', 'book'];

    return (
        <>
            <h1>Follows</h1>

            <List list={testList} />
        </>
    )
}

export default Follows;