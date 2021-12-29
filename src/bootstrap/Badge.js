import React from 'react';
import { MDBBadge, MDBContainer } from 'mdbreact';

const Badge = ({level, text}) => {
    return (
        <MDBContainer>
            <MDBBadge color={`${level}`}>{text}</MDBBadge>
        </MDBContainer>
    )
}

export default Badge;