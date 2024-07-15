/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { Accordion } from "react-bootstrap";
//** Lib's */
import { AppIcons } from "../../../../../data/appIcons";
import Image from "../../../../../components/image/Image";
//** Component's */
import DataLoader from "../../../../../components/ui/dataLoader/DataLoader";
import NoRecordFound from "../../../../../components/ui/noRecordFound/NoRecordFound";

const AddressDetailCard = forwardRef(({ keyId, onHandleEditAddress, showEditIcon, getAddresssByCustomerId, getByIdRef }) => {

    //** States */
    const [activeKeys, setActiveKeys] = useState([]);
    const [addressData, setAddressData] = useState([]);

    //** API Call's */
    /**
     * This hook dynamically sets the API call based on the module (customer or supplier).
     * The API endpoint and parameters are configured within the SupplierAddressDetails OR CustomerAddressDetails component.
     * It fetches address details by the customer or supplier ID.
    */
    const [getById, { isFetching: isGetAddresssByCustomerIdFetching, isSuccess: isGetAddresssByCustomerId, data: GetAddresssByCustomerIdData }] = getAddresssByCustomerId();

    //** Use Effect */
    useEffect(() => {
        keyId && getById(keyId);
    }, [keyId]);

    useEffect(() => {
        if (!isGetAddresssByCustomerIdFetching && isGetAddresssByCustomerId && GetAddresssByCustomerIdData) {
            setAddressData(GetAddresssByCustomerIdData);
        }
    }, [isGetAddresssByCustomerIdFetching, isGetAddresssByCustomerId, GetAddresssByCustomerIdData]);

    useEffect(() => {
        if (Array.isArray(addressData)) {
            const keys = addressData.map((_, index) => index.toString());
            setActiveKeys(keys);
        }
    }, [addressData]);

    //** Handle Changes */
    const handleGetAddress = () => {
        keyId && getById(keyId);
    };
    const handleEdit = (data) => {
        onHandleEditAddress(data);
    };
    const handleToggle = (eventKey) => {
        setActiveKeys((prevActiveKeys) =>
            prevActiveKeys.includes(eventKey)
                ? prevActiveKeys.filter(key => key !== eventKey)
                : [...prevActiveKeys, eventKey]
        );
    };

    //** Use Imperative Handle */
    useImperativeHandle(getByIdRef, () => ({
        callChildFunction: handleGetAddress,
    }));

    if (!isGetAddresssByCustomerIdFetching) {
        if (!Array.isArray(addressData) || addressData.length === 0) {
            return <div className="no-address"><NoRecordFound /></div>;
        }
    }

    const groupedAddresses = Array.isArray(addressData) ? addressData.reduce((acc, address) => {
        if (!acc[address.addressTypeId]) {
            acc[address.addressTypeId] = [];
        }
        acc[address.addressTypeId].push(address);
        return acc;
    }, {}) : {};

    return (
        <React.Fragment>
            {!isGetAddresssByCustomerIdFetching ?
                <Accordion className="address-card-section" activeKey={activeKeys} onSelect={handleToggle}>
                    {Object.keys(groupedAddresses).map((addressTypeId, index) => (
                        <Accordion.Item eventKey={index.toString()}
                            className={activeKeys.includes(index.toString()) ? "active" : ""} key={addressTypeId} >
                            <div className="header-title-btn">
                                <Accordion.Header>
                                    <div>
                                        <span>{groupedAddresses[addressTypeId][0].type}</span>
                                    </div>
                                </Accordion.Header>
                            </div>
                            <Accordion.Body className="add-desc-part">
                                <div className="row">
                                    {groupedAddresses[addressTypeId].map((address, addrIndex) => (
                                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-12 col-12" key={addrIndex}>
                                            <div className="address-card">
                                                {((address.isPreferredBilling && address.addressTypeId === 1) || (address.isPreferredShipping && address.addressTypeId === 2)) && (
                                                    <div className="status-desc">
                                                        <span className="field-info active-green-color">
                                                            {(address.isPreferredBilling && address.addressTypeId === 1) ? "Preferred Billing" :
                                                                (address.isPreferredShipping && address.addressTypeId === 2) ? "Preferred Shipping" : ""}
                                                        </span>
                                                    </div>
                                                )}
                                                <div className={`add-line ${(address.isPreferredBilling && address.addressTypeId === 1) || (address.isPreferredShipping && address.addressTypeId === 2) ? "" : ""}`}>
                                                    <span className="label-txt">{address.addressLine1}</span>
                                                    <span className="label-txt">{address.addressLine2}</span>
                                                    <span className="label-txt">{address.cityName}</span>
                                                    <span className="label-txt">{address.stateName}</span>
                                                    <span className="label-txt">
                                                        {address.countryName} - <span>{address.zipCode}</span>
                                                    </span>
                                                </div>
                                                <div className="edit-delete-button">
                                                    {showEditIcon ?
                                                        <button onClick={() => handleEdit(address)} className="edit-btn">
                                                            <Image imagePath={AppIcons.editThemeIcon} />
                                                        </button>
                                                        : null}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
                : <DataLoader />}
        </React.Fragment>
    );
});

export default AddressDetailCard;