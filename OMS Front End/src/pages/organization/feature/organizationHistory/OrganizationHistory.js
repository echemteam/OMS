/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import NoRecordFound from "../../../../components/ui/noRecordFound/NoRecordFound";
import "./OrganizationHistory.scss";
import { useGetOrganizationHistorysMutation } from "../../../../app/services/organizationAPI";
import formatDate from "../../../../lib/formatDate";
import DataLoader from "../../../../components/ui/dataLoader/DataLoader";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";

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

  const [selectedDateRange, setSelectedDateRange] = useState({
    fromDate: null,
    toDate: null,
  });
  useEffect(() => {
    getListApi(1);
  }, []);

  useEffect(() => {
    if (selectedDateRange.fromDate !== null && selectedDateRange.toDate !== null) {
      getListApi(1);
    } else if (selectedDateRange.fromDate === null && selectedDateRange.toDate === null) {
      getListApi(1);
    }
  }, [selectedDateRange]);
  

  const getListApi = (page) => {
    const request = {
      pagination: {
        pageNumber: page,
        pageSize: 25,
      },
      filters: {
        searchText: "",
        
      },
      fromDate: selectedDateRange.fromDate
        ? formatDate(selectedDateRange.fromDate, "YYYY-MM-DD")
        : null,
      toDate: selectedDateRange.toDate
        ? formatDate(selectedDateRange.toDate, "YYYY-MM-DD")
        : null,
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

    const handleDateRangeChange = (ranges) => {
      if (ranges && ranges.length === 2) {
        const fromDate = ranges[0];
        const toDate = ranges[1];
        setSelectedDateRange({
          fromDate: fromDate,
          toDate: toDate,
        });
      } else {
        setSelectedDateRange({
          fromDate: null,
          toDate: null,
        });
      }
    };
    const clearDateRange = (page) => {
      setSelectedDateRange({
        fromDate: null,
        toDate: null,
      });
      const request = {
        pagination: {
          pageNumber: page,
          pageSize: 25,
        },
        filters: {
          searchText: "",
        },
        fromDate: null,
        toDate: null,
        sortString: "",
      };
      getOrganizationHistorys(request);
    };
     
      return (
        <>
            {/* <h4 className="organization-tab-title">History</h4> */}
            <h4 className="organization-tab-title">History</h4>
            <div className="serach-bar-history">
            <div className="card w-100">
              <div className="d-flex ">
              <div className="custom-datepicker date-field input-padding-comman mb-4">
                  <DateRangePicker
                    onChange={handleDateRangeChange}
                    value={[selectedDateRange.fromDate, selectedDateRange.toDate]}
                    clearIcon={
                      <i className="fa fa-times" onClick={clearDateRange}></i>
                    }
                    dayPlaceholder="DD"
                    monthPlaceholder="MM"
                    yearPlaceholder="YYYY"
                  />
                </div>
              </div>
            </div>
            </div>
          {historyData.length === 0 ? (
      <NoRecordFound />
    ) : (
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
          )}
        </>
      );
    }

   

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="main-card">{renderContent()}</div>
      </div>
    </div>
  );
};

export default OrganizationHistory;
