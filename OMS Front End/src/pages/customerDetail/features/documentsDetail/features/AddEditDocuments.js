import React, { useRef } from 'react'
import FormCreator from '../../../../../components/Forms/FormCreator'
import Buttons from '../../../../../components/ui/button/Buttons'
import { DocumentFormData } from '../config/DocumentsData'

const AddEditDocuments = () => {
  const documentFormRef = useRef();
  return (
    <>
     <div className="row horizontal-form">
        <FormCreator
          ref={documentFormRef}
          {...DocumentFormData}
          // onFormDataUpdate={handleFormDataChange}
        />
        <div className="col-md-12 mt-2">
          <div className="d-flex align-item-end justify-content-end">
            <div className="d-flex align-item-end">
              <Buttons
                buttonTypeClassName="theme-button"
                buttonText="Save"
                // onClick={onHandleUser}
                // isLoading={EmailLoading || updateUserLoading}
              />
              <Buttons
                buttonTypeClassName="dark-btn ml-5"
                buttonText="Cancel"
                // onClick={onSidebarClose}
              />
            </div>
          </div>
        </div>
      </div> 
    </>
  )
}

export default AddEditDocuments
