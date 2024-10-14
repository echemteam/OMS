import React, { useState } from 'react';
import PropTypes from 'prop-types';

import GridDropDown from '../../ui/dropdown/GridDropdown';

/**
 * EditDropdownColumn component for rendering a dropdown with editable functionality.
 * @param {object} props - Component props.
 * @param {object} props.rowData - Data for the current row.
 * @param {object} props.col - Column configuration.
 * @param {object} props.editColumn - Editable column configuration.
 * @param {number} props.rowIndex - Index of the current row.
 * @param {function} props.onChange - Function to handle changes.
 * @param {object} props.updatedData - Updated row data.
 * @param {object} props.errors - Validation errors.
 */
const EditDropdownColumn = ({
  rowData,
  col,
  editColumn,
  rowIndex,
  onChange,
  updatedData,
  errors,
}) => {
  const [value, setValue] = useState(rowData[col.fieldName]);

  /**
   * Handles change in dropdown selection.
   * @param {object|string} selectedOption - The selected option.
   */
  const handleOnChange = (selectedOption) => {
    let selectedValue;

    if (typeof selectedOption === 'object' && selectedOption !== null && 'value' in selectedOption) {
      selectedValue = selectedOption.value;
    } else {
      selectedValue = selectedOption;
    }

    setValue(selectedValue);

    if (onChange) {
      const newRowData = updatedData
        ? { ...updatedData, [col.fieldName]: selectedValue }
        : { ...rowData, [col.fieldName]: selectedValue };
      onChange(rowIndex, newRowData, col?.fieldName);
    }
  };

  return (
    <GridDropDown
      placeholder={`Please Select ${col.fieldName}`}
      isMultiSelect={editColumn.isMultiSelect}
      options={editColumn.options}
      value={value}
      onChange={handleOnChange}
      onBlur={editColumn.handleOnBlur}
      isDisabled={editColumn.isDisable}
    />
  );
};

EditDropdownColumn.propTypes = {
  /** Data for the current row */
  rowData: PropTypes.object.isRequired,
  /** Column configuration */
  col: PropTypes.shape({
    fieldName: PropTypes.string.isRequired,
  }).isRequired,
  /** Editable column configuration */
  editColumn: PropTypes.shape({
    isMultiSelect: PropTypes.bool,
    options: PropTypes.array,
    handleOnBlur: PropTypes.func,
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

export default EditDropdownColumn;