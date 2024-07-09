/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
//** Lib's */
import "./../../HistoryDetail/TimeLine.scss";
import { AppIcons } from "../../../../../data/appIcons";
import InfiniteScroll from "react-infinite-scroll-component";
import Buttons from "../../../../../components/ui/button/Buttons";
import DataLoader from "../../../../../components/ui/dataLoader/DataLoader";
import NoRecordFound from "../../../../../components/ui/noRecordFound/NoRecordFound";
import { modifyTimeLineData } from "../../../../../utils/TransformData/TransformAPIData";
import DropDown from "../../../../../components/ui/dropdown/DropDrown";

const TimeLine = ({ keyId, isSupplier, getAuditHistory, getSearchFilterBindHistory }) => {

  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [historyData, setHistoryData] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const [eventNameOptions, setEventNameOptions] = useState([]);
  const [userNameOptions, setUserNameOptions] = useState([]);
  const [selectedEventName, setSelectedEventName] = useState("");
  const [selectedUserName, setSelectedUserName] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");

  /* NOTE:- 
    API Call
    The "getAuditHistory" function is passed dynamically as a prop.
    This allows the TimeLine component to be reused with different API call functions.
  */
  const [getAuditHistoryByCustomerId, { isLoading: isGetHistoryLoading, isSuccess: isGetHistorySuccess, data: isGetHistoryData }] = getAuditHistory();
  const [getSearchFilter, { isSuccess: isGetSearchFilterSuccess, data: isGetSearchFilterData }] = getSearchFilterBindHistory();

  useEffect(() => {
    getListApi(pageNumber);
    getSearchFilter(keyId);
  }, [keyId]);

  useEffect(() => {
      getListApi(pageNumber);
  }, [selectedEventName, selectedUserId]);

  const getListApi = (page) => {
    const eventNameParam = Array.isArray(selectedEventName) ? selectedEventName.join(',') : (selectedEventName || '');
    const userIdParam = Array.isArray(selectedUserId) ? selectedUserId.join(',') : (selectedUserId || '');

    const request = {
      pagination: {
        pageNumber: page,
        pageSize: 25,
      },
      [isSupplier ? 'supplierId' : 'customerId']: keyId,
      filters: {
        searchText: ""
      },
      supplierId: keyId,
      eventName: eventNameParam,
      userId: userIdParam,
      toDate: null,
      fromDate: null
    };
    getAuditHistoryByCustomerId(request);
  };

  const handleChange = () => {
    getListApi(1);
    setHasMore(true);
    setRefreshData(true);
    setHistoryData([]);
  };

  useEffect(() => {
    if (isGetHistorySuccess && isGetHistoryData) {
      if (isGetHistoryData.dataSource && isGetHistoryData.dataSource.length > 0) {
        const modifyData = modifyTimeLineData(isGetHistoryData.dataSource);
        if (refreshData) {
          setRefreshData(false);
          setHistoryData(modifyData);
        } else {
          if (selectedEventName || selectedUserName) {
            setHistoryData(modifyData);
          } else {
            setHistoryData((prevData) => [...prevData, ...modifyData]);
          }
        }
      } else {
        setHasMore(false);
      }
    }
  }, [isGetHistorySuccess, isGetHistoryData]);

  useEffect(() => {
    if (isGetSearchFilterSuccess && isGetSearchFilterData) {
      const uniqueEventNames = Array.from(new Set(isGetSearchFilterData.map(item => item.eventName)));
      const uniqueUserNames = Array.from(new Set(isGetSearchFilterData.map(item => item.userName)));
      const eventOptions = uniqueEventNames.map(eventName => ({ label: eventName, value: eventName }));
      const userOptions = uniqueUserNames.map(userName => ({ label: userName, value: userName }));
      setEventNameOptions(eventOptions);
      setUserNameOptions(userOptions);
      // setShouldRerenderFormCreator((prevState) => !prevState);
    }
  }, [isGetSearchFilterSuccess, isGetSearchFilterData]);

  const handleEventNameChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setSelectedEventName(selectedValues);
    const selectedEvent = isGetSearchFilterData.find(
      (item) => item.eventName === selectedValues[0]
    );
    if (selectedEvent) {
      if(!selectedEvent.userName){
        setSelectedUserName(selectedEvent.userName);
      }
    }
  };

  const handleUserNameChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setSelectedUserName(selectedValues);
    const selectedUserIds = isGetSearchFilterData
      .filter((item) => selectedValues.includes(item.userName))
      .map((user) => user.userId.toString())
      .join(',');
    setSelectedUserId(selectedUserIds);
  };

  const fetchMoreData = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  return (
    <div className="row">
      <div className="serach-bar-history"
      >
        <div className="col-md-4">
          <DropDown
            placeholder="Search By Event Name"
            options={eventNameOptions}
            value={selectedEventName}
            onChange={handleEventNameChange}
            isMultiSelect={true}
            closeMenuOnSelect={false}
          />
        </div>
        <div className="col-md-4 ml-3">
          <DropDown
            placeholder="Search By User Name"
            options={userNameOptions}
            value={selectedUserName}
            onChange={handleUserNameChange}
            isMultiSelect={true}
            closeMenuOnSelect={false}
          />
        </div>
        <div className="col-md-4 refresh-btn-history">
          <Buttons
            buttonTypeClassName="theme-button"
            buttonText="Refresh"
            onClick={handleChange}
            imagePath={AppIcons.refreshIcone}
            textWithIcon={true}
          ></Buttons>
        </div>
      </div>
      <div className="col-md-12">
        <div className="main-card mt-2" id="scrollableDiv">
          <InfiniteScroll
            dataLength={historyData.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={isGetHistoryLoading ? <DataLoader /> : null}
            scrollableTarget="scrollableDiv"
          >
            <div className="new-timeline-sec">
              <ol className="timeline">
                {historyData.length > 0 ? (
                  historyData.map((item, index) => (
                    <li
                      className="timeline-item"
                      key={index}
                    >
                      <span className="timeline-item-icon">
                        {item.eventStatus === "Insert" ? (
                          <>
                            {" "}
                            <img src={AppIcons.PlusIcon} alt="Insert Icon" />
                          </>
                        ) : (
                          <>
                            {" "}
                            <img
                              src={AppIcons.UpdateIcon}
                              alt="Update Icon"
                            />
                          </>
                        )}
                      </span>
                      <div className="timeline-item-description">
                        <div className="right-desc-sec">
                          <div className="msg-section ">
                            <p>{item.description}</p>
                          </div>
                          <div className="type-name">{item.eventName}</div>
                        </div>
                      </div>
                    </li>
                  ))
                ) : !isGetHistoryLoading ? (
                  <NoRecordFound />
                ) : null}
              </ol>
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
