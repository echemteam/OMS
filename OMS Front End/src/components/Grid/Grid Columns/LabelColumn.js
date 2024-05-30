export const renderGridLableColumn = (rowData, col, rowIndex) => {
    const { valueField,getLableClass } = col.colSettings 
     // Provide a default format if colSettings is not defined
    const displayVal = rowData?.[col.fieldName]
    const cssClass = getLableClass(rowData?.[valueField])
    return (
      <span className={cssClass}>{displayVal}</span>
    );
  };
    