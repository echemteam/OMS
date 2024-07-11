import React from "react";
import PropTypes from "prop-types";
import CardSection from "../../../components/ui/card/CardSection";

const Modules = ({ modules, selectedModule, onModuleClick }) => {
  return (
    <div className="config-card">
      <CardSection cardTitle="Modules" rightButton={true}>
        <div className="config-content">
          {Object.keys(modules).map((module) => (
            <div
              key={module}
              className={`config-module-info ${
                selectedModule === module ? "selected" : ""
              }`}
              onClick={() => onModuleClick(module)}
            >
              {/* <div className="profile-icon">
                {module === "Supplier" && (
                  <i className="fa fa-truck" aria-hidden="true"></i>
                )}
                {module === "Customer" && (
                  <i className="fa fa-user" aria-hidden="true"></i>
                )}
                {module === "Supplier2" && "S"}
              </div> */}
              <span>{module}</span>
              {/* {selectedModule === module && (
                <i className="fa fa-caret-down" aria-hidden="true"></i>
              )} */}
            </div>
          ))}
        </div>
      </CardSection>
    </div>
  );
};

Modules.propTypes = {
  modules: PropTypes.object.isRequired,
  selectedModule: PropTypes.string,
  onModuleClick: PropTypes.func.isRequired,
};

export default Modules;
