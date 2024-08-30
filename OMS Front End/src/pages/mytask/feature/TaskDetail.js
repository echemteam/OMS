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

const formatBoolean = (value) => (value ? "True" : "False");

const renderPhoneList = (phoneList) => {
  if (!Array.isArray(phoneList) || phoneList.length === 0) {
    return <div className="no-value">No phone list available</div>;
  }

  return (
    <ul className="value-content pl-0">
      {phoneList.map((phone, index) => (
        <li key={index} className="dynamic-task-sepration">
          <span className="value-label">Phone Type:</span>
          <span className="value-data ml-2">{phone.phoneType}</span>
          <br />
          <span className="value-label">Phone Number:</span>
          <span className="value-data ml-2">{phone.phoneNumber}</span>
          <br />
          <span className="value-label">Extension:</span>
          <span className="value-data ml-2">{phone.extension}</span>
          <br />
          <span className="value-label">Is Primary:</span>
          <span className="value-data ml-2">{formatBoolean(phone.isPrimary)}</span>
        </li>
      ))}
    </ul>
  );
};

const renderEmailList = (emailList) => {
  if (!Array.isArray(emailList) || emailList.length === 0) {
    return <div className="no-value">No email list available</div>;
  }

  return (
    <ul className="value-content pl-0">
      {emailList.map((email, index) => (
        <li key={index} className="mb-1">
          <span className="value-label">Email Address:</span>
          <span className="value-data ml-2">{email.emailAddress}</span>
          <br />
          <span className="value-label">Is Primary Email:</span>
          <span className="value-data ml-2">{formatBoolean(email.isEmailPrimary)}</span>
        </li>
      ))}
    </ul>
  );
};

const renderValue = (key, value) => {
  if (value === null || value === undefined) {
    return <div className="no-value">No value available</div>;
  }

  if (Array.isArray(value)) {
    if (key.toLowerCase().includes('phone')) {
      return renderPhoneList(value);
    } else if (key.toLowerCase().includes('email')) {
      return renderEmailList(value);
    } else {
      return value.join(', ');
    }
  } else if (typeof value === "boolean") {
    return formatBoolean(value);
  } else if (typeof value === "object") {
    if (value === null) {
      return <div className="no-value">No data available</div>;
    }
    return value.label || JSON.stringify(value);
  } else {
    return value;
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

const TaskDetail = ({ approvalRequestId, approvedData, isFetching, approvalRequest, tabId }) => {

  const ref = useRef();
  const [showModal, setShowModal] = useState(false);
  const [updateApprovalRequest, { isLoading: isUpdateLoading, isSuccess: isUpdateSuccess, data: isUpdateData }] = useUpdateApprovalRequestsStatusMutation();

  useEffect(() => {
    if (isUpdateSuccess && isUpdateData) {
      setShowModal(false);
      ToastService.success(isUpdateData.errorMessage);
      approvalRequest(approvalRequestId);
    }
  }, [isUpdateSuccess, isUpdateData]);

  if (isFetching || isUpdateLoading) {
    return <DataLoader />;
  }

  if (!approvedData) {
    return <NoRecordFound />;
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

  const customerIdKey = findKey(newValues, 'customerid');
  const supplierIdKey = findKey(newValues, 'supplierid');

  const customerId = customerIdKey ? newValues[customerIdKey] : null;
  const supplierId = supplierIdKey ? newValues[supplierIdKey] : null;

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
      };
      updateApprovalRequest(request);
    } else {
      let data = ref.current.getFormData();
      if (data) {
        let request = {
          status: status,
          approvalRequestId: approvalRequestId,
          rejectReason: data.rejectReason
        };
        updateApprovalRequest(request);
        setShowModal(false);
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
                  <li key={key}>
                    <span className="value-label">{key}:</span>
                    <span className="value-data ml-2">{renderValue(key, value)}</span>
                  </li>
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
                <span className="value-label">{fieldName}:</span>
                <span className="value-data">
                  {renderValue(fieldName, oldFieldValue)}
                </span>
              </div>
            ) : (
              <div className="no-value">No old value available</div>
            )}
          </div>
          <div className="value-block">
            <span className="value-title">New Value</span>
            {Object.entries(parseJson(approvedData.newValue)).length > 0 ? (
              <ul className="value-content pl-0">
                {Object.entries(parseJson(approvedData.newValue)).map(([key, value]) => (
                  <li key={key}>
                    <span className="value-label">{key}:</span>
                    <span className="value-data ml-2">{renderValue(key, value)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="no-value">No new value available</div>
            )}
          </div>
        </div>
      }

      <div className="action-buttons">
        <Buttons
          onClick={handleApprovalRequest}
          variant="success"
          size="sm"
          text="Approve"
          isLoading={isUpdateLoading}
        />
        <Buttons
          onClick={handleToggleModal}
          variant="danger"
          size="sm"
          text="Reject"
        />
      </div>
      <CenterModel
        show={showModal}
        handleClose={handleToggleModal}
        title="Reject Reason"
        isSubmitLoading={isUpdateLoading}
      >
        <FormCreator
          ref={ref}
          formData={addResonData}
        />
        <div className="modal-buttons">
          <Button
            variant="secondary"
            onClick={handleToggleModal}
            disabled={isUpdateLoading}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleRejectRequest}
            disabled={isUpdateLoading}
          >
            Submit
          </Button>
        </div>
      </CenterModel>
    </div>
  );
};

TaskDetail.propTypes = {
  approvalRequestId: PropTypes.number.isRequired,
  approvedData: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  approvalRequest: PropTypes.func.isRequired,
  tabId: PropTypes.number.isRequired
};

export default TaskDetail;
