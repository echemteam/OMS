import React from "react";
import "./Header.scss";
import Image from "../../../components/image/Image";
import { AppIcons } from "../../../data/appIcons";
import SearchBar from "../../../common/features/component/SearchBar";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

function Header({ handleChange }) {
  const navigate = useNavigate();

  const LogoutButton = () => {
    navigate("/login");
  };
  return (
    <div className="header-section">
      <div className="left-section">
        <div className="search-bar">
          <SearchBar
            searchText="Search..."
            handleChange={handleChange}
            searchValue=""
          />
        </div>
      </div>
      <div className="right-section">
        <div className="profile-section">
          <div className="profiles">
            <div className="profile-img">
              <span className="bi bi-person"></span>
            </div>
            <div className="user-name-desc">
              <span className="name">Admin@gmail.com</span>
              <span>
                <Image
                  imagePath={AppIcons.arrowIcon}
                  imgCustomClassName="open-bar"
                  altText="Icon"
                ></Image>
              </span>
            </div>
            <div className="profile-dropdown-menu">
              <div className="title-list drop-down-icon-menu">
                <span className="bi bi-power"></span>
                <span onClick={LogoutButton}>Log out</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
