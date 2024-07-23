import React, { useRef, useState } from "react";
import CardSection from "../../../../../components/ui/card/CardSection";
import FormCreator from "../../../../../components/Forms/FormCreator";
import { aCHWireFormData } from "../config/ACHWireForm.data";
import AddressDetail from "./AddressDetail";

const ACHWireDetail = () => {
  const aCHWireFormRef = useRef();
  const [aCHWireForm, setACHWireForm] = useState(aCHWireFormData);

  //
  return (
    <div className="ach-wire-section">
      <div className="sub-card-sec-add">
        <CardSection cardTitle="Bank Address">
          <AddressDetail />
        </CardSection>
      </div>
      <div className="sub-card-sec-add">
        <CardSection cardTitle="Registered Bank Address">
          <AddressDetail />
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
