import React, { useEffect, useState } from "react";
import { AddressType } from "../../../../utils/Enums/commonEnums";

const AddressInformation = ({ isModelOpen, mainId, getAddressById }) => {

    //** State */
    const [addressInformation, setAddressInformation] = useState([]);

    //** API Call's */
    const [getAddressInfoById, { isFetching: isGetAddressByIdFetching, isSuccess: isGetAddressByIdSuccess, data: isGetAddressByIdData }]
        = getAddressById();

    useEffect(() => {
        if (isModelOpen && mainId) {
            getAddressInfoById(mainId);
        }
    }, [isModelOpen, mainId]);

    useEffect(() => {
        if (!isGetAddressByIdFetching && isGetAddressByIdSuccess && isGetAddressByIdData) {
            const addressTypeArray = [AddressType.BILLING, AddressType.SHIPPING];
            const filteredData = isGetAddressByIdData.filter((address) =>
                addressTypeArray.includes(address.addressTypeId) &&
                (address.isPreferredBilling === true || address.isPreferredShipping === true)
            );
            setAddressInformation(filteredData);
        }
    }, [isGetAddressByIdFetching, isGetAddressByIdSuccess, isGetAddressByIdData]);

    return (
        <React.Fragment>
            <h5> Address Information </h5>
            {addressInformation &&
                addressInformation.map((address, index) =>
                    <div key={index}>
                        <h6>Address Type: {address.type}</h6>
                        <h6>AddressLine1: {address.addressLine1}</h6>
                        <p>AddressLine2: {address.isPreferredBilling}</p>
                        <p>Address: {address.countryName}, {address.cityName}, {address.stateName}, {address.zipCode}</p>
                    </div>
                )
            }
        </React.Fragment>
    )
}

export default AddressInformation;