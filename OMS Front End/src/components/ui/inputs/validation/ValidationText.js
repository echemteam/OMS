import React from "react";

const ValidationText = (props) => {
  return props.error ? (
    <div className="font-normal validation-text mt-1">
      {props.error}
    </div>
  ) : null;
};

export default ValidationText;
