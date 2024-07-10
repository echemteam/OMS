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
  getContactById
}) => {
  //** State */
  const editRef = useRef();
  const childRef = useRef();
  const [isEdit, setIsEdit] = useState(false);

  const [isModelOpen, setisModelOpen] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [showEditIcon, setShowEditIcon] = useState(true);
  const [modifyContactData, setModifyContactData] = useState([]);

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
      const modifyData = isSupplier
        ? contactSupplierTransformData(isGetContactData)
        : contactCustomerTransformData(isGetContactData);
      setModifyContactData(modifyData);
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
      } else {
        const getData = allGetAllContactTypesData.filter(x => x.isForCustomers).map((item) => ({
          value: item.contactTypeId,
          label: item.type,
        }));
        const dropdownField = contactDetailFormData.formFields.find(
          (item) => item.dataField === "contactTypeId"
        );
        dropdownField.fieldSetting.options = getData;
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
    mainId && GetContactList(mainId);
  };

  const onhandleSearch = () => {

  }

  const onhandleClear = () => {

  }

  const handleChangeDropdown = () => {

  }

  return (
    <>
      <CardSection
        cardTitle="Contact"
        searchInputName="Search By Name and Email"
        searchInput={true}
        buttonClassName="theme-button"
        textWithIcon={true}
        iconImg={AppIcons.PlusIcon}
        rightButton={buttonVisible ? true : false}
        buttonText="Add"
        titleButtonClick={handleToggleModal}
        // isFilter={true}
        // filterHeaderTitle="Contact Filter"
        clearButton={true}
        clearTitleButtonClick={onhandleSearch}
        clearButtonText="Clear"
        searchButton={true}
        searchbuttonText="Search"
        searchTitleButtonClick={onhandleClear}
        searchFilter={true}
        handleChangeDropdown={handleChangeDropdown}
        // selectedOptions={selectedDrpvalues}
        // optionsValue={statusOptions}
        isMultiSelect={true}
        placeholder="Search by Contact Type"
        isCardSection={true}
        isdropdownOpen={true}
      >
        <ManageContactList
          handleEdit={handleEdit}
          modifyContactData={modifyContactData}
          isLoading={isGetContactFetching}
          showEditIcon={showEditIcon}
        />
      </CardSection>
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
