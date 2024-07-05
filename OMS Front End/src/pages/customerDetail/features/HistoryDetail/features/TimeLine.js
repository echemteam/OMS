import React, { useContext, useEffect, useState } from "react";
import "./../../HistoryDetail/TimeLine.scss";
import Buttons from "../../../../../components/ui/button/Buttons";
import { AppIcons } from "../../../../../data/appIcons";

import BasicDetailContext from "../../../../../utils/ContextAPIs/Customer/BasicDetailContext";

import InfiniteScroll from "react-infinite-scroll-component";
import { useGetCustomerAuditHistoryByCustomerIdMutation } from "../../../../../app/services/customerHistoryAPI";
import NoRecordFound from "../../../../../components/ui/noRecordFound/NoRecordFound";
import DataLoader from "../../../../../components/ui/dataLoader/DataLoader";
import { modifyTimeLineData } from "../../../../../utils/TransformData/TransformAPIData";

const TimeLine = () => {
  const [historyData, setHistoryData] = useState([]);
  const { customerId } = useContext(BasicDetailContext);
  const [pageNumber, setPageNumber] = useState(1);
  const [refreshData, setRefreshData] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [
    getCustomerAuditHistoryByCustomerId,
    {
      isLoading: isGetHistoryLoading,
      isSuccess: isGetHistorySuccess,
      data: isGetHistoryData,
    },
  ] = useGetCustomerAuditHistoryByCustomerIdMutation();

  useEffect(() => {
    getListApi(pageNumber);
  }, [pageNumber]);
  const getListApi = (page) => {
    const request = {
      pagination: {
        pageNumber: page,
        pageSize: 25,
      },

      customerId: customerId,
    };
    getCustomerAuditHistoryByCustomerId(request);
  };
  const handleChange = () => {
    setRefreshData(true);

    setHasMore(true);
    setHistoryData([]);
    getListApi(1);
  };

  useEffect(() => {
    if (isGetHistorySuccess && isGetHistoryData) {
      if (
        isGetHistoryData.dataSource &&
        isGetHistoryData.dataSource.length > 0
      ) {
        const modifyData = modifyTimeLineData(isGetHistoryData.dataSource);
        if (refreshData) {
          setHistoryData(modifyData);
          setRefreshData(false);
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
    <>
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
                    historyData.map((item) => (
                      <li
                        className="timeline-item"
                        key={item.customerAuditHistoryId}
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
    </>
  );
};

export default TimeLine;
