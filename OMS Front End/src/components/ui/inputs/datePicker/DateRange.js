import React, { useState } from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "./DateRange.scss";
import { AppIcons } from "../../../../data/appIcons";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import Image from "../../../image/Image";

function DateRange(props) {

  const [startDate, setStartDate] = useState(new Date());

  return (
    <React.Fragment>
      {props.isDateRange ? (
        <div className="date-range-input">
          <DateRangePicker>
            <input className="input-field" />
          </DateRangePicker>
          <Image
              imagePath={AppIcons.calenderIcon}
              altText="Calender"
            />
        </div>
      ) : (
        <div className="date-picker">
          <ReactDatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
      )}
    </React.Fragment>
  );
}

export default DateRange;
