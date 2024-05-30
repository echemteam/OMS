import { formatMoney } from "../../../lib/formatNumber";

export const renderGridMoneyColumn = (rowData, col, rowIndex) => {
    const { currency } = col.colSettings || { currency: '$' }; // Provide a default format if colSettings is not defined
  
      const dateValue = rowData?.[col.fieldName]
    return (
        formatMoney(dateValue,currency)
    );
  };