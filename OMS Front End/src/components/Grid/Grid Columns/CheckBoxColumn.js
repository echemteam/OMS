// Function for rendering the checkbox column
export const renderGridCheckboxColumn = (rowData, col, rowIndex) => {
    const isDisabled = col.colSettings ? !col.colSettings.allowEdit : false;
    const isChecked = rowData[col.fieldName];
  
    const handleCheckboxChange = (e) => {
      // Handle checkbox change here, if needed
      if (col.onChange) {
        col.onChange(rowData, col.fieldName, rowIndex);
      }
    };
  
    return (
      <input
        type="checkbox"
        checked={isChecked}
        disabled={isDisabled}
        onChange={(handleCheckboxChange)}
      />
    );
  };
  