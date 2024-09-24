/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import NoRecordFound from "../../../../components/ui/noRecordFound/NoRecordFound";
import "./OrganizationHistory.scss";
import { useGetOrganizationHistorysMutation } from "../../../../app/services/organizationAPI";
import formatDate from "../../../../lib/formatDate";
import DataLoader from "../../../../components/ui/dataLoader/DataLoader";

const OrganizationHistory = () => {
  const [historyData, setHistoryData] = useState([]);
  const [
    getOrganizationHistorys,
    {
      isLoading: isGetOrganizationHistorysLoading,
      isSuccess: isGetOrganizationHistorysSuccess,
      data: isGetOrganizationHistorysData,
    },
  ] = useGetOrganizationHistorysMutation();

  useEffect(() => {
    getListApi(1);
  }, []);

  const getListApi = (page) => {
    const request = {
      pagination: {
        pageNumber: page,
        pageSize: 25,
      },
      filters: {
        searchText: "",
      },
      sortString: "",
    };
    getOrganizationHistorys(request);
  };

  useEffect(() => {
    if (isGetOrganizationHistorysSuccess && isGetOrganizationHistorysData) {
      setHistoryData(isGetOrganizationHistorysData.dataSource);
    }
  }, [isGetOrganizationHistorysSuccess, isGetOrganizationHistorysData]);

  const renderContent = () => {
    if (isGetOrganizationHistorysLoading) {
      return (
        <div>
          <DataLoader />
        </div>
      ); // Replace with a proper loading spinner or component
    }

    if (historyData.length > 0) {
      return (
        <>
          {/* <h4 className="organization-tab-title">History</h4> */}
          <div className="vertical-timeline vertical-timeline--animate vertical-timeline--one-column">
            {historyData.map((event, index) => {
              const formattedDate = event.changeAt
                ? formatDate(event.changeAt, "MM/DD/YYYY hh:mm A")
                : "";
              return (
                <div
                  className="vertical-timeline-item vertical-timeline-element"
                  key={event.organizationHistoryId || index}
                >
                  <div>
                    <span className="vertical-timeline-element-icon bounce-in">
                      <i className="badge badge-dot badge-dot-xl badge-primary">
                        {" "}
                      </i>
                    </span>
                    <div className="vertical-timeline-element-content bounce-in">
                      <h4 className="timeline-title">
                        <span className="mr-1">{event.eventName}</span>
                        {/* <span className="mr-1 font-bold">
                          {event.eventStatus}
                        </span> */}
                      </h4>
                      <p>{event.description} by {event.name}</p>
                      <span className="vertical-timeline-element-date">
                        {formattedDate}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      );
    }

    return <NoRecordFound />;
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="main-card">{renderContent()}</div>
      </div>
    </div>
  );
};

export default OrganizationHistory;
