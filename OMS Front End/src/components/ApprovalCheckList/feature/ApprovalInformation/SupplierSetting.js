/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Checkbox from "../../../ui/inputs/checkBox/CheckBox";
import {
  useLazyGetPaymentSettingsBySupplierIdQuery,
  useLazyGetSupplierFinancialSettingsBySupplierIdQuery,
} from "../../../../app/services/supplierFinancialSettingsAPI";
import Iconify from "../../../ui/iconify/Iconify";

const SupplierSetting = ({
  isModelOpen,
  mainId,
  approvalChekedData,
  handleCheckbox,
}) => {
  //** State */

  const [settingData, setSettingData] = useState([]);
  const [paymentTermsData, setPaymentTermsData] = useState([]);

  const [openSections, setOpenSections] = useState([true]);

  const [isChecked, setIsChecked] = useState(
    approvalChekedData?.isChecked || false
  );

  //** API Call's */
  const [
    getPaymentSettingsBySupplierId,
    {
      isFetching: isGetPaymentSettingsBySupplierIdFetching,
      isSuccess: isGetPaymentSettingsBySupplierIdSuccess,
      data: isGetPaymentSettingsBySupplierIdData,
    },
  ] = useLazyGetPaymentSettingsBySupplierIdQuery();
  const [
    getSupplierFinancialSettingsBySupplierId,
    {
      isFetching: isGetSupplierFinancialSettingsBySupplierIdFetching,
      isSuccess: isGetSupplierFinancialSettingsBySupplierIdSuccess,
      data: isGetSupplierFinancialSettingsBySupplierIdData,
    },
  ] = useLazyGetSupplierFinancialSettingsBySupplierIdQuery();

  useEffect(() => {
    if (isModelOpen && mainId) {
      getPaymentSettingsBySupplierId(mainId);
      getSupplierFinancialSettingsBySupplierId(mainId);
    }
  }, [isModelOpen, mainId]);

  useEffect(() => {
    if (
      !isGetPaymentSettingsBySupplierIdFetching &&
      isGetPaymentSettingsBySupplierIdSuccess &&
      isGetPaymentSettingsBySupplierIdData
    ) {
      setPaymentTermsData(isGetPaymentSettingsBySupplierIdData);
    }
  }, [
    isGetPaymentSettingsBySupplierIdFetching,
    isGetPaymentSettingsBySupplierIdSuccess,
    isGetPaymentSettingsBySupplierIdData,
  ]);

  useEffect(() => {
    if (
      !isGetSupplierFinancialSettingsBySupplierIdFetching &&
      isGetSupplierFinancialSettingsBySupplierIdSuccess &&
      isGetSupplierFinancialSettingsBySupplierIdData
    ) {
      setSettingData(isGetSupplierFinancialSettingsBySupplierIdData);
    }
  }, [
    isGetSupplierFinancialSettingsBySupplierIdFetching,
    isGetSupplierFinancialSettingsBySupplierIdSuccess,
    isGetSupplierFinancialSettingsBySupplierIdData,
  ]);

  const handleChange = (checkedValue, newValue) => {
    setIsChecked(newValue);
    handleCheckbox(checkedValue, newValue);
  };
  // Toggle active section
  const toggleSection = (index) => {
    const updatedSections = [...openSections];
    updatedSections[index] = !updatedSections[index]; // Toggle the clicked section
    setOpenSections(updatedSections);
  };
  return (
    <>
      <div className={`card-top-title ${openSections[0] ? 'active' : ''}`} onClick={() => toggleSection(0)}>
        <div className="d-flex align-items-center mr-2">
          <span>
            <Iconify icon="ep:arrow-down-bold" className="open-bar" />
          </span>
          <h5> Finacial Information </h5>
        </div>
        <div className="checkbox-part">
          <Checkbox
            name={"settingInformation"}
            dataField={"settingInformation"}
            checked={isChecked || false}
            onChange={handleChange}
          />
        </div>
      </div>
      {openSections[0] && (
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
                {paymentTermsData.mailingAddress && (
                  <div className="address-card-part">
                    <h6 className="title">
                      {paymentTermsData.mailingAddress.type}
                    </h6>
                    <h6 className="add-line-desc">
                      {paymentTermsData.mailingAddress.addressLine1}
                    </h6>
                    <p className="add-line-desc">
                      {paymentTermsData.mailingAddress.isPreferredBilling}
                    </p>
                    <p className="add-line-desc">
                      {paymentTermsData.mailingAddress.cityName},{" "}
                      {paymentTermsData.mailingAddress.stateCode
                        ? paymentTermsData.mailingAddress.stateCode
                        : paymentTermsData.mailingAddress.stateName}{" "}
                      {paymentTermsData.mailingAddress.zipCode}
                      <div>{paymentTermsData.mailingAddress.countryName}</div>
                    </p>
                  </div>
                )}
              </h6>
            </div>
          )}
        </div>
      )}
    </>
  );
};
SupplierSetting.propTypes = {
  isModelOpen: PropTypes.bool.isRequired,
  mainId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  getFinacialSettingById: PropTypes.func.isRequired,
  approvalChekedData: PropTypes.shape({
    isChecked: PropTypes.bool,
  }),
  handleCheckbox: PropTypes.func.isRequired,
};

export default SupplierSetting;
