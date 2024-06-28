import React from "react";

// Function for rendering the checkbox column
export const renderGridCheckboxColumn = (rowData, col, rowIndex, parentRowData, onCellDataChange) => {
  const isDisabled = col.colSettings ? col.colSettings.allowDisable : false;
  const isChecked = rowData[col.fieldName];

  const handleCheckboxChange = (e) => {
    // Handle checkbox change here, if needed
    if (col.onChange) {
      col.onChange(rowData, col.fieldName, rowIndex);
    }
    if (onCellDataChange) {
      onCellDataChange(rowData, col.fieldName, rowIndex, e.target.checked, parentRowData)
    }
  };

  return (
    <React.Fragment>
      {col?.colSettings && col.colSettings.allowCheckbox && (
        <input
          type="checkbox"
          checked={isChecked}
          disabled={isDisabled}
          onChange={(handleCheckboxChange)}
        />
      )}
    </React.Fragment>
  );
};
