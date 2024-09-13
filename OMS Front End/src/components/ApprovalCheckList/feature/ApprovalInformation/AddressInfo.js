/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { AddressType } from "../../../../utils/Enums/commonEnums";
import PropTypes from "prop-types";
import Checkbox from "../../../ui/inputs/checkBox/CheckBox";

const AddressInformation = ({
  isModelOpen,
  mainId,
  getAddressById,
  isSubCustomer,
  approvalChekedData,
  handleCheckbox,
  isSupplierApproval
}) => {
  //** State */
  const [addressInformation, setAddressInformation] = useState([]);
  const [isChecked, setIsChecked] = useState(
    approvalChekedData?.isChecked || false
  );

  //** API Call's */
  const [
    getAddressInfoById,
    {
      isFetching: isGetAddressByIdFetching,
      isSuccess: isGetAddressByIdSuccess,
      data: isGetAddressByIdData,
    },
  ] = getAddressById();

  useEffect(() => {
    if (isModelOpen && mainId) {
      getAddressInfoById(mainId);
    }
  }, [isModelOpen, mainId]);

  useEffect(() => {
    if (
      !isGetAddressByIdFetching &&
      isGetAddressByIdSuccess &&
      isGetAddressByIdData
    ) {
      const addressTypeArray = !isSupplierApproval ? isSubCustomer ? [AddressType.SHIPPING] : [AddressType.BILLING, AddressType.SHIPPING] : [AddressType.BANKADDRESS];

      const customerFilteredData = isGetAddressByIdData.filter((address) => addressTypeArray.includes(address.addressTypeId)
        // && (address.isPreferredBilling === true || address.isPreferredShipping === true)
      );

      const supplierFilteredData = isGetAddressByIdData.filter((address) => addressTypeArray.includes(address.addressTypeId));

      setAddressInformation(!isSupplierApproval ? customerFilteredData : supplierFilteredData);
    }
  }, [isGetAddressByIdFetching, isGetAddressByIdSuccess, isGetAddressByIdData]);

  const handleChange = (checkedValue, newValue) => {
    setIsChecked(newValue);
    handleCheckbox(checkedValue, newValue);
  };

  return (
    <>
      <div className="card-top-title">
        <h5> Address Information </h5>
        <div className="checkbox-part">
          <Checkbox
            name={"addressInformation"}
            dataField={"addressInformation"}
            checked={isChecked || false}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="card-info-checklist">
        {addressInformation &&
          addressInformation.map((address, index) => (
            <div className="address-card-part" key={index}>
              <h6 className="title">{address.type}</h6>
              <h6 className="add-line-desc">{address.addressLine1}</h6>
              <p className="add-line-desc">{address.isPreferredBilling}</p>
              <p className="add-line-desc">
                {address.cityName},{" "}
                {address.stateCode ? address.stateCode : address.stateName}{" "}
                {address.zipCode}
                <div>{address.countryName}</div>
              </p>
            </div>
          ))}
      </div>
    </>
  );
};
AddressInformation.propTypes = {
  isModelOpen: PropTypes.bool.isRequired,
  mainId: PropTypes.string.isRequired,
  getAddressById: PropTypes.func.isRequired,
  isSubCustomer: PropTypes.bool.isRequired,
  approvalChekedData: PropTypes.shape({
    isChecked: PropTypes.bool,
  }).isRequired,
  handleCheckbox: PropTypes.func.isRequired,
};
export default AddressInformation;
