import React from 'react';

const Menu = () => {

    const links = ['Home', 'Favorites', 'Profile']

    return (
        links.map(link => {
            return <li>{link}</li>
        })
    )
}

export default Menu;