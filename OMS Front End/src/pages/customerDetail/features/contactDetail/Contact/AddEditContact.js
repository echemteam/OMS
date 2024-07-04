import React, { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
//** Lib's */
import Buttons from "../../../../../components/ui/button/Buttons";
import FormCreator from "../../../../../components/Forms/FormCreator";
import { contactDetailFormData } from "./config/ContactDetailForm.data";
import ToastService from "../../../../../services/toastService/ToastService";
import BasicDetailContext from "../../../../../utils/ContextAPIs/Customer/BasicDetailContext";
import { hasFunctionalPermission } from "../../../../../utils/AuthorizeNavigation/authorizeNavigation";
import AddSupplierContext from "../../../../../utils/ContextAPIs/Supplier/AddSupplierContext";
import { modifyPhoneNumberData } from "../../../../../utils/TransformData/TransformAPIData";
//** Component's */
const ManageEmailAddress = React.lazy(() => import("../EmailAddress/ManageEmailAddress"));
const ManageContactNumbers = React.lazy(() => import("../ContactNumbers/ManageContactNumbers"));

const AddEditContact = forwardRef(({ mainId, addEditContactMutation, onSidebarClose, onSuccess, childRef, editRef, onGetContactList, editFormData, SecurityKey, isEditablePage, isSupplier, isEdit , isOpen }) => {

  //** State */
  const ref = useRef();
  const { formSetting } = contactDetailFormData;
  const [formData, setFormData] = useState(contactDetailFormData);
  const [customerContactId, setCustomerContactId] = useState(0);
  const [supplierContactId, setSupplierContactId] = useState(0);
  const [isButtonDisable, setIsButtonDisable] = useState(false);

  const { contactId, setContactId, emailAddressData, phoneNumberData } = useContext(isSupplier ? AddSupplierContext : BasicDetailContext);

  //** API Call's */
  const [addEdit, { isLoading: isAddEditLoading, isSuccess: isAddEditSuccess, data: isAddEditData }] = addEditContactMutation();

  //** Handle Changes */
  const handleAddEdit = () => {
    let data = ref.current.getFormData();
    if (data) {
      let contactTypeId = null;
      
      if (isSupplier === true) {
        if (isEdit) {
          contactTypeId = data.contactTypeId && typeof data.contactTypeId === "object"
          ? String(data.contactTypeId.value)
          : String(data.contactTypeId);
        } else {
          contactTypeId = String(data.contactTypeId.value);
        }
      } else {
        if (isEdit) {
          contactTypeId = data.contactTypeId && typeof data.contactTypeId === "object"
            ? String(data.contactTypeId.value)
            : String(data.contactTypeId);
        } else {
          contactTypeId = Array.isArray(data.contactTypeId)
            ? data.contactTypeId.map(String).join(",")
            : data.contactTypeId;
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

  //** Use Imperative Handle  */
  useImperativeHandle(editRef, () => ({
    callEditFunction: handleEditMode,
  }));

  useEffect(() => {
    if (isEditablePage && SecurityKey) {
      const hasEditPermission = hasFunctionalPermission(SecurityKey.EDIT);
      const hasAddPermission = hasFunctionalPermission(SecurityKey.ADD);
      if (hasEditPermission && formSetting) {
        if (editFormData) {
          if (hasEditPermission.isViewOnly === true) {
            formSetting.isViewOnly = true;
            setIsButtonDisable(true);
          }
          else {
            formSetting.isViewOnly = false;
            setIsButtonDisable(false);
          }
        }
        else if (!editFormData) {
          if (hasAddPermission.hasAccess === true) {
            formSetting.isViewOnly = false;
            setIsButtonDisable(false);
          }
        }
      }
    }
  }, [editRef, editFormData, SecurityKey])

  const handleEditMode = (data) => {
    if (data) {
      let form = { ...contactDetailFormData };
      form.initialState = {
        firstName: data.firstName,
        lastName: data.lastName,
        contactTypeId: data.contactTypeId,
        isPrimary: data.isPrimary
      }
      const dropdownFieldIndex = form.formFields.findIndex(
        (item) => item.dataField === "contactTypeId"
      );
      form.formFields[dropdownFieldIndex].fieldSetting.isMultiSelect = false;
      setFormData(form);
      setContactId(data?.contactId);
      setCustomerContactId(data?.customerContactId);
      setSupplierContactId(data?.supplierContactId);
    }
  }

  useEffect(() => {
    if (isEdit === false) {
      let form = { ...contactDetailFormData };
      const dropdownFieldIndex = form.formFields.findIndex(
        (item) => item.dataField === "contactTypeId"
      );
      form.formFields[dropdownFieldIndex].fieldSetting.isMultiSelect = true;
      setFormData(form);
    }
  }, [isEdit])

  useEffect(() => {
    if (isSupplier === true) {
      let form = { ...contactDetailFormData };
      const dropdownFieldIndex = form.formFields.findIndex(
        (item) => item.dataField === "contactTypeId"
      );
      form.formFields[dropdownFieldIndex].fieldSetting.isMultiSelect = false;
      setFormData(form);
    }
  }, [isOpen])

  //** Reset Data */
  const onResetData = () => {
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
      <div className="row horizontal-form mt-4">
        <FormCreator config={formData} ref={ref} {...formData} />
      </div>
      <div className="row">
        <ManageEmailAddress isSupplier={isSupplier} onGetContactList={onGetContactList} />
        <ManageContactNumbers isSupplier={isSupplier} onGetContactList={onGetContactList} />
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
