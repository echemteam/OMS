import React, { useEffect, useState } from "react";
import Modules from "./features/Modules";
import Functionalities from "./features/Functionalities";
import Rules from "./features/Rules";
import "./Configuration.scss";
import { useLazyGetAllFunctionalitiesFieldsQuery, useLazyGetAllFunctionalitiesQuery, useLazyGetAllModulesQuery, useLazyGetApprovalConfigurationRulesByModuleIdAndFunctionalityIdQuery } from "../../../app/services/configurationAPI";
import { rulesFormData } from "./config/RulesForm.data";
import { setOptionFieldSetting } from "../../../utils/FieldsSetting/SetFieldSetting";
import { commansDataField } from "../../../utils/Enums/DropdownEnums";

const ApprovalRules = () => {

  const [selectedModule, setSelectedModule] = useState(1);
  const [moduleData, setModuleData] = useState()
  const [functionalityData, setFunctionalityData] = useState()
  const [selectedFunctionality, setSelectedFunctionality] = useState(1);
  const [getRules, setGetRules] = useState("");
  const [formData, setFormData] = useState(rulesFormData);

  const [getAllModules,
    {
      isSuccess: isgetAllModulesSucess,
      data: allGetAllModulesData,
    },
  ] = useLazyGetAllModulesQuery();

  const [getAllFunctionalities,
    {
      isSuccess: isGetAllFunctionalitiesSucess,
      data: allGetAllFunctionalitiesData,
    },
  ] = useLazyGetAllFunctionalitiesQuery();

  const [getModuleandfunctionalityId,
    {
      isFetching: isGetModuleandfunctionalityIdFetching,
      isSuccess: isGetModuleandfunctionalityIdSucess,
      data: allGetModuleandfunctionalityIdData,
    },
  ] = useLazyGetApprovalConfigurationRulesByModuleIdAndFunctionalityIdQuery();

  const [
    getAllFunctionalitiesFields,
    {
      isSuccess: isGetAllFunctionalitiesFieldsSucess,
      data: allGetAllFunctionalitiesFieldsData,
    },
  ] = useLazyGetAllFunctionalitiesFieldsQuery();

  useEffect(() => {
    getAllModules();
  }, []);

  useEffect(() => {
    if (selectedModule) {
      getAllFunctionalities(selectedModule);
    }
  }, [selectedModule]);

  useEffect(() => {
    if (selectedModule && selectedFunctionality) {
      let req = {
        moduleId: selectedModule,
        functionalityId: selectedFunctionality
      }
      getModuleandfunctionalityId(req)
    }
  }, [selectedFunctionality]);

  useEffect(() => {
    if (selectedFunctionality) {
      getAllFunctionalitiesFields(selectedFunctionality);
    }
  }, [selectedFunctionality]);

  useEffect(() => {
    if (isgetAllModulesSucess && allGetAllModulesData) {
      handleModuleOption(allGetAllModulesData);
      setModuleData(allGetAllModulesData)
    }
    if (isGetAllFunctionalitiesSucess && allGetAllFunctionalitiesData) {
      handleFunctionalityOption(allGetAllFunctionalitiesData);
      setFunctionalityData(allGetAllFunctionalitiesData)
    }
    if (isGetModuleandfunctionalityIdSucess && allGetModuleandfunctionalityIdData && !isGetModuleandfunctionalityIdFetching) {
      handleGetRules(allGetModuleandfunctionalityIdData);
    }
    if (isGetAllFunctionalitiesFieldsSucess && allGetAllFunctionalitiesFieldsData) {
      handleFunctionalitiesFields(allGetAllFunctionalitiesFieldsData);
    }
  }, [isGetAllFunctionalitiesFieldsSucess, allGetAllFunctionalitiesFieldsData, isgetAllModulesSucess, allGetAllModulesData, isGetAllFunctionalitiesSucess, allGetAllFunctionalitiesData, isGetModuleandfunctionalityIdSucess, allGetModuleandfunctionalityIdData, isGetModuleandfunctionalityIdFetching])

  const handleModuleOption = (responseData) => {
    setOptionFieldSetting(responseData, commansDataField.ModuleId, 'moduleName', rulesFormData, commansDataField.ModuleId);
  }

  const handleFunctionalityOption = (responseData) => {
    setOptionFieldSetting(responseData, commansDataField.FunctionalityId, 'name', rulesFormData, commansDataField.FunctionalityId);
  }

  const handleFunctionalitiesFields = (responseData) => {
    setOptionFieldSetting(responseData, commansDataField.FunctionalityFieldId, 'fieldName', rulesFormData, commansDataField.FunctionalityFieldId);
  }

  const handleGetRules = (responseData) => {
    setGetRules(responseData)
  }

  const handleModuleClick = (module) => {
    setSelectedModule(module);
  };

  const handleFunctionalityClick = (functionality) => {
    setSelectedFunctionality(functionality);
  };

  const handleRepeatCallRule = (data) => {
    let req = {
      moduleId: data.moduleId,
      functionalityId: data.functionalityId
    }
    getModuleandfunctionalityId(req)
  }

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      initialState: {
        ...prevFormData.initialState,
        moduleId: selectedModule
      }
    }));
  }, [selectedModule]);

  return (
    <div className="row">
      <div className="col-2">
        <Modules
          modules={moduleData}
          selectedModuleId={selectedModule}
          onModuleClick={handleModuleClick}
        />
      </div>
      <div className="col-3">
        <Functionalities
          functionalities={functionalityData}
          selectedFunctionalityId={selectedFunctionality}
          onFunctionalityClick={handleFunctionalityClick}
        />
      </div>
      <div className="col-7">
        <Rules
          getRules={getRules}
          selectedModuleId={selectedModule}
          selectedFunctionalityId={selectedFunctionality}
          allGetAllModulesData={allGetAllModulesData}
          allGetAllFunctionalitiesData={allGetAllFunctionalitiesData}
          allGetAllFunctionalitiesFieldsData={allGetAllFunctionalitiesFieldsData}
          onRepeatCall={handleRepeatCallRule}
          rulesFormData={rulesFormData}
          setFormData={setFormData}
          formData={formData}
        />
      </div>
    </div>
  );
};

export default ApprovalRules;
