import React from "react";
import "./TimeLine.scss";
import { getRandomColor } from "../../../utils/RandomColors/RandomColors";
import formatDate from "../../../lib/formatDate";
import { TimeSplit } from "../../FinalMolGrid/libs/formatDate";
import NoRecordFound from "../noRecordFound/NoRecordFound";


const TimeLine = ({notesData}) => {

  return (
    <div className="timeline-section">
      <div className="timeline-ui">
        <div className="msg-desc">
          <ul>
            {notesData.length > 0 ?(
            notesData.map((note, index) => (
              <li key={index} className={`${getRandomColor(index)}`}>
                <div className="notes-desc">
                  <div className="desc-sec">
                    <div className="notes-sec">
                      <div
                        className="html-render"
                        dangerouslySetInnerHTML={{ __html: note.newNote }}
                      ></div>
                    </div>
                    <div className="name-time">
                      <span className="name">
                        Updated By: <span>{note.updatedBy}</span>
                      </span>
                    </div>
                  </div>
                  <div className="date-time-sec">
                    <div className="date">{formatDate(note.updatedAt,"MM/DD/YYYY")}</div>
                    <div className="time">{TimeSplit(note.updatedAt,"MM/DD/YYYY hh:mm")}</div>
                  </div>
                </div>
              </li>
            ))):( <NoRecordFound />)}
          </ul>
        </div>
        <div className="center-line"></div>
      </div>
    </div>
  );
};

export default TimeLine;
