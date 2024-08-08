import React from "react";
import PropTypes from 'prop-types';
import Image from "../../../components/image/Image";
import "./BredcomTitle.scss";

const BredcomTitle = (props) => {
  return (
    <React.Fragment>
      {props.pageTitle || props.titleImg ? (
        <div className="bredcom-section">
          {props.titleImg ? (
            <Image imagePath={props.titleImg} altText="Title Image" />
          ) : null}
          <div className="title-text">{props.pageTitle}</div>
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};
BredcomTitle.propTypes = {
  pageTitle: PropTypes.string,  
  titleImg: PropTypes.string,  
};
export default BredcomTitle;
