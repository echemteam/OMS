import React, { useContext, useEffect, useRef, useState } from 'react';
//** Lib's */
import Buttons from '../../../../../components/ui/button/Buttons';
import FormCreator from '../../../../../components/Forms/FormCreator';
import { addEditContactsFormData } from './config/AddEditContactsForm.data';
import ToastService from '../../../../../services/toastService/ToastService';
import CenterModel from '../../../../../components/ui/centerModel/CenterModel';
import BasicDetailContext from '../../../../../utils/ContextAPIs/Customer/BasicDetailContext';
//** Service's */
import { useAddContactPhoneMutation, useUpdateContactPhoneMutation } from '../../../../../app/services/phoneNumberAPI';

const AddEditContactNumber = ({ editFormData, handleToggleModal, showModal, isEdit, onSuccess }) => {

    //** State */
    const ref = useRef();
    const [formData, setFormData] = useState(addEditContactsFormData);
    const { contactId, allCountries } = useContext(BasicDetailContext);

    //** API Call's */
    const [add, { isLoading: isAddLoading, isSuccess: isAddSuccess, data: isAddData }] = useAddContactPhoneMutation();
    const [update, { isLoading: isUpdateLoading, isSuccess: isUpdateSuccess, data: isUpdateData }] = useUpdateContactPhoneMutation();

    //** Handle Changes */
    const handleAddEdit = () => {
        let data = ref.current.getFormData();
        if (data) {
            let request = {
                ...data,
                phoneCode: data.phoneCode && typeof data.phoneCode === "object" ? data.phoneCode.label : data.phoneCode,
                contactId: contactId,
                phoneTypeId: 1
            }
            if (!data.phoneId) {
                add(request);
            } else if (data.phoneId) {
                update(request);
            }
        }
    };

    //** UseEffect */
    useEffect(() => {
        if (allCountries) {
            const getData = allCountries.map((country) => ({
                value: country.countryId,
                label: country.phoneCode,
            }));
            const dropdownField = addEditContactsFormData.formFields.find(
                (item) => item.dataField === "phoneCode"
            );
            dropdownField.fieldSetting.options = getData;
        }
    }, [allCountries]);

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
            let form = { ...addEditContactsFormData };
            form.initialState = editFormData;
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
            modalTitle="Add/Edit Email Address" modelSizeClass="w-40">
            <div className="row">
                <div className="col-md-12 horizontal-form">
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

export default AddEditContactNumber
