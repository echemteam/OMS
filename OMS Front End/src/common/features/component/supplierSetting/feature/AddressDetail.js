import React, { useRef, useState } from "react";
import FormCreator from "../../../../../components/Forms/FormCreator";
import { addressFormData } from "../config/AddressForm.data";

const AddressDetail = () => {
  const addressFormRef = useRef();
  const [addressForm, setaddressForm] = useState(addressFormData);
  return (
    <div>
      <div className="row">
        <FormCreator
          config={addressForm}
          ref={addressFormRef}
          {...addressForm}
          // key={shouldRerenderFormCreatorLogo}
        />
      </div>
    </div>
  );
};

export default AddressDetail;
