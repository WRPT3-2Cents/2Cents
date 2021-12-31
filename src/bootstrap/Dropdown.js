import React from 'react';
import { MDBNav, MDBNavItem, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';

const Dropdown = ({addRecommendation, addNonRecommendation, addTitleToRecommendations, addTitleToWatchlist, addTitleToFollows }) => {
    return (
        <MDBNav color="secondary">
            <MDBNavItem>
                <MDBDropdown>
                    <MDBDropdownToggle nav color="secondary">
                        <img src="https://img.icons8.com/material-outlined/34/000000/more.png"/>
                    </MDBDropdownToggle>
                    <MDBDropdownMenu color="secondary">
                        <MDBDropdownItem>
                            <section className='recommendation-btns'>
                                <p>Do you recommend this title?</p>
                                <button onClick={addRecommendation}>
                                    Yes <img src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/24/000000/external-up-arrow-basic-ui-elements-flatart-icons-outline-flatarticons-2.png"/>   
                                </button>
                                <button onClick={addNonRecommendation}>
                                    No <img src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/24/000000/external-down-arrow-basic-ui-elements-flatart-icons-outline-flatarticons.png"/> 
                                </button>
                            </section>
                        </MDBDropdownItem>
                        <MDBDropdownItem>
                            <button> Add to Watchlist </button>
                        </MDBDropdownItem>
                        <MDBDropdownItem>
                            <button> Follow this title </button>
                        </MDBDropdownItem>
                    </MDBDropdownMenu>
                </MDBDropdown>
            </MDBNavItem>
        </MDBNav>
    )
}

export default Dropdown;