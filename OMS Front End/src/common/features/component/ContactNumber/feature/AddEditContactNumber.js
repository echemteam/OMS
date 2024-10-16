/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import PropTypes from 'prop-types';
//** Lib's */
import { Message } from "../../EmailAddress/utils/ContactMessages";
import Buttons from "../../../../../components/ui/button/Buttons";
import FormCreator from "../../../../../components/FinalForms/FormCreator";
import { addEditContactsFormData, initialPhoneTypeState } from "../config/AddEditContactsForm.data";
import CenterModel from "../../../../../components/ui/centerModel/CenterModel";
import {
  addPhoneNumberData,
  updatePhoneNumberData,
} from "../Util/ContactPhoneNumberUtil";

const AddEditContactNumber = ({
  contactId,
  phoneNumberList,
  setPhoneNumberList,
  editFormData,
  handleToggleModal,
  showModal,
  isEdit,
  onSuccess,
  newPhoneCode,
  addeditRef,
  isOrderManage
}) => {
  //** State */
  const ref = useRef();
  const [formData, setFormData] = useState(addEditContactsFormData);

  //** Handle Changes */
  const handleAddEdit = () => {
    let data = ref.current.getFormData();
    if (data) {
      if (!data.id) {
        let req = {
          ...data,
          phoneTypeId: data.phoneTypeId && typeof data.phoneTypeId === "object" ? data.phoneTypeId : initialPhoneTypeState,
          isPrimary: data.isPrimaryPhoneNumber,
        };
        addPhoneNumberData(
          req,
          contactId,
          phoneNumberList,
          setPhoneNumberList,
          Message.ContactNumberAdded,
          Message.ContactNumberMaxLength,
          Message.ContactNumberDuplicate,
          onResetData,
          onSuccess
        );
      } else if (data.id) {
        let req = {
          ...data,
          isPrimary: data.isPrimaryPhoneNumber,
        };
        updatePhoneNumberData(
          req,
          phoneNumberList,
          setPhoneNumberList,
          Message.ContactNumberUpdated,
          Message.ContactNumberDuplicate,
          Message.InvalidData,
          onResetData,
          onSuccess
        );
      }
    }
  };

  const handleCheckBoxChange = (data) => {
    let req = {
      ...data,
      isPrimaryPhoneNumber: data.isPrimary,
    };
    updatePhoneNumberData(req, phoneNumberList, setPhoneNumberList, Message.ContactNumberUpdated, Message.ContactNumberDuplicate, Message.InvalidData);
  }

  //** Use Imperative Handle */
  useImperativeHandle(addeditRef, () => ({
    callChildFunction: handleCheckBoxChange
  }));

  //** UseEffect */
  useEffect(() => {
    if (isEdit && editFormData) {
      let form = { ...addEditContactsFormData };
      let obj = {
        PhoneNumber: editFormData?.phoneCode + editFormData?.phoneNumber
      }
      form.initialState = {
        extension: editFormData.extension,
        id: editFormData.id,
        isPrimaryPhoneNumber: editFormData.isPrimary,
        phoneId: editFormData.phoneId,
        phoneNumber: obj,
        phoneType: editFormData.phoneType,
        phoneTypeId: editFormData.phoneTypeId,
      };
      setFormData(form);
    } else if (isEdit === false && newPhoneCode) {
      let form = { ...addEditContactsFormData };
      form.initialState = {
        ...form.initialState,
      };
      setFormData(form);
    }
  }, [isEdit, editFormData]);

  //** Reset Data */
  const onResetData = () => {
    let form = { ...addEditContactsFormData };
    form.initialState = { ...addEditContactsFormData.initialState };
    setFormData(form);
  };

  useEffect(() => {
    if (isOrderManage || showModal) {
      onResetData()
    }
  }, [isOrderManage, showModal]);


  return (
    <CenterModel
      showModal={showModal}
      handleToggleModal={handleToggleModal}
      modalTitle="Add/Edit Contact"
      modelSizeClass="w-40"
    >
      <div className="row  phone-numer-card">
        <div className="col-md-12 add-edit-phoneForm">
          <div className="row vertical-form">
            <FormCreator config={formData} ref={ref} />
          </div>
        </div>
        <div className="col-md-12 mt-2">
          <div className="d-flex align-item-center justify-content-end">
            <Buttons
              buttonTypeClassName="theme-button"
              buttonText={`${isEdit ? "Update" : "Add"}`}
              onClick={handleAddEdit}
            />
            <Buttons
              buttonTypeClassName="dark-btn ml-5"
              buttonText="Cancel"
              onClick={handleToggleModal}
            />
          </div>
        </div>
      </div>
    </CenterModel>
  );
};
AddEditContactNumber.propTypes = {
  contactId: PropTypes.number.isRequired,
  phoneNumberList: PropTypes.arrayOf(PropTypes.shape({
    phoneNumber: PropTypes.string.isRequired,
    //phoneCode: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    phoneTypeId: PropTypes.number,
    phoneType: PropTypes.string,
    isPrimary: PropTypes.bool,
    extension: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  })).isRequired,
  setPhoneNumberList: PropTypes.func.isRequired,
  editFormData: PropTypes.shape({
    extension: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    id: PropTypes.number,
    isPrimary: PropTypes.bool,
    // phoneCode: PropTypes.string,
    phoneId: PropTypes.number,
    phoneNumber: PropTypes.string,
    phoneType: PropTypes.string,
    phoneTypeId: PropTypes.number
  }),
  handleToggleModal: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  isEdit: PropTypes.bool.isRequired,
  onSuccess: PropTypes.func.isRequired
};
export default AddEditContactNumber;
