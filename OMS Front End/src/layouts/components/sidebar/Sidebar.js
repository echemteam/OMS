import React, { useState } from "react";
import "./Sidebar.scss";
import { Link } from "react-router-dom";
import { Menu } from "../menu/Menu";
import { hasPermission } from "../../../utils/AuthorizeNavigation/authorizeNavigation";

const Sidebar = (props) => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [clickedValueSubMenu, setClickedValueSubMenu] = useState(null);

  const handleClick = (menu) => {
    if (selectedMenu === menu) {
      setSelectedMenu(null);
    } else {
      setSelectedMenu(menu);
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
            OMS&nbsp;<span className="small-sidebar">Lite</span>
          </Link>
          <div className="sidebar-menu">
            <ul className="sidebar-menu-list">
              {Menu.map((group, groupIndex) => (
                <div key={groupIndex} className="menu-group">
                  <div className="group-label">{group.groupLabel}</div>
                  {group.items.map((menuItem, index) => (
                    <React.Fragment key={index}>
                      {hasPermission(menuItem.securityKey) && (
                        <li
                          className={
                            selectedMenu === menuItem.id
                              ? "menu-item active-menu"
                              : "menu-item"
                          }
                          onClick={() => handleClick(menuItem.id)}
                        >
                          <Link
                            to={menuItem.to}
                            className={menuItem.subMenu ? "menu-arrow" : ""}
                          >
                            <i className={menuItem.iconClass}></i>
                            <span>{menuItem.name}</span>
                          </Link>
                          {menuItem.subMenu && (
                            <ul className="sidebar-dropdown">
                              <div className="collapse-dropdown">
                              {menuItem.children.map((subMenu, subIndex) => (
                                <React.Fragment key={subIndex}>
                                  {hasPermission(subMenu.securityKey) && (
                                    <li className="dropdown-menus">
                                      <Link
                                        to={subMenu.to}
                                        className={
                                          clickedValueSubMenu === subMenu.id
                                            ? "active-submenu"
                                            : ""
                                        }
                                        onClick={(e) =>
                                          handleChildClick(e, subMenu.id)
                                        }
                                      >
                                        {subMenu.submenuName}
                                      </Link>
                                    </li>
                                  )}
                                </React.Fragment>
                              ))}
                              </div>
                            </ul>
                          )}
                        </li>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
