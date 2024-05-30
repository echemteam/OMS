import React from "react";
import "./DataLoader.scss";

function DataLoader() {
  return (
    <React.Fragment>
      <div className="loader-section">
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="loader-text">
          <div className="typewriter">Data Is Loading, Please Wait...</div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default DataLoader;
