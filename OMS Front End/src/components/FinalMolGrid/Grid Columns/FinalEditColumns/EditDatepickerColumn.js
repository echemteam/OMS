import React, { useState } from 'react'
import PropTypes from 'prop-types';

import formatDate from './../../libs/formatDate';
import ValidationText from '../../ui/validation/ValidationText';
import GridDatePicker from '../../ui/datePicker/GridDatePicker';

/**
 * EditDatepickerColumn component for rendering a date picker with validation.
 * @param {object} props - Component props.
 * @param {object} props.rowData - Data for the current row.
 * @param {object} props.col - Column configuration.
 * @param {object} props.editColumn - Editable column configuration.
 * @param {number} props.rowIndex - Index of the current row.
 * @param {function} props.onChange - Function to handle changes.
 * @param {object} props.updatedData - Updated row data.
 * @param {object} props.errors - Validation errors.
 */
const EditDatepickerColumn = ({
  rowData,
  col,
  editColumn,
  rowIndex,
  onChange,
  updatedData,
  errors,
}) => {
  const [selectedDate, setSelectedDate] = useState(
    rowData[col.fieldName] ? new Date(rowData[col.fieldName]) : null
  );


  const {
    isDisable,
    placeholder,
    colConfig = {},// Destructure colConfig with a default value of an empty object
  } = editColumn;


  const dateFormat = col?.colSettings?.format || 'MM/DD/YYYY';

  /**
   * Handles date selection change.
   * @param {Date} date - The new date selected.
   */
  const handleDateChange = (date) => {
    setSelectedDate(date);

    if (onChange) {
      const formattedDate = date ? formatDate(date, dateFormat) : null;
      const newRowData = updatedData
        ? { ...updatedData, [col.fieldName]: formattedDate }
        : { ...rowData, [col.fieldName]: formattedDate };

      onChange(rowIndex, newRowData);
    }
  };

  const hasError = !!errors?.[rowIndex]?.[col.fieldName];
  const errorMessage = errors?.[rowIndex]?.[col.fieldName] || '';

  return (
    <>
      <GridDatePicker
        selected={selectedDate}
        name={col.name}
        placeholder={placeholder}
        onChange={handleDateChange}
        onBlur={editColumn.onBlur}
        isDisable={isDisable}
        inputFormat={colConfig?.format}
      />
      {hasError && <ValidationText error={errorMessage || ' '} className="error-message" />}
    </>
  );
};

EditDatepickerColumn.propTypes = {
  /** Data for the current row */
  rowData: PropTypes.object.isRequired,
  /** Column configuration */
  col: PropTypes.shape({
    fieldName: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    colSettings: PropTypes.shape({
      format: PropTypes.string,
    }),
  }).isRequired,
  /** Editable column configuration */
  editColumn: PropTypes.shape({
    onBlur: PropTypes.func,
    isDisable: PropTypes.bool,
  }).isRequired,
  /** Index of the current row */
  rowIndex: PropTypes.number.isRequired,
  /** Function to handle changes */
  onChange: PropTypes.func.isRequired,
  /** Updated row data */
  updatedData: PropTypes.object,
  /** Validation errors */
  errors: PropTypes.object,
};

export default EditDatepickerColumn;