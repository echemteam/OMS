import React from "react";

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

export default Image;
