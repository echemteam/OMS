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

const TimeLine = ({ keyId, isSupplier, getAuditHistory }) => {

  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [historyData, setHistoryData] = useState([]);
  const [refreshData, setRefreshData] = useState(false);

  /* NOTE:- 
    API Call
    The "getAuditHistory" function is passed dynamically as a prop.
    This allows the TimeLine component to be reused with different API call functions.
  */
  const [getAuditHistoryByCustomerId, { isLoading: isGetHistoryLoading, isSuccess: isGetHistorySuccess, data: isGetHistoryData }] = getAuditHistory();

  useEffect(() => {
    getListApi(pageNumber);
  }, [keyId]);

  const getListApi = (page) => {
    const request = {
      pagination: {
        pageNumber: page,
        pageSize: 25,
      },
      [isSupplier ? 'supplierId' : 'customerId']: keyId,
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
          setHistoryData((prevData) => [...prevData, ...modifyData]);
        }
      } else {
        setHasMore(false);
      }
    }
  }, [isGetHistorySuccess, isGetHistoryData]);

  const fetchMoreData = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  return (
    <div className="row">
      <div className="d-flex justify-content-end mt-2">
        <Buttons
          buttonTypeClassName="theme-button"
          buttonText="Refresh"
          onClick={handleChange}
          imagePath={AppIcons.refreshIcone}
          textWithIcon={true}
        ></Buttons>
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
