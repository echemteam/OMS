import React, { useContext, useEffect, useRef, useState } from 'react';
//** Lib's */
import Buttons from '../../../../../components/ui/button/Buttons';
import { addEditEmailFormData } from './config/AddEditEmailForm.data';
import FormCreator from '../../../../../components/Forms/FormCreator';
import ToastService from '../../../../../services/toastService/ToastService';
import CenterModel from '../../../../../components/ui/centerModel/CenterModel';
import BasicDetailContext from '../../../../../utils/ContextAPIs/Customer/BasicDetailContext';
//** Service's */
import { useAddContactEmailMutation, useUpdateContactEmailMutation } from '../../../../../app/services/emailAddressAPI';

const AddEditEmailModal = ({ editFormData, handleToggleModal, showModal, isEdit, onSuccess }) => {

    //** State */
    const ref = useRef();
    const { contactId } = useContext(BasicDetailContext);
    const [formData, setFormData] = useState(addEditEmailFormData);

    //** API Call's */
    const [add, { isLoading: isAddLoading, isSuccess: isAddSuccess, data: isAddData }] = useAddContactEmailMutation();
    const [update, { isLoading: isUpdateLoading, isSuccess: isUpdateSuccess, data: isUpdateData }] = useUpdateContactEmailMutation();

    //** Handle Changes */
    const handleAddEdit = () => {
        let data = ref.current.getFormData();
        if (data && !data.emailId) {
            let request = {
                ...data,
                contactId: contactId
            }
            add(request);
        } else if (data && data.emailId) {
            update(data);
        }
    };

    useEffect(() => {
        if (isAddSuccess && isAddData) {
            if (isAddData.keyValue === 0) {
                ToastService.warning(isAddData.errorMessage);
            } else {
                ToastService.success(isAddData.errorMessage);
            }
            onResetData();
            onSuccess();
        }
    }, [isAddSuccess, isAddData]);

    useEffect(() => {
        if (isUpdateSuccess && isUpdateData) {
            ToastService.success(isUpdateData.errorMessage);
            onResetData();
            onSuccess();
        }
    }, [isUpdateSuccess, isUpdateData]);

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
                            isLoading={isAddLoading || isUpdateLoading}
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