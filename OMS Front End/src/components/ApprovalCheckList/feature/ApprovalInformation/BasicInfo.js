/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Checkbox from "../../../ui/inputs/checkBox/CheckBox";
import PropTypes from "prop-types";
import { useLazyGetSupplierBasicInformationByIdQuery } from "../../../../app/services/supplierAPI";
import Iconify from "../../../ui/iconify/Iconify";

const BasicInformation = ({
  isModelOpen,
  mainId,
  getBasicInformationById,
  approvalChekedData,
  handleCheckbox,
  isSupplierApproval,
}) => {
  const [customerBasicInformation, setCustomerBasicInformation] = useState();
  const [supplierBasicInformation, setSupplierBasicInformation] = useState();
  const [isChecked, setIsChecked] = useState(
    approvalChekedData?.isChecked || false
  );

  const [openSections, setOpenSections] = useState([true]);

  //** API Call's */
  const [
    getCustomerBasicInfoById,
    {
      isFetching: isGetCustomerBasicInfoByIdFetching,
      isSuccess: isGetCustomerBasicInfoByIdSuccess,
      data: isGetCustomerBasicInfoByIdData,
    },
  ] = getBasicInformationById();

  const [
    getSupplierBasicInformationById,
    {
      isFetching: isGetSupplierBasicInformationByIdFetching,
      isSuccess: isGetSupplierBasicInformationById,
      data: GetSupplierBasicInformationByIdData,
    },
  ] = useLazyGetSupplierBasicInformationByIdQuery();

  useEffect(() => {
    if (isModelOpen && mainId && !isSupplierApproval) {
      getCustomerBasicInfoById(mainId);
    } else if (isSupplierApproval) {
      getSupplierBasicInformationById(mainId);
    }
  }, [isModelOpen, mainId]);

  useEffect(() => {
    if (
      !isGetCustomerBasicInfoByIdFetching &&
      isGetCustomerBasicInfoByIdSuccess &&
      isGetCustomerBasicInfoByIdData
    ) {
      setCustomerBasicInformation(isGetCustomerBasicInfoByIdData);
    }
  }, [
    isGetCustomerBasicInfoByIdFetching,
    isGetCustomerBasicInfoByIdSuccess,
    isGetCustomerBasicInfoByIdData,
  ]);

  useEffect(() => {
    if (
      !isGetSupplierBasicInformationByIdFetching &&
      isGetSupplierBasicInformationById &&
      GetSupplierBasicInformationByIdData
    ) {
      setSupplierBasicInformation(GetSupplierBasicInformationByIdData);
    }
  }, [
    isGetSupplierBasicInformationByIdFetching,
    isGetSupplierBasicInformationById,
    GetSupplierBasicInformationByIdData,
  ]);

  const handleChange = (checkedValue, newValue) => {
    setIsChecked(newValue);
    handleCheckbox(checkedValue, newValue);
  };

  // Determine which basic information to use
  const basicInformation = isSupplierApproval
    ? supplierBasicInformation
    : customerBasicInformation;

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
          <h5> Basic Information </h5>
        </div>

        <div className="checkbox-part">
          <Checkbox
            name={"basicInformation"}
            dataField={"basicInformation"}
            checked={isChecked || false}
            onChange={handleChange}
          />
        </div>
      </div>
      {openSections[0] && (
        <div className="card-info-checklist">
          {basicInformation && (
            <div className="card-part">
              <h6 className="name-title">
                <span className="label">
                  {!isSupplierApproval ? "Customer" : "Supplier"} Name:
                </span>
                <p className="name-desc">{basicInformation.name} </p>
              </h6>
              <h6 className="name-title">
                <span className="label">Tax Id:</span>
                <p className="name-desc">{basicInformation.taxId}</p>
              </h6>
              <h6 className="name-title">
                <span className="label">Email:</span>
                <p className="name-desc">{basicInformation.emailAddress}</p>
              </h6>
              <h6 className="name-title">
                <span className="label">Country:</span>
                <p className="name-desc">{basicInformation.countryName}</p>
              </h6>
              {!isSupplierApproval && (
                <h6 className="name-title">
                  <span className="label">Is Sub Customer:</span>
                  <p className="name-desc">
                    {basicInformation && basicInformation.isSubCustomer ? (
                      <i className="fa fa-check green-color"></i>
                    ) : (
                      <i className="fa fa-times red-color"></i>
                    )}
                  </p>
                </h6>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};
// Define PropTypes for BasicInformation
BasicInformation.propTypes = {
  isModelOpen: PropTypes.bool.isRequired,
  mainId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  getBasicInformationById: PropTypes.func.isRequired,
  approvalChekedData: PropTypes.shape({
    isChecked: PropTypes.bool,
  }),
  handleCheckbox: PropTypes.func.isRequired,
};

export default BasicInformation;
