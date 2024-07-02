import React, { useState, useEffect, useContext, useRef } from "react";
//** Lib's */
import { AppIcons } from "../../../../../data/appIcons";
import CardSection from "../../../../../components/ui/card/CardSection";
import { contactDetailFormData } from "./config/ContactDetailForm.data";
import SidebarModel from "../../../../../components/ui/sidebarModel/SidebarModel";
import {
  contactCustomerTransformData,
  contactSupplierTransformData
} from "../../../../../utils/TransformData/TransformAPIData";
import BasicDetailContext from "../../../../../utils/ContextAPIs/Customer/BasicDetailContext";
//** Service's */
import { useLazyGetAllContactTypesQuery } from "../../../../../app/services/contactAPI";
import { hasFunctionalPermission } from "../../../../../utils/AuthorizeNavigation/authorizeNavigation";
import AddSupplierContext from "../../../../../utils/ContextAPIs/Supplier/AddSupplierContext";
//** Component's */
const AddEditContact = React.lazy(() => import("./AddEditContact"));
const ManageContactList = React.lazy(() => import("./ManageContactList"));

const ContactDetail = ({
  mainId,
  getContactByIdQuery,
  addEditContactMutation,
  isSupplier,
  isEditablePage,
  SecurityKey,
}) => {
  //** State */
  const editRef = useRef();
  const childRef = useRef();
  const [isEdit, setIsEdit] = useState(false);
  const [editFormData, setEditFormData] = useState();
  const [isModelOpen, setisModelOpen] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [modifyContactData, setModifyContactData] = useState([]);

  const {
    setEmailAddressData,
    setContactMainModal,
    setContactId,
    setPhoneNumberData,
  } = useContext(isSupplier ? AddSupplierContext : BasicDetailContext);

  //** API Call's */
  const [
    GetContactList,
    {
      isFetching: isGetContactFetching,
      isSuccess: isGetContactSucess,
      data: isGetContactData,
    },
  ] = getContactByIdQuery();
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

      if (hasAddPermission) {
        if (hasAddPermission.hasAccess === true) {
          setButtonVisible(true);
        } else {
          setButtonVisible(false);
        }
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
    setContactId(0);
    setIsEdit(false);
    setisModelOpen(true);
    setPhoneNumberData("");
    setEmailAddressData("");
    setContactMainModal(true);
    setEditFormData("");
    if (childRef.current) {
      childRef.current.callChildFunction();
    }
  };

  const handleEdit = (data, emailAddressList, phoneNumberLsit) => {
    setIsEdit(true);
    setEditFormData(data);
    setisModelOpen(!isModelOpen);
    if (editRef.current) {
      editRef.current.callEditFunction(data);
    }
    setPhoneNumberData(phoneNumberLsit);
    setEmailAddressData(emailAddressList);
  };

  const onSidebarClose = () => {
    setisModelOpen(false);
    if (childRef.current) {
      childRef.current.callChildFunction();
    }
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

  return (
    <>
      <CardSection
        cardTitle="Contact"
        buttonClassName="theme-button"
        textWithIcon={true}
        iconImg={AppIcons.PlusIcon}
        rightButton={buttonVisible ? true : false}
        buttonText="Add"
        titleButtonClick={handleToggleModal}
      >
        <ManageContactList
          handleEdit={handleEdit}
          modifyContactData={modifyContactData}
          isLoading={isGetContactFetching}
        />
      </CardSection>
      <div className="sidebar-contact-model">
        <SidebarModel
          modalTitle="Add/Edit Contact"
          contentClass="content-45"
          onClose={onSidebarClose}
          modalTitleIcon={AppIcons.AddIcon}
          isOpen={isModelOpen}
        >
          <AddEditContact
            isSupplier={isSupplier}
            onSidebarClose={onSidebarClose}
            editFormData={editFormData}
            childRef={childRef}
            onSuccess={onSuccess}
            isEdit={isEdit}
            editRef={editRef}
            SecurityKey={SecurityKey}
            onGetContactList={onGetContactList}
            addEditContactMutation={addEditContactMutation}
            mainId={mainId}
            isEditablePage={isEditablePage}
          />
        </SidebarModel>
      </div>
    </>
  );
};

export default ContactDetail;
