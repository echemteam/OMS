import {  useState } from "react";
import CardSection from "../../../components/ui/card/CardSection";
import SidebarModel from "../../../components/ui/sidebarModel/SidebarModel";
import { AppIcons } from "../../../data/appIcons";
import { onResetForm } from "../../../utils/FormFields/ResetForm/handleResetForm";
import {  addEditApiParameterFormData } from "./config/ApiParameter.data";
import AddEditApiParameters from "./features/AddEditApiParameters";
import ApiParametersList from "./features/ApiParametersList";
import { useRef } from "react";

const ApiParameters=()=>{
  const childRef = useRef();
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [formData, setFormData] = useState(addEditApiParameterFormData);
    const handleToggleModal = () => {
      setIsModelOpen(true);
    };
    const onSidebarClose = () => {
       setIsModelOpen(false);
       setIsEdit(false)   
    };
  
    const handleEditClick = (data) => {
      onResetForm(addEditApiParameterFormData,setFormData, null);
        setIsModelOpen(true);
        setFormData(data);
           setIsEdit(true)   
    };

    const onSuccess = () => {
      setIsModelOpen(true);
      if (childRef.current) {
          childRef.current.callChildFunction();
      }
  };
    return(<>
    
    <div>
      <CardSection
        cardTitle= "Add Api Parameter"
        buttonClassName="btn theme-button"
       // rightButton={buttonVisible ? true : false}
        rightButton={ true }
        buttonText="Add"
       textWithIcon={true}
       iconImg={AppIcons.PlusIcon}
       titleButtonClick={handleToggleModal}
      >
      <ApiParametersList handleEditClick={handleEditClick} childRef={childRef}/>
      </CardSection>
      
        <SidebarModel
         modalTitle= {isEdit ? "Update Api Parameter" : "Add Api Parameter"}
         contentClass="content-35"
         onClose={onSidebarClose}
         modalTitleIcon={AppIcons.AddIcon}
         isOpen={isModelOpen}
        >
          <AddEditApiParameters
          isEdit={isEdit}
          initData={formData}
          onClose={onSidebarClose}
          onSuccess={onSuccess}
          />
        </SidebarModel>
    </div>
    </>)

}
export default ApiParameters;