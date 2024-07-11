/* eslint-disable react-hooks/exhaustive-deps */
import React, { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
//** Lib's */
import Buttons from "../../../../../components/ui/button/Buttons";
import FormCreator from "../../../../../components/Forms/FormCreator";
import { contactDetailFormData } from "./config/ContactDetailForm.data";
import DataLoader from "../../../../../components/ui/dataLoader/DataLoader";
import ToastService from "../../../../../services/toastService/ToastService";
import { modifyPhoneNumberData } from "../../../../../utils/TransformData/TransformAPIData";
import AddSupplierContext from "../../../../../utils/ContextAPIs/Supplier/AddSupplierContext";
import BasicDetailContext from "../../../../../utils/ContextAPIs/Customer/BasicDetailContext";
import { hasFunctionalPermission } from "../../../../../utils/AuthorizeNavigation/authorizeNavigation";
import { setFieldSetting } from "../../../../../utils/FieldsSetting/SetFieldSetting";
import { settingTypeEnums } from "../../../../../utils/Enums/enums";
//** Component's */
const ManageEmailAddress = React.lazy(() => import("../EmailAddress/ManageEmailAddress"));
const ManageContactNumbers = React.lazy(() => import("../ContactNumbers/ManageContactNumbers"));

const AddEditContact = forwardRef(({ mainId, addEditContactMutation, onSidebarClose, onSuccess, childRef, editRef, onGetContactList, SecurityKey,
  isEditablePage, isSupplier, isEdit, isOpen, getContactById }) => {

  //** State */
  const ref = useRef();
  const { formSetting } = contactDetailFormData;
  const [editMode, setEditMode] = useState(false);
  const [contactId, setContactId] = useState(0);
  const [formData, setFormData] = useState(contactDetailFormData);
  const [customerContactId, setCustomerContactId] = useState(0);
  const [supplierContactId, setSupplierContactId] = useState(0);
  const [isButtonDisable, setIsButtonDisable] = useState(false);

  const { emailAddressData, setEmailAddressData, phoneNumberData, setPhoneNumberData } = useContext(isSupplier ? AddSupplierContext : BasicDetailContext);

  //** API Call's */
  const [addEdit, { isLoading: isAddEditLoading, isSuccess: isAddEditSuccess, data: isAddEditData }] = addEditContactMutation();
  const [getById, { isFetching: isGetByIdFetching, isSuccess: isGetByIdSucess, data: isGetByIdData }] = getContactById();

  //** Handle Changes */
  const handleAddEdit = () => {
    let data = ref.current.getFormData();
    if (data) {
      let contactTypeId = null;

      if (isSupplier === true) {
        if (isEdit) {
          contactTypeId = data.contactTypeId && typeof data.contactTypeId === "object" ? String(data.contactTypeId.value) : String(data.contactTypeId);
        } else {
          contactTypeId = String(data.contactTypeId.value);
        }
      } else {
        if (isEdit) {
          contactTypeId = data.contactTypeId && typeof data.contactTypeId === "object" ? String(data.contactTypeId.value) : String(data.contactTypeId);
        } else {
          contactTypeId = Array.isArray(data.contactTypeId) ? data.contactTypeId.map(String).join(",") : data.contactTypeId;
        }
      }

      let request = {
        ...data,
        contactTypeId: contactTypeId,
        customerId: isSupplier === false ? mainId : 0,
        contactId: contactId,
        customerContactId: customerContactId,
        emailList: emailAddressData.length > 0 ? emailAddressData : null,
        phoneList: phoneNumberData.length > 0 ? modifyPhoneNumberData(phoneNumberData) : null,
        supplierId: isSupplier === true ? mainId : 0,
        supplierContactId: supplierContactId,
      }
      addEdit(request);
    }
  };

  //** UseEffect */
  useEffect(() => {
    if (isAddEditSuccess && isAddEditData) {
      if (isAddEditData.errorMessage.includes('EXISTS')) {
        ToastService.warning(isAddEditData.errorMessage);
        return;
      }
      if (onSuccess) {
        setContactId(isAddEditData?.keyValue);
        onSuccess();
        ToastService.success(isAddEditData.errorMessage);
      }
    }
  }, [isAddEditSuccess, isAddEditData]);

  useEffect(() => {
    if (!isGetByIdFetching && isGetByIdSucess && isGetByIdData) {
      let data = isGetByIdData;
      let form = { ...contactDetailFormData };
      form.initialState = {
        firstName: data.firstName,
        lastName: data.lastName,
        contactTypeId: data.contactTypeId,
        isPrimary: data.isPrimary
      }
      setFormData(form);
      setContactId(data.contactId);
      setCustomerContactId(data?.customerContactId);
      setSupplierContactId(data?.supplierContactId);
      setFieldSetting(form, 'contactTypeId', settingTypeEnums.isMultiSelect);

      const modifyPhoneNumberList = isGetByIdData.phoneNumberList.map((item, index) => ({
        ...item,
        id: index + 1,
        extension: item.extension === 0 ? '-' : item.extension
      }));
      const modifyEmailAddressLst = isGetByIdData.emailAddressList.map((item, index) => ({
        ...item,
        id: index + 1
      }));

      setPhoneNumberData(modifyPhoneNumberList);
      setEmailAddressData(modifyEmailAddressLst);
    }
  }, [isGetByIdFetching, isGetByIdSucess]);

  //** Use Imperative Handle  */
  useImperativeHandle(editRef, () => ({
    callEditFunction: handleEditMode,
  }));

  useEffect(() => {
    if (isEditablePage && SecurityKey) {
      const hasEditPermission = hasFunctionalPermission(SecurityKey.EDIT);
      const hasAddPermission = hasFunctionalPermission(SecurityKey.ADD);
      if (hasEditPermission && formSetting) {
        if (editMode) {
          if (hasEditPermission.isViewOnly === true) {
            formSetting.isViewOnly = true;
            setIsButtonDisable(true);
          }
          else {
            formSetting.isViewOnly = false;
            setIsButtonDisable(false);
          }
        }
        else if (!editMode) {
          if (hasAddPermission.hasAccess === true) {
            formSetting.isViewOnly = false;
            setIsButtonDisable(false);
          }
        }
      }
    }
  }, [editMode, editRef, SecurityKey])

  const handleEditMode = (contactId) => {
    setEditMode(true);
    contactId && getById(contactId);
    setFieldSetting(contactDetailFormData, 'contactTypeId', settingTypeEnums.isDisabled, true);
  }

  useEffect(() => {
    if (!isEdit) {
      let form = { ...contactDetailFormData };
      setFieldSetting(form, 'contactTypeId', settingTypeEnums.isMultiSelect, isSupplier ? false : true);
      setFormData(form);
      if (isOpen) {
        setContactId(0);
        setEditMode(false);
        setPhoneNumberData("");
        setEmailAddressData("");
      }
    }
  }, [isOpen])

  //** Reset Data */
  const onResetData = () => {
    setFieldSetting(contactDetailFormData, 'contactTypeId', settingTypeEnums.isDisabled, false);
    let form = { ...contactDetailFormData };
    form.initialState = { ...contactDetailFormData.initialState };
    setFormData(form);
    setCustomerContactId(0);
    setSupplierContactId(0);
  };

  //** Use Imperative Handle  */
  useImperativeHandle(childRef, () => ({
    callChildFunction: onResetData,
  }));


  return (
    <div>
      <div className="row mt-3 addEditContact-form">
        <FormCreator config={formData} ref={ref} {...formData} />
      </div>
      <div className="row">
        {!isGetByIdFetching ?
          <React.Fragment>
            <ManageEmailAddress isButtonDisable={isButtonDisable} isSupplier={isSupplier} onGetContactList={onGetContactList} />
            <ManageContactNumbers isButtonDisable={isButtonDisable} isSupplier={isSupplier} onGetContactList={onGetContactList} />
          </React.Fragment>
          : <DataLoader />
        }
      </div>
      <div className="col-md-12 mt-3">
        <div className="d-flex align-item-end justify-content-end">
          <div className="d-flex align-item-end">
            <Buttons
              buttonTypeClassName="theme-button"
              buttonText='Save'
              isLoading={isAddEditLoading}
              onClick={handleAddEdit}
              isDisable={isButtonDisable}
            />
            <Buttons
              buttonTypeClassName="dark-btn ml-5"
              buttonText="Cancel"
              onClick={onSidebarClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default AddEditContact;
