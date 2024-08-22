/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { AppIcons } from "../../../data/appIcons";
// import { useNavigate } from "react-router-dom";
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
import { MyTaskStatus } from "../../../utils/Enums/commonEnums";
import Buttons from "../../../components/ui/button/Buttons";
import FormCreator from "../../../components/Forms/FormCreator";
import CenterModel from "../../../components/ui/centerModel/CenterModel";
import { addResonData } from "../config/RejectReason.data";

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

const formatBoolean = (value) => (value ? "True" : "False");

const TaskDetail = ({ approvalRequestId, approvedData, isFetching, approvalRequest, tabId }) => {

  // const navigate = useNavigate();
  const ref = useRef();
  const [showModal, setShowModal] = useState(false);
  const [updateApprovalRequest, { isLoading: isUpdateLoading, isSuccess: isUpdateSuccess, data: isUpdateData }] = useUpdateApprovalRequestsStatusMutation();

  useEffect(() => {
    if (isUpdateSuccess && isUpdateData) {
      setShowModal(false)
      ToastService.success(isUpdateData.errorMessage);
      approvalRequest(approvalRequestId);
    }
  }, [isUpdateSuccess, isUpdateData]);

  if (isFetching || isUpdateLoading) {
    return <DataLoader />; // Display loader while loading
  }

  if (!approvedData) {
    return (
      <div>
        <NoRecordFound />
      </div>
    );
  }

  const {
    requestedByUserName = "Unknown User",
    functionalityName = "No Functionality",
    requestedDate,
    fieldName = "No Field Name",
    status = "No Status",
    oldValue = "{}",
    newValue = "{}",
  } = approvedData;

  const { oldValue: oldFieldValue, newValue: newFieldValue } = getFieldDifference(oldValue, newValue, fieldName);

  const newValues = parseJson(newValue);

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
      }
    }
  }

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };


  return (
    <div className="task-detail">
      <div className="task-head">
        <div className="d-flex align-items-center">
          <span className="profile-icon">
            {FirstSecondLetter(requestedByUserName)}
          </span>
          <div className="title">
            {requestedByUserName}
            <span className="sub-title">{functionalityName}</span>
          </div>
        </div>
        <div>
          <div className="date">
            {requestedDate
              ? formatDate(requestedDate, "MM/DD/YYYY hh:mm A")
              : "No Date"}
          </div>
          {showRedirectButton && (
            <div className="view-customer" onClick={handleRedirectClick}>
              <Image imagePath={AppIcons.Iicon} altText="View Customer Icon" />
              View Details
            </div>
          )}
        </div>
      </div>
      <div className="customer-information">
        {!approvedData.isFunctional &&
          <div className="info-row">
            <span className="info-label">Field Name : </span>
            <span className="info-value ml-2">{fieldName}</span>
          </div>
        }
        <div className="info-row">
          <span className="info-label">Status : </span>
          <span className={`ml-2 ${getLabelClass(status)}`}>{status}</span>
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
          <div className="value-block">
            <span className="value-title">New Value</span>
            {Object.entries(parseJson(approvedData.newValue)).length > 0 ? (
              <ul className="value-content pl-0">
                {Object.entries(parseJson(approvedData.newValue)).map(([key, value]) => (
                  <>
                    <li className="">
                      <span className="value-label">{key}:</span>
                      <span className="value-data ml-2">
                        {typeof value === "boolean" ? formatBoolean(value) : value}
                      </span>
                    </li>

                  </>
                ))}
              </ul>
            ) : (
              <div className="no-value">No new value available</div>
            )}
          </div>
        </div>
        :
        <div className="value-comparison">
          <div className="value-block">
            <span className="value-title">Old Value</span>
            {fieldName && oldFieldValue !== "N/A" ? (
              <div className="value-content">
                <span className="value-label">{fieldName} : </span>
                <span className="value-data">
                  {typeof oldFieldValue === "boolean"
                    ? formatBoolean(oldFieldValue)
                    : oldFieldValue}
                </span>
              </div>
            ) : (
              <div className="no-value">No old value available</div>
            )}
          </div>
          <div className="value-block">
            <span className="value-title">New Value</span>
            {fieldName && newFieldValue !== "N/A" ? (
              <div className="value-content">
                <span className="value-label">{fieldName} : </span>
                <span className="value-data">
                  {typeof newFieldValue === "boolean"
                    ? formatBoolean(newFieldValue)
                    : newFieldValue}
                </span>
              </div>
            ) : (
              <div className="no-value">No new value available</div>
            )}
          </div>
        </div>
      }
      {tabId !== 1 &&
        <div className="task-footer mt-3 pr-3">
          <Button className="reject-btn" onClick={handleToggleModal}>
            {/* <Image imagePath={AppIcons.CloseIcon} altText="Reject Icon" /> */}
            <Iconify icon="gg:close-o" className="mr-1" />
            Reject
          </Button>
          <Button className="accept-btn" onClick={handleApprovalRequest}>
            <Image imagePath={AppIcons.RightTickIcon} altText="Accept Icon" />
            Accept
          </Button>
        </div>
      }
      <CenterModel
        showModal={showModal}
        handleToggleModal={handleToggleModal}
        modalTitle="Add Rejection Reason"
        modelSizeClass="w-40"
      >
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
    </div>

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
