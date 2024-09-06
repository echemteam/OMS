import { useState,useRef } from "react";
import CardSection from "../../../components/ui/card/CardSection";
import SidebarModel from "../../../components/ui/sidebarModel/SidebarModel";
import { AppIcons } from "../../../data/appIcons";
import DictionaryList from "./features/DictionaryList";
import AddEditDictionary from "./features/AddEditDictionary";
import { onResetForm } from "../../../utils/FormFields/ResetForm/handleResetForm";
import { dictionaryFormData } from "./config/Dictionary.Data";


const Dictionary = () => {
  const getDataRef=useRef();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState(dictionaryFormData);

  const handleToggleModal = () => {
    onResetForm(dictionaryFormData,setFormData, null);
    setIsModelOpen(true);
  };

  const onSidebarClose = () => {
    setIsModelOpen(false);
    setIsEdit(false);
  };

  const handleEditClick = (data) => {
    onResetForm(dictionaryFormData,setFormData, null);
    setIsModelOpen(true);
    setFormData(data);
    setIsEdit(true);  
  };

  const onSuccess = () => {
     setIsModelOpen(true);
    if (getDataRef.current) {
      getDataRef.current.callChildFunction();
    }
  };

  return (
    <div>
      <CardSection
        cardTitle="Dictionary"
        buttonClassName="btn theme-button"
        rightButton={true}
        buttonText="Add"
        textWithIcon={true}
        iconImg={AppIcons.PlusIcon}
        titleButtonClick={handleToggleModal}
      >
        <DictionaryList
          getDataRef={getDataRef}
          handleEditClick={handleEditClick}
          initData={formData}
        />
      </CardSection>

      <SidebarModel
        modalTitle={
          isEdit ? "Upadte Dictionary" : "Add Dictionary"
        }
        contentClass="content-40"
        onClose={onSidebarClose}
        modalTitleIcon={AppIcons.AddIcon}
        isOpen={isModelOpen}
      >
        < AddEditDictionary
          isEdit={isEdit}
          initData={formData}
          onClose={onSidebarClose}
          onSuccess={onSuccess}
          isModelOpen={isModelOpen}     
        /> 
      </SidebarModel>
    </div>
  );
};

export default Dictionary;
