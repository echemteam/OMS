import React from "react";
import PropTypes from "prop-types";
import CardSection from "../../../../components/ui/card/CardSection";

const Modules = ({ modules, selectedModuleId, onModuleClick }) => {
  return (
    <div className="config-card">
      <CardSection cardTitle="Modules" rightButton={true}>
        <div className="config-content">
          {modules?.map((module) => (
            <div
              key={module.moduleId}
              className={`config-module-info ${selectedModuleId === module.moduleId ? "selected" : ""
                }`}
              onClick={() => onModuleClick(module.moduleId)}
            >
              <span>{module.moduleName}</span>
            </div>
          ))}
        </div>
      </CardSection>
    </div>
  );
};

Modules.propTypes = {
  modules: PropTypes.object.isRequired,
  selectedModuleId: PropTypes.string,
  onModuleClick: PropTypes.func.isRequired,
};

export default Modules;
