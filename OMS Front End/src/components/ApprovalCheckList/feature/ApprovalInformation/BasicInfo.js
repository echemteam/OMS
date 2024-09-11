/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Checkbox from "../../../ui/inputs/checkBox/CheckBox";
import PropTypes from "prop-types";

const BasicInformation = ({ isModelOpen, mainId, getBasicInformationById, approvalChekedData, handleCheckbox }) => {
  const [basicInformation, setBasicInformation] = useState();
  const [isChecked, setIsChecked] = useState(
    approvalChekedData?.isChecked || false
  );

  //** API Call's */
  const [
    getCustomerBasicInfoById,
    {
      isFetching: isGetCustomerBasicInfoByIdFetching,
      isSuccess: isGetCustomerBasicInfoByIdSuccess,
      data: isGetCustomerBasicInfoByIdData,
    },
  ] = getBasicInformationById();

  useEffect(() => {
    if (isModelOpen && mainId) {
      getCustomerBasicInfoById(mainId);
    }
  }, [isModelOpen, mainId]);

  useEffect(() => {
    if (
      !isGetCustomerBasicInfoByIdFetching &&
      isGetCustomerBasicInfoByIdSuccess &&
      isGetCustomerBasicInfoByIdData
    ) {
      setBasicInformation(isGetCustomerBasicInfoByIdData);
    }
  }, [
    isGetCustomerBasicInfoByIdFetching,
    isGetCustomerBasicInfoByIdSuccess,
    isGetCustomerBasicInfoByIdData,
  ]);

  const handleChange = (checkedValue, newValue) => {
    setIsChecked(newValue);
    handleCheckbox(checkedValue, newValue);
  };

  return (
    <>
      <div className="card-top-title">
        <h5> Basic Information </h5>
        <div className="checkbox-part">
          <Checkbox
            name={"basicInformation"}
            dataField={"basicInformation"}
            checked={isChecked || false}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="card-info-checklist">
        {basicInformation && (
          <div className="card-part">
            <h6 className="name-title">
              <span className="label">Customer Name:</span>
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
          </div>
        )}
      </div>
    </>
  );
};
// Define PropTypes for BasicInformation
BasicInformation.propTypes = {
  isModelOpen: PropTypes.bool.isRequired,
  mainId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  getBasicInformationById: PropTypes.func.isRequired,
  approvalChekedData: PropTypes.shape({
    isChecked: PropTypes.bool
  }),
  handleCheckbox: PropTypes.func.isRequired
};

export default BasicInformation;
