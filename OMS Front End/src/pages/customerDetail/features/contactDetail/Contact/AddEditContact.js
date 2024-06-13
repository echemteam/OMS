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

const AddEditContact = forwardRef(({ onSidebarClose, onSuccess, childRef, isEdit, editRef }) => {

  //** State */
  const ref = useRef();
  const [formData, setFormData] = useState(contactDetailFormData);
  const { customerId, setContactId } = useContext(BasicDetailContext);

  //** API Call's */
  const [addEdit, { isLoading: isAddEditLoading, isSuccess: isAddEditSuccess, data: isAddEditData }] = useAddEditContactMutation();

  //** Handle Changes */
  const handleAddEdit = () => {
    let data = ref.current.getFormData();
    if (data) {
      let request = {
        ...data,
        contactTypeId: data.contactTypeId && typeof data.contactTypeId === "object" ? data.contactTypeId.value : data.contactTypeId,
        customerId: customerId
      }
      addEdit(request);
    }
  };

  //** UseEffect */
  useEffect(() => {
    if (isAddEditSuccess && isAddEditData) {
      if (onSuccess) {
        onSuccess();
        setContactId(isAddEditData?.keyValue);
      }
      ToastService.success(isAddEditData.errorMessage);
    }
  }, [isAddEditSuccess, isAddEditData]);

  //** Use Imperative Handle  */
  useImperativeHandle(editRef, () => ({
    callEditFunction: handleEditMode,
  }));

  const handleEditMode = (data) => {
    if (data) {
      let form = { ...contactDetailFormData };
      form.initialState = data;
      setFormData(form);
      setContactId(data?.contactId);
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
                buttonText={`${isEdit ? "Update" : "Add"}`}
                isLoading={isAddEditLoading}
                onClick={handleAddEdit}
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
        <ManageEmailAddress />
        <ManageContactNumbers />
      </div>
    </div >
  );
});

export default AddEditContact;
