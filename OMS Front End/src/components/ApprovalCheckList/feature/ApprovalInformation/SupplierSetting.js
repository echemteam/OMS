/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Checkbox from "../../../ui/inputs/checkBox/CheckBox";
import { useLazyGetPaymentSettingsBySupplierIdQuery, useLazyGetSupplierFinancialSettingsBySupplierIdQuery } from "../../../../app/services/supplierFinancialSettingsAPI";

const SupplierSetting = ({
    isModelOpen,
    mainId,
    approvalChekedData,
    handleCheckbox,
}) => {
    //** State */

    const [settingData, setSettingData] = useState([]);
    const [paymentTermsData, setPaymentTermsData] = useState([]);
    const [isChecked, setIsChecked] = useState(approvalChekedData?.isChecked || false);

    //** API Call's */
    const [getPaymentSettingsBySupplierId, { isFetching: isGetPaymentSettingsBySupplierIdFetching, isSuccess: isGetPaymentSettingsBySupplierIdSuccess,
        data: isGetPaymentSettingsBySupplierIdData }] = useLazyGetPaymentSettingsBySupplierIdQuery();
    const [getSupplierFinancialSettingsBySupplierId, { isFetching: isGetSupplierFinancialSettingsBySupplierIdFetching,
        isSuccess: isGetSupplierFinancialSettingsBySupplierIdSuccess, data: isGetSupplierFinancialSettingsBySupplierIdData }] = useLazyGetSupplierFinancialSettingsBySupplierIdQuery();

    useEffect(() => {
        if (isModelOpen && mainId) {
            getPaymentSettingsBySupplierId(mainId);
            getSupplierFinancialSettingsBySupplierId(mainId)
        }
    }, [isModelOpen, mainId]);

    useEffect(() => {
        if (!isGetPaymentSettingsBySupplierIdFetching && isGetPaymentSettingsBySupplierIdSuccess && isGetPaymentSettingsBySupplierIdData) {
            setPaymentTermsData(isGetPaymentSettingsBySupplierIdData);
        }
    }, [isGetPaymentSettingsBySupplierIdFetching, isGetPaymentSettingsBySupplierIdSuccess, isGetPaymentSettingsBySupplierIdData]);

    useEffect(() => {
        if (!isGetSupplierFinancialSettingsBySupplierIdFetching && isGetSupplierFinancialSettingsBySupplierIdSuccess && isGetSupplierFinancialSettingsBySupplierIdData) {
            setSettingData(isGetSupplierFinancialSettingsBySupplierIdData);
        }
    }, [isGetSupplierFinancialSettingsBySupplierIdFetching, isGetSupplierFinancialSettingsBySupplierIdSuccess, isGetSupplierFinancialSettingsBySupplierIdData]);


    const handleChange = (checkedValue, newValue) => {
        setIsChecked(newValue);
        handleCheckbox(checkedValue, newValue);
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
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="card-info-checklist">
                {settingData && paymentTermsData && (
                    <div className="card-part">
                        <h6 className="name-title">
                            <span className="label">Payment Method:</span>
                            <p className="name-desc"> {settingData.method} </p>
                        </h6>
                        <h6 className="name-title">
                            <span className="label">Purchase Order Delivery:</span>
                            <p className="name-desc">{settingData.poDeliveryMethod}</p>
                        </h6>
                        <h6 className="name-title">
                            <span className="label">Credit Card Note:</span>
                            <p className="name-desc">{paymentTermsData.ccNote}</p>
                        </h6>
                        <h6 className="name-title">
                            <span className="label">Payment Terms:</span>
                            <p className="name-desc">{settingData.paymentTerm}</p>
                        </h6>
                        <h6 className="name-title d-block">
                            <h6 className="label">Check Mailing Address:</h6>
                            {paymentTermsData.mailingAddress &&
                                <div className="address-card-part">
                                    <h6 className="title">{paymentTermsData.mailingAddress.type}</h6>
                                    <h6 className="add-line-desc">{paymentTermsData.mailingAddress.addressLine1}</h6>
                                    <p className="add-line-desc">{paymentTermsData.mailingAddress.isPreferredBilling}</p>
                                    <p className="add-line-desc">
                                        {paymentTermsData.mailingAddress.cityName},{" "}
                                        {paymentTermsData.mailingAddress.stateCode ? paymentTermsData.mailingAddress.stateCode : paymentTermsData.mailingAddress.stateName}{" "}
                                        {paymentTermsData.mailingAddress.zipCode}
                                        <div>{paymentTermsData.mailingAddress.countryName}</div>
                                    </p>
                                </div>
                            }
                        </h6>
                    </div>
                )}
            </div>
        </>
    );
};
SupplierSetting.propTypes = {
    isModelOpen: PropTypes.bool.isRequired,
    mainId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    getFinacialSettingById: PropTypes.func.isRequired,
    approvalChekedData: PropTypes.shape({
        isChecked: PropTypes.bool
    }),
    handleCheckbox: PropTypes.func.isRequired
};


export default SupplierSetting;
