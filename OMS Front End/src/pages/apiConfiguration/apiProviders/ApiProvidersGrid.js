import { useRef, useState } from "react";
import CardSection from "../../../components/ui/card/CardSection";
import SidebarModel from "../../../components/ui/sidebarModel/SidebarModel";
import AddEditApiProviders from "./features/AddEditApiProviders";
import { AppIcons } from "../../../data/appIcons";
import ApiProvidersList from "./features/ApiProvidersList";
import { addEditApiProviderFormData } from "./config/ApiProviders.data";
import { onResetForm } from "../../../utils/FormFields/ResetForm/handleResetForm";

const ApiProviders=()=>{
  const [isEdit, setIsEdit] = useState(false);
    const [isModelOpen, setIsModelOpen] = useState(false);
    const childRef = useRef();
    const [formData, setFormData] = useState(addEditApiProviderFormData);
    const handleToggleModal = () => {
      setIsModelOpen(true);
    };
    const onSidebarClose = () => {
       setIsModelOpen(false);
       setIsEdit(false)
    };
    const handleEditClick = (data) => {
      onResetForm(addEditApiProviderFormData,setFormData, null);
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
    return(<>
    <div>
      <CardSection
        cardTitle="API Providers"
        buttonClassName="btn theme-button"
       // rightButton={buttonVisible ? true : false}
        rightButton={ true }
        buttonText="Add"
       textWithIcon={true}
       iconImg={AppIcons.PlusIcon}
       titleButtonClick={handleToggleModal}
      >
       <ApiProvidersList handleEditClick={handleEditClick} childRef={childRef} />
      </CardSection>
      
        <SidebarModel
         modalTitle= {isEdit ? "Update Api Provder" : "Add API Provider"}
         contentClass="content-35"
         onClose={onSidebarClose}
         modalTitleIcon={AppIcons.AddIcon}
         isOpen={isModelOpen}
        >
          <AddEditApiProviders 
           isEdit={isEdit}
          initData={formData}
          onSuccess={onSuccess}
          onClose={onSidebarClose}
          />
        </SidebarModel>
    </div>
    </>)

}
export default ApiProviders;