import React, { useRef } from "react";
import FormCreator from "../../../../components/Forms/FormCreator";
import { addEditRoleFormData } from "./formData/AddEditRoleForm.data";
import Buttons from "../../../../components/ui/button/Buttons";

const AddEditRoleModel = (props) => {
  const roleFromRef = useRef();
  return (
    <div>
      <div className="row">
        <div className="col-md-12 horizontal-form">
          <div className="row vertical-form">
            <FormCreator
              ref={roleFromRef}
              {...addEditRoleFormData}
              // onFormDataUpdate={handleFormDataChange}
            />
          </div>
        </div>
        <div className="col-md-12 mt-2">
          <div className="d-flex align-item-center justify-content-end">
            <Buttons
              buttonTypeClassName="theme-button"
              buttonText="Add Role"
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
  );
};

export default AddEditRoleModel;
