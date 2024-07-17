
import CardSection from "../../../components/ui/card/CardSection";
import SidebarModel from "../../../components/ui/sidebarModel/SidebarModel";
import { AppIcons } from "../../../data/appIcons";
import AddEditApiAuthentication from "./features/AddEditApiAuthentication";
import { useState } from "react";
import ApiAuthenticationList from "./features/ApiAuthenticationList";
import { addEditApiAuthenticationFormData } from "./config/ApiAuthentication.data";
import { useRef } from "react";
import { onResetForm } from "../../../utils/FormFields/ResetForm/handleResetForm";

const ApiAuthentication=()=>{
  
    const [isModelOpen, setIsModelOpen] = useState(false);
    const childRef = useRef();
    const [isEdit, setIsEdit] = useState(false);
    const [formData, setFormData] = useState(addEditApiAuthenticationFormData);
    
    const handleToggleModal = () => {
      setIsModelOpen(true);
    };
    const onSidebarClose = () => {
      setIsModelOpen(false);
      setIsEdit(false);   
   };
   const handleEditClick = (data) => {

      onResetForm(addEditApiAuthenticationFormData,setFormData, null);
      setIsModelOpen(true);
      setFormData(data);
      setIsEdit(true);     
     };

     const onSuccess = () => {
      setIsModelOpen(true);
      if (childRef.current) {
          childRef.current.callChildFunction();
      }
  };
    
return(<> <div>
    <CardSection
      cardTitle="API Authentication"
      buttonClassName="btn theme-button"
     // rightButton={buttonVisible ? true : false}
      rightButton={ true }
      buttonText="Add"
     textWithIcon={true}
     iconImg={AppIcons.PlusIcon}
     titleButtonClick={handleToggleModal}
    >
      <ApiAuthenticationList childRef={childRef}  handleEditClick={handleEditClick} />
    
    </CardSection>
    
      <SidebarModel
       modalTitle= "Add/Edit API Authentication"
       contentClass="content-40"
      onClose={onSidebarClose}
       modalTitleIcon={AppIcons.AddIcon}
      isOpen={isModelOpen}
      >
        <AddEditApiAuthentication
        isEdit={isEdit}
        initData={formData}
       onClose={onSidebarClose}
       onSuccess={onSuccess}
        />
      </SidebarModel>
  </div></>)
}
export default ApiAuthentication;