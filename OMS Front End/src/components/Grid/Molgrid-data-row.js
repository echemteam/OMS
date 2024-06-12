import React from "react";

import { GridColumnType } from "../../data/gridColumnType";
import { renderGridMoneyColumn } from "./Grid Columns/MoneyColumn";
import { renderGridDateColumn } from "./Grid Columns/DateColumn";
import { renderGridLinkColumn } from "./Grid Columns/LinkColumn";
import { renderGridCheckboxColumn } from "./Grid Columns/CheckBoxColumn";
import { renderGridAction } from "./Grid Columns/ActionColumn";
import { renderGridLableColumn } from "./Grid Columns/LabelColumn";
import { RenderMultiGridAction } from "./Grid Columns/MultiActionColumn";
import { renderGridProgressAction } from "./Grid Columns/ProgressColumn";
// import { renderHTMLColumn } from "./Grid Columns/HTMLColumn";/

// Function for rendering the action column
const MolGridDataRows = (props) => {
  const renderGridCol = (rowData, col, rowIndex) => {
    if (!col.colType) {
      return rowData[col.fieldName];
    }
    switch (col.colType) {
      case GridColumnType.DATE:
        return renderGridDateColumn(rowData, col, rowIndex)
      case GridColumnType.MONEY:
        return renderGridMoneyColumn(rowData, col, rowIndex)
      case GridColumnType.LABLE:
        return renderGridLableColumn(rowData, col, rowIndex)
      case GridColumnType.LINK:
        return renderGridLinkColumn(rowData, col, rowIndex);
      case GridColumnType.CHECKBOX:
        return renderGridCheckboxColumn(rowData, col, rowIndex);
      case GridColumnType.ACTION:
        return renderGridAction(rowData, col, rowIndex, props.onActionChange);
      case GridColumnType.MULACTION:
        return RenderMultiGridAction(rowData, col, rowIndex, props.onActionChange);
      case GridColumnType.PROGRESS:
        return renderGridProgressAction(rowData, col, rowIndex);
      case GridColumnType.CUSTOM:
        return col.renderCustomCol ? col.renderCustomCol(rowData, rowIndex) : null;
      // case GridColumnType.HTML:
      //   return renderHTMLColumn(rowData, col, rowIndex);
      default:
        return rowData[col.fieldName];
    }
  };

  return (
    <>
      {props.dataSource && props.dataSource.map((row, rowIndex) => (
        <tr key={`row_${rowIndex}`}>
          {props.columns.map((col, colIndex) => (
            <td key={`col_${colIndex}`} className="whitespace-nowrap">
              {renderGridCol(row, col, rowIndex)}
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default MolGridDataRows;
