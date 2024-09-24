/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { PaymentMethodTypes } from "../../../../utils/Enums/commonEnums";
import Checkbox from "../../../ui/inputs/checkBox/CheckBox";
import PropTypes from "prop-types";
import { useLazyGetAllPaymentTermsQuery } from "../../../../app/services/customerSettingsAPI";
import Iconify from "../../../ui/iconify/Iconify";

const SettingInformation = ({
  isModelOpen,
  mainId,
  getFinacialSettingById,
  approvalChekedData,
  handleCheckbox,
}) => {
  //** State */
  const [finacialInformation, setFinacialInformation] = useState();
  const [isChecked, setIsChecked] = useState(
    approvalChekedData?.isChecked || false
  );
  const [paymentTermsData, setPaymentTermsData] = useState([]);

  const [openSections, setOpenSections] = useState([true]);

  //** API Call's */
  const [
    getFinacialSetting,
    {
      isFetching: isFinacialSettingFetching,
      isSuccess: isFinacialSettingSuccess,
      data: isFinacialSettingData,
    },
  ] = getFinacialSettingById();
  const [
    getAllPaymentTerms,
    {
      isFetching: isGetAllPaymentTermsFetching,
      isSuccess: isGetAllPaymentTermsSuccess,
      data: isGetAllPaymentTermsData,
    },
  ] = useLazyGetAllPaymentTermsQuery();

  useEffect(() => {
    if (isModelOpen && mainId) {
      getFinacialSetting(mainId);
      getAllPaymentTerms();
    }
  }, [isModelOpen, mainId]);

  useEffect(() => {
    if (
      !isGetAllPaymentTermsFetching &&
      isGetAllPaymentTermsSuccess &&
      isGetAllPaymentTermsData
    ) {
      setPaymentTermsData(isGetAllPaymentTermsData);
    }
  }, [
    isGetAllPaymentTermsFetching,
    isGetAllPaymentTermsSuccess,
    isGetAllPaymentTermsData,
  ]);

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

  const getPaymentTerm = (Id) => {
    let find = paymentTermsData?.find((item) => item.paymentTermId === Id);
    return find?.paymentTerm;
  };

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
          {finacialInformation && (
            <div className="card-part">
              <h6 className="name-title">
                <span className="label">Payment Method:</span>
                <p className="name-desc">
                  {getPaymentMethodName(finacialInformation.paymentMethodId)}
                </p>
              </h6>
              <h6 className="name-title">
                <span className="label">Credit Limit:</span>
                <p className="name-desc">{finacialInformation.creditLimit}</p>
              </h6>
              <h6 className="name-title">
                <span className="label">Billing Currency:</span>
                <p className="name-desc">
                  {finacialInformation.billingCurrency}
                </p>
              </h6>
              <h6 className="name-title">
                <span className="label">Payment Terms:</span>
                <p className="name-desc">
                  {getPaymentTerm(finacialInformation.paymentTermId)}
                </p>
              </h6>
            </div>
          )}
        </div>
      )}
    </>
  );
};
SettingInformation.propTypes = {
  isModelOpen: PropTypes.bool.isRequired,
  mainId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  getFinacialSettingById: PropTypes.func.isRequired,
  approvalChekedData: PropTypes.shape({
    isChecked: PropTypes.bool,
  }),
  handleCheckbox: PropTypes.func.isRequired,
};

export default SettingInformation;
