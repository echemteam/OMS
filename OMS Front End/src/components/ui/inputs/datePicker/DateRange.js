import React, { useState } from "react";
import PropTypes from "prop-types";
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
            <input className="input-field-daterange" />
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

DateRange.propTypes = {
  isDateRange: PropTypes.bool,  
};
export default DateRange;
