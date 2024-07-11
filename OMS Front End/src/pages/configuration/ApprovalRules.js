import React, { useEffect, useState } from "react";
import Modules from "../configuration/features/Modules";
import Functionalities from "../configuration/features/Functionalities";
import Rules from "../configuration/features/Rules";
import "./Configuration.scss";

const moduleData = {
  Supplier: {
    functionalities: {
      "Functionality 1": ["Rule 1", "Rule 2", "Rule 3"],
      "Functionality 2": ["Rule 4", "Rule 5"],
      "Functionality 3": ["Rule 6", "Rule 7", "Rule 8"],
      "Functionality 4": ["Rule 9", "Rule 10"],
      "Functionality 5": ["Rule 11", "Rule 12", "Rule 13"],
      "Functionality 6": ["Rule 14", "Rule 15"],
      "Functionality 7": ["Rule 16", "Rule 17", "Rule 18"],
      "Functionality 8": ["Rule 19", "Rule 20"],
      "Functionality 9": ["Rule 19", "Rule 20"],
      "Functionality 10": ["Rule 19", "Rule 20"],
      "Functionality 11": ["Rule 19", "Rule 20"],
      "Functionality 12": ["Rule 19", "Rule 20"],
      "Functionality 13": ["Rule 19", "Rule 20"],
      "Functionality 14": ["Rule 19", "Rule 20"],
      "Functionality 15": ["Rule 19", "Rule 20"],
      "Functionality 16": ["Rule 19", "Rule 20"],
      "Functionality 17": ["Rule 19", "Rule 20"],
      "Functionality 18": ["Rule 19", "Rule 20"],
      "Functionality 19": ["Rule 19", "Rule 20"],
    },
  },
  Customer: {
    functionalities: {
      "Functionality A": ["Rule A", "Rule B"],
      "Functionality B": ["Rule C", "Rule D", "Rule E"],
      "Functionality C": ["Rule F", "Rule G"],
      "Functionality D": ["Rule H", "Rule I", "Rule J"],
      "Functionality E": ["Rule K", "Rule L"],
      "Functionality F": ["Rule M", "Rule N", "Rule O"],
      "Functionality G": ["Rule P", "Rule Q"],
      "Functionality H": ["Rule R", "Rule S", "Rule T"],
      "Functionality I": ["Rule U", "Rule V"],
      "Functionality J": ["Rule W", "Rule X", "Rule Y", "Rule Z"],
    },
  },
  Supplier2: {
    functionalities: {
      "Functionality X": ["Rule X1", "Rule X2"],
      "Functionality Y": ["Rule Y1", "Rule Y2", "Rule Y3"],
      "Functionality Z": ["Rule Z1", "Rule Z2"],
      "Functionality XX": ["Rule XX1", "Rule XX2", "Rule XX3"],
      "Functionality YY": ["Rule YY1", "Rule YY2"],
    },
  },
};

const ApprovalRules = () => {
  const [selectedModule, setSelectedModule] = useState("Supplier");
  const [selectedFunctionality, setSelectedFunctionality] = useState("Functionality 1");

  useEffect(() => {
    setSelectedFunctionality(Object.keys(moduleData[selectedModule]?.functionalities || {})[0]);
  }, [selectedModule]);

  const handleModuleClick = (module) => {
    setSelectedModule(module);
    setSelectedFunctionality(null);
  };

  const handleFunctionalityClick = (functionality) => {
    setSelectedFunctionality(functionality);
  };

  const selectedFunctionalities =
    selectedModule ? moduleData[selectedModule].functionalities : null;
  const selectedRules = selectedFunctionality
    ? selectedFunctionalities[selectedFunctionality]
    : null;

  return (
    <div className="row">
      <div className="col-2">
        <Modules
          modules={moduleData}
          selectedModule={selectedModule}
          onModuleClick={handleModuleClick}
        />
      </div>
      <div className="col-3">
        <Functionalities
          functionalities={selectedFunctionalities}
          selectedFunctionality={selectedFunctionality}
          onFunctionalityClick={handleFunctionalityClick}
        />
      </div>
      <div className="col-7">
        <Rules rules={selectedRules} />
      </div>
    </div>
  );
};

export default ApprovalRules;
