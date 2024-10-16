/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
//** Lib's */
import "./Sidebar.scss";
import { ConfigurationMenu, Menu } from "../menu/Menu";
import Iconify from "../../../components/ui/iconify/Iconify";
import { hasPermission } from "../../../utils/AuthorizeNavigation/authorizeNavigation";
//** SAervice's */
import { useLazyGetOrganizationProfileQuery } from "../../../app/services/organizationAPI";

const Sidebar = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const menuItem = location.pathname;
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [registerName, setRegisterName] = useState(null);
  const [navigationMenuList, setNavigationMenuList] = useState(Menu);
  const [clickedValueSubMenu, setClickedValueSubMenu] = useState(null);
  const [isCustomSidebarVisible, setIsCustomSidebarVisible] = useState(false);
  /** 
   * The state variable 'menuTitle' will hold the title for the menu.
   * In the future, we plan to use this title dynamically for different menus.
      // const [menuTitle, setMenuTitle] = useState(""); 
  */

  //** API Call's */
  const [getOrganizationProfile, { isFetching: isGetOrganizationProfileFetching, isSuccess: isGetOrganizationProfileSuccess, data: isGetOrganizationProfileData }] = useLazyGetOrganizationProfileQuery();

  useEffect(() => {
    if (!isGetOrganizationProfileFetching && isGetOrganizationProfileSuccess && isGetOrganizationProfileData) {
      if (isGetOrganizationProfileData) {
        setRegisterName(isGetOrganizationProfileData.registeredName);
      }
    }
  }, [isGetOrganizationProfileFetching, isGetOrganizationProfileSuccess, isGetOrganizationProfileData,]);


  useEffect(() => {
    getOrganizationProfile();
  }, [getOrganizationProfile]);

  useEffect(() => {
    switch (true) {
      case menuItem.startsWith("/configuration/"):
        setIsCustomSidebarVisible(true);
        setNavigationMenuList(ConfigurationMenu);
        if (menuItem.startsWith("/configuration/ApprovalRules")) {
          handleClick(ConfigurationMenu[0].items[0].id);
        }
        /** 
         * Set the menu title to "Configuration" to display the configuration menu title. 
            // setMenuTitle("Configuration"); 
        */
        break;
      default:
        setNavigationMenuList(Menu);
        setIsCustomSidebarVisible(false);
        break;
    }
  }, [menuItem, ConfigurationMenu]);

  const handleClick = (menu) => {
    if (selectedMenu === menu) {
      setSelectedMenu(null);
    } else {
      setSelectedMenu(menu);
    }
  };

  const handleBackButtonClick = () => {
    setIsCustomSidebarVisible(false);
    switch (true) {
      case menuItem.startsWith("/configuration/"):
        navigate("/");
        setNavigationMenuList(Menu);
        handleClick(Menu[0].items[0].id);
        break;
      default:
        break;
    }

  };

  const handleChildClick = (e, menu) => {
    setClickedValueSubMenu(menu);
    e.stopPropagation();
  };

  return (
    <>
      <nav className="sidebar">
        <div className="main-menus">
          <Link className="sidebar-brand">
            <div className="brand-name"> OMS&nbsp;<span className="small-sidebar">Lite</span></div>
            {registerName ? <><div className="sidebar-user">{registerName} </div></> : null}
          </Link>
          <div className="sidebar-menu">
            <ul className="sidebar-menu-list">
              {navigationMenuList?.map((group, groupIndex) => (
                <div key={groupIndex} className="menu-group">
                  {isCustomSidebarVisible && (
                    <div>
                      {/* 
                        => Render the menu title as an <h4> element only if 'menuTitle' is not an empty string or null. 
                            {menuTitle && <h4 className="menu-item menu-title"> {menuTitle} </h4>}
                      */}
                      <li className="menu-item mt-4" onClick={handleBackButtonClick}>
                        <Link>
                          {/* <Image imagePath={AppIcons.BackArrowIcon} altText="button Icon" imgCustomClassName="sidebar-backIcon" /> */}
                          <Iconify icon="lets-icons:back" />
                          <span>Back to Main Menu</span>
                        </Link>
                      </li>
                    </div>
                  )}
                  <div className="group-label">{group.groupLabel}</div>
                  {group.items.map((menuItem, index) => (
                    <React.Fragment key={index}>
                      {hasPermission(menuItem.securityKey) && (
                        <li className={selectedMenu === menuItem.id ? "menu-item active-menu" : "menu-item"}
                          onClick={() => handleClick(menuItem.id)} >
                          <Link to={menuItem.to} className={menuItem.subMenu ? "menu-arrow" : ""}>
                            <Iconify icon={menuItem.iconClass} />
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
        </div >
      </nav >
    </>
  );
};

export default Sidebar;
