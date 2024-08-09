import React, { useState } from 'react'
import PropTypes from "prop-types";
import GridToggleButton from '../ui/toggleButton/GridToggleButton';

 const RenderGridToggleColumn = ({rowData, col, rowIndex, onColumnDataChange}) => {

    const [value, setValue] = useState(rowData[col.fieldName]);
    const isDisabled = col.colSettings ? col.colSettings.isDisabled : false;

    const handleChange = () => {
      let  isChecked = !value;
        setValue(isChecked);

        if (onColumnDataChange) {
        const newRowData = { ...rowData, [col.fieldName]: isChecked };
        onColumnDataChange(col.fieldName,newRowData,rowIndex);
        }
    }

  return (
        <GridToggleButton
            isChecked={value}
            isDisabled={isDisabled}
            {...col}
            onChange={() => handleChange()}
        />
    )
}

// Define prop types to ensure the component receives the correct props
RenderGridToggleColumn.propTypes = {
  rowData: PropTypes.object.isRequired,   // The data for the current row (required)
  col: PropTypes.shape({
      fieldName: PropTypes.string.isRequired, // The field name to be toggled (required)
      colSettings: PropTypes.shape({
          isDisabled: PropTypes.bool       // Optional setting to disable the toggle button
      })
  }).isRequired,
  rowIndex: PropTypes.number.isRequired,  // The index of the current row (required)
  onColumnDataChange: PropTypes.func.isRequired, // Function to handle column data changes (required)
};

export default RenderGridToggleColumn