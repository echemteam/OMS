import React, { useState } from "react";
import "./Sidebar.scss";
import { Link } from "react-router-dom";
import { Menu } from "../menu/Menu";

const Sidebar = (props) => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [clickedValueSubMenu, setClickedValueSubMenu] = useState(null);

  const handleClick = (menu) => {
    if (selectedMenu === menu) {
      setSelectedMenu(null); // Remove class if same menu clicked again
    } else {
      setSelectedMenu(menu); // Add class to the clicked menu
    }
  };

  const handleChildClick = (e, menu) => {
    setClickedValueSubMenu(menu);
    e.stopPropagation(); // Prevent the click event from bubbling up
  };

  return (
    <>

      <nav className="sidebar">
        <div className="main-menus">
          <Link className="sidebar-brand">
            {/* <Image
                imagePath={AppIcons.logoImage}
                imgCustomClassName="open-bar"
                altText="Icon"
              ></Image> */}
            OMS&nbsp;<span className="small-sidebar">Lite</span>
          </Link>
          <div className="sidebar-menu">
            <ul className="sidebar-menu-list">
              {Menu.map((menuItem, index) => (
                <>
                  {/* {hasPermission(menuItem.securityKey) ? */}
                  <li key={index} className={selectedMenu === menuItem.id ? "menu-item active-menu" : "menu-item"} onClick={() => handleClick(menuItem.id)} >
                    <Link to={menuItem.to} className={menuItem.subMenu ? "menu-arrow" : ""}>
                      <i className={menuItem.iconClass}></i>
                      <span>{menuItem.name}</span>
                    </Link>
                    {menuItem.subMenu ? (
                      <>
                        <ul className="sidebar-dropdown">
                          {menuItem.children.map((subMenu, index) => (
                            <>
                              {/* {hasPermission(subMenu.securityKey) ? */}
                              <li className="dropdown-menus">
                                <Link to={subMenu.to} className={clickedValueSubMenu === subMenu.id ? "active-submenu" : ""} onClick={(e) => handleChildClick(e, subMenu.id)}>
                                  {subMenu.submenuName}
                                </Link>
                              </li>
                              {/* : null} */}
                            </>

                          ))}
                        </ul>
                      </>
                    ) : null}
                  </li>
                  {/* : null} */}
                </>
              ))}
            </ul>
          </div>
        </div>
      </nav>


    </>
  );
};

export default Sidebar;
