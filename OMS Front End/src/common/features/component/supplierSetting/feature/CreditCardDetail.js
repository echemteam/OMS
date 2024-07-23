import React, { useRef, useState } from "react";
import FormCreator from "../../../../../components/Forms/FormCreator";
import { creditCardFormData } from "../config/CreditCardForm.data";

const CreditCardDetail = () => {
  const creditCardFormRef = useRef();
  const [creditCardForm, setCreditCardFormDataForm] =
    useState(creditCardFormData);
  return (
    <div className="ach-wire-section">
      <div className="sub-card-sec-add">
        <div className="row">
          <FormCreator
            config={creditCardForm}
            ref={creditCardFormRef}
            {...creditCardForm}
            // key={shouldRerenderFormCreatorLogo}
          />
        </div>
      </div>
    </div>
  );
};

export default CreditCardDetail;
