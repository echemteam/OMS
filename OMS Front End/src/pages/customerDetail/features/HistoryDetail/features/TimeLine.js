import React from "react";
import "./../../HistoryDetail/TimeLine.scss";
import Buttons from "../../../../../components/ui/button/Buttons";
import { AppIcons } from "../../../../../data/appIcons";


const timelineItems = [
  {
    icon: AppIcons.PlusIcon,
    name: "Pankaj Chauhan",
    dateTime: "2024-05-01 10:00",
    typeName: "Customer Added",
    message:
      "Initial creation of the customer record by Pankaj Chauhan at 10:00 AM on 05/01/2024.",
  },
  {
    icon: AppIcons.UpdateIcon,
    name: "Kirtan Patel",
    dateTime: "2024-05-02 14:30",
    typeName: "Basic Details Updated",
    message:
      "Updated customer name and reference codes by Kirtan Patel at 2:30 PM on 05/02/2024.",
  },
  {
    icon: AppIcons.TimelineIcon,
    name: "Pankaj Chauhan",
    dateTime: "2024-05-09 10:45",
    typeName: "Financial Settings Added",
    message:
      "Added default payment terms and preferred payment method by Pankaj Chauhan at 10:45 AM on 05/09/2024.",
  },
  {
    icon: AppIcons.PlusIcon,
    name: "Pankaj Chauhan",
    dateTime: "2024-05-01 10:00",
    typeName: "Customer Added",
    message:
      "Initial creation of the customer record by Pankaj Chauhan at 10:00 AM on 05/01/2024.",
  },
  {
    icon: AppIcons.UpdateIcon,
    name: "Kirtan Patel",
    dateTime: "2024-05-02 14:30",
    typeName: "Basic Details Updated",
    message:
      "Updated customer name and reference codes by Kirtan Patel at 2:30 PM on 05/02/2024.",
  },
  {
    icon: AppIcons.TimelineIcon,
    name: "Pankaj Chauhan",
    dateTime: "2024-05-09 10:45",
    typeName: "Financial Settings Added",
    message:
      "Added default payment terms and preferred payment method by Pankaj Chauhan at 10:45 AM on 05/09/2024.",
  },
  // Add more timeline items here
];

const TimeLine = () => {
  return (
    <>
      <div className="row">
        <div className="d-flex justify-content-end mt-2">
          <Buttons
            buttonTypeClassName="theme-button"
            buttonText="Refresh"
            imagePath={AppIcons.refreshIcone}
            textWithIcon={true}
          ></Buttons>
        </div>
        <div className="col-md-12">
          <div className="main-card mt-4">

            <div className="new-timeline-sec">
              <ol class="timeline">
                {timelineItems.map((item) => (
                  <li className="timeline-item" key={item.id}>
                    <span className="timeline-item-icon">
                      <img src={item.icon} alt="Timeline Icon" />
                    </span>
                    <div className="timeline-item-description">
                      <div className="right-desc-sec">
                        <div className="d-flex align-items-center">
                          <div className="timeline-name">{item.name}</div>
                          <div className="date-time"> {item.dateTime}</div>
                        </div>
                        <div className="type-name">{item.typeName}</div>
                      </div>
                      <div className="msg-section">
                        <p>{item.message}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimeLine;
