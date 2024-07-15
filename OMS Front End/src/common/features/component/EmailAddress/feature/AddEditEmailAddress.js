/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
//** Lib's */
import { Message } from '../utils/ContactMessages';
import Buttons from '../../../../../components/ui/button/Buttons';
import FormCreator from '../../../../../components/Forms/FormCreator';
import { addEditEmailFormData } from '../config/AddEditEmailForm.data';
import CenterModel from '../../../../../components/ui/centerModel/CenterModel';
import { addData, updateData } from '../utils/ContactEmailAddressUtil';

const AddEditEmailModal = ({ contactId, emailAddressList, setEmailAddressList, editFormData, handleToggleModal, showModal, isEdit, onSuccess }) => {

    //** State */
    const ref = useRef();
    const [formData, setFormData] = useState(addEditEmailFormData);

    //** Handle Changes */
    const handleAddEdit = () => {
        let data = ref.current.getFormData();
        if (data && !data.id) {
            let req = {
                ...data,
                isPrimary: data.isEmailPrimary
            }
            addData(req, contactId, emailAddressList, setEmailAddressList, Message.EmailAdded, Message.EmailMaxLength, Message.DuplicateEmail, onResetData, onSuccess);
        } else if (data && data.id) {
            let req = {
                ...data,
                isPrimary: data.isEmailPrimary
            }
            updateData(req, emailAddressList, setEmailAddressList, Message.EmailUpdated, Message.DuplicateEmail, Message.InvalidData, onResetData, onSuccess);
        }
    };

    useEffect(() => {
        if (isEdit && editFormData) {
            let form = { ...addEditEmailFormData };
            form.initialState = {
                emailAddress: editFormData.emailAddress,
                emailId: editFormData.emailId,
                id: editFormData.id,
                isEmailPrimary: editFormData.isPrimary
            }
            setFormData(form);
        }
    }, [isEdit, editFormData])

    //** Reset Data */
    const onResetData = () => {
        let form = { ...addEditEmailFormData };
        form.initialState = { ...addEditEmailFormData.initialState };
        setFormData(form);
    };

    return (
        <CenterModel showModal={showModal} handleToggleModal={handleToggleModal} modalTitle="Add/Edit Email Address" modelSizeClass="w-40">
            <div className="row">
                <div className="col-md-12 add-edit-emailAddressForm">
                    <div className="row vertical-form add-edit-contactForm">
                        <FormCreator config={formData} ref={ref} {...formData} />
                    </div>
                </div>
                <div className="col-md-12 mt-2">
                    <div className="d-flex align-item-center justify-content-end">
                        <Buttons
                            buttonTypeClassName="theme-button"
                            buttonText={`${isEdit ? "Update" : "Add"}`}
                            onClick={handleAddEdit} />
                        <Buttons
                            buttonTypeClassName="dark-btn ml-5"
                            buttonText="Cancel"
                            onClick={handleToggleModal} />
                    </div>
                </div>
            </div>
        </CenterModel>
    )
}

export default AddEditEmailModal