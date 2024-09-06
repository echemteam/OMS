/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { PaymentMethodTypes } from "../../../../utils/Enums/commonEnums";
import Checkbox from "../../../ui/inputs/checkBox/CheckBox";
import PropTypes from "prop-types";

const SettingInformation = ({
  isModelOpen,
  mainId,
  getFinacialSettingById,
  approvalChekedData ,
  handleCheckbox
}) => {
  //** State */
  const [finacialInformation, setFinacialInformation] = useState();
  const [isChecked,setIsChecked]=useState(approvalChekedData?.isChecked || false);

  //** API Call's */
  const [
    getFinacialSetting,
    {
      isFetching: isFinacialSettingFetching,
      isSuccess: isFinacialSettingSuccess,
      data: isFinacialSettingData,
    },
  ] = getFinacialSettingById();

  useEffect(() => {
    if (isModelOpen && mainId) {
      getFinacialSetting(mainId);
    }
  }, [isModelOpen, mainId]);

  useEffect(() => {
    if (
      !isFinacialSettingFetching &&
      isFinacialSettingSuccess &&
      isFinacialSettingData
    ) {
      setFinacialInformation(isFinacialSettingData);
    }
  }, [
    isFinacialSettingFetching,
    isFinacialSettingSuccess,
    isFinacialSettingData,
  ]);

  const getPaymentMethodName = (methodId) => {
    switch (methodId) {
      case PaymentMethodTypes.CHECK:
        return "Check";
      case PaymentMethodTypes.ACHECHECK:
        return "ACH / Echeck";
      case PaymentMethodTypes.WIRE:
        return "Wire";
      case PaymentMethodTypes.CREDITCARD:
        return "Credit Card";
      case PaymentMethodTypes.OTHERWITHNOTEDIELD:
        return "Other - With noted field";
      default:
        return "Unknown Method";
    }
  };
  const handleChange = (checkedValue,newValue) => {
    setIsChecked(newValue);
    handleCheckbox(checkedValue,newValue);  
  };

  return (
    <>
      <div className="card-top-title">
        <h5> Finacial Information </h5>
        <div className="checkbox-part">
          <Checkbox 
            name={"settingInformation"} 
            dataField={"settingInformation"}
            checked={isChecked || false}
            onChange={handleChange}   />
        </div>
      </div>
      {finacialInformation && (
        <>
          <h6>
            Payment Method:{" "}
            {getPaymentMethodName(finacialInformation.paymentMethodId)}
          </h6>
          <h6> Credit Limit: {finacialInformation.creditLimit}</h6>
          <h6> Billing Currency: {finacialInformation.billingCurrency}</h6>
        </>
      )}
    </>
  );
};
SettingInformation.propTypes = {
  isModelOpen: PropTypes.bool.isRequired,
  mainId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  getFinacialSettingById: PropTypes.func.isRequired,
  approvalChekedData: PropTypes.shape({
    isChecked: PropTypes.bool
  }),
  handleCheckbox: PropTypes.func.isRequired
};


export default SettingInformation;
