import React, { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
//** Lib's */
import Buttons from "../../../../../components/ui/button/Buttons";
import FormCreator from "../../../../../components/Forms/FormCreator";
import { contactDetailFormData } from "./config/ContactDetailForm.data";
import ToastService from "../../../../../services/toastService/ToastService";
import BasicDetailContext from "../../../../../utils/ContextAPIs/Customer/BasicDetailContext";
//** Service's */
import { useAddEditContactMutation } from "../../../../../app/services/contactAPI";
//** Component's */
const ManageEmailAddress = React.lazy(() => import("../EmailAddress/ManageEmailAddress"));
const ManageContactNumbers = React.lazy(() => import("../ContactNumbers/ManageContactNumbers"));

const AddEditContact = forwardRef(({ isAddModelOpen, addRef, onSidebarClose, onSuccess, childRef, isEdit, editRef, onGetContactList }) => {

  //** State */
  const ref = useRef();
  const { formSetting } = contactDetailFormData;
  const [formData, setFormData] = useState(contactDetailFormData);
  const [customerContactId, setCustomerContactId] = useState(0);
  const [isButtonDisable, setIsButtonDisable] = useState(false);
  const { customerId, contactId, setContactId } = useContext(BasicDetailContext);

  //** API Call's */
  const [addEdit, { isLoading: isAddEditLoading, isSuccess: isAddEditSuccess, data: isAddEditData }] = useAddEditContactMutation();

  //** Handle Changes */
  const handleAddEdit = () => {
    let data = ref.current.getFormData();
    if (data) {
      let request = {
        ...data,
        contactTypeId: data.contactTypeId && typeof data.contactTypeId === "object" ? data.contactTypeId.value : data.contactTypeId,
        customerId: customerId,
        contactId: contactId,
        customerContactId: customerContactId
      }
      addEdit(request);
    }
  };


  //** UseEffect */
  useEffect(() => {
    if (isAddEditSuccess && isAddEditData) {
      if (onSuccess) {
        setContactId(isAddEditData?.keyValue);
        if (isAddModelOpen) {
          formSetting.isViewOnly = true;
          setIsButtonDisable(true);
        }
        onSuccess();
      }
      ToastService.success(isAddEditData.errorMessage);
    }
  }, [isAddEditSuccess, isAddEditData]);

  //** Use Imperative Handle  */
  useImperativeHandle(editRef, () => ({
    callEditFunction: handleEditMode,
  }));

  useImperativeHandle(addRef, () => ({
    callOpenModalFunction: handleOpenModal,
  }));

  const handleOpenModal = () => {
    formSetting.isViewOnly = false;
    setIsButtonDisable(false);
  }

  const handleEditMode = (data) => {
    formSetting.isViewOnly = false;
    setIsButtonDisable(false);
    if (data) {
      let form = { ...contactDetailFormData };
      form.initialState = {
        firstName: data.firstName,
        lastName: data.lastName,
        contactTypeId: data.contactTypeId
      }
      setFormData(form);
      setContactId(data?.contactId);
      setCustomerContactId(data?.customerContactId);
    }
  }

  //** Reset Data */
  const onResetData = () => {
    let form = { ...contactDetailFormData };
    form.initialState = { ...contactDetailFormData.initialState };
    setFormData(form);
  };

  //** Use Imperative Handle  */
  useImperativeHandle(childRef, () => ({
    callChildFunction: onResetData,
  }));


  return (
    <div>
      <div className="row horizontal-form mt-4">
        <FormCreator config={formData} ref={ref} {...formData} />
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
      <div className="row">
        <ManageEmailAddress onGetContactList={onGetContactList} />
        <ManageContactNumbers onGetContactList={onGetContactList} />
      </div>
    </div >
  );
});

export default AddEditContact;
