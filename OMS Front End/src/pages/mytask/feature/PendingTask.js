/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLazyGetApprovalRequestsListByStatusAndRoleIdQuery } from "../../../app/services/ApprovalAPI";
import "../../mytask/MyTask.scss";
import NoRecordFound from "../../../components/ui/noRecordFound/NoRecordFound";
import DataLoader from "../../../components/ui/dataLoader/DataLoader";
import { FirstSecondLetter } from "../../../utils/FirstSecLetter/FirstSecondLetter";
import formatDate from "../../../lib/formatDate";
import CardSection from "../../../components/ui/card/CardSection";

const PendingTask = (props) => {
  const [pendingData, setPendingData] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [
    getApprovalRequestsListByStatus,
    {
      isFetching: isGetApprovalRequestsListByStatusFetching,
      isSuccess: isGetApprovalRequestsListByStatusSuccess,
      data: isGetApprovalRequestsListByStatusData,
    },
  ] = useLazyGetApprovalRequestsListByStatusAndRoleIdQuery();

  useEffect(() => {
    if (props.Pending) {
      getApprovalRequestList();
    }
  }, [props.Pending, props.roleId]);

  const getApprovalRequestList = () => {
    let req = {
      status: props.Pending,
      roleId: props.roleId,
    };
    getApprovalRequestsListByStatus(req);
  };

  useEffect(() => {
    if (props.isApproval) {
      getApprovalRequestList();
    }
    props.setIsApproval(false);
  }, [props.isApproval]);

  useEffect(() => {
    if (
      !isGetApprovalRequestsListByStatusFetching &&
      isGetApprovalRequestsListByStatusSuccess &&
      isGetApprovalRequestsListByStatusData
    ) {
      setPendingData(isGetApprovalRequestsListByStatusData);
    }
  }, [
    isGetApprovalRequestsListByStatusFetching,
    isGetApprovalRequestsListByStatusSuccess,
    isGetApprovalRequestsListByStatusData,
  ]);

  const handleTabClick = (id) => {
    setActiveTab(id);
    if (props.onGetById) {
      props.onGetById(id);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-5 pr-0">
          <CardSection cardTitle="Modules">
            <div className="module-listing">
              <ul>
                <li>
                  <a href="">customer</a>
                </li>
                <li>
                  <a href="">Supplier</a>
                </li>
                <li>
                  <a href="">Dummy Modules</a>
                </li>
              </ul>
            </div>
          </CardSection>
        </div>
        <div className="col-7 pl-1 pr-1">
          <CardSection cardTitle="Events" rightButton={true}>
            <div className="customer-info">
              {isGetApprovalRequestsListByStatusFetching ? (
                <DataLoader />
              ) : (
                <div className="tabs">
                  {pendingData.length > 0 ? (
                    pendingData.map((tab) => (
                      <button
                        key={tab.approvalRequestId} // Use a unique key
                        className={`tab-button ${
                          activeTab === tab.approvalRequestId ? "active" : ""
                        }`}
                        onClick={() => handleTabClick(tab.approvalRequestId)}
                      >
                        <div className="d-flex align-items-center">
                          <span className="profile-icon">
                            {" "}
                            {FirstSecondLetter(tab.eventName)}
                          </span>
                          <div className="title">
                            {tab.eventName}
                            <div className="bage-fix">
                              <span className="sub-title">
                                {tab.moduleName}
                              </span>
                              <div
                                className={`mytask-type-badge ${
                                  tab.isFunctional ? "badge-accept" : ""
                                }`}
                              >
                                {tab.isFunctional ? "Functional" : "Field"}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="date">
                          {tab.requestedDate
                            ? formatDate(
                                tab.requestedDate,
                                "MM/DD/YYYY hh:mm A"
                              )
                            : "No Date"}
                        </div>
                      </button>
                    ))
                  ) : (
                    <NoRecordFound />
                  )}
                </div>
              )}
            </div>
          </CardSection>
        </div>
      </div>
    </>
  );
};
PendingTask.propTypes = {
  Pending: PropTypes.string,
  roleId: PropTypes.number.isRequired,
  onGetById: PropTypes.func,
};
export default PendingTask;
