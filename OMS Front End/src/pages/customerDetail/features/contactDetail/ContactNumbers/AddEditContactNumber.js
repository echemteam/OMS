/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from 'react';
//** Lib's */
import { Message } from '../Util/ContactMessages';
import Buttons from '../../../../../components/ui/button/Buttons';
import FormCreator from '../../../../../components/Forms/FormCreator';
import { addEditContactsFormData } from './config/AddEditContactsForm.data';
import CenterModel from '../../../../../components/ui/centerModel/CenterModel';
import { addPhoneNumberData, updatePhoneNumberData } from '../Util/ContactPhoneNumberUtil';
import BasicDetailContext from '../../../../../utils/ContextAPIs/Customer/BasicDetailContext';
import AddSupplierContext from '../../../../../utils/ContextAPIs/Supplier/AddSupplierContext';

const AddEditContactNumber = ({ editFormData, handleToggleModal, showModal, isEdit, onSuccess, isSupplier }) => {

    //** State */
    const ref = useRef();
    const [formData, setFormData] = useState(addEditContactsFormData);
    const { contactId, setPhoneNumberData, phoneNumberData } = useContext(isSupplier ? AddSupplierContext : BasicDetailContext);


    //** Handle Changes */
    const handleAddEdit = () => {
        let data = ref.current.getFormData();
        if (data) {
            if (!data.id) {
                let req = {
                    ...data,
                    isPrimary: data.isPrimaryPhoneNumber
                }
                addPhoneNumberData(req, contactId, phoneNumberData, setPhoneNumberData, Message.ContactNumberAdded, Message.ContactNumberMaxLength, Message.ContactNumberDuplicate, onResetData, onSuccess);
            } else if (data.id) {
                let req = {
                    ...data,
                    isPrimary: data.isPrimaryPhoneNumber
                }
                updatePhoneNumberData(req, phoneNumberData, setPhoneNumberData, Message.ContactNumberUpdated, Message.ContactNumberDuplicate, Message.InvalidData, onResetData, onSuccess);
            }
        }
    };

    //** UseEffect */
    useEffect(() => {
        if (isEdit && editFormData) {
            let form = { ...addEditContactsFormData };
            form.initialState = {
                extension: editFormData.extension,
                id: editFormData.id,
                isPrimaryPhoneNumber: editFormData.isPrimary,
                phoneCode: editFormData.phoneCode,
                phoneId: editFormData.phoneId,
                phoneNumber: editFormData.phoneNumber,
                phoneType: editFormData.phoneType,
                phoneTypeId: editFormData.phoneTypeId,
            }
            setFormData(form);
        }
    }, [isEdit, editFormData])

    //** Reset Data */
    const onResetData = () => {
        let form = { ...addEditContactsFormData };
        form.initialState = { ...addEditContactsFormData.initialState };
        setFormData(form);
    };


    return (
        <CenterModel showModal={showModal} handleToggleModal={handleToggleModal}
            modalTitle="Add/Edit Contact" modelSizeClass="w-45">
            <div className="row  phone-numer-card">
                <div className="col-md-12 add-edit-phoneForm">
                    <div className="row vertical-form">
                        <FormCreator config={formData} ref={ref} {...formData} />
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
    )
}

export default AddEditContactNumber
