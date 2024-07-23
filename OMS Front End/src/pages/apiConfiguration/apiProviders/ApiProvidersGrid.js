import { useRef, useState } from "react";
import CardSection from "../../../components/ui/card/CardSection";
import SidebarModel from "../../../components/ui/sidebarModel/SidebarModel";
import AddEditApiProviders from "./features/AddEditApiProviders";
import { AppIcons } from "../../../data/appIcons";
import ApiProvidersList from "./features/ApiProvidersList";
import { addEditApiProviderFormData } from "./config/ApiProviders.data";
import { onResetForm } from "../../../utils/FormFields/ResetForm/handleResetForm";
import ToastService from "../../../services/toastService/ToastService";
import { ErrorMessage } from "../../../data/appMessages";
import { useNavigate } from "react-router-dom";
import { encryptUrlData } from "../../../services/CryptoService";

const ApiProviders=()=>{
  const [isEdit, setIsEdit] = useState(false);
    const [isModelOpen, setIsModelOpen] = useState(false);
    const childRef = useRef();
    const navigate=useNavigate();
    const [formData, setFormData] = useState(addEditApiProviderFormData);
    const [search, setSearch] = useState("");
    const [shouldRerenderFormCreator, setShouldRerenderFormCreator] = useState(false);
  
    const handleToggleModal = () => {
      setIsModelOpen(true);
    };
    const onSidebarClose = () => {
       setIsModelOpen(false);
       setIsEdit(false)
    };
    const handleEditClick = (data) => {
        navigate(`/APIProviderDetail/${encryptUrlData(data.providerId)}`);    
    };
 
    const onSuccess = () => {
      setIsModelOpen(true);
      if (childRef.current) {
          childRef.current.callChildFunction();
      }
  };
  const handleChange = (event) => {
    setSearch(event.target.value.trim());
  };

  const onGetData = () => {
     if (childRef.current) {
          childRef.current.callChildFunction();
      }
  };
  const handleSearch = () => {
    if (search.length >= 3) {
      onGetData();
    } else {
      ToastService.warning(ErrorMessage.CommonErrorMessage);
    }
  };
  const handleClear = () => { 
    setSearch("");
    setShouldRerenderFormCreator((prevState) => !prevState);
  };
  
    return(<>
    <div>
      <CardSection
          cardTitle="API Providers"
          handleChange={handleChange}
          searchInputName="Search By Provider Name"
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
          buttonClassName="btn theme-button"
          // rightButton={buttonVisible ? true : false}
          rightButton={true}
          buttonText="Add"
          textWithIcon={true}
          iconImg={AppIcons.PlusIcon}
          titleButtonClick={handleToggleModal}
      >
       <ApiProvidersList onGetData={onGetData} handleEditClick={handleEditClick} childRef={childRef}  handleChange={handleChange}  handleSearch={handleSearch} search={search} handleClear={handleClear}  shouldRerenderFormCreator={shouldRerenderFormCreator}/>
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