import React from "react";
import PropTypes from "prop-types";
function Image(props) {
  return (
    <React.Fragment>
      <img
        id={props.imgId}
        src={props.imagePath}
        alt={props.altText}
        className={`img-fluid  ${props.imgCustomClassName}`}
      />
    </React.Fragment>
  );
}
Image.propTypes = {
  imgId: PropTypes.number,
  imagePath: PropTypes.string,
  altText: PropTypes.string,
  imgCustomClassName: PropTypes.string,
};
export default Image;
