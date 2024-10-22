import React, {  useCallback, useRef, useState } from 'react'
import { AppIcons } from '../../../data/appIcons';
import CardSection from "../../../components/ui/card/CardSection";

import SidebarModel from '../../../components/ui/sidebarModel/SidebarModel';
import AddEditSnippet from './features/AddEditSnippet';

import SnippedList from './features/config/SnippetList';
import ToastService from '../../../services/toastService/ToastService';
import KeyCodes from '../../../utils/Enums/KeyCodesEnums';
import { ErrorMessage } from '../../../data/appMessages';
import { onResetForm } from '../../../utils/FormFields/ResetForm/handleResetForm';
import { SnippetListData } from './features/config/SnippetFormData';

 const Snippet = ()=> {
  
  const getDataRef=useRef();
  const childRef = useRef();
  const [formData, setFormData] = useState(SnippetListData);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
 
  const [search, setSearch] = useState("");


  const handleToggleModal = () => {
    onResetForm(SnippetListData,setFormData, null);
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
    onResetForm(formData,setFormData, null);
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
          searchInputName="Search Snippet"
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
          <SnippedList 
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
             isEdit? "Update Snippet":"Add Snippet"
          }
          contentClass="content-40"
          onClose={onSidebarClose}
          modalTitleIcon={AppIcons.AddIcon}
          isOpen={isModelOpen}
        >
          <AddEditSnippet
           isEdit={isEdit}
            initData={formData}
           onClose={onSidebarClose}
           onSuccess={onSuccess}
            isModelOpen={isModelOpen}
            childRef = {childRef}
          /> 
        </SidebarModel>
      </div>
       
    )
  }
 export default Snippet;