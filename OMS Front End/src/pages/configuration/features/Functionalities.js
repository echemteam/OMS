import React from "react";
import PropTypes from "prop-types";
import CardSection from "../../../components/ui/card/CardSection";

const Functionalities = ({
  functionalities,
  selectedFunctionality,
  onFunctionalityClick,
}) => {
  return (
    <div className="config-card">
      <CardSection cardTitle="Functionalities" rightButton={true}>
        <div className="config-content">
          {functionalities &&
            Object.keys(functionalities).map((func) => (
              <div
                key={func}
                className={`config-functionalities-info ${
                  selectedFunctionality === func ? "selected" : ""
                }`}
                onClick={() => onFunctionalityClick(func)}
              >
                <div className="profile-icon">
                  <i className="fa fa-cog" aria-hidden="true"></i>
                </div>
                <span>{func}</span>
                {/* {selectedFunctionality === func && (
                  <div className="right-dropdown">
                    <i className="fa fa-caret-down" aria-hidden="true"></i>
                  </div>
              )} */}
              </div>
            ))}
        </div>
      </CardSection>
    </div>
  );
};

Functionalities.propTypes = {
  functionalities: PropTypes.object,
  selectedFunctionality: PropTypes.string,
  onFunctionalityClick: PropTypes.func.isRequired,
};

export default Functionalities;
