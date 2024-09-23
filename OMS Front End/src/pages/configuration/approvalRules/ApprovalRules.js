/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import Rules from "./features/Rules";
import "./Configuration.scss";
import { rulesFormData } from "./features/config/RulesForm.data";
import { AppIcons } from "../../../data/appIcons";
import CardSection from "../../../components/ui/card/CardSection";
import SidebarModel from "../../../components/ui/sidebarModel/SidebarModel";
import AddEditRules from "./features/AddEditRules";
import ToastService from "../../../services/toastService/ToastService";
import { ErrorMessage } from "../../../data/appMessages";
import { useLazyGetAllFunctionalitiesQuery } from "../../../app/services/configurationAPI";

const ApprovalRules = () => {
  const childRef = useRef();
  const [formData, setFormData] = useState(rulesFormData.initialState);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false)
  const [search, setSearch] = useState("");
  const [statusOptions, setStatusOptions] = useState([]);
  const [selectedDrpvalues, setSelectedDrpvalues] = useState("")
  const [selectedStatusOptions, setSelectedStatusOptions] = useState("");
  const [getAllFunctionalities,{ isFetching: isGetAllFunctionalitiesFetching, isSuccess: isGetAllFunctionalitiesSucess,data: allGetAllFunctionalitiesData, },] = useLazyGetAllFunctionalitiesQuery();
 
  useEffect(()=>{
    getAllFunctionalities(0);
  },[])

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
  const handleChange = (event) => {
    setSearch(event.target.value.trim());
  };

  const handleSearch = () => {
    if (search.length >= 3 || selectedDrpvalues) {
      onGetData();
    } else {
      ToastService.warning(ErrorMessage.CommonErrorMessage);
    }
  };
  const handleKeyPress=(event)=>{
    
    if (event.code === "Enter") {
      handleSearch();
    }
  }
  const handleClear = () => {
    setSelectedDrpvalues("");
    setSelectedStatusOptions("");
    setSearch("");
   
  };

  useEffect(() => {
    if (!isGetAllFunctionalitiesFetching && isGetAllFunctionalitiesSucess && allGetAllFunctionalitiesData) {
      const functionalityList = allGetAllFunctionalitiesData.map((item) => ({
        value: item.functionalityId,
        label: item.name,
      }));
      setStatusOptions(functionalityList);
    }
  }, [isGetAllFunctionalitiesFetching, isGetAllFunctionalitiesSucess, allGetAllFunctionalitiesData]);

  const handleChangeDropdown = (selectedOptions) => {
       setSelectedDrpvalues(selectedOptions ? selectedOptions.value : "");
  };

  return (
    <div className="row">
      <div className="approval-rules">
        <CardSection
          cardTitle="Approval Rules"
          buttonClassName="btn theme-button"
          rightButton={true}
          buttonText="Add"
          textWithIcon={true}
          iconImg={AppIcons.PlusIcon}
          titleButtonClick={handleToggleModal}

          searchFilter={true}
          handleChangeDropdown={handleChangeDropdown}
          selectedOptions={selectedDrpvalues}
          selectedStatusOptions={selectedStatusOptions}
          optionsValue={statusOptions}
          placeholder="Search By Functionality "
          isCardSection={true}
          isdropdownOpen={true}

          handleChange={handleChange}
          searchInputName="Search By Rule"
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
          <Rules
            childRef={childRef} onEdit={handleEdit}
            handleChange={handleChange}
            handleSearch={handleSearch}
            search={search}
            selectedDrpvalues={selectedDrpvalues}
            initData={formData}
            handleClear={handleClear}
            
          />
        </CardSection>

        <SidebarModel
          modalTitle={`${isEdit ? "Update" : "Add"} Rules`}
          contentClass="content-50"
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
