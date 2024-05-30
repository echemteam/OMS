import React, { useRef } from 'react'
import FormCreator from '../../../../../components/Forms/FormCreator'
import Buttons from '../../../../../components/ui/button/Buttons'
import { addEditContactsFormData } from './formData/AddEditContactsForm.data';

const AddEditContactsModal = (props) => {
  const addEditContactFormRef = useRef();
  return (
    <div>
      <div className="row">
        <div className="col-md-12 horizontal-form">
          <div className="row vertical-form">
            <FormCreator
              ref={addEditContactFormRef}
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
              onClick={props.handleToggleModal}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddEditContactsModal
