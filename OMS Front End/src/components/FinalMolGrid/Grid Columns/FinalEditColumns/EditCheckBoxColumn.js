import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import GridCheckbox from '../../ui/checkbox/GridCheckbox';
import ValidationText from '../../ui/validation/ValidationText';

/**
 * EditCheckBoxColumn component for rendering a checkbox with validation.
 * @param {object} props - Component props.
 * @param {object} props.rowData - Data for the current row.
 * @param {object} props.col - Column configuration.
 * @param {object} props.editColumn - Editable column configuration.
 * @param {number} props.rowIndex - Index of the current row.
 * @param {function} props.onChange - Function to handle changes.
 * @param {object} props.updatedData - Updated row data.
 * @param {object} props.errors - Validation errors.
 */
const EditCheckBoxColumn = ({
  rowData,
  col,
  editColumn,
  rowIndex,
  onChange,
  updatedData,
  errors,
}) => {
  const [checked, setChecked] = useState(rowData[col.fieldName]);

  /**
   * Handles checkbox state change.
   * @param {string} dataField - Data field name.
   * @param {boolean} newValue - New checkbox value.
   */
  const handleCheckboxChange = (dataField, newValue) => {
    setChecked(newValue);

    if (onChange) {
      const newRowData = updatedData
        ? { ...updatedData, [col.fieldName]: newValue }
        : { ...rowData, [col.fieldName]: newValue };
      onChange(rowIndex, newRowData, dataField);
    }
  };

  const hasError = !!errors?.[rowIndex]?.[col.fieldName];
  const errorMessage = errors?.[rowIndex]?.[col.fieldName] || '';

  useEffect(() => {
    setChecked(rowData[col.fieldName]);
  }, [rowData, col.fieldName]);

  return (
    <>
      <GridCheckbox
        name={col.name + "__" + rowIndex}
        className="form-checkbox"
        type="checkbox"
        dataField={editColumn.editColFieldName}
        checked={checked}
        onChange={handleCheckboxChange}
        disabled={editColumn.isDisable}
      />
      {hasError && <ValidationText error={errorMessage || ' '} className="error-message" />}
    </>
  );
};

EditCheckBoxColumn.propTypes = {
  /** Data for the current row */
  rowData: PropTypes.object.isRequired,
  /** Column configuration */
  col: PropTypes.shape({
    fieldName: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  /** Editable column configuration */
  editColumn: PropTypes.shape({
    editColFieldName: PropTypes.string,
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

export default EditCheckBoxColumn;
