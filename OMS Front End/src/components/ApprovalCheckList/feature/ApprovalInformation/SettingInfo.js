/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { PaymentMethodTypes } from "../../../../utils/Enums/commonEnums";
import Checkbox from "../../../ui/inputs/checkBox/CheckBox";

const SettingInformation = ({
  isModelOpen,
  mainId,
  getFinacialSettingById,
}) => {
  //** State */
  const [finacialInformation, setFinacialInformation] = useState();

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

  return (
    <>
      <div className="card-top-title">
        <h5> Finacial Information </h5>
        <div className="checkbox-part">
          <Checkbox />
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

export default SettingInformation;
