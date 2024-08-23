import React, { useEffect, useState } from "react";
import { AddressType } from "../../../../utils/Enums/commonEnums";

const AddressInformation = ({ isModelOpen, mainId, getAddressById, isSubCustomer }) => {
  //** State */
  const [addressInformation, setAddressInformation] = useState([]);

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
      const addressTypeArray = isSubCustomer ? [AddressType.SHIPPING]:[AddressType.BILLING, AddressType.SHIPPING];
      const filteredData = isGetAddressByIdData.filter(
        (address) =>
          addressTypeArray.includes(address.addressTypeId) &&
          (address.isPreferredBilling === true ||
            address.isPreferredShipping === true)
      );
      setAddressInformation(filteredData);
    }
  }, [isGetAddressByIdFetching, isGetAddressByIdSuccess, isGetAddressByIdData]);

  return (
    <React.Fragment>
      <h5> Address Information </h5>
      <div className="row">
        {addressInformation &&
          addressInformation.map((address, index) => (
            <div className="col-6" key={index}>
              <h6>{address.type}</h6>
              <h6>{address.addressLine1}</h6>
              <p>{address.isPreferredBilling}</p>
              <p>
                {address.cityName},{" "}
                {address.stateCode ? address.stateCode : address.stateName}{" "}
                {address.zipCode}
                <div>{address.countryName}</div>
              </p>
            </div>
          ))}
      </div>
    </React.Fragment>
  );
};

export default AddressInformation;
