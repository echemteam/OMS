import React, { useRef, useState } from "react";
import { orderInformationData } from "./config/OrderInformation.data";
import FormCreator from "../../../../components/Forms/FormCreator";
import SwalAlert from "../../../../services/swalService/SwalService";

const OrderDetails = () => {
  const basicInformation = useRef();
  const [formData, setFormData] = useState(orderInformationData);
  const { blocked } = SwalAlert();

  const handleChangeDropdownList = (data, dataField) => {
    const blockedOptionValue = "blocked";
    
    if (data.status === blockedOptionValue) {
      blocked(
        "Blocked !",
        "The selected customer is currently blocked. Please choose a different customer",
        "OK",
        "Cancel"
      ).then((result) => {
        if (result) {
          console.log("User acknowledged the blocked status alert.");
        }
      });
    }
  };

  const formActionHandler = {
    DDL_CHANGED: handleChangeDropdownList,
  };

  return (
    <>
      <div className="row">
        <FormCreator
          config={formData}
          ref={basicInformation}
          {...formData}
          onActionChange={formActionHandler}
        />
      </div>
      <div className="row address-group">
        <div className="col-4"></div>
        <div className="col-4 address">
          <div>Chemistry Research Laboratory</div>
          <div>MansField Road</div>
          <div>Oxford</div>
          <div>United Kingdom, Oxfordshire OX1 3TA</div>
        </div>
        <div className="col-4 address">
          <div>Chemistry Research Laboratory</div>
          <div>MansField Road</div>
          <div>Oxford</div>
          <div>United Kingdom, Oxfordshire OX1 3TA</div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
