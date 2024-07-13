import React from "react";
import PropTypes from "prop-types";
import CardSection from "../../../../components/ui/card/CardSection";

const Functionalities = ({
  functionalities,
  selectedFunctionalityId,
  onFunctionalityClick,
}) => {
  return (
    <div className="config-card">
      <CardSection cardTitle="Functionalities" rightButton={true}>
        <div className="config-content">
          {functionalities &&
            functionalities.map((functionality) => (
              <div
                key={functionality.functionalityId}
                className={`config-functionalities-info ${selectedFunctionalityId === functionality.functionalityId ? "selected" : ""
                  }`}
                onClick={() => onFunctionalityClick(functionality.functionalityId)}
              >
                <div className="profile-icon">
                  <i className="fa fa-cog" aria-hidden="true"></i>
                </div>
                <span>{functionality.name}</span>
              </div>
            ))}
        </div>
      </CardSection>
    </div>
  );
};

Functionalities.propTypes = {
  functionalities: PropTypes.object,
  selectedFunctionalityId: PropTypes.string,
  onFunctionalityClick: PropTypes.func.isRequired,
};

export default Functionalities;
