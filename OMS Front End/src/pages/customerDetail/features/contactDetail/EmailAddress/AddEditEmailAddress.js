import React, { useContext, useEffect, useRef, useState } from 'react'
import FormCreator from '../../../../../components/Forms/FormCreator'
import Buttons from '../../../../../components/ui/button/Buttons'
import { addEditEmailFormData } from './config/AddEditEmailForm.data';
import CenterModel from '../../../../../components/ui/centerModel/CenterModel';
import { useAddContactEmailMutation } from '../../../../../app/services/contactAPI';
import BasicDetailContext from '../../../../../utils/ContextAPIs/Customer/BasicDetailContext';
import ContactContext from '../../../../../utils/ContextAPIs/Customer/ContactContext';

const AddEditEmailModal = () => {

    // const ref = useRef();
    // const [formData, setFormData] = useState(addEditEmailFormData);
    const { showSubModal, handleSubToggleModal, editFormData, isEdit, handleAddEdit, isAddLoading, formData, formRef, handleEditMode } = useContext(ContactContext);

    //** API Call's */
    // const [add, { isLoading: isAddLoading, isSuccess: isAddSuccess, data: isAddData }] = useAddContactEmailMutation();

    // //** Handle Changes */
    // const handleAddEdit = () => {
    //     let data = ref.current.getFormData();
    //     if (data && !data.contactId) {
    //         let request = {
    //             ...data,
    //             contactTypeId: data.contactTypeId && typeof data.contactTypeId === "object" ? data.contactTypeId.value : data.contactTypeId,
    //             customerId: 15
    //         }
    //         add(request);
    //     } else if (data && data.contactId) {
    //         //update(data);
    //     }
    // };

    useEffect(() => {
        handleEditMode();
    }, [isEdit, editFormData])

    return (
        <CenterModel
            showModal={showSubModal}
            handleToggleModal={handleSubToggleModal}
            modalTitle="Add/Edit Email Address"
            modelSizeClass="w-40">
            <div>
                <div className="row">
                    <div className="col-md-12 horizontal-form">
                        <div className="row vertical-form">
                            <FormCreator
                                config={formData}
                                ref={formRef}
                                {...formData} />
                        </div>
                    </div>
                    <div className="col-md-12 mt-2">
                        <div className="d-flex align-item-center justify-content-end">
                            <Buttons
                                buttonTypeClassName="theme-button"
                                buttonText={`${isEdit ? "Update" : "Add"}`}
                                onClick={handleAddEdit}
                                isLoading={isAddLoading}
                            />
                            <Buttons
                                buttonTypeClassName="dark-btn ml-5"
                                buttonText="Cancel"
                                onClick={handleSubToggleModal}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </CenterModel>
    )
}

export default AddEditEmailModal
