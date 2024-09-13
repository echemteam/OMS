/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
//** Lib's */
import PropTypes from "prop-types";
import "../../mytask/MyTask.scss";
import formatDate from "../../../lib/formatDate";
import { MyTaskStatus } from "../../../utils/Enums/commonEnums";
import CardSection from "../../../components/ui/card/CardSection";
import { getAuthProps } from "../../../lib/authenticationLibrary";
import DataLoader from "../../../components/ui/dataLoader/DataLoader";
import NoRecordFound from "../../../components/ui/noRecordFound/NoRecordFound";
import { FirstSecondLetter } from "../../../utils/FirstSecLetter/FirstSecondLetter";
//** Service's */
import { useLazyGetApprovalRequestsListByStatusAndRoleIdQuery } from "../../../app/services/ApprovalAPI";
//** Component's */
import ModuleList from "./ModuleList";

const ArchiveTask = (props) => {

  const authData = getAuthProps();
  const roleId = authData.roles.roleId;
  const [orderBy, setOrderBy] = useState("Newest");
  const [activeTab, setActiveTab] = useState(null);
  const [archiveData, setArchiveData] = useState([]);
  const [selectedfilterBy, setSelectedFilterBy] = useState([]);
  const [selectedModule, setSelectedModule] = useState(props.moduleList[0]?.moduleId);

  const [getApprovalRequestsListByStatus, { isFetching: isGetApprovalRequestsListByStatusFetching, isSuccess: isGetApprovalRequestsListByStatusSuccess, data: isGetApprovalRequestsListByStatusData }] = useLazyGetApprovalRequestsListByStatusAndRoleIdQuery();

  useEffect(() => {
    if (roleId && props.moduleList && props.moduleList.length > 0) {
      handleRequest();
    }
  }, [roleId, props.moduleList]);

  useEffect(() => {
    if (!isGetApprovalRequestsListByStatusFetching && isGetApprovalRequestsListByStatusSuccess && isGetApprovalRequestsListByStatusData) {
      setArchiveData(isGetApprovalRequestsListByStatusData);
      if (!isGetApprovalRequestsListByStatusData || isGetApprovalRequestsListByStatusData?.length === 0) {
        if (props.handleRestEventDetail) {
          props.handleRestEventDetail();
        }
      } else {
        handleTabClick(isGetApprovalRequestsListByStatusData[0]?.approvalRequestId);
      }
    }
  }, [isGetApprovalRequestsListByStatusFetching, isGetApprovalRequestsListByStatusSuccess, isGetApprovalRequestsListByStatusData]);

  const handleRequest = (updatedFields = {}) => {
    let req = {
      status: [MyTaskStatus.Accept, MyTaskStatus.Reject], // Common value
      roleId: roleId,  // Common value
      orderby: orderBy || "Newest", // Default to "Newest" if not set
      eventIds: selectedfilterBy || [], // Default to empty array if no filter is set
      moduleId: selectedModule || props.moduleList[0]?.moduleId, // Default to the first module if not set
      ...updatedFields
    };
    getApprovalRequestsListByStatus(req);
  };
  const handleTabClick = (id) => {
    setActiveTab(id);
    if (props.onGetById) {
      props.onGetById(id);
    }
  };
  const handleModuleClick = (moduleId) => {
    handleRequest({ moduleId });
    setSelectedModule(moduleId);
    if (props.handleRestEventDetail) {
      props.handleRestEventDetail();
    }
  };
  const selectedSortOrder = (orderBy) => {
    handleRequest({ orderby: orderBy });
    setOrderBy(orderBy);
  };
  const selectedFilterOptions = (selectedFilterOption) => {
    handleRequest({ eventIds: selectedFilterOption });
    setSelectedFilterBy(selectedFilterOption);
  };

  return (
    <>
      <div className="row">
        <div className="col-5 pr-0">
          <ModuleList moduleList={props.moduleList}
            onModuleChange={handleModuleClick}
          />
        </div>
        <div className="col-7 pl-1 pr-1">
          <CardSection cardTitle="Events" rightButton={true} isShort={true}
            filtersOptions={props.eventList}
            selectedFilterOptions={selectedFilterOptions}
            selectedSortOrder={selectedSortOrder}>
            <div className="customer-info">
              {isGetApprovalRequestsListByStatusFetching ? (
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
                        <div className="d-flex align-items-center">
                          <span className="profile-icon">
                            {" "}
                            {FirstSecondLetter(tab.eventName)}{" "}
                          </span>
                          {/* <div className="title">
                                        {tab.functionalityName}
                                        <span className="sub-title">{tab.moduleName}</span>
                                    </div> */}
                          <div className="title">
                            {tab.eventName}
                            <div className="bage-fix">
                              <span className="sub-title">
                                {tab.moduleName}
                              </span>
                              <div
                                className={`mytask-type-badge ${tab.status === "Accept"
                                  ? "badge-accept"
                                  : tab.status === "Reject"
                                    ? "badge-reject"
                                    : ""
                                  }`}
                              >
                                {tab.status}
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
ArchiveTask.propTypes = {
  Accept: PropTypes.string,
  roleId: PropTypes.number.isRequired,
  onGetById: PropTypes.func,
};
export default ArchiveTask;
