/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
//** Lib's */
import "./History.scss";
import InfiniteScroll from "react-infinite-scroll-component";

import NoRecordFound from "../../../../components/ui/noRecordFound/NoRecordFound";
import { AppIcons } from "../../../../data/appIcons";
import { modifyTimeLineData } from "../../../../utils/TransformData/TransformAPIData";
import DataLoader from "../../../../components/ui/dataLoader/DataLoader";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";
import ToastService from "../../../../services/toastService/ToastService";
import DropDown from "../../../../components/ui/dropdown/DropDrown";
import Buttons from "../../../../components/ui/button/Buttons";
import PropTypes from "prop-types";

const HistotyList = ({
  keyId,
  isSupplier,
  getAuditHistory,
  getSearchFilterBindHistory,
}) => {
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [historyData, setHistoryData] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const [eventNameOptions, setEventNameOptions] = useState([]);
  const [userNameOptions, setUserNameOptions] = useState([]);
  const [selectedEventName, setSelectedEventName] = useState("");
  const [selectedUserName, setSelectedUserName] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const [noRecordFound, setNoRecordFound] = useState(false);

  /* NOTE:- 
      API Call
      The "getAuditHistory" function is passed dynamically as a prop.
      This allows the TimeLine component to be reused with different API call functions.
    */
  const [
    getAuditHistoryByCustomerId,
    {
      isLoading: isGetHistoryLoading,
      isSuccess: isGetHistorySuccess,
      data: isGetHistoryData,
    },
  ] = getAuditHistory();
  const [
    getSearchFilter,
    { isSuccess: isGetSearchFilterSuccess, data: isGetSearchFilterData },
  ] = getSearchFilterBindHistory();

  useEffect(() => {
    getListApi(pageNumber);
    getSearchFilter(keyId);
  }, [keyId, pageNumber]);

  const getListApi = (page) => {
    const eventNameParam = Array.isArray(selectedEventName)
      ? selectedEventName.join(",")
      : selectedEventName || "";
    const userIdParam = Array.isArray(selectedUserId)
      ? selectedUserId.join(",")
      : selectedUserId || "";

    const request = {
      pagination: {
        pageNumber: page,
        pageSize: 25,
      },
      [isSupplier ? "supplierId" : "customerId"]: keyId,
      filters: {
        searchText: "",
      },
      eventName: eventNameParam,
      userId: userIdParam,
      fromDate: selectedDateRange.startDate
        ? new Date(selectedDateRange.startDate)
        : null,
      toDate: selectedDateRange.endDate
        ? new Date(selectedDateRange.endDate)
        : null,
    };
    getAuditHistoryByCustomerId(request);
  };

  useEffect(() => {
    if (isGetHistorySuccess && isGetHistoryData) {
      if (
        isGetHistoryData.dataSource &&
        isGetHistoryData.dataSource.length > 0
      ) {
        const modifyData = modifyTimeLineData(isGetHistoryData.dataSource);
        if (refreshData) {
          setRefreshData(false);
          setHistoryData(modifyData);
        } else if (
          selectedEventName.length ||
          selectedUserName.length ||
          selectedDateRange.startDate ||
          selectedDateRange.endDate
        ) {
          setHistoryData(modifyData);
        } else {
          setHistoryData((prevData) => [...prevData, ...modifyData]);
        }
        setNoRecordFound(false);
        if (modifyData.length < 25) {
          setHasMore(false); // No more data to load
        }
      } else {
        setNoRecordFound(true);
        setHasMore(false); // No more data to load
      }
    }
  }, [isGetHistorySuccess, isGetHistoryData]);

  useEffect(() => {
    if (isGetSearchFilterSuccess && isGetSearchFilterData) {
      const uniqueEventNames = Array.from(
        new Set(isGetSearchFilterData.map((item) => item.eventName))
      );
      const uniqueUserNames = Array.from(
        new Set(isGetSearchFilterData.map((item) => item.userName))
      );
      const eventOptions = uniqueEventNames.map((eventName) => ({
        label: eventName,
        value: eventName,
      }));
      const userOptions = uniqueUserNames.map((userName) => ({
        label: userName,
        value: userName,
      }));
      setEventNameOptions(eventOptions);
      setUserNameOptions(userOptions);
    }
  }, [isGetSearchFilterSuccess, isGetSearchFilterData]);

  const handleEventNameChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    if (selectedValues.length > 0) {
      setSelectedEventName(selectedValues);
      const selectedEvent = isGetSearchFilterData.find(
        (item) => item.eventName === selectedValues[0]
      );
      if (selectedEvent) {
        if (!selectedEvent.userName) {
          setSelectedUserName(selectedEvent.userName);
        }
      }
    } else {
      setSelectedEventName("");
    }
  };

  const handleUserNameChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    if (selectedValues.length > 0) {
      setSelectedUserName(selectedValues);
      const selectedUserIds = isGetSearchFilterData
        .filter((item) => selectedValues.includes(item.userName))
        .map((user) => user.userId.toString())
        .join(",");
      setSelectedUserId(selectedUserIds);
    } else {
      setSelectedUserName("");
      setSelectedUserId("");
    }
  };

  const handleDateRangeChange = (ranges) => {
    if (ranges && ranges.length === 2) {
      const startDate = ranges[0];
      const endDate = ranges[1];
      setSelectedDateRange({
        startDate: startDate,
        endDate: endDate,
      });
    } else {
      setSelectedDateRange({
        startDate: null,
        endDate: null,
      });
    }
  };

  const clearDateRange = () => {
    setSelectedDateRange({
      startDate: null,
      endDate: null,
    });
  };

  const fetchMoreData = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  const handleSearch = () => {
    if (
      selectedDateRange.startDate ||
      selectedDateRange.endDate ||
      selectedUserName.length > 0 ||
      selectedEventName.length > 0 ||
      selectedUserId.length > 0
    ) {
      getListApi(pageNumber);
    } else {
      ToastService.warning("Please Select Any Dropdown Value");
    }
  };

  const handleClear = () => {
    if (
      selectedDateRange.startDate ||
      selectedDateRange.endDate ||
      selectedUserName.length > 0 ||
      selectedEventName.length > 0 ||
      selectedUserId.length > 0
    ) {
      setSelectedEventName("");
      setSelectedUserId("");
      setSelectedUserName("");
      setSelectedDateRange({
        startDate: null,
        endDate: null,
      });
    }
  };

  useEffect(() => {
    if (
      selectedDateRange.startDate === null &&
      selectedDateRange.endDate === null &&
      selectedUserName === "" &&
      selectedEventName === "" &&
      selectedUserId === ""
    ) {
      getListApi(1);
    }
  }, [selectedDateRange, selectedUserName, selectedEventName, selectedUserId]);

  return (
    <div className="row">
      <div className="serach-bar-history">
        <div className="card w-100">
          <div className="d-flex ">
            <div className="pr-0 name-field">
              <DropDown
                placeholder="Search By Event Name"
                options={eventNameOptions}
                value={selectedEventName}
                onChange={handleEventNameChange}
                isMultiSelect={true}
                closeMenuOnSelect={false}
              />
            </div>
            <div className="input-padding-comman user-name-field pr-0 mx-2">
              <DropDown
                placeholder="Search By User Name"
                options={userNameOptions}
                value={selectedUserName}
                onChange={handleUserNameChange}
                isMultiSelect={true}
                closeMenuOnSelect={false}
              />
            </div>
            <div className="custom-datepicker date-field input-padding-comman">
              <DateRangePicker
                onChange={handleDateRangeChange}
                value={[selectedDateRange.startDate, selectedDateRange.endDate]}
                clearIcon={
                  <i className="fa fa-times" onClick={clearDateRange}></i>
                }
                dayPlaceholder="DD"
                monthPlaceholder="MM"
                yearPlaceholder="YYYY"
              />
            </div>
            <div className="refresh-btn-history pl-0 ml-2">
              <Buttons
                buttonTypeClassName="theme-button"
                buttonText="Search"
                onClick={handleSearch}
                imagePath={AppIcons.SearchIcone}
                textWithIcon={true}
              ></Buttons>
              <Buttons
                buttonTypeClassName="dark-btn ml-2"
                buttonText="Clear"
                onClick={handleClear}
                imagePath={AppIcons.ClearIcone}
                textWithIcon={true}
              ></Buttons>
            </div>
          </div>
        </div>
      </div>
      {!noRecordFound ? (
        <div className="col-md-12">
          <div className="history-scroll-class mt-2" id="scrollableDiv">
            {!isGetHistoryLoading ? (
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
                      historyData.map((item) => (
                        <li
                          className="timeline-item"
                          key={item.customerAuditHistoryId}
                        >
                          <span className="timeline-item-icon">
                            {item.eventStatus === "Insert" ? (
                              <>
                                {" "}
                                <img
                                  src={AppIcons.PlusIcon}
                                  alt="Insert Icon"
                                />
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
            ) : (
              <DataLoader />
            )}
          </div>
        </div>
      ) : (
        <NoRecordFound />
      )}
    </div>
  );
};

HistotyList.propTypes = {
  keyId: PropTypes.number.isRequired,
  isSupplier: PropTypes.bool.isRequired,
  getAuditHistory: PropTypes.func.isRequired,
  getSearchFilterBindHistory: PropTypes.func.isRequired,
};

export default HistotyList;
