import React, { useRef } from "react";
import FormCreator from "../../../../../components/Forms/FormCreator";
import { SettingFormData } from "../config/SettingData";
import Buttons from "../../../../../components/ui/button/Buttons";

const FinancialSettings = () => {
  const settingFormRef = useRef();
  return (
    <>
      <div className="row horizontal-form">
        <FormCreator
          config={SettingFormData}
          ref={settingFormRef}
          {...SettingFormData}
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
  );
};

export default FinancialSettings;
