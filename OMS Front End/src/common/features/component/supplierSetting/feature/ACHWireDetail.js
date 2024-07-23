import React, { useRef, useState } from "react";
import CardSection from "../../../../../components/ui/card/CardSection";
import FormCreator from "../../../../../components/Forms/FormCreator";
import {
  aCHWireBankFormData,
  aCHWireFormData,
  aCHWireRegisterBankFormData,
} from "../config/ACHWireForm.data";

const ACHWireDetail = () => {
  const aCHWireBankFormRef = useRef();
  const aCHWireFormRef = useRef();
  const aCHWireRegisterBankFormRef = useRef();
  const [aCHWireBankForm, setACHWireBankForm] = useState(aCHWireBankFormData);
  const [aCHWireRegisterBankForm, setACHWireRegisterBankForm] = useState(
    aCHWireRegisterBankFormData
  );
  const [aCHWireForm, setACHWireForm] = useState(aCHWireFormData);
  

  //
  return (
    <div className="ach-wire-section">
      <div className="sub-card-sec-add">
        <CardSection cardTitle="Bank Address">
          <div className="row">
            <FormCreator
              config={aCHWireBankForm}
              ref={aCHWireBankFormRef}
              {...aCHWireBankForm}
              // key={shouldRerenderFormCreatorLogo}
            />
          </div>
        </CardSection>
      </div>
      <div className="sub-card-sec-add">
        <CardSection cardTitle="Registered Bank Address">
          <div className="row">
            <FormCreator
              config={aCHWireRegisterBankForm}
              ref={aCHWireRegisterBankFormRef}
              {...aCHWireRegisterBankForm}
              // key={shouldRerenderFormCreatorLogo}
            />
          </div>
        </CardSection>
      </div>
      <div className="sub-card-sec-add">
        <div className="row">
          <FormCreator
            config={aCHWireForm}
            ref={aCHWireFormRef}
            {...aCHWireForm}
            // key={shouldRerenderFormCreatorLogo}
          />
        </div>
      </div>
    </div>
  );
};

export default ACHWireDetail;
