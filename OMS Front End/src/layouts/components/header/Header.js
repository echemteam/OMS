import React from "react";
import "./Header.scss";
import Image from "../../../components/image/Image";
import { AppIcons } from "../../../data/appIcons";
import SearchBar from "../../../common/features/component/SearchBar";
import { useNavigate } from "react-router-dom";
// import { a } from "react-router-dom";

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
          <div className="shortcut-sec">
            <div className="shortcut-icon">
              <Image
                imagePath={AppIcons.ShortcutIcon}
                imgCustomClassName="shortcut-icon"
                altText="Icon"
              />
            </div>
            <div className="shortcuts-list">
              <div className="top-header-card-title">
                <span className="title">ShortCuts</span>
              </div>
              <div className="short-cuts-list">
                <div className="shortcut-menus">Test</div>
                <div className="shortcut-menus">Test</div>
                <div className="shortcut-menus">Test</div>
                <div className="shortcut-menus">Test</div>
              </div>
            </div>
          </div>
          <div className="notification">
            <div className="bell-icon">
              <Image
                imagePath={AppIcons.notificationIcon}
                imgCustomClassName="open-bar"
                altText="Icon"
              ></Image>
              <div className="dot-round">4</div>
            </div>
            <div className="notification-list">
              <div className="title-clearall">
                <span className="title">Notifications</span>
                <span className="clear-all">
                  <a>Clear All</a>
                </span>
              </div>
              <div className="notification-items">
                <ul>
                  <li>
                    <div className="noti-img">
                      <i className="bi bi-bell"></i>
                    </div>
                    <div className="notification-time">
                      <a>Lorem Ipsum is simply dummy text</a>
                      <div className="time-sec">15 mins ago</div>
                    </div>
                  </li>
                  <li>
                    <div className="noti-img">
                      <i className="bi bi-bell"></i>
                    </div>
                    <div className="notification-time">
                      <a>Lorem Ipsum is simply dummy text</a>
                      <div className="time-sec">15 mins ago</div>
                    </div>
                  </li>
                  <li>
                    <div className="noti-img">
                      <i className="bi bi-bell"></i>
                    </div>
                    <div className="notification-time">
                      <a>Lorem Ipsum is simply dummy text</a>
                      <div className="time-sec">15 mins ago</div>
                    </div>
                  </li>
                  <li>
                    <div className="noti-img">
                      <i className="bi bi-bell"></i>
                    </div>
                    <div className="notification-time">
                      <a>Lorem Ipsum is simply dummy text</a>
                      <div className="time-sec">15 mins ago</div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="notification-footer">
                <a>View All</a>
              </div>
            </div>
          </div>
          <div className="profiles">
            <div className="profile-img">
              <Image
                imagePath={AppIcons.userIcon}
                imgCustomClassName="open-bar"
                altText="Icon"
              ></Image>
            </div>
            <div className="user-name-desc">
              <span>
                <Image
                  imagePath={AppIcons.arrowIcon}
                  imgCustomClassName="open-bar"
                  altText="Icon"
                ></Image>
              </span>
            </div>
            <div className="profile-dropdown-menu">
              <div className="title-list ">
                <span className="name-title ">Signed in as</span>
                <span className="user-name">Pankaj Chauhan</span>
              </div>
              <div className="title-list drop-down-icon-menu">
                <a href="#">
                  <span className="bi bi-gear">Setting</span>
                </a>
                <a href="#">
                  <span className="bi bi-pencil">Edit Profile</span>
                </a>
              </div>
              <div className="title-list drop-down-icon-menu">
                <a href="#" onClick={LogoutButton}>
                  <span className="bi bi-box-arrow-left">Log out</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
