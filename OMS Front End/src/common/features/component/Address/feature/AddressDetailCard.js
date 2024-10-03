/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
//** Lib's */
//** Component's */
import DataLoader from "../../../../../components/ui/dataLoader/DataLoader";
import NoRecordFound from "../../../../../components/ui/noRecordFound/NoRecordFound";
import PropTypes from "prop-types";
import SwalAlert from "../../../../../services/swalService/SwalService";
import ToastService from "../../../../../services/toastService/ToastService";
import Iconify from "../../../../../components/ui/iconify/Iconify";
import { CustomerSupplierStatus } from "../../../../../utils/Enums/commonEnums";

const AddressDetailCard = forwardRef(
  ({
    keyId,
    onHandleEditAddress,
    showEditIcon,
    getAddresssByCustomerId,
    getByIdRef,
    selectedAddressTypeId,
    deleteAddress,
    customerStatusId,
    isModelOpen,
    isSupplier,
    getCompletionCount
  }) => {
    //** States */
    const [addressData, setAddressData] = useState([]);
    const { confirm } = SwalAlert();

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

    const [
      deleteAllAddress,
      { isSuccess: isDeleteAddressSuccess, data: isDeleteAddressData },
    ] = deleteAddress();

    useEffect(() => {
      if (!isModelOpen && keyId) {
        getById(keyId);
      }
    }, [keyId, selectedAddressTypeId]);

    useEffect(() => {
      if (
        !isGetAddresssByCustomerIdFetching &&
        isGetAddresssByCustomerId &&
        GetAddresssByCustomerIdData
      ) {
        const filteredData = selectedAddressTypeId[0]
          ? GetAddresssByCustomerIdData.filter(
            (address) => address.addressTypeId === selectedAddressTypeId[0]
          )
          : GetAddresssByCustomerIdData;
        setAddressData(filteredData);
      }
    }, [
      isGetAddresssByCustomerIdFetching,
      isGetAddresssByCustomerId,
      GetAddresssByCustomerIdData,
    ]);

    useEffect(() => {
      if (isDeleteAddressSuccess && isDeleteAddressData) {
        ToastService.success(isDeleteAddressData.errorMessage);
        handleGetAddress();
        getCompletionCount();
      }
    }, [isDeleteAddressSuccess, isDeleteAddressData]);

    //** Handle Changes */
    const handleGetAddress = () => {
      keyId && getById(keyId);
    };
    const handleEdit = (data) => {
      onHandleEditAddress(data);
    };

    const handleDelete = (data) => {
      // onHandleEditDelete(data);
      confirm(
        "Delete?",
        "Are you sure you want to Delete?",
        "Delete",
        "Cancel"
      ).then((confirmed) => {
        if (confirmed) {
          deleteAllAddress(data.addressId);
        }
      });
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
        // Shipping Start
        case "Bank Address":
          return "badge-primary contact-badge";
        // Shipping End
        case "Billing":
          return "badge-purchasing contact-badge";

        // Shipping Start
        case "Physical Address- HQ":
          return "badge-purchasing contact-badge";
        // Shipping End

        case "Shipping":
          return "badge-followup contact-badge";
        // Shipping Start
        case "Remittance Address":
          return "badge-followup contact-badge";
        // Shipping End
        case "AP":
          return "badge-ap contact-badge";

        default:
          return "badge-default";
      }
    };
    const getStatusDescription = (address) => {
      return address.isPreferredBilling && address.addressTypeId === 1
        ? "Preferred Billing"
        : address.isPreferredShipping && address.addressTypeId === 2
          ? "Preferred Shipping"
          : "";
    };

    return (
      <React.Fragment>
        {!isGetAddresssByCustomerIdFetching ? (
          <div className="address-card-section">
            <div className="add-desc-part">
              <div className="address-card-list">
                {addressData.map((address) => (
                  <div
                    className="address-main-card-section"
                    key={address.addressId}
                  >
                    <div className="address-card">
                      {((address.isPreferredBilling &&
                        address.addressTypeId === 1) ||
                        (address.isPreferredShipping &&
                          address.addressTypeId === 2)) && (
                          <div className="status-desc">
                            <span className="field-info active-green-color">
                              {getStatusDescription(address)}
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
                        <span className="label-txt">
                          {address.cityName}, {address.stateCode ? address.stateCode : address.stateName}{" "}
                          {address.zipCode}
                        </span>
                        <span className="label-txt">{address.countryName}</span>
                      </div>
                      {isSupplier ?
                        <div className="edit-delete-button">
                          {showEditIcon ? (
                            <button onClick={() => handleEdit(address)} className="edit-btn" >
                              <Iconify icon="tabler:pencil" />
                            </button>
                          ) : null}
                          <button onClick={() => handleDelete(address)} className="edit-btn ml-2" >
                            <Iconify icon="mingcute:delete-2-line" className="delete-icon" />
                          </button>
                        </div> :
                        <>
                          {!isSupplier && customerStatusId !== CustomerSupplierStatus.APPROVED &&
                            <div className="edit-delete-button">
                              {showEditIcon ? (
                                <button onClick={() => handleEdit(address)} className="edit-btn" >
                                  <Iconify icon="tabler:pencil" />
                                </button>
                              ) : null}
                              <button onClick={() => handleDelete(address)} className="edit-btn ml-2" >
                                <Iconify icon="mingcute:delete-2-line" className="delete-icon" />
                              </button>
                            </div>
                          }
                        </>
                      }
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
        )
        }
      </React.Fragment >
    );
  }
);

AddressDetailCard.propTypes = {
  keyId: PropTypes.number.isRequired,
  onHandleEditAddress: PropTypes.func.isRequired,
  showEditIcon: PropTypes.bool,
  getAddresssByCustomerId: PropTypes.func.isRequired,
  getByIdRef: PropTypes.object.isRequired,
  selectedAddressTypeId: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.number),
  ]).isRequired,
};

export default AddressDetailCard;
