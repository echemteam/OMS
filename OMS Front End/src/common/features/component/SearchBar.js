import React from "react";
import Input from "../../../components/ui/inputs/input/Input";
import "./SearchBar.scss";
import { Button } from "react-bootstrap";

function SearchBar(props) {
  return (
    <React.Fragment>
      <div className="search-section">
        <div className="search-part">
          <Input
            name="search Value"
            type="text"
            value={props.searchValue}
            placeholder={props.searchText}
            onChange={props.handleChange}
          />
          <div className="search-btn">
            <Button title="Search">
              {/* <Image
                imagePath={AppIcons.searchIcon}
                imgCustomClassName="open-bar"
                altText="Icon"
              /> */}
              <span className="bi bi-search"></span>
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SearchBar;