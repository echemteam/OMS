import { useState, useRef } from "react";
import CardSection from "../../../components/ui/card/CardSection";
import SidebarModel from "../../../components/ui/sidebarModel/SidebarModel";
import { AppIcons } from "../../../data/appIcons";
import AddEditApiAuthentication from "./features/AddEditApiAuthentication";
import ApiAuthenticationList from "./features/ApiAuthenticationList";
import { addEditApiAuthenticationFormData } from "./config/ApiAuthentication.data";
import { onResetForm } from "../../../utils/FormFields/ResetForm/handleResetForm";

const ApiAuthentication = () => {
  const childRef = useRef();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [authId, setAuthId] = useState(false);
  // const [authenticationFormData, setAuthenticationFormData] = useState(addEditApiAuthenticationFormData);

  const handleToggleModal = () => {
    setIsModelOpen(true);
  };

  const onSidebarClose = () => {
    setIsModelOpen(false);
    setIsEdit(false);
    if (childRef.current) {
      childRef.current.callChildFunction();
    }
  };

  const handleEditClick = (data) => {
    setAuthId(data.authId);
    setIsEdit(true);
    setIsModelOpen(true);
  };


  const onSuccess = () => {
    if (childRef.current) {
      childRef.current.callChildFunction();
    }
    setIsModelOpen(false);
  };


  return (
    <div>
      <CardSection
        cardTitle="API Authentication"
        buttonClassName="btn theme-button"
        rightButton={true}
        buttonText="Add"
        textWithIcon={true}
        iconImg={AppIcons.PlusIcon}
        titleButtonClick={handleToggleModal}
      >
        <ApiAuthenticationList childRef={childRef} handleEditClick={handleEditClick} />
      </CardSection>

      <SidebarModel
        modalTitle="Add/Edit API Authentication"
        contentClass="content-40"
        onClose={onSidebarClose}
        modalTitleIcon={AppIcons.AddIcon}
        isOpen={isModelOpen}
      >
        <AddEditApiAuthentication
          isEdit={isEdit}
          authId={authId}
          onClose={onSidebarClose}
          onSuccess={onSuccess}
          isModelOpen={isModelOpen}
          // authenticationFormData={authenticationFormData}
          childRef={childRef}
        />
      </SidebarModel>
    </div>
  );
};

export default ApiAuthentication;
