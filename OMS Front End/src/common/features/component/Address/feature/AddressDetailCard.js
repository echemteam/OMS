/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
//** Lib's */
import { AppIcons } from "../../../../../data/appIcons";
import Image from "../../../../../components/image/Image";
//** Component's */
import DataLoader from "../../../../../components/ui/dataLoader/DataLoader";
import NoRecordFound from "../../../../../components/ui/noRecordFound/NoRecordFound";

const AddressDetailCard = forwardRef(
  ({
    keyId,
    onHandleEditAddress,
    showEditIcon,
    getAddresssByCustomerId,
    getByIdRef,
    selectedAddressTypeId
  }) => {
    //** States */
    const [addressData, setAddressData] = useState([]);

    //** API Call's */
    /**
     * This hook dynamically sets the API call based on the module (customer or supplier).
     * The API endpoint and parameters are configured within the SupplierAddressDetails OR CustomerAddressDetails component.
     * It fetches address details by the customer or supplier ID.
     */
    const [
      getById,
      {
        isFetching: isGetAddresssByCustomerIdFetching,
        isSuccess: isGetAddresssByCustomerId,
        data: GetAddresssByCustomerIdData,
      },
    ] = getAddresssByCustomerId();

    //** Use Effect */
    useEffect(() => {
      keyId && getById(keyId);
    }, [keyId , selectedAddressTypeId]);

    useEffect(() => {
      if (
        !isGetAddresssByCustomerIdFetching &&
        isGetAddresssByCustomerId &&
        GetAddresssByCustomerIdData
      ) {
        const filteredData = selectedAddressTypeId[0]
        ? GetAddresssByCustomerIdData.filter(address => address.addressTypeId === selectedAddressTypeId[0])
        : GetAddresssByCustomerIdData;
        setAddressData(filteredData);
      }
    }, [
      isGetAddresssByCustomerIdFetching,
      isGetAddresssByCustomerId,
      GetAddresssByCustomerIdData,
    ]);


    //** Handle Changes */
    const handleGetAddress = () => {
      keyId && getById(keyId);
    };
    const handleEdit = (data) => {
      onHandleEditAddress(data);
    };


    //** Use Imperative Handle */
    useImperativeHandle(getByIdRef, () => ({
      callChildFunction: handleGetAddress,
    }));

    if (!isGetAddresssByCustomerIdFetching) {
      if (!Array.isArray(addressData) || addressData.length === 0) {
        return (
          <div className="no-address">
            <NoRecordFound />
          </div>
        );
      }
    }
    const getAddressTypeClass = (type) => {
      switch (type) {
        case "Primary":
          return "badge-primary contact-badge";

        case "Billing":
          return "badge-purchasing contact-badge";

        case "Shipping":
          return "badge-followup contact-badge";

        case "AP":
          return "badge-ap contact-badge";

        default:
          return "badge-default";
      }
    };

    return (
      <React.Fragment>
        {!isGetAddresssByCustomerIdFetching ? (
          <div className="address-card-section">
            <div className="add-desc-part">
              <div className="address-card-list">
                {addressData.map((address, addrIndex) => (
                  <div
                    className="address-main-card-section"
                    key={addrIndex}
                  >

                    <div className="address-card">
                      {((address.isPreferredBilling &&
                        address.addressTypeId === 1) ||
                        (address.isPreferredShipping &&
                          address.addressTypeId === 2)) && (
                          <div className="status-desc">
                            <span className="field-info active-green-color">
                              {address.isPreferredBilling &&
                                address.addressTypeId === 1
                                ? "Preferred Billing"
                                : address.isPreferredShipping &&
                                  address.addressTypeId === 2
                                  ? "Preferred Shipping"
                                  : ""}
                            </span>
                          </div>
                        )}
                      <div
                        className={`add-line ${(address.isPreferredBilling &&
                            address.addressTypeId === 1) ||
                            (address.isPreferredShipping &&
                              address.addressTypeId === 2)
                            ? ""
                            : ""
                          }`}
                      >
                        <span className="label-txt">
                          {address.addressLine1}
                        </span>
                        <span className="label-txt">
                          {address.addressLine2}
                        </span>
                        <span className="label-txt">{address.cityName}</span>
                        <span className="label-txt">{address.stateName}</span>
                        <span className="label-txt">
                          {address.countryName} - <span>{address.zipCode}</span>
                        </span>
                      </div>
                      <div className="edit-delete-button">
                        {showEditIcon ? (
                          <button
                            onClick={() => handleEdit(address)}
                            className="edit-btn"
                          >
                            <Image imagePath={AppIcons.editThemeIcon} />
                          </button>
                        ) : null}
                      </div>
                      <div className={`contact-type-badge ${getAddressTypeClass(address.type)}`}>
                        {address.type}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <DataLoader />
        )}
      </React.Fragment>
    );
  }
);

export default AddressDetailCard;
