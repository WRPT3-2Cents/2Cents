import React from 'react';

const Menu = () => {

    const links = ['Logo', 'Home', 'Follows', 'Profile', 'About']

    return (
        links.map(link => {
            return <li>{link}</li>
        })
    )
}

export default Menu;