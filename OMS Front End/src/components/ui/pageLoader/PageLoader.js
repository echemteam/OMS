import React from "react";
import "./PageLoader.scss";

const PageLoader = () => {
  return (
    <div className="loader-section">
      <section className="dots-container">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </section>
    </div>
  );
};

export default PageLoader;
