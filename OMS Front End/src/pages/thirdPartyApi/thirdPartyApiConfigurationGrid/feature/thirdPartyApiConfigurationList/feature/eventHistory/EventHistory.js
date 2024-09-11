/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useGetApiEventLogByEventIdMutation } from "../../../../../../../app/services/thirdPartyAPI";
import DataLoader from "../../../../../../../components/ui/dataLoader/DataLoader";
import formatDate from "../../../../../../../lib/formatDate";
import NoRecordFound from "../../../../../../../components/ui/noRecordFound/NoRecordFound";
import '../../../../../../../pages/organization/feature/organizationHistory/OrganizationHistory.scss';

const EventHistory = ({keyId}) => {
    const [historyLogList, setHistoryLogList] = useState([]);
    const [
        getApiEventLogByEventId,
      {
        isLoading: isGetApiEventLogByEventIdLoading,
        isSuccess: isGetApiEventLogByEventIdSuccess,
        data: isGetApiEventLogByEventIdData,
      },
    ] = useGetApiEventLogByEventIdMutation();
  
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
        eventId:keyId,
      };
      getApiEventLogByEventId(request);
    };
  
    useEffect(() => {
      if (isGetApiEventLogByEventIdSuccess && isGetApiEventLogByEventIdData) {
        setHistoryLogList(isGetApiEventLogByEventIdData.dataSource);
      }
    }, [isGetApiEventLogByEventIdSuccess, isGetApiEventLogByEventIdData]);

    const renderContent = () => {
        if (isGetApiEventLogByEventIdLoading) {
          return (
            <div>
              <DataLoader />
            </div>
          ); 
        }
    
        if (historyLogList.length > 0) {
          return (
            <>
              <h4 className="organization-tab-title">History</h4>
              <div className="vertical-timeline vertical-timeline--animate vertical-timeline--one-column">
                {historyLogList.map((event, index) => {
                  const formattedDate = event.eventRunDate
                    ? formatDate(event.eventRunDate, "MM/DD/YYYY hh:mm A")
                    : "";
                  return (
                    <div
                      className="vertical-timeline-item vertical-timeline-element"
                      key={event.eventLogLogId || index}
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
                            <span className="mr-1 font-bold">
                             Status Code :  {event.statusCode}
                            </span>
                          </h4>
                          <p>{event.errorMessage}</p>
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
export default EventHistory;
