import React from "react";
import {
  MDBNav,
  MDBNavItem,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon,
} from "mdbreact";

const Dropdown = ({
  addRecommendation,
  addNonRecommendation,
  addTitleToWatchlist,
  addTitleToFollows,
  id,
}) => {
  return (
    <MDBNav color="secondary">
      <MDBNavItem>
        <MDBDropdown>
          <MDBDropdownToggle nav color="secondary">
            <img src="https://img.icons8.com/material-outlined/34/000000/more.png" />
          </MDBDropdownToggle>
          <MDBDropdownMenu color="secondary">
            <MDBDropdownItem>
              <section className="recommendation-btns">
                <p>Recommend this title?</p>
                <button onClick={addRecommendation}>
                  <MDBIcon far icon="thumbs-up" />
                  {/* Yes <img src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/24/000000/external-up-arrow-basic-ui-elements-flatart-icons-outline-flatarticons-2.png"/>    */}
                </button>
                <button onClick={addNonRecommendation}>
                  <MDBIcon far icon="thumbs-down" />
                  {/* No <img src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/24/000000/external-down-arrow-basic-ui-elements-flatart-icons-outline-flatarticons.png"/>  */}
                </button>
                <button onClick={() => addTitleToWatchlist(id)}>
                  {" "}
                  <MDBIcon icon="plus-circle" />{" "}
                </button>
                <button onClick={() => addTitleToFollows(id)}> Follow </button>
              </section>
            </MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
      </MDBNavItem>
    </MDBNav>
  );
};

export default Dropdown;
