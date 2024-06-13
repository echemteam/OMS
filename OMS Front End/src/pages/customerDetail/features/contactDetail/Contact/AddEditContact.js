import React, { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import FormCreator from "../../../../../components/Forms/FormCreator";
import { contactDetailFormData } from "./config/ContactDetailForm.data";
import Buttons from "../../../../../components/ui/button/Buttons";
import ManageEmailAddress from "../EmailAddress/ManageEmailAddress";
import ManageContactNumbers from "../ContactNumbers/ManageContactNumbers";
import { useAddContactMutation, useAddEditContactMutation } from "../../../../../app/services/contactAPI";
import ToastService from "../../../../../services/toastService/ToastService";
import BasicDetailContext from "../../../../../utils/ContextAPIs/Customer/BasicDetailContext";

const AddEditContact = forwardRef(({ onSidebarClose, onSuccess, childRef, isEdit, editFormData, modifyContactData }) => {

  const ref = useRef();
  const { customerId, setContactId } = useContext(BasicDetailContext);
  const [formData, setFormData] = useState(contactDetailFormData);

  //** API Call's */
  const [addEdit, { isLoading: isAddLoading, isSuccess: isAddSuccess, data: isAddData }] = useAddEditContactMutation();

  //** Handle Changes */
  const handleAddEdit = () => {
    let data = ref.current.getFormData();
    let request;
    if (data) {
      request = {
        ...data,
        contactTypeId: data.contactTypeId && typeof data.contactTypeId === "object" ? data.contactTypeId.value : data.contactTypeId,
        customerId: 15
      }
      addEdit(request);
      // request = {
      //   ...data,
      //   contactTypeId: data.contactTypeId && typeof data.contactTypeId === "object" ? data.contactTypeId.value : data.contactTypeId,
      //   customerId: 15
      // }
      // if (!data.contactId) {

      // } else if (data.contactId) {

      // }
    }
    // if (data && !data.contactId) {

    //   addEdit(request);
    // } else if (data && data.contactId) {
    //   let request = {
    //     ...data,
    //     contactTypeId: data.contactTypeId && typeof data.contactTypeId === "object" ? data.contactTypeId.value : data.contactTypeId,
    //     customerId: 15
    //   }
    //   addEdit(request);
    // }
  };

  useEffect(() => {
    if (isAddSuccess && isAddData) {
      if (onSuccess) {
        onSuccess();
        onResetData();
      }
      ToastService.success(isAddData.errorMessage);
    }
  }, [isAddSuccess, isAddData]);

  useEffect(() => {
    if (isEdit && editFormData) {
      let form = { ...contactDetailFormData };
      form.initialState = editFormData;
      setFormData(form);
      setContactId(editFormData?.contactId);
    }
  }, [isEdit, editFormData])


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
      {/* Add-Edit Contact */}
      <div className="row horizontal-form mt-4">
        <FormCreator config={formData} ref={ref} {...formData} />
        <div className="col-md-12 mt-3">
          <div className="d-flex align-item-end justify-content-end">
            <div className="d-flex align-item-end">
              <Buttons
                buttonTypeClassName="theme-button"
                buttonText={`${isEdit ? "Update" : "Add"}`}
                // isLoading={isAddLoading || isUpdateLoading}
                onClick={handleAddEdit}
                isLoading={isAddLoading}
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
        {/* Email Address List */}
        <ManageEmailAddress />
        {/* Contact Number List */}
        <ManageContactNumbers />
      </div>
    </div >
  );
});

export default AddEditContact;
