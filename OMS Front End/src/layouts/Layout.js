import React, { useState } from "react";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import Breadcome from "../components/ui/breadcome/Breadcome";
import Footer from "./components/footer/Footer";
import { hasPermission } from "../utils/AuthorizeNavigation/authorizeNavigation";
import { PagePermissionsProvider } from "../utils/ContextAPIs/PagePermissions/PagePermissionsContext";
import Image from "../components/image/Image";
import { AppIcons } from "../data/appIcons";
// import Unauthorize from "../pages/unauthorize/Unauthorize";

const Layout = (props) => {
  // Get the current location using React Router's useLocation hook
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);


  // Extract the last segment of the pathname as routhPath
  let routhPath = location.pathname.replace("/", "");
  const segments = location.pathname.split("/");
  if (segments.length > 1) {
    routhPath = segments[1];
  }

  // Find the matching component route based on the routhPath
  const renderComponent = props.componentRoutes?.find((x) => x.id.toLowerCase() === routhPath.toLowerCase());

  // Check if the user is authorized to access the current route
  const isAuthorize = renderComponent?.securityKey ? hasPermission(renderComponent.securityKey) : false;

  // Handler to toggle the collapse state
  const handleToggleClick = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <React.Fragment>
      {/* <AddPagePermissionsContext.Provider value={renderComponent.permissionCongif}>

      </AddPagePermissionsContext.Provider> */}
      <PagePermissionsProvider>
        {/* <SecurityPermissionsHOC permissionConfig={permissionConfig}> */}
        <div className={`main-page-layout ${isCollapsed ? 'collapsed' : ''}`}>
          <div className="top-sec">
            <div className="sidebar-section">
              <Sidebar componentRoutes={props.componentRoutes} />
              <div className="collapse-btn">
                <div className="click-btn" onClick={handleToggleClick}>
                  <Image imagePath={AppIcons.arrowIcon} />
                </div>
              </div>
            </div>

            <div className={`middle-page-section`}>
              <Header />

              {isAuthorize ?
                <div className="center-content-part">
                  <div className="content-desc-section">
                    <Breadcome componentRoutes={props.componentRoutes} />
                    <div className="center-container container-fluid">
                      <Outlet />
                    </div>
                    <Footer />
                  </div>
                </div>
                : <Unauthorize />
              }
            </div>
          </div>
        </div>
        {/* </SecurityPermissionsHOC> */}
      </PagePermissionsProvider>
    </React.Fragment>
  );
};

export default Layout;
