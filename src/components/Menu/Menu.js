import React from 'react';

const Menu = () => {

    const links = ['Home', 'Follows', 'Profile']

    return (
        links.map(link => {
            return <li>{link}</li>
        })
    )
}

export default Menu;