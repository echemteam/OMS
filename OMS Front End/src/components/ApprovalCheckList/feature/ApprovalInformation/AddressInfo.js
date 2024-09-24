/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { AddressType } from "../../../../utils/Enums/commonEnums";
import PropTypes from "prop-types";
import Checkbox from "../../../ui/inputs/checkBox/CheckBox";
import Iconify from "../../../ui/iconify/Iconify";

const AddressInformation = ({
  isModelOpen,
  mainId,
  getAddressById,
  isSubCustomer,
  approvalChekedData,
  handleCheckbox,
  isSupplierApproval,
}) => {
  //** State */
  const [addressInformation, setAddressInformation] = useState([]);

  const [openSections, setOpenSections] = useState([true]);

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
      const addressTypeArray = !isSupplierApproval
        ? isSubCustomer
          ? [AddressType.SHIPPING]
          : [AddressType.BILLING, AddressType.SHIPPING]
        : [AddressType.PHYSICALADDRESSHQ, AddressType.REMITTANCEADDRESS];

      const customerFilteredData = isGetAddressByIdData.filter(
        (address) => addressTypeArray.includes(address.addressTypeId)
        // && (address.isPreferredBilling === true || address.isPreferredShipping === true)
      );

      const supplierFilteredData = isGetAddressByIdData.filter((address) =>
        addressTypeArray.includes(address.addressTypeId)
      );

      setAddressInformation(
        !isSupplierApproval ? customerFilteredData : supplierFilteredData
      );
    }
  }, [isGetAddressByIdFetching, isGetAddressByIdSuccess, isGetAddressByIdData]);

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
          <h5> Address Information </h5>
        </div>
        <div className="checkbox-part">
          <Checkbox
            name={"addressInformation"}
            dataField={"addressInformation"}
            checked={isChecked || false}
            onChange={handleChange}
          />
        </div>
      </div>
      {openSections[0] && (
        <div className="card-info-checklist">
          {addressInformation &&
            addressInformation.map((address, index) => (
              <div className="address-card-part" key={index}>
                <div className="d-flex justify-content-between">
                  <h6 className="title">{address.type}</h6>
                  <Checkbox
                    name={"addressInformation"}
                    dataField={"addressInformation"}
                    checked={isChecked || false}
                    onChange={handleChange}
                  />
                </div>
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
      )}
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
