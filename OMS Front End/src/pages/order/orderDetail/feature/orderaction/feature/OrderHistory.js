import React from "react";
import "../../../../../../components/ui/timeline/TimeLine.scss";

const OrderHistory = () => {
  const notesData = [
    {
      note: "Add New Order in Order Item Gram Detail with this ECP10525920, Size - 0.100 G, Price - $353.00 ",
      author: "Pankaj Chauhan",
      date: "Oct 7, 2024",
      time: "17:02",
    },
    {
      note: "Add New Order in Order Item Gram Detail with this ECP10525920, Size - 0.100 G, Price - $353.00 ",
      author: "Sarah Smith",
      date: "Oct 6, 2024",
      time: "10:15",
    },
    {
      note: "Add New Order in Order Item Gram Detail with this ECP10525920, Size - 0.100 G, Price - $353.00 ",
      author: "John Doe",
      date: "Oct 5, 2024",
      time: "14:30",
    },  {
      note: "Add New Order in Order Item Gram Detail with this ECP10525920, Size - 0.100 G, Price - $353.00 ",
      author: "Sarah Smith",
      date: "Oct 6, 2024",
      time: "10:15",
    },
    {
      note: "Add New Order in Order Item Gram Detail with this ECP10525920, Size - 0.100 G, Price - $353.00 ",
      author: "John Doe",
      date: "Oct 5, 2024",
      time: "14:30",
    },
  ];
  return (
    <div>
      <div className="timeline-section order-timeline">
        <div className="timeline-ui">
          <div className="msg-desc">
            <ul>
              {notesData.map((item, index) => (
                <li key={index}>
                  <div className="notes-desc">
                    <div className="desc-sec">
                      <div className="notes-sec">{item.note}</div>
                      <div className="name-time">
                        <span className="name">
                          By: <span>{item.author}</span>
                        </span>
                      </div>
                    </div>
                    <div className="date-time-sec">
                      <div className="date">{item.date}</div>
                      <div className="time">{item.time}</div>
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
