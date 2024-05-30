import React from "react";

const FormMainTitle = (props) => {
  
  return (
    <div className={`section-title ${props.containerCss}`}>
      <h5>{props.formTitle}</h5>
    </div>
  );
};

export default FormMainTitle;
