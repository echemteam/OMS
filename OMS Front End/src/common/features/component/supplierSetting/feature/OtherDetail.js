import React, { useRef, useState } from "react";
import CardSection from "../../../../../components/ui/card/CardSection";
import FormCreator from "../../../../../components/Forms/FormCreator";
import { otherFormData } from "../config/OtherForm.data";

const OtherDetail = () => {
  const otherFormRef = useRef();
  const [otherForm, setOtherForm] = useState(otherFormData);
  return (
    <>
      <div className="ach-wire-section">
        <div className="sub-card-sec-add">
          <div className="row">
            <FormCreator
              config={otherForm}
              ref={otherFormRef}
              {...otherForm}
              // key={shouldRerenderFormCreatorLogo}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default OtherDetail;
