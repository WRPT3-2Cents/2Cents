import React from 'react';
import './CommentDropDown.css'
import { MDBNav, MDBNavItem, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from 'mdbreact';

const CommentDropdown = ({editComment, deleteMe, comment }) => {
    return (
        <div className='button-drop-cont'>
        <MDBNav color="secondary">
            <MDBNavItem>
                <MDBDropdown>
                    <MDBDropdownToggle nav color="secondary">
                        <img src="https://img.icons8.com/material-outlined/24/000000/more.png"/>
                    </MDBDropdownToggle>
                    <MDBDropdownMenu color="secondary" basic>
                        <MDBDropdownItem>
                        <button className='button-dropdown'onClick={() => editComment(comment)}><MDBIcon far icon="edit" /></button>
                        </MDBDropdownItem>
                        <MDBDropdownItem divider />
                        <MDBDropdownItem>
                        <button className='button-dropdown'onClick={(e) => deleteMe(e, comment)}> <MDBIcon far icon="trash-alt" /> </button>
                        </MDBDropdownItem>
                    </MDBDropdownMenu>
                </MDBDropdown>
            </MDBNavItem>
        </MDBNav>
        </div>
    )
}

export default CommentDropdown;