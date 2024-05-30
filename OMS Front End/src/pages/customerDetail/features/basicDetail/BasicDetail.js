import React, { useRef } from "react";
import FormCreator from "../../../../components/Forms/FormCreator";
import { basicDetailFormData } from "./component/BasicDetailForm.data";
import Buttons from "../../../../components/ui/button/Buttons";

const BasicDetail = () => {
  const userFormRef = useRef();
  return (
    <div className="basic-info-sc">
      <div className="row">
        <FormCreator
          ref={userFormRef}
          {...basicDetailFormData}
          // onFormDataUpdate={handleFormDataChange}
        />
        <div className="col-md-12">
          <div className="d-flex align-item-end justify-content-end">
            <Buttons
              buttonTypeClassName="theme-button"
              buttonText="Save"
              // onClick={onHandleUser}
              // isLoading={EmailLoading || updateUserLoading}
            />
            <Buttons
              buttonTypeClassName="dark-btn ml-5"
              buttonText="Cancel"
              // onClick={BackButton}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicDetail;
