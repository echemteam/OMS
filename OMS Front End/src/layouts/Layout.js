import React from "react";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import Breadcome from "../components/ui/breadcome/Breadcome";
import Footer from "./components/footer/Footer";

const Layout = (props) => {
  console.log(props);
  return (
    <React.Fragment>
      <div className="main-page-layout">
        <div className="top-sec">
          <Sidebar componentRoutes={props.componentRoutes} />
          <div className={`middle-page-section`}>
            <Header />
            <div className="center-content-part">
              <div className="content-desc-section">
                <Breadcome componentRoutes={props.componentRoutes} />
                <div className="center-container">
                  <Outlet />
                  
                </div>
                <Footer />
              </div>
            </div>
        
          </div>
        </div>
        
      </div>
    </React.Fragment>
  );
};

export default Layout;
