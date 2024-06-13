import React, { useRef } from 'react'
import FormCreator from '../../../../../components/Forms/FormCreator'
import Buttons from '../../../../../components/ui/button/Buttons'
import CenterModel from '../../../../../components/ui/centerModel/CenterModel';
import { addEditContactsFormData } from './config/AddEditContactsForm.data';

const AddEditContactNumber = ({ handleToggleModal, showModal }) => {

    const ref = useRef();
    return (
        <CenterModel showModal={showModal} handleToggleModal={handleToggleModal}
            modalTitle="Add/Edit Email Address" modelSizeClass="w-40">
            <div className="row">
                <div className="col-md-12 horizontal-form">
                    <div className="row vertical-form">
                        <FormCreator
                            config={addEditContactsFormData}
                            ref={ref}
                            {...addEditContactsFormData}
                        // onFormDataUpdate={handleFormDataChange}
                        />
                    </div>
                </div>
                <div className="col-md-12 mt-2">
                    <div className="d-flex align-item-center justify-content-end">
                        <Buttons
                            buttonTypeClassName="theme-button"
                            buttonText="Add"
                        // onClick={onHandleUser}
                        // isLoading={EmailLoading || updateUserLoading}
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
