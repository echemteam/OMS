import React from "react";
import Image from "../../image/Image";
import Input from "../../ui/inputs/input/Input";
import { AppIcons } from "../../../data/appIcons";
import "../searchBar/SearchBar.scss";
import { Button } from "react-bootstrap";

function SearchBar(props) {
  return (
    <React.Fragment>
      <div className="search-section">
        <div className="search-part">
          <Input
            name="search Value"
            type="text"
            placeholder={props.searchText}
            onChange={props.handleChange}
          />
          <div className="search-btn">
            <Button title="Search">
              <Image
                imagePath={AppIcons.searchIcon}
                imgCustomClassName="open-bar"
                altText="Icon"
              />
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SearchBar;
