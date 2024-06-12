import React, { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import FormCreator from "../../../../../components/Forms/FormCreator";
import { contactDetailFormData } from "./config/ContactDetailForm.data";
import Buttons from "../../../../../components/ui/button/Buttons";
import ManageEmailAddress from "../EmailAddress/ManageEmailAddress";
import ManageContactNumbers from "../ContactNumbers/ManageContactNumbers";
import { useAddContactMutation } from "../../../../../app/services/contactAPI";
import ToastService from "../../../../../services/toastService/ToastService";
import BasicDetailContext from "../../../../../utils/ContextAPIs/Customer/BasicDetailContext";
import ContactContext from "../../../../../utils/ContextAPIs/Customer/ContactContext";

const AddEditContact = forwardRef(({ onSidebarClose, onSuccess, childRef, isEdit, editFormData, modifyContactData }) => {

  const ref = useRef();
  const { customerId } = useContext(BasicDetailContext);
  const { setContactId, setEmailAddressData, setContactNumbers } = useContext(ContactContext);
  const [formData, setFormData] = useState(contactDetailFormData);

  //** API Call's */
  const [add, { isLoading: isAddLoading, isSuccess: isAddSuccess, data: isAddData }] = useAddContactMutation();
  // const [update, { isLoading: isUpdateLoading, isSuccess: isUpdateSuccess, data: isUpdateData }] = useUpdateMutation();

  //** Handle Changes */
  const handleAddEdit = () => {
    let data = ref.current.getFormData();
    if (data && !data.contactId) {
      let request = {
        ...data,
        contactTypeId: data.contactTypeId && typeof data.contactTypeId === "object" ? data.contactTypeId.value : data.contactTypeId,
        customerId: 15
      }
      add(request);
    } else if (data && data.contactId) {
      //update(data);
    }
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
      form.initialState = editFormData?.cardInformation;
      setFormData(form);
      setContactId(editFormData?.cardInformation.contactId);
      setEmailAddressData(editFormData?.emailList);
      setContactNumbers(editFormData?.phoneList);
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
