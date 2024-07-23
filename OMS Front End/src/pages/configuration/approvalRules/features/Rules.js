import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import CardSection from "../../../../components/ui/card/CardSection";
import { AppIcons } from "../../../../data/appIcons";
import Image from "../../../../components/image/Image";
import SidebarModel from "../../../../components/ui/sidebarModel/SidebarModel";
import AddEditRules from "./AddEditRules";
import { useLazyGetApprovalConfigurationByApprovalConfigurationIdQuery } from "../../../../app/services/configurationAPI";
import { onResetForm } from "../../../../utils/FormFields/ResetForm/handleResetForm";

const Rules = (props) => {
  const [isModelOpen, setisModelOpen] = useState(false);
  const [getApprovedConfigData, setGetApprovedConfigData] = useState()

  const [
    getApprovalConfigurationByApprovalConfigurationId,
    {
      isSuccess: isGetApprovalConfigurationByApprovalConfigurationIdSucess,
      data: allGetApprovalConfigurationByApprovalConfigurationIdData,
    },
  ] = useLazyGetApprovalConfigurationByApprovalConfigurationIdQuery();

  const handleToggleModal = () => {
    setGetApprovedConfigData("")
    setisModelOpen(true);
  };

  useEffect(() => {
    if (isGetApprovalConfigurationByApprovalConfigurationIdSucess && allGetApprovalConfigurationByApprovalConfigurationIdData) {
      setGetApprovedConfigData(allGetApprovalConfigurationByApprovalConfigurationIdData)
      setisModelOpen(true);
    }
  }, [isGetApprovalConfigurationByApprovalConfigurationIdSucess, allGetApprovalConfigurationByApprovalConfigurationIdData])

  const handleEditModal = (data) => {
    getApprovalConfigurationByApprovalConfigurationId(data.approvalConfigurationId)
  };

  const onSidebarClose = () => {
    onResetForm(props.rulesFormData, props.setFormData, null);
    setisModelOpen(false);
  };


  return (
    <>
      <div className="config-card">
        <CardSection
          cardTitle="Rules"
          buttonClassName="btn theme-button"
          rightButton={true}
          buttonText="Add Rules"
          textWithIcon={true}
          iconImg={AppIcons.PlusIcon}
          titleButtonClick={handleToggleModal}
        >
          <div className="config-content">
            {props.getRules &&
              props.getRules.map((rule) => (
                <div
                  key={rule.approvalConfigurationId}
                  className={`config-rule-info ${props.selectedRule === rule.approvalConfigurationId ? "selected" : ""}`}
                >
                  <span>{rule.ruleName}</span>
                  <div className="edit-icons" onClick={() => handleEditModal(rule)}>
                    <Image imagePath={AppIcons.editThemeIcon} altText="Edit Icon" />
                  </div>
                </div>
              ))}
          </div>
        </CardSection>
      </div>
      <SidebarModel
        modalTitle={getApprovedConfigData ? "Update Rule" : "Add Rule"}
        contentClass="content-35"
        onClose={onSidebarClose}
        modalTitleIcon={AppIcons.AddIcon}
        isOpen={isModelOpen}
      >
        <AddEditRules
          onClose={onSidebarClose}
          allGetAllModulesData={props.allGetAllModulesData}
          selectedModuleId={props.selectedModuleId}
          selectedFunctionalityId={props.selectedFunctionalityId}
          allGetAllFunctionalitiesData={props.allGetAllFunctionalitiesData}
          getApprovedConfigData={getApprovedConfigData}
          handleRepeatCallRule={props.onRepeatCall}
          rulesFormData={props.rulesFormData}
          setFormData={props.setFormData}
          formData={props.formData}
          allGetAllFunctionalitiesFieldsData={props.allGetAllFunctionalitiesFieldsData}
        />
      </SidebarModel>
    </>
  );
};

Rules.propTypes = {
  getRules: PropTypes.any.isRequired,
  selectedModuleId: PropTypes.number.isRequired,
  selectedFunctionalityId: PropTypes.number.isRequired,
  allGetAllModulesData: PropTypes.array.isRequired,
  allGetAllFunctionalitiesData: PropTypes.array.isRequired,
  allGetAllFunctionalitiesFieldsData: PropTypes.array.isRequired,
  onRepeatCall: PropTypes.func.isRequired,
  rulesFormData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
};

export default Rules;
