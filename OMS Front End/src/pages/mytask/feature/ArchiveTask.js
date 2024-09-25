/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
//** Lib's */
import PropTypes from "prop-types";
import "../../mytask/MyTask.scss";
import formatDate from "../../../lib/formatDate";
import CardSection from "../../../components/ui/card/CardSection";
import { getAuthProps } from "../../../lib/authenticationLibrary";
import DataLoader from "../../../components/ui/dataLoader/DataLoader";
import NoRecordFound from "../../../components/ui/noRecordFound/NoRecordFound";
import { FirstSecondLetter } from "../../../utils/FirstSecLetter/FirstSecondLetter";
//** Service's */
import { useGetApprovalRequestsListByStatusAndRoleIdMutation } from "../../../app/services/ApprovalAPI";
//** Component's */
import ModuleList from "./ModuleList";
import { MyTaskStatus } from "../../../utils/Enums/commonEnums";

const ArchiveTask = (props) => {
  const authData = getAuthProps();
  const roleId = authData.roles.roleId;
  const [orderBy, setOrderBy] = useState("Newest");
  const [activeTab, setActiveTab] = useState(null);
  const [archiveData, setArchiveData] = useState([]);
  const [selectedfilterBy, setSelectedFilterBy] = useState([]);
  const [selectedModule, setSelectedModule] = useState(
    props.moduleList[0]?.moduleId
  );

  const [
    getApprovalRequestsListByStatus,
    {
      isLoading,
      isSuccess: isGetApprovalRequestsListByStatusSuccess,
      data: isGetApprovalRequestsListByStatusData,
    },
  ] = useGetApprovalRequestsListByStatusAndRoleIdMutation();

  useEffect(() => {
    if (roleId && props.moduleList && props.moduleList.length > 0) {
      handleRequest();
    }
  }, [roleId, props.moduleList]);

  useEffect(() => {
    if (
      isGetApprovalRequestsListByStatusSuccess &&
      isGetApprovalRequestsListByStatusData
    ) {
      setArchiveData(isGetApprovalRequestsListByStatusData);
      if (
        !isGetApprovalRequestsListByStatusData ||
        isGetApprovalRequestsListByStatusData?.length === 0
      ) {
        if (props.handleRestEventDetail) {
          props.handleRestEventDetail();
        }
      } else {
        handleTabClick(
          isGetApprovalRequestsListByStatusData[0]?.approvalRequestId
        );
      }
    }
  }, [
    isGetApprovalRequestsListByStatusSuccess,
    isGetApprovalRequestsListByStatusData,
  ]);

  const handleRequest = (key, value) => {
    const request = {
      status: [MyTaskStatus.Accept, MyTaskStatus.Reject].join(","),
      roleId: props.roleId,
      sortOrder: orderBy || "Newest",
      eventIds: Array.isArray(selectedfilterBy)
        ? selectedfilterBy.map(String).join(",")
        : selectedfilterBy,
      moduleId: selectedModule || props.moduleList[0]?.moduleId,
    };

    if (key) {
      request[key] = value; // Add or update the specific key-value pair
    }
    if (key === "eventIds") {
      request[key] = Array.isArray(value) ? value.map(String).join(",") : value;
    }

    getApprovalRequestsListByStatus(request);
  };

  const handleTabClick = (id) => {
    setActiveTab(id);
    props.setIsPending(false);
    if (props.onGetById) {
      props.onGetById(id);
    }
  };
  const handleModuleClick = (moduleId) => {
    setSelectedModule(moduleId);
    handleRequest("moduleId", moduleId);
    if (props.handleRestEventDetail) {
      props.handleRestEventDetail();
    }
  };
  const selectedSortOrder = (orderBy) => {
    setOrderBy(orderBy);
    handleRequest("sortOrder", orderBy);
  };
  const selectedFilterOptions = (selectedFilterOption) => {
    setSelectedFilterBy(selectedFilterOption);
    handleRequest("eventIds", selectedFilterOption);
  };

  return (
    <>
      <div className="row">

        <div className="col-5 pr-0 left-modual-sec">
          <ModuleList
            moduleList={props.moduleList} isPending={props.isPending}
            onModuleChange={handleModuleClick}
          />
        </div>
        <div className="col-7 pl-1 pr-1">
          <CardSection
            cardTitle="Events"
            rightButton={true}
            isShort={true}
            filtersOptions={props.eventList}
            selectedFilterOptions={selectedFilterOptions}
            selectedSortOrder={selectedSortOrder}
          >
            <div className="customer-info">
              {isLoading ? (
                <DataLoader />
              ) : (
                <div className="tabs">
                  {archiveData && archiveData.length > 0 ? (
                    archiveData.map((tab) => (
                      <button
                        key={tab.approvalRequestId} // Use a unique key
                        className={`tab-button ${activeTab === tab.approvalRequestId ? "active" : ""
                          }`}
                        onClick={() => handleTabClick(tab.approvalRequestId)}
                      >
                        <div className="d-flex align-items-start">
                          <span className="profile-icon">
                            {" "}
                            {FirstSecondLetter(tab.eventName)}{" "}
                          </span>
                          <div>
                            <div className="title">
                              {tab.eventName}
                              <div className="date">
                                {tab.requestedDate
                                  ? formatDate(
                                    tab.requestedDate,
                                    "MM/DD/YYYY hh:mm A"
                                  )
                                  : "No Date"}
                              </div>
                            </div>
                            <div className="bage-fix">
                              {/* <span className="sub-title">
                                {tab.moduleName}
                              </span> */}
                              <div
                                className={`mytask-type-badge ${tab.status === "Accept"
                                    ? "badge-accept"
                                    : tab.status === "Reject"
                                      ? "badge-reject"
                                      : ""
                                  }`}
                              >
                                {tab.status} by {tab.approvedByUserName} on{" "}
                                {formatDate(
                                  tab.approvedDate,
                                  "MM/DD/YYYY hh:mm A"
                                )}
                              </div>
                            </div>
                          </div>
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
ArchiveTask.propTypes = {
  Accept: PropTypes.string,
  roleId: PropTypes.number.isRequired,
  onGetById: PropTypes.func,
};
export default ArchiveTask;
