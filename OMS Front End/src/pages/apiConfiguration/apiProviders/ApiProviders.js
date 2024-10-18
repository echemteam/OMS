/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useRef, useState } from "react";
import PropTypes from "prop-types";
import CardSection from "../../../components/ui/card/CardSection";
import SidebarModel from "../../../components/ui/sidebarModel/SidebarModel";
import AddEditApiProviders from "./features/AddEditApiProviders";
import { AppIcons } from "../../../data/appIcons";
import ApiProvidersList from "./features/ApiProvidersList";
import ToastService from "../../../services/toastService/ToastService";
import { ErrorMessage } from "../../../data/appMessages";
import { useNavigate } from "react-router-dom";
import { encryptUrlData } from "../../../services/CryptoService";
import KeyCodes from "../../../utils/Enums/KeyCodesEnums";

const ApiProviders = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const childRef = useRef();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleToggleModal = () => {
    setIsModelOpen(true);
  };
  const onSidebarClose = () => {
    setIsModelOpen(false);
    setIsEdit(false);
  };
  const handleEditClick = (data) => {
    navigate(`/configuration/APIProviderDetail/${encryptUrlData(data.providerId)}`);
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
  const handleSearch = useCallback(() => {
    if (search.length >= 3 ) {
      onGetData();
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
        rightButton={true}
        buttonText="Add"
        textWithIcon={true}
        iconImg={AppIcons.PlusIcon}
        titleButtonClick={handleToggleModal}
        handleKeyPress={handleKeyPress}
      >
        <ApiProvidersList
          onGetData={onGetData}
          handleEditClick={handleEditClick}
          childRef={childRef}
          handleChange={handleChange}
          handleSearch={handleSearch}
          search={search}
          handleClear={handleClear}
        />
      </CardSection>

      <SidebarModel
        modalTitle={isEdit ? "Update Api Provder" : "Add API Provider"}
        contentClass="content-35"
        onClose={onSidebarClose}
        modalTitleIcon={AppIcons.AddIcon}
        isOpen={isModelOpen}
      >
        <AddEditApiProviders
          isEdit={isEdit}
          onSuccess={onSuccess}
          onClose={onSidebarClose}
        />
      </SidebarModel>
    </div>
  );
};

ApiProviders.propTypes = {
  AppIcons: PropTypes.shape({
    SearchIcone: PropTypes.string.isRequired,
    ClearIcone: PropTypes.string.isRequired,
    PlusIcon: PropTypes.string.isRequired,
    AddIcon: PropTypes.string.isRequired,
  }),
  ErrorMessage: PropTypes.shape({
    CommonErrorMessage: PropTypes.string.isRequired,
  }),
  encryptUrlData: PropTypes.func,
  ToastService: PropTypes.shape({
    warning: PropTypes.func.isRequired,
  }),
};

export default ApiProviders;
