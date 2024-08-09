export const renderGridLabelColumn = (rowData, col, rowIndex) => {

  const { getLableClass } = col.colSettings

  const columnValue = rowData?.[col.fieldName];
  const displayVal = columnValue.toString().toLowerCase();
  const cssClass = getLableClass(rowData?.[col.fieldName])

  

  let labelText = "";
  if (displayVal === "yes" || displayVal === "true" || displayVal === "active") {
    labelText = "Active";
  } else {
    labelText = "Inactive";
  }

  return (
    <span className={cssClass}>{columnValue}</span>
  );

  
};
