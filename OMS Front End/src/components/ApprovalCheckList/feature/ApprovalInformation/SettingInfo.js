import React, { useEffect, useState } from "react";
import { PaymentMethodTypes } from "../../../../utils/Enums/commonEnums";

const SettingInformation = ({ isModelOpen, mainId, getFinacialSettingById }) => {

    //** State */
    const [finacialInformation, setFinacialInformation] = useState();

    //** API Call's */
    const [getFinacialSetting, { isFetching: isFinacialSettingFetching, isSuccess: isFinacialSettingSuccess, data: isFinacialSettingData }]
        = getFinacialSettingById();

    useEffect(() => {
        if (isModelOpen && mainId) {
            getFinacialSetting(mainId);
        }
    }, [isModelOpen, mainId]);

    useEffect(() => {
        if (!isFinacialSettingFetching && isFinacialSettingSuccess && isFinacialSettingData) {
            setFinacialInformation(isFinacialSettingData);
        }
    }, [isFinacialSettingFetching, isFinacialSettingSuccess, isFinacialSettingData]);

    const getPaymentMethodName = (methodId) => {
        switch (methodId) {
            case PaymentMethodTypes.CHECK:
                return 'Check';
            case PaymentMethodTypes.ACHECHECK:
                return 'ACH / Echeck';
            case PaymentMethodTypes.WIRE:
                return 'Wire';
            case PaymentMethodTypes.CREDITCARD:
                return 'Credit Card';
            case PaymentMethodTypes.OTHERWITHNOTEDIELD:
                return 'Other - With noted field';
            default:
                return 'Unknown Method';
        }
    };

    return (
        <React.Fragment>
            <h5> Finacial Information </h5>
            {finacialInformation &&
                <>
                    <h6>Payment Method: {getPaymentMethodName(finacialInformation.paymentMethodId)}</h6>
                    <h6> Credit Limit: {finacialInformation.creditLimit}</h6>
                    <h6> Billing Currency: {finacialInformation.billingCurrency}</h6>
                </>
            }
        </React.Fragment>
    )
}

export default SettingInformation;