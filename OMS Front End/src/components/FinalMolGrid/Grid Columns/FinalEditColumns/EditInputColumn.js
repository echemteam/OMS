import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GridInput from "../../ui/input/GridInput";
import { TextInputType } from '../../libs/data/formControlTypes';
import ValidationText from '../../ui/validation/ValidationText';
import { propTypes } from 'react-bootstrap/esm/Image';



/**
 * EditInputColumn component for rendering an input field with editable functionality.
 * @param {object} props - Component props.
 * @param {object} props.rowData - Data for the current row.
 * @param {object} props.col - Column configuration.
 * @param {object} props.editColumn - Editable column configuration.
 * @param {number} props.rowIndex - Index of the current row.
 * @param {function} props.onChange - Function to handle changes.
 * @param {object} props.updatedData - Updated row data.
 * @param {object} props.errors - Validation errors.
 */
const EditInputColumn = ({
    rowData,
    col,
    editColumn,
    rowIndex,
    onChange,
    updatedData,
    errors,
  }) => {
    const [value, setValue] = useState(rowData[col.fieldName]);
  

    const {
      isDisable,
      editColType,
      placeholder,
      colConfig = {},// Destructure colConfig with a default value of an empty object
    } = editColumn;

    /**
     * Handles change in input value.
     * @param {object} e - Event object from input change.
     */
    const handleOnChange = (e) => {
      const newValue = e.target.value;
      setValue(newValue);
  
      if (onChange) {
        const newRowData = updatedData
          ? { ...updatedData, [col.fieldName]: newValue }
          : { ...rowData, [col.fieldName]: newValue };
          onChange(rowIndex, newRowData, col?.fieldName);
      }
    };
  
    const hasError = !!errors?.[rowIndex]?.[col.fieldName];
    const errorMessage = errors?.[rowIndex]?.[col.fieldName] || '';
  
    return (
      <>
        <GridInput
          type={editColType && editColType === 3 ? TextInputType.NUMBER : TextInputType.TEXT}
          placeholder={placeholder}
          value={value}
          min={colConfig?.min}
          max={colConfig?.max}
          onChange={handleOnChange}
          onBlur={col.handleOnBlur}
          minLength={colConfig?.minLength}
          maxLength={colConfig?.maxLength}
          cssClass={`input-field ${hasError ? 'error' : ''}`}
          allowSpace={true}
          isDisable={isDisable}
          isReadOnly={colConfig?.isReadOnly}
          hasError = {hasError}
        />
        {hasError && <ValidationText error={errorMessage || ' '}  className="error-message" />}
      </>
    );
  };
  
  EditInputColumn.propTypes = {
    /** Data for the current row */
    rowData: PropTypes.object.isRequired,
    /** Column configuration */
    col: PropTypes.shape({
      fieldName: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      handleOnBlur: PropTypes.func,
    }).isRequired,
    /** Editable column configuration */
    editColumn: PropTypes.shape({
      editColType: PropTypes.number,
      isDisable: PropTypes.bool,
      placeholder:propTypes.string,
      colConfig: PropTypes.shape({
        min: PropTypes.number,
        max: PropTypes.number,
        minLength: PropTypes.number,
        maxLength: PropTypes.number,
        isReadOnly: PropTypes.bool,
      }), // Ensure colConfig object is included in the PropTypes validation
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
  
  export default EditInputColumn;