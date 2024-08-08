import React from "react";
import PropTypes from "prop-types";
import Image from "../../image/Image";
import "./Breadcome.scss";
import { useLocation } from "react-router-dom";


function Breadcome(props) {
  const location = useLocation();
  const currentPath = location.pathname.replace('/', '').toLowerCase();

  // Assuming that your paths and ids should match after removing leading '/'
  const breadCrumb = props.componentRoutes?.find(x => x.path.toLowerCase().replace('/', '') === currentPath);

  const renderPageIcon = () => {
    if (props.brcimg && props.brcimg !== "") {
      return (
        <div className="page-icon-part">
          <Image
            imgCustomClassName="icon-page"
            imagePath={props.brcimg}
            altText="Icon"
          />
        </div>
      );
    }
    return null;
  };
  const renderTitle = () => {
    if (breadCrumb) {
      return <h3>{breadCrumb?.title}</h3>;
    }
    return null;
  };


  return (
    <>
      {breadCrumb &&
        <div className="main-top-title">
          <div className="left-section">
            <div className="page-title">
              {renderPageIcon()}
              {renderTitle()}
            </div>
          </div>
        </div>
      }
    </>
  );
}

Breadcome.propTypes = {
  componentRoutes: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  ),
  brcimg: PropTypes.string
};
export default Breadcome;