/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { AppIcons } from "../../../data/appIcons";
import Image from "../../../components/image/Image";
import formatDate from "../../../lib/formatDate";
import NoRecordFound from "../../../components/ui/noRecordFound/NoRecordFound";
import { getLabelClass } from "../../../utils/StatusColors/StatusColors";
import { FirstSecondLetter } from "../../../utils/FirstSecLetter/FirstSecondLetter";
import { encryptUrlData } from "../../../services/CryptoService";
import DataLoader from "../../../components/ui/dataLoader/DataLoader";
import Iconify from "../../../components/ui/iconify/Iconify";
import { useUpdateApprovalRequestsStatusMutation } from "../../../app/services/ApprovalAPI";
import ToastService from "../../../services/toastService/ToastService";
import { Button } from "react-bootstrap";
import { MyTaskFieldNames, MyTaskKeyNames, MyTaskStatus } from "../../../utils/Enums/commonEnums";
import Buttons from "../../../components/ui/button/Buttons";
import FormCreator from "../../../components/Forms/FormCreator";
import CenterModel from "../../../components/ui/centerModel/CenterModel";
import { addResonData } from "../config/RejectReason.data";
import Base64FileViewer from "../../../common/features/component/Base64FileView/Base64FileViewer";
import { FunctionalitiesName } from "../../../utils/Enums/ApprovalFunctionalities";
import { useLazyGetCustomersBasicInformationByIdQuery } from "../../../app/services/basicdetailAPI";
import { useLazyGetSupplierBasicInformationByIdQuery } from "../../../app/services/supplierAPI";
import { useLazyGetAllPaymentMethodQuery, useLazyGetAllPaymentTermsQuery } from "../../../app/services/customerSettingsAPI";
import { getDropdownLabelName } from "../../../utils/CommonUtils/CommonUtilsMethods";

const parseJson = (jsonStr) => {
  try {
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Invalid JSON:", error);
    return {};
  }
};

const getFieldDifference = (oldJsonStr, newJsonStr, fieldName) => {
  const oldValues = parseJson(oldJsonStr);
  const newValues = parseJson(newJsonStr);

  // Convert field names to lowercase for case-insensitive comparison
  const fieldNameLower = fieldName?.toLowerCase();

  const findValue = (values, fieldName) => {
    for (const key in values) {
      if (key.toLowerCase() === fieldName) {
        return values[key];
      }
    }
    return "N/A";
  };

  const oldValue = findValue(oldValues, fieldNameLower);
  const newValue = findValue(newValues, fieldNameLower);

  return { oldValue, newValue };
};

// Function to filter out keys that end with "Id"
// const filterKeysWithId = (obj) => {
//   const filteredObj = {};
//   for (const [key, value] of Object.entries(obj)) {
//     if (!key.toLowerCase().endsWith('id')) {
//       filteredObj[key] = value;
//     }
//   }
//   return filteredObj;
// };

const filterKeysWithId = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(item => filterKeysWithId(item));
  } else if (typeof obj === 'object' && obj !== null) {
    const filteredObj = {};
    for (const [key, value] of Object.entries(obj)) {
      if (!key.toLowerCase().endsWith('id')) {
        filteredObj[key] = filterKeysWithId(value);
      }
    }
    return filteredObj;
  }
  return obj;
};

const formatBoolean = (value) => (value ? "True" : "False");

const TaskDetail = ({ approvalRequestId, approvedData, isEventByIdLoading, approvalRequest, tabId }) => {

  // const navigate = useNavigate();
  const ref = useRef();
  const [customerId, setCustomerId] = useState(0);
  const [supplierId, setSupplierId] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [oldFieldValue, setOldFieldValue] = useState();
  const [newFieldValue, setNewFieldValue] = useState();
  const [customerData, setCustomerData] = useState({});
  const [showRedirectButton, setShowRedirectButton] = useState(false);
  const [updateApprovalRequest, { isLoading: isUpdateLoading, isSuccess: isUpdateSuccess, data: isUpdateData }] = useUpdateApprovalRequestsStatusMutation();

  const [getSupplierInfoById, { isFetching: isGetSupplierFetching, isSuccess: isGetSupplierSuccess, data: isGetSupplierData }] = useLazyGetSupplierBasicInformationByIdQuery();
  const [getCustomersInfoById, { isFetching: isGetCustomerFetching, isSuccess: isGetCustomerSuccess, data: isGetCustomerData }] = useLazyGetCustomersBasicInformationByIdQuery();

  //** API Call's For Setting Data */
  const [getAllPaymentTerms, { data: isGetAllPaymentTermsData }] = useLazyGetAllPaymentTermsQuery();
  const [getAllPaymentMethod, { data: isGetAllPaymentMethodData }] = useLazyGetAllPaymentMethodQuery();

  useEffect(() => {
    if (isUpdateSuccess && isUpdateData) {
      setShowModal(false)
      ToastService.success(isUpdateData.errorMessage);
      approvalRequest(approvalRequestId);
    }
  }, [isUpdateSuccess, isUpdateData]);

  // Effect for handling customer data fetch
  useEffect(() => {
    if (customerId) {
      getCustomersInfoById(customerId);
    }
  }, [customerId, getCustomersInfoById]);

  // Effect for handling supplier data fetch
  useEffect(() => {
    if (supplierId) {
      getSupplierInfoById(supplierId);
    }
  }, [supplierId, getSupplierInfoById]);

  useEffect(() => {
    if (!isGetCustomerFetching && isGetCustomerSuccess && isGetCustomerData) {
      setCustomerData(isGetCustomerData);
    }
  }, [isGetCustomerFetching, isGetCustomerSuccess, isGetCustomerData]);

  useEffect(() => {
    if (!isGetSupplierFetching && isGetSupplierSuccess && isGetSupplierData) {
      // setSupplierData(isGetSupplierData);
    }
  }, [isGetSupplierFetching, isGetSupplierSuccess, isGetSupplierData]);

  useEffect(() => {
    if (approvedData) {
      getAllPaymentTerms();
      getAllPaymentMethod();

      const { oldValue: oldFieldValue, newValue: newFieldValue } = getFieldDifference(approvedData.oldValue, approvedData.newValue, approvedData.fieldName);
      const newValues = parseJson(approvedData.newValue);
      setOldFieldValue(oldFieldValue);
      setNewFieldValue(newFieldValue);
      const findKey = (obj, keySubstring) => {
        return Object.keys(obj).find((key) =>
          key.toLowerCase().includes(keySubstring.toLowerCase())
        );
      };

      // Check for the presence of customerId or supplierId keys
      const customerIdKey = findKey(newValues, 'customerid');
      const supplierIdKey = findKey(newValues, 'supplierid');

      // Retrieve the corresponding values
      const customerId = customerIdKey ? newValues[customerIdKey] : null;
      const supplierId = supplierIdKey ? newValues[supplierIdKey] : null;
      // Determine if the redirect button should be shown
      const showRedirectButton = !!customerId || !!supplierId;
      setCustomerId(customerId);
      setSupplierId(supplierId);
      setShowRedirectButton(showRedirectButton);
    } else if (!approvedData) {
      setOldFieldValue(null);
      setNewFieldValue(null);
      setCustomerId(null);
      setSupplierId(null);
      setShowRedirectButton(null);
    }
  }, [approvedData]);

  const handleRedirectClick = () => {
    if (customerId) {
      window.open(`/CustomerDetails/${encryptUrlData(customerId)}`, '_blank');
    } else if (supplierId) {
      window.open(`/SupplierDetails/${encryptUrlData(supplierId)}`, '_blank');
    }
  };

  const handleApprovalRequest = () => {
    approvalStatus(MyTaskStatus.Accept);
  }

  const handleRejectRequest = () => {
    approvalStatus(MyTaskStatus.Reject);
  }

  const approvalStatus = (status) => {
    if (status === "Accept") {
      let request = {
        status: status,
        approvalRequestId: approvalRequestId,
      }
      updateApprovalRequest(request);
    } else {
      let data = ref.current.getFormData();
      if (data) {
        let request = {
          status: status,
          approvalRequestId: approvalRequestId,
          rejectReason: data.rejectReason
        }
        updateApprovalRequest(request);
        setShowModal(false)
      }
    }
  }

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const renderValue = (value) => {
    if (Array.isArray(value)) {
      return (
        <ul className="pl-0 mt-1">
          {value.map((item, index) => (
            <li key={index} className="list-style">
              {renderValue(item)}
            </li>
          ))}
        </ul>
      );
    } else if (typeof value === 'object' && value !== null) {
      return (
        <ul className="pl-1 mt-1 border-dashed">
          {Object.entries(value).map(([subKey, subValue]) => (
            <li key={subKey} className="list-style">
              <span className="value-label">{subKey}:</span>
              <span className="value-data ml-2">{renderValue(subValue)}</span>
            </li>
          ))}
        </ul>
      );
    } else if (typeof value === 'boolean') {
      // Handle booleans
      return formatBoolean(value);
    } else {
      // Handle other values
      return value !== null ? value?.toString() : 'N/A';
    }
  };

  const renderLableName = (fieldName, value) => {
    switch (fieldName.toLowerCase()) {
      case MyTaskFieldNames.PAYMENTMETHODID.toLowerCase():
        return getDropdownLabelName(isGetAllPaymentMethodData, 'paymentMethodId', 'method', value);
      case MyTaskFieldNames.PAYMENTTERMID.toLowerCase():
        return getDropdownLabelName(isGetAllPaymentTermsData, 'paymentTermId', 'paymentTerm', value);
      default:
        return value;
    }
  }

  const renderKeyName = (fieldName) => {
    switch (fieldName.toLowerCase()) {
      case MyTaskFieldNames.PAYMENTMETHODID.toLowerCase():
        return MyTaskKeyNames.PAYMENTMETHODID;
      case MyTaskFieldNames.PAYMENTTERMID.toLowerCase():
        return MyTaskKeyNames.PAYMENTTERMID;
      default:
        return fieldName;
    }
  }

  return (
    <React.Fragment>
      {(approvedData && !isEventByIdLoading && !isUpdateLoading) || (isGetSupplierFetching || isGetCustomerFetching) ?
        <div className="task-detail">
          {approvedData ?
            <>
              <div className="task-head">
                <div className="d-flex align-items-center">
                  <span className="profile-icon">
                    {FirstSecondLetter(approvedData.requestedByUserName)}
                  </span>
                  <div className="title">
                    <h6 className="">{approvedData.eventName}</h6>
                    <span className="sub-title">
                      Generated by <b>{approvedData.requestedByUserName}</b> on
                      <b className="date ml-1">
                        {approvedData.requestedDate
                          ? formatDate(approvedData.requestedDate, "MM/DD/YYYY hh:mm A")
                          : "No Date"}
                      </b>
                      {/* <b>Requested By:</b>  */}
                    </span>
                  </div>
                </div>
                <div>
                  {/* <div className="date mb-2">
                    {approvedData.requestedDate
                      ? formatDate(approvedData.requestedDate, "MM/DD/YYYY hh:mm A")
                      : "No Date"}
                  </div> */}
                  {showRedirectButton && (
                    <div className="view-customer" onClick={handleRedirectClick}>
                      <Image imagePath={AppIcons.Iicon} altText="View Customer Icon" />
                      View Details
                    </div>
                  )}
                </div>
              </div>
              <div className="customer-information">
                <div className="row mb-3">
                  <div className="col-md-5">
                    <span className="info-label fw-bold">Customer Name : </span>
                    <span className="info-value ml-2">{customerData?.name}</span>
                  </div>
                  <div className="col-md-4">
                    <span className="info-label fw-bold">Email: </span>
                    <span className="info-value ml-2">{customerData?.emailAddress}</span>
                  </div>
                  <div className="col-md-3">
                    <span className="info-label fw-bold">Country : </span>
                    <span className="info-value ml-2">{customerData?.countryName}</span>
                  </div>
                </div>
                {!approvedData.isFunctional &&
                  <div className="info-row">
                    <span className="info-label">Field Name : </span>
                    <span className="info-value ml-2">{renderKeyName(approvedData.fieldName)}</span>
                  </div>
                }
                <div className="info-row">
                  <span className="info-label">Status : </span>
                  <span className={`ml-2 ${getLabelClass(approvedData.status)}`}>{approvedData.status}</span>
                </div>
                {approvedData.rejectReason &&
                  <div className="info-row">
                    <span className="info-label">Rejection Reason : </span>
                    <span className="info-value ml-2">{approvedData.rejectReason}</span>
                  </div>
                }
              </div>
              {approvedData.isFunctional ?
                <div className="value-comparison">
                  {approvedData?.eventName === FunctionalitiesName.UPLOADCUSTOMERDOCUMENT ?
                    <Base64FileViewer documentData={approvedData.newValue} isLoading={isEventByIdLoading} />
                    :
                    <React.Fragment>
                      {approvedData?.eventName.toLowerCase().includes("update") &&
                        <div className="value-block w-100">
                          <span className="value-title">Old Value</span>
                          {approvedData.oldValueTemplate ?
                            <div className="html-render mb-0" dangerouslySetInnerHTML={{ __html: approvedData.oldValueTemplate }}></div>
                            :
                            <>
                              {Object.entries(filterKeysWithId(parseJson(approvedData.oldValue))).length > 0 ? (
                                <ul className="value-content pl-0">
                                  {Object.entries(filterKeysWithId(parseJson(approvedData.oldValue))).map(([key, value]) => (
                                    <li key={key}>
                                      <span className="value-label">{key}:</span>
                                      <span className="value-data ml-2">
                                        {renderValue(value)}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <div className="no-value">No new value available</div>
                              )}
                            </>
                          }
                        </div>
                      }
                      <div className="value-block w-100">
                        <span className="value-title">New Value</span>
                        {approvedData.newValueTemplate ?
                          <div className="html-render mb-0" dangerouslySetInnerHTML={{ __html: approvedData.newValueTemplate }}></div>
                          :
                          <>
                            {Object.entries(filterKeysWithId(parseJson(approvedData.newValue))).length > 0 ? (
                              <ul className="value-content pl-0">
                                {Object.entries(filterKeysWithId(parseJson(approvedData.newValue))).map(([key, value]) => (
                                  <li key={key}>
                                    <span className="value-label">{key}:</span>
                                    <span className="value-data ml-2">
                                      {renderValue(value)}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <div className="no-value">No new value available</div>
                            )}
                          </>
                        }
                      </div>
                    </React.Fragment>
                  }
                </div>
                :
                <div className="value-comparison">
                  <div className="value-block">
                    <span className="value-title">Old Value</span>
                    {approvedData.fieldName && oldFieldValue !== "N/A" ? (
                      <div className="value-content">
                        <span className="value-label">{renderKeyName(approvedData.fieldName)} : </span>
                        <span className="value-data">
                          {/* {renderValue(oldFieldValue)} */}
                          {renderLableName(approvedData.fieldName, renderValue(oldFieldValue))}
                        </span>
                      </div>
                    ) : (
                      <div className="no-value">No old value available</div>
                    )}
                  </div>
                  <div className="value-block">
                    <span className="value-title">New Value</span>
                    {approvedData.fieldName && newFieldValue !== "N/A" ? (
                      <div className="value-content">
                        <span className="value-label">{renderKeyName(approvedData.fieldName)} : </span>
                        <span className="value-data">
                          {/* {renderValue(newFieldValue)} */}
                          {renderLableName(approvedData.fieldName, renderValue(newFieldValue))}
                        </span>
                      </div>
                    ) : (
                      <div className="no-value">No new value available</div>
                    )}
                  </div>
                </div>}
              {tabId !== 1 && approvedData.status !== "Reject" ?
                <div className="task-footer mt-3">
                  <Button className="reject-btn" onClick={handleToggleModal}>
                    {/* <Image imagePath={AppIcons.CloseIcon} altText="Reject Icon" /> */}
                    <Iconify icon="gg:close-o" className="mr-1" />
                    Reject
                  </Button>
                  <Button className="accept-btn" onClick={handleApprovalRequest}>
                    <Image imagePath={AppIcons.RightTickIcon} altText="Accept Icon" />
                    Accept
                  </Button>
                </div> : null}
              <CenterModel
                showModal={showModal}
                handleToggleModal={handleToggleModal}
                modalTitle="Add Rejection Reason"
                modelSizeClass="w-40">
                <div className="row  phone-numer-card">
                  <div className="col-md-12 add-edit-phoneForm">
                    <div className="row vertical-form">
                      <FormCreator config={addResonData} ref={ref} {...addResonData} />
                    </div>
                  </div>
                  <div className="col-md-12 mt-2">
                    <div className="d-flex align-item-center justify-content-end">
                      <Buttons
                        buttonTypeClassName="theme-button"
                        // buttonText={`${isEdit ? "Update" : "Add"}`}
                        buttonText="Add"
                        onClick={handleRejectRequest}
                      />
                      <Buttons
                        buttonTypeClassName="dark-btn ml-5"
                        buttonText="Cancel"
                        onClick={handleToggleModal}
                      />
                    </div>
                  </div>
                </div>
              </CenterModel>
            </>
            : <NoRecordFound />
          }
        </div>
        : <DataLoader />}
    </React.Fragment>
  );
};
TaskDetail.propTypes = {
  approvedData: PropTypes.shape({
    requestedByUserName: PropTypes.string,
    functionalityName: PropTypes.string,
    requestedDate: PropTypes.string,
    fieldName: PropTypes.string,
    status: PropTypes.string,
    oldValue: PropTypes.string,
    newValue: PropTypes.string,
  }),
  isFetching: PropTypes.bool.isRequired,
};
export default TaskDetail;
