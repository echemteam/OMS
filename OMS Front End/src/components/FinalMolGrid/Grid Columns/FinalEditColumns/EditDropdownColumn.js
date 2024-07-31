import React, { useState } from 'react';
import DropDown from '../../../ui/dropdown/DropDrown';

const EditDropdownColumn = ({ rowData, col, editColumn, rowIndex, onChange, updatedData, errors }) => {

  const [value, setValue] = useState(rowData[col.fieldName]);

  const handleOnChange = (selectedOption) => {
    let selectedValue;
    // Check if selectedOption is an object with a 'value' property
    if (typeof selectedOption === 'object' && selectedOption !== null && 'value' in selectedOption) {
      selectedValue = selectedOption.value;
    } else {
      selectedValue = selectedOption;
    }

    setValue(selectedValue);

    if (onChange) {
      // Merge the new value into a copy of rowData or updatedData if it exists
      const newRowData = updatedData ? { ...updatedData, [col.fieldName]: selectedValue } : { ...rowData, [col.fieldName]: selectedValue };
      onChange(rowIndex, newRowData);
    }
  }

  const hasError = errors && errors[rowIndex] && errors[rowIndex][col.fieldName] ? true : false;
  const errorMessage = hasError && errors[rowIndex] && errors[rowIndex][col.fieldName] ? errors[rowIndex][col.fieldName] : '';


  return (
    <DropDown
      placeholder={`Please Enter ${col.fieldName}`}
      isMultiSelect={editColumn.isMultiSelect}
      options={editColumn.options}
      value={value}
      onChange={handleOnChange}
      onBlur={editColumn.handleOnBlur}
      isDisabled={editColumn.isDisable}
    />
  )
}

export default EditDropdownColumn;