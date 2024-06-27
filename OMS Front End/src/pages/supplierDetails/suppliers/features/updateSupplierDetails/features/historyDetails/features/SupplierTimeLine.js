import React, { useContext, useEffect, useState } from "react";
import "./../../../../../../../customerDetail/features/HistoryDetail/TimeLine.scss";
import Buttons from "../../../../../../../../components/ui/button/Buttons";

import { useGetSupplierAuditHistoryBySupplierIdMutation } from "../../../../../../../../app/services/supplierHistoryAPI";
import AddSupplierContext from "../../../../../../../../utils/ContextAPIs/Supplier/AddSupplierContext";

import { AppIcons } from "../../../../../../../../data/appIcons";
import formatDate from "../../../../../../../../lib/formatDate";
import InfiniteScroll from "react-infinite-scroll-component";
import DataLoader from "../../../../../../../../components/ui/dataLoader/DataLoader";

const SupplierTimeLine = () => {
  const [historyData, setHistoryData] = useState([]);

  const { supplierId } = useContext(AddSupplierContext);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [refreshData, setRefreshData] = useState(false);

  const [ getSupplierAuditHistoryBySupplierId, { isLoading: isGetHistoryLoading,isSuccess: isGetHistorySuccess,data: isGetHistoryData, },] = useGetSupplierAuditHistoryBySupplierIdMutation();

  useEffect(() => {
    
    getListApi(pageNumber);
  }, [pageNumber]);

  const getListApi = (page) => {
   
    const request = {
      pagination: {
        pageNumber: page,
        pageSize: 25,
      },
      supplierId: supplierId,
    };
    getSupplierAuditHistoryBySupplierId(request);
  };
  const handleChange = () => {

    setRefreshData(true);
    setHasMore(true);
    setHistoryData([]);
    getListApi(1);
  };

  useEffect(() => {
   
    if (isGetHistorySuccess && isGetHistoryData) {
      if (isGetHistoryData.dataSource && isGetHistoryData.dataSource.length > 0  ) {
        if (refreshData) {
       
          setHistoryData(isGetHistoryData.dataSource);
          setRefreshData(false);
        } else {
          setHistoryData((prevData) => [...prevData,...isGetHistoryData.dataSource,]);
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
          <div className="main-card mt-4" id="scrollableDiv">
            <InfiniteScroll
              dataLength={historyData.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={isGetHistoryLoading}
              scrollableTarget="scrollableDiv"
            >
              <div className="new-timeline-sec">
                <ol class="timeline">
                  {historyData.map((item) => (
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
                            <img src={AppIcons.UpdateIcon} alt="Update Icon" />
                          </>
                        )}
                      </span>
                      <div className="timeline-item-description">
                        <div className="right-desc-sec">
                          <div className="d-flex align-items-center">
                            <div className="timeline-name">{item.name}</div>
                            <div className="date-time">
                              {" "}
                              {formatDate(
                                item.changedAt,
                                "DD/MM/YYYY hh:mm A "
                              )}
                            </div>
                          </div>
                          <div className="type-name">{item.eventName}</div>
                        </div>
                        <div className="msg-section">
                          <p>{item.description}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupplierTimeLine;
