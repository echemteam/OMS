import { formatMoney } from "./../libs/formatNumber"

export const renderGridMoneyColumn = (rowData, col, ) => {
  const { 
    currency = '$', 
    decimalPlaces = 2, 
    thousandSeparator = ',',
    decimalSeparator = '.'
  } = col.colSettings || {};
  

      const dateValue = rowData?.[col.fieldName]
    return (
        formatMoney(dateValue,currency,decimalPlaces,thousandSeparator,decimalSeparator)
    );
  };