import React, { useState } from 'react'
import DatePicker from '../../../ui/inputs/datePicker/DatePicker';
import ValidationText from '../../../ui/inputs/validation/ValidationText';
import formatDate from '../../../../lib/formatDate';
// import formatDate from '../../../../lib/formatDate';

const EditDatepickerColumn = ({ rowData, col, editColumn, rowIndex, onChange, updatedData, errors }) => {

  const [selectedDate, setSelectedDate] = useState(rowData[col.fieldName] ? new Date(rowData[col.fieldName]) : null);

  const dateFormat = col?.colSettings?.format ? col?.colSettings?.format : 'MM/DD/YYYY';

  const handleDateChange = (date) => {
    setSelectedDate(date);

    if (onChange) {
      // const formattedDate = date ? new Date(date).toISOString() : null; // Adjust the format as needed
      const formattedDate = date ? formatDate(date, dateFormat) : null; // Adjust the format as needed
      const newRowData = updatedData
        ? { ...updatedData, [col.fieldName]: formattedDate }
        : { ...rowData, [col.fieldName]: formattedDate };

      onChange(rowIndex, newRowData);
    }
  }

  const hasError = errors && errors[rowIndex] && errors[rowIndex][col.fieldName] ? true : false;
  const errorMessage = hasError && errors[rowIndex] && errors[rowIndex][col.fieldName] ? errors[rowIndex][col.fieldName] : '';

  return (
    <>
      <DatePicker
        selected={selectedDate}
        name={col.name}
        placeholder={col.name}
        // className="datepicker-field"
        onChange={handleDateChange}
        onBlur={editColumn.onBlur}
        isDisable={editColumn.isDisable}
      />
      {hasError && <ValidationText error={errorMessage ? errorMessage : ' '} className="error-message" />}
    </>
  )
}

export default EditDatepickerColumn;