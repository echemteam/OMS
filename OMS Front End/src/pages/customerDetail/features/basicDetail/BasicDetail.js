import React, { useRef } from "react";
import FormCreator from "../../../../components/Forms/FormCreator";
import {
  basicDetailFormData,
  basicDetailFormDataHalf,
} from "./component/BasicDetailForm.data";
import Buttons from "../../../../components/ui/button/Buttons";
import CardSection from "../../../../components/ui/card/CardSection";

const BasicDetail = ({ isFullWidthForm }) => {
  const userFormRef = useRef();
  return (
    <div className="basic-info-sec half-sec">
      {isFullWidthForm ? (
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
      ) : (
        <CardSection buttonClassName="theme-button">
          <div className="row horizontal-form basic-info-step">
            <FormCreator
              ref={userFormRef}
              {...basicDetailFormDataHalf}
              // onFormDataUpdate={handleFormDataChange}
            />
          </div>
        </CardSection>
      )}
    </div>
  );
};

export default BasicDetail;
