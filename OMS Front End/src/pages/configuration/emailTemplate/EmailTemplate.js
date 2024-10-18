import { useCallback, useRef, useState } from "react";
import { onResetForm } from "../../../utils/FormFields/ResetForm/handleResetForm";
import CardSection from "../../../components/ui/card/CardSection";
import { EmailTemplateFormData } from "./config/EmailTemplate.data";
import SidebarModel from "../../../components/ui/sidebarModel/SidebarModel";
import { AppIcons } from "../../../data/appIcons";
import AddEditEmailTemplate from "./features/AddEditEmailTemplate";
import EmailTemplateList from "./features/EmailTemplateList";
import ToastService from "../../../services/toastService/ToastService";
import { ErrorMessage } from "../../../data/appMessages";
import KeyCodes from "../../../utils/Enums/KeyCodesEnums";

const EmailTemplate=()=>{
    const getDataRef=useRef();
    const childRef = useRef();
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [formData, setFormData] = useState(EmailTemplateFormData);
    const [search, setSearch] = useState("");

  
    const handleToggleModal = () => {
      onResetForm(EmailTemplateFormData,setFormData, null);
      setIsModelOpen(true);
    };
  
    const onSidebarClose = () => {
      setIsModelOpen(false);
      setIsEdit(false);
      if(childRef.current){
        childRef.current.callChildFunction();
      }
    };
  
    const handleEditClick = (data) => {
      onResetForm(EmailTemplateFormData,setFormData, null);
      setIsModelOpen(true);
      setFormData(data);
      setIsEdit(true);  
    };
  
    const onSuccess = () => {
      if (getDataRef.current) {
        getDataRef.current.callChildFunction();
      }
    };
    const handleChange = (event) => {
        setSearch(event.target.value.trim());
      };
  
      const handleSearch = useCallback(() => {
        if (search.length >= 3 ) {
          onSuccess();
        } else {
          ToastService.warning(ErrorMessage.CommonErrorMessage);
        }
      }, [search]);

      const handleKeyPress=(event)=>{
       
        if (event.key === KeyCodes.ENTER) {
          handleSearch();
        }
      }

      const handleClear = () => {
        setSearch("");
         
      };
    return (
      <div>
        <CardSection
          cardTitle=""
          buttonClassName="btn theme-button"
          rightButton={true}
          buttonText="Add"
          textWithIcon={true}
          iconImg={AppIcons.PlusIcon}
          titleButtonClick={handleToggleModal}
          handleChange={handleChange}
          searchInputName="Search Email Template Name"
          searchInput={true}
          searchButton={true}
          searchbuttonText="Search"
          searchTitleButtonClick={handleSearch}
          clearButton={true}
          clearTitleButtonClick={handleClear}
          clearButtonText="Clear"
          clearButtonClassName="dark-btn"
          searchIconImg={AppIcons.SearchIcone}
          searchTextWithIcon={true}
          clearTextWithIcon={true}
          clearIconImg={AppIcons.ClearIcone}
          searchValue={search}
          handleKeyPress={handleKeyPress}
        
        >
          <EmailTemplateList 
            getDataRef={getDataRef}
            handleEditClick={handleEditClick}
            initData={formData}
            handleChange={handleChange}
            handleSearch={handleSearch}
            search={search}
            handleClear={handleClear}
          />
        </CardSection>
  
        <SidebarModel
          modalTitle={
            isEdit ? "Upadte Email Template" : "Add Email Template"
          }
          contentClass="content-40"
          onClose={onSidebarClose}
          modalTitleIcon={AppIcons.AddIcon}
          isOpen={isModelOpen}
        >
          <AddEditEmailTemplate
            isEdit={isEdit}
            initData={formData}
            onClose={onSidebarClose}
            onSuccess={onSuccess}
            isModelOpen={isModelOpen}
            childRef = {childRef}
          /> 
        </SidebarModel>
      </div>
    );
  };

export default EmailTemplate;
