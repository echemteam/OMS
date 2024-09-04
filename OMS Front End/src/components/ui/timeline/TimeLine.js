import React from "react";
import "./TimeLine.scss"

const TimeLine = () => {
  return (
    <div className="timeline-section">
      <div className="timeline-ui">
        <div className="msg-desc-l">
          <ul>
            <li>
              This is Left side
            </li>
          </ul>

        </div>
        <div className="center-line">

        </div>
        <div className="msg-desc-r">
        <ul>
            <li>
              This is Right side
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
