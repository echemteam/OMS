/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState } from "react";
import Rules from "./features/Rules";
import "./Configuration.scss";
import { rulesFormData } from "./features/config/RulesForm.data";
import { AppIcons } from "../../../data/appIcons";
import CardSection from "../../../components/ui/card/CardSection";
import SidebarModel from "../../../components/ui/sidebarModel/SidebarModel";
import AddEditRules from "./features/AddEditRules";

const ApprovalRules = () => {
  const childRef = useRef();
  const [formData, setFormData] = useState(rulesFormData.initialState);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false)

  const handleToggleModal = () => {
    setIsModelOpen(true);
    setIsEdit(false)
  };

  const onSidebarClose = () => {
    setIsModelOpen(false);
    resetForm()
  };

  const onGetData = () => {
    if (childRef.current) {
      childRef.current.callChildFunction();
    }
  };

  const resetForm = () => {
    let form = { ...rulesFormData.initialState };
    setFormData(form);
  };

  const handleEdit = (data) => {
    resetForm()
    setFormData(data);
    setIsEdit(true);
    setIsModelOpen(true);
  };

  return (
    <div className="row">
      <div className="approval-rules">
        <CardSection
          cardTitle="Rules"
          buttonClassName="btn theme-button"
          rightButton={true}
          buttonText="Add"
          textWithIcon={true}
          iconImg={AppIcons.PlusIcon}
          titleButtonClick={handleToggleModal}
        >
          <Rules
            childRef={childRef} onEdit={handleEdit}
          />
        </CardSection>

        <SidebarModel
          modalTitle={`${isEdit ? "Update" : "Add"} Rules`}
          contentClass="content-35"
          onClose={onSidebarClose}
          modalTitleIcon={AppIcons.AddIcon}
          isOpen={isModelOpen}
        >
          <AddEditRules
            initData={formData} isEdit={isEdit} onGetData={onGetData} isOpen={isModelOpen} onClose={onSidebarClose}
          />
        </SidebarModel>
      </div>
    </div>
  );
};

export default ApprovalRules;
