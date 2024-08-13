/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { AppIcons } from "../../../data/appIcons";
import { useNavigate } from "react-router-dom";
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
//import Buttons from "../../../components/ui/button/Buttons";

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
  const fieldNameLower = fieldName.toLowerCase();

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

const TaskDetail = ({ approvalRequestId, approvedData, isFetching, getApprovalRequestsByApprovalRequestId }) => {
  const navigate = useNavigate();

  const [updateApprovalRequest, { isLoading: isUpdateLoading, isSuccess: isUpdateSuccess, data: isUpdateData }] = useUpdateApprovalRequestsStatusMutation();

  useEffect(() => {
    if (isUpdateSuccess && isUpdateData) {
      ToastService.success(isUpdateData.errorMessage);
      getApprovalRequestsByApprovalRequestId(approvalRequestId);
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
  const { customerId, supplierId } = newValues;

  const showRedirectButton = customerId || supplierId;

  const handleRedirectClick = () => {
    if (customerId) {
      navigate(`/CustomerDetails/${encryptUrlData(customerId)}`);
    } else if (supplierId) {
      navigate(`/SupplierDetails/${encryptUrlData(supplierId)}`);
    }
  };

  const handleApprovalRequest = () => {
    approvalStatus(MyTaskStatus.Accept);
  }

  const handleRejectRequest = () => {
    approvalStatus(MyTaskStatus.Pending);
  }

  const approvalStatus = (status) => {
    let request = {
      status: status,
      approvalRequestId: approvalRequestId
    }
    updateApprovalRequest(request);
  }

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
        <div className="info-row">
          <span className="info-label">Field Name : </span>
          <span className="info-value ml-2">{fieldName}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Status : </span>
          <span className={`ml-2 ${getLabelClass(status)}`}>{status}</span>
        </div>
      </div>
      <div className="value-comparison">
        <div className="value-block">
          <h3 className="value-title">Old Value</h3>
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
          <h3 className="value-title">New Value</h3>
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

      <div className="task-footer mt-3 pr-3">
        <Button className="reject-btn" onClick={handleRejectRequest}>
          {/* <Image imagePath={AppIcons.CloseIcon} altText="Reject Icon" /> */}
          <Iconify icon="gg:close-o" />
          Reject
        </Button>
        <Button className="accept-btn" onClick={handleApprovalRequest}>
          <Image imagePath={AppIcons.RightTickIcon} altText="Accept Icon" />
          Accept
        </Button>
      </div>
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
