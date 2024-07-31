import formatDate from "../../../lib/formatDate";

export const renderGridDateColumn = (rowData, col, rowIndex) => {
    const { format } = col.colSettings || { format: 'MM/DD/YYYY' }; // Provide a default format if colSettings is not defined
    const dateValue = rowData?.[col.fieldName]
    return (
      formatDate(dateValue,format)
    );
  };
  