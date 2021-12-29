import React from 'react';
import { MDBNav, MDBNavItem, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';

const CommentDropdown = ({editComment, deleteMe, comment }) => {
    return (
        <MDBNav color="secondary">
            <MDBNavItem>
                <MDBDropdown>
                    <MDBDropdownToggle nav color="secondary">
                        <img src="https://img.icons8.com/material-outlined/24/000000/more.png"/>
                    </MDBDropdownToggle>
                    <MDBDropdownMenu color="secondary">
                        <MDBDropdownItem>
                            <button onClick={() => editComment(comment)}>EDIT</button>
                        </MDBDropdownItem>
                        <MDBDropdownItem>
                        <button onClick={(e) => deleteMe(e, comment)}> DELETE </button>
                        </MDBDropdownItem>
                    </MDBDropdownMenu>
                </MDBDropdown>
            </MDBNavItem>
        </MDBNav>
    )
}

export default CommentDropdown;