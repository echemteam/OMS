import React, { useContext, useEffect, useRef, useState } from 'react';
//** Lib's */
import { Message } from '../Util/ContactMessages';
import Buttons from '../../../../../components/ui/button/Buttons';
import { addEditEmailFormData } from './config/AddEditEmailForm.data';
import { addData, updateData } from '../Util/ContactEmailAddressUtil';
import FormCreator from '../../../../../components/Forms/FormCreator';
import CenterModel from '../../../../../components/ui/centerModel/CenterModel';
import BasicDetailContext from '../../../../../utils/ContextAPIs/Customer/BasicDetailContext';

const AddEditEmailModal = ({ editFormData, handleToggleModal, showModal, isEdit, onSuccess }) => {

    //** State */
    const ref = useRef();
    const [formData, setFormData] = useState(addEditEmailFormData);
    const { contactId, emailAddressData, setEmailAddressData } = useContext(BasicDetailContext);

    //** Handle Changes */
    const handleAddEdit = () => {
        let data = ref.current.getFormData();
        if (data && !data.id) {
            addData(data, contactId, emailAddressData, setEmailAddressData, Message.EmailAdded, Message.EmailMaxLength, Message.DuplicateEmail, onResetData, onSuccess);
        } else if (data && data.id) {
            updateData(data, emailAddressData, setEmailAddressData, Message.EmailUpdated, Message.DuplicateEmail, Message.InvalidData, onResetData, onSuccess);
        }
    };

    useEffect(() => {
        if (isEdit && editFormData) {
            let form = { ...addEditEmailFormData };
            form.initialState = editFormData;
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
        <CenterModel
            showModal={showModal}
            handleToggleModal={handleToggleModal}
            modalTitle="Add/Edit Email Address"
            modelSizeClass="w-40">
            <div className="row">
                <div className="col-md-12 horizontal-form">
                    <div className="row vertical-form">
                        <FormCreator
                            config={formData}
                            ref={ref}
                            {...formData} />
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

export default AddEditEmailModal
