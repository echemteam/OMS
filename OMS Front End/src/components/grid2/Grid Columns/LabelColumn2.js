export const renderGridLableColumn = (rowData, col, rowIndex) => {

  const { getLableClass } = col.colSettings

  const displayVal = rowData?.[col.fieldName]
  const cssClass = getLableClass(rowData?.[col.fieldName])

  const lableText = displayVal ? "Active" : "InActive";

  return (
    <span className={cssClass}>{lableText}</span>
  );
};
