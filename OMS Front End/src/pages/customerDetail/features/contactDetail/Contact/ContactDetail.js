/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
//** Lib's */
import { AppIcons } from "../../../../../data/appIcons";
import CardSection from "../../../../../components/ui/card/CardSection";
import { contactDetailFormData } from "./config/ContactDetailForm.data";
import SidebarModel from "../../../../../components/ui/sidebarModel/SidebarModel";
import {
  contactCustomerTransformData,
  contactSupplierTransformData
} from "../../../../../utils/TransformData/TransformAPIData";
//** Service's */
import { useLazyGetAllContactTypesQuery } from "../../../../../app/services/contactAPI";
import { hasFunctionalPermission } from "../../../../../utils/AuthorizeNavigation/authorizeNavigation";
import ToastService from "../../../../../services/toastService/ToastService";
import { ErrorMessage } from "../../../../../data/appMessages";
//** Component's */
const AddEditContact = React.lazy(() => import("./AddEditContact"));
const ManageContactList = React.lazy(() => import("./ManageContactList"));

const ContactDetail = ({
  mainId,
  getContactByKeyId,
  addEditContactMutation,
  isSupplier,
  isEditablePage,
  SecurityKey,
  getContactById,
  isSearchFilterShow
}) => {
  //** State */
  const editRef = useRef();
  const childRef = useRef();
  const [isEdit, setIsEdit] = useState(false);

  const [isModelOpen, setisModelOpen] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [showEditIcon, setShowEditIcon] = useState(true);
  const [modifyContactData, setModifyContactData] = useState([]);
  const [contactType, setContactType] = useState("")
  const [selectedDrpvalues, setSelectedDrpvalues] = useState("")
  const [search, setSearch] = useState("");
  const [shouldRerenderFormCreator, setShouldRerenderFormCreator] = useState(false);

  //** API Call's */
  const [
    GetContactList,
    {
      isFetching: isGetContactFetching,
      isSuccess: isGetContactSucess,
      data: isGetContactData,
    },
  ] = getContactByKeyId();
  const [
    getAllContactTypes,
    {
      isSuccess: isGetAllContactTypesSucess,
      data: allGetAllContactTypesData,
    },
  ] = useLazyGetAllContactTypesQuery();

  //** UseEffect */
  useEffect(() => {
    getAllContactTypes();
    onGetContactList();
  }, [mainId]);

  useEffect(() => {
    if (isEditablePage && SecurityKey) {
      const hasAddPermission = hasFunctionalPermission(SecurityKey.ADD);
      const hasEditPermission = hasFunctionalPermission(SecurityKey.EDIT);

      if (hasAddPermission) {
        if (hasAddPermission.hasAccess === true) {
          setButtonVisible(true);
        } else {
          setButtonVisible(false);
        }
      }
      if (hasEditPermission && hasEditPermission.isViewOnly === true) {
        setShowEditIcon(true);
      } else if (hasEditPermission.isEditable === true) {
        setShowEditIcon(true);
      } else {
        setShowEditIcon(false);
      }
    }
  }, [isEditablePage, isSupplier, SecurityKey]);

  useEffect(() => {
    if (!isGetContactFetching && isGetContactSucess && isGetContactData) {
      setModifyContactData(isGetContactData);
    }
  }, [isGetContactFetching, isGetContactSucess, isGetContactData]);

  useEffect(() => {
    if (
      isGetAllContactTypesSucess &&
      allGetAllContactTypesData
    ) {
      if (isSupplier === true) {
        const getData = allGetAllContactTypesData.filter(x => x.isForSuppliers).map((item) => ({
          value: item.contactTypeId,
          label: item.type,
        }));
        const dropdownField = contactDetailFormData.formFields.find(
          (item) => item.dataField === "contactTypeId"
        );
        dropdownField.fieldSetting.options = getData;
        setContactType(getData)
      } else {
        const getData = allGetAllContactTypesData.filter(x => x.isForCustomers).map((item) => ({
          value: item.contactTypeId,
          label: item.type,
        }));
        const dropdownField = contactDetailFormData.formFields.find(
          (item) => item.dataField === "contactTypeId"
        );
        dropdownField.fieldSetting.options = getData;
        setContactType(getData)
      }
    }
  }, [
    isGetAllContactTypesSucess,
    allGetAllContactTypesData,
  ]);

  //** Handle Change's */
  const handleToggleModal = () => {
    setIsEdit(false);
    setisModelOpen(true);
    if (childRef.current) {
      childRef.current.callChildFunction();
    }
  };

  const handleEdit = (contactId) => {
    setIsEdit(true);
    setisModelOpen(!isModelOpen);
    if (editRef.current) {
      editRef.current.callEditFunction(contactId);
    }
  };

  const onSidebarClose = () => {
    setisModelOpen(false);
    if (childRef.current) {
      childRef.current.callChildFunction();
    }
    onGetContactList();
  };

  //** Success */
  const onSuccess = () => {
    onGetContactList();
    setisModelOpen(!isModelOpen);
  };

  //** Get Contact List */
  const onGetContactList = () => {
    let req = {
      id: mainId,
      searchText: search,
      contactType: contactType
    }
    mainId && GetContactList(req);
  };

  const onhandleSearch = () => {
    if (search.length >= 3 || selectedDrpvalues.length > 0) {
      let req = {
        id: mainId,
        searchText: search,
        contactType: Array.isArray(selectedDrpvalues) ? selectedDrpvalues.join(",") : String(selectedDrpvalues)
      }
      GetContactList(req)
    } else {
      ToastService.warning(ErrorMessage.CommonErrorMessage)
    }
  }

  const handleChange = (event) => {
    // if (event.target.value.length >= 3 || selectedDrpvalues.length > 0) {
    setSearch(event.target.value.trim());
    // } else {
    //   setSearch("");
    //   setSelectedDrpvalues("");
    // }
  }

  const onhandleClear = () => {
    setSelectedDrpvalues("");
    setSearch("");
    setContactType("")
    setShouldRerenderFormCreator((prevState) => !prevState);
  };

  useEffect(() => {
    if (search === "" && selectedDrpvalues === "") {
      onGetContactList();
    }
  }, [search, selectedDrpvalues]);

  const handleChangeDropdown = (selectedOptions) => {
    const selectedValues = selectedOptions.map(option => option.value);
    if (selectedValues.length > 0) {
      setSelectedDrpvalues(selectedValues);
    } else {
      setSelectedDrpvalues("");
    }
  };

  return (
    <>
      <div key={shouldRerenderFormCreator}>
        <CardSection
          cardTitle={isSearchFilterShow ? "" : "Contact"}
          handleChange={handleChange}
          searchInputName="Search By Name and Email"
          searchInput={isSearchFilterShow ? true : false}
          buttonClassName="theme-button"
          textWithIcon={true}
          iconImg={AppIcons.PlusIcon}
          rightButton={buttonVisible ? true : false}
          buttonText="Add"
          titleButtonClick={handleToggleModal}
          // isFilter={true}
          // filterHeaderTitle="Contact Filter"
          clearButton={isSearchFilterShow ? true : false}
          clearTitleButtonClick={onhandleClear}
          clearButtonText="Clear"
          searchButton={isSearchFilterShow ? true : false}
          searchbuttonText="Search"
          searchTitleButtonClick={onhandleSearch}
          searchFilter={isSearchFilterShow ? true : false}
          handleChangeDropdown={handleChangeDropdown}
          selectedOptions={selectedDrpvalues}
          optionsValue={contactType}
          isMultiSelect={true}
          placeholder="Search by Contact Type"
          isCardSection={true}
          isdropdownOpen={true}
          clearButtonClassName="dark-btn"
        >
          <ManageContactList
            handleEdit={handleEdit}
            modifyContactData={modifyContactData}
            isLoading={isGetContactFetching}
            showEditIcon={showEditIcon}
          />
        </CardSection>
      </div>
      <div className="sidebar-contact-model">
        <SidebarModel
          modalTitle="Add/Edit Contact"
          contentClass="content-45"
          onClose={onSidebarClose}
          modalTitleIcon={AppIcons.AddIcon}
          isOpen={isModelOpen} >
          {/* {isModelOpen ? */}
          <AddEditContact
            isSupplier={isSupplier}
            onSidebarClose={onSidebarClose}
            childRef={childRef}
            onSuccess={onSuccess}
            isEdit={isEdit}
            editRef={editRef}
            SecurityKey={SecurityKey}
            onGetContactList={onGetContactList}
            addEditContactMutation={addEditContactMutation}
            mainId={mainId}
            isEditablePage={isEditablePage}
            isOpen={isModelOpen}
            getContactById={getContactById}
          />
          {/* : null} */}
        </SidebarModel>
      </div>
    </>
  );
};

export default ContactDetail;
