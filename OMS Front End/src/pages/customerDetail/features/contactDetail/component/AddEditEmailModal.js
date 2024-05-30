import React, { useRef } from 'react'
import FormCreator from '../../../../../components/Forms/FormCreator'
import Buttons from '../../../../../components/ui/button/Buttons'
import { addEditEmailFormData } from './formData/AddEditEmailForm.data';

const AddEditEmailModal = (props) => {
  const addEditEmailFormRef = useRef();
  return (
    <div>
      <div className="row">
        <div className="col-md-12 horizontal-form">
          <div className="row vertical-form">
            <FormCreator
              ref={addEditEmailFormRef}
              {...addEditEmailFormData}
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
              onClick={props.handleToggleModal}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddEditEmailModal
