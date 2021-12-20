import axios from 'axios';
import React, {useState, useEffect } from 'react';
import './list.css';

const List = ({list}) => {
    const [useOptions, setOptions ] = useState([]);
    useEffect(() => {
        var options = {
            method: 'GET',
            url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
            params: {s: 'The Bourne Identity', r: 'json', page: '1'},
            headers: {
                'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com',
                'x-rapidapi-key': '6a58189903msh634a9d1b70c7a69p1e2a7bjsncf02d608355c'
            }
        };
        
        axios.request(options).then(function (response) {
            setOptions(response.data.Search)
        }).catch(function (error) {
            console.error(error);
        });
    },[])

    return (
            list.map(item => {
                return (
                    <li className='item'>{item}</li>
                    )
                })
        // <div>
        // {useOptions.map((e,i) => {
        //     return <div key={i}>
        //     <li>{e.Title}<br/>
        //      Released In {e.Year}</li>
        //     <img src={e.Poster} alt="Jason Bourne" />
        //     </div>
        // })}
        // </div>
    )
}

export default List;