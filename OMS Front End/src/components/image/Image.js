import React from "react";
import PropTypes from "prop-types";


function Image(props) {
  return (

    <img id={props.imgId} src={props.imagePath} alt={props.altText} className={`img-fluid  ${props.imgCustomClassName}`} />

  );
}
// Define prop types with comments
Image.propTypes = {
  imgId: PropTypes.string,  // Optional ID for the image element
  imagePath: PropTypes.string.isRequired,  // Required path to the image source
  altText: PropTypes.string.isRequired,  // Required alternative text for the image
  imgCustomClassName: PropTypes.string,  // Optional custom CSS class for styling the image
};

export default Image;
