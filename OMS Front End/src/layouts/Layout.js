import React from "react";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import Breadcome from "../components/ui/breadcome/Breadcome";
import Footer from "./components/footer/Footer";
import Unauthorize from "../pages/unauthorize/Unauthorize";
import { hasPermission } from "../utils/AuthorizeNavigation/authorizeNavigation";
import { AddPagePermissionsProvider } from "../utils/ContextAPIs/AddPagePermissions/AddPagePermissionsContext";

const Layout = (props) => {

  // Get the current location using React Router's useLocation hook
  const location = useLocation();

  // Extract the last segment of the pathname as routhPath
  let routhPath = location.pathname.replace("/", "");
  const segments = location.pathname.split('/');
  if (segments.length > 1) {
    routhPath = segments[1];
  }

  // Find the matching component route based on the routhPath
  const renderComponent = routhPath ? props.componentRoutes.find((x) => x.id.toLowerCase() === routhPath.toLowerCase()) : "";

  // Check if the user is authorized to access the current route
  const isAuthorize = renderComponent?.securityKey ? hasPermission(renderComponent.securityKey) : false;

  return (
    <React.Fragment>
      <AddPagePermissionsProvider>
        <div className="main-page-layout">
          <div className="top-sec">
            <Sidebar componentRoutes={props.componentRoutes} />
            <div className={`middle-page-section`}>
              <Header />

              {/* {isAuthorize ? */}
              <div className="center-content-part">
                <div className="content-desc-section">
                  <Breadcome componentRoutes={props.componentRoutes} />
                  <div className="center-container">
                    <Outlet />
                  </div>
                  <Footer />
                </div>
              </div>
              {/* : <Unauthorize />
              } */}
            </div>
          </div>

        </div>
      </AddPagePermissionsProvider>
    </React.Fragment>
  );
};

export default Layout;
