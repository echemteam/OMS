

import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import "./DatePicker.scss"
import "./DateRange.scss";

// We need to implement a lot of feature related to the datatime.

const DatePickerComponent = ({
    selected,
    onChange,
    placeholder,
    onBlur,
    disabled,
    datePickerConfig,
    ...datePickerProps
}) => {

    const [startRange, setStartRange] = useState(new Date());
    const [endRange, setEndRange] = useState(null);

    const [inputAttributes, setInputAttributes] = useState({});

    const configMapping = {
        // showTimeInput: "showTimeInput",
        // displayTimeddl: "showTimeSelect",
        // showTimeSelectOnly: "showTimeSelectOnly",
        // singleInputRangePicker: "selectsRange",
        // isYearPicker: "showYearPicker",
        format: "dateFormat",
        timeFormat: "timeFormat",
        timeIntervals: "timeIntervals",
        isMonthPicker: "showMonthYearPicker",
        displayInline: "inline",
        minDate: "minDate",
        maxDate: "maxDate",
        startDate: "openToDate",
        displayWeekNumber: "showWeekNumbers",
        selectWeekDates: "showWeekPicker",
        enableTodayBtn: "todayButton",
        highlightDates: "highlightDates",
        locale: "locale",
        calPropUpPosition: "popperPlacement",
        allowClear: "isClearable",
        showIcon: "showIcon",
        icon: "icon",
        holidays: "holidays",
        displayYearddl: "showYearDropdown",
        noOfYearinDdl: "yeardisplayinDropDown",
        noOfYear: "yearItemNumber",
        enableDdlScroll: "scrollableYearDropdown",
        inline: "inline",

        // Css Related Configuration
        className: "className", // class name for calender
        timeClassName: "timeClassName", // class name for Time Input
        calendarClassName: "calendarClassName", // class name for Menu
        dayClassName: "dayClassName", // class name for days

        // Excluding
        excludeDates: "excludeDates",
        excludeDateIntervals: "excludeDateIntervals", // Exclude date intervals

        // Range configuration
        isSingleRangePicker: "selectsRange",

        // Time Input configurations
        displayTimeInput: "showTimeInput",
        displayTimeSelect: "showTimeSelect",
        displayTimeSelectOnly: "showTimeSelectOnly",

        // Month configuration
        displayMonthPicker: "showMonthYearPicker",
        displayFullMonthName: "showFullMonthYearPicker",
        displayDoubleColumnMonthPicker: "showTwoColumnMonthYearPicker",
        displayDoubleColumnMonthPicker: "showFourColumnMonthYearPicker",
        displayMonthDropdown: "showMonthDropdown",
        displayShortMonthDropdown: "useShortMonthInDropdown",
        displayMonthYearDropdown: "showMonthYearDropdown",
        multiMonthsCount: "monthsShown",
        displayPreviousMonth: "showPreviousMonths",

        // Year configurations
        displayYearPicker: "showYearPicker",

        // Quarter configuration
        displayQuarterPicker: "showQuarterYearPicker",
        renderCustomHeader: "renderCustomHeader",
        renderDayContents: "renderDayContents",
        renderMonthContent: "renderMonthContent",
        renderQuarterContent: "renderQuarterContent",
        renderYearContent: "renderYearContent"
    };

    const dynamicAttributes = Object.entries(configMapping).reduce((acc, [configKey, propKey]) => {
        if (datePickerConfig?.[configKey] !== undefined) {
            acc[propKey] = datePickerConfig[configKey];
        }
        return acc;
    }, {});

    const updateAttributes = () => {
        // debugger;
        const newAttribute = { ...inputAttributes };

        // if (datePickerConfig?.showIcon) { 

        //   newAttribute.showIcon = true
        // }
        // if (maxLength) {
        //   newAttribute.maxLength = maxLength;
        // }

        // if (isreadonly) {
        //   newAttribute.readOnly = isreadonly;
        // }

        // if (type === TextInputType.NUMBER && valueType === NumberValueType.INT) {
        //   newAttribute.step = 1;
        // }

    };

    useEffect(() => {
        updateAttributes();
    }, [datePickerConfig]);



    const handleDateChange = useCallback((newValue) => {

        if (datePickerConfig?.singleInputRangePicker) {
            const [startDate, endDate] = newValue;
            setStartRange(startDate);
            setEndRange(endDate);
        }
        if (onChange) {
            onChange(newValue);
        }
    }, [onChange]);

    console.log(dynamicAttributes);

    return (
        <div className="date-picker">
            <DatePicker
                placeholderText={placeholder}
                selected={selected}
                onChange={handleDateChange}
                onBlur={onBlur}
                autoComplete="off"
                disabled={disabled}
                startDate={startRange}
                endDate={endRange}
                //  showYearDropdown={datePickerConfig?.showYearDropdown}
                //  scrollableYearDropdown={datePickerConfig?.scrollableYearDropdown}
                //  dateFormatCalendar={datePickerConfig?.ateFormatCalendar}
                {...dynamicAttributes}  // Dynamically added attributes
                {...inputAttributes}
            // inline={datePickerConfig?.singleInputRangePicker}
            />

        </div>
    );
};


export default DatePickerComponent;

DatePickerComponent.propTypes = {
    selected: PropTypes.instanceOf(Date).isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    onBlur: PropTypes.func,
    disabled: PropTypes.bool,
};
