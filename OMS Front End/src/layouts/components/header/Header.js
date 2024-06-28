import React, { useEffect, useRef, useState } from "react";
import "./Header.scss";
import Image from "../../../components/image/Image";
import { AppIcons } from "../../../data/appIcons";
import SearchBar from "../../../common/features/component/SearchBar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../app/slice/authSlice";
// import { a } from "react-router-dom";

function Header({ handleChange }) {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);
  const shortcutSecRef = useRef(null);
  const authState = useSelector((state) => state.auth);

  const data = [
    {
      rowId: 1,
      items: [
        {
          id: 1,
          iconPath: AppIcons.ShortcutIcon,
          title: "Shortcuts",
          description: "Direct Access",
          navigationLink: "#",
        },
        {
          id: 2,
          iconPath: AppIcons.notificationIcon,
          title: "Notifications",
          description: "Manage Notification",
          navigationLink: "#",
        },
      ],
    },
    {
      rowId: 2,
      items: [
        {
          id: 3,
          iconPath: AppIcons.userIcon,
          title: "User Account",
          description: "Edit Profile",
          navigationLink: "#",
        },
        {
          id: 4,
          iconPath: AppIcons.ShortcutIcon,
          title: "Customers",
          description: "View Customers",
          navigationLink: "#",
        },
      ],
    },
    {
      rowId: 2,
      items: [
        {
          id: 3,
          iconPath: AppIcons.userIcon,
          title: "User Account",
          description: "Edit Profile",
          navigationLink: "#",
        },
        {
          id: 4,
          iconPath: AppIcons.ShortcutIcon,
          title: "Customers",
          description: "View Customers",
          navigationLink: "#",
        },
      ],
    },
  ];
  const LogoutButton = () => {
    dispatch(logout());
  };
  const handleClickOutside = (event) => {
    if (shortcutSecRef.current && !shortcutSecRef.current.contains(event.target)) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

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
          <div className={`shortcut-sec ${isActive ? 'active' : ''}`} ref={shortcutSecRef}>
            <div className="shortcut-icon" onClick={() => setIsActive(!isActive)}>
              <Image
                imagePath={AppIcons.ShortcutIcon}
                imgCustomClassName="shortcut-icon"
                altText="Icon"
              />
            </div>
            <div className="shortcuts-list">
              <div className="top-header-card-title">
                <span className="title">ShortCuts</span>
                <span className="add-short-cut" title="Create New Shortcut">
                  <i className="bi bi-plus-circle-fill"></i>
                </span>
              </div>
              <div className="short-cuts-list">
                {data.map((row) => (
                  <div key={row.rowId} className="row m-0 manus-items">
                    {row.items.map((item) => (
                      <div key={item.id} className="col-6 p-0 shortcut-menus">
                          <div className="shortcuts" onClick={item.navigationLink}>
                            <div className="shortcut-icon">
                              <Image imagePath={item.iconPath} altText="Icon" />
                            </div>
                            <div className="shortcut-desc">
                              <h6>{item.title}</h6>
                              <p>{item.description}</p>
                            </div>
                          </div>
                      </div>
                    ))}
                  </div>
                ))}
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
                <span className="user-name">{authState?.user?.fullName}</span>
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
