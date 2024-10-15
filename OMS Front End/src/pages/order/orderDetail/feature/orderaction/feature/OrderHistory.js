import React from "react";
import "../../../../../../components/ui/timeline/TimeLine.scss";
import formatDate, { formatDateInShort } from "../../../../../../lib/formatDate";
import { TimeSplit } from "../../../../../../components/FinalMolGrid/libs/formatDate";

const OrderHistory = ({historyList}) => {
  
  return (
    <div>
      <div className="timeline-section order-timeline">
        <div className="timeline-ui">
          <div className="msg-desc">
            <ul>
              {historyList.map((item, index) => (
                <li key={index}>
                  <div className="notes-desc">
                    <div className="desc-sec">
                      <div className="notes-sec">{item.description}</div>
                      <div className="name-time">
                        <span className="name">
                          By: <span>{item.fullName}</span>
                        </span>
                      </div>
                    </div>
                    <div className="date-time-sec">
                      <div className="date"> {formatDateInShort(formatDate(item.changedAt))}</div>
                      {TimeSplit(item.changedAt, "MM/DD/YYYY hh:mm")}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="center-line"></div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
