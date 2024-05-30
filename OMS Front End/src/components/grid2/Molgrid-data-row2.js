import React, { useState } from "react";

import { GridColumnType } from "../../data/gridColumnType";
import { renderGridMoneyColumn } from "./Grid Columns/MoneyColumn2";
import { renderGridDateColumn } from "./Grid Columns/DateColumn2";
import { renderGridLinkColumn } from "./Grid Columns/LinkColumn2";
import { renderGridCheckboxColumn } from "./Grid Columns/CheckBoxColumn2";
import { renderGridAction } from "./Grid Columns/ActionColumn2";
import { renderGridLableColumn } from "./Grid Columns/LabelColumn2";

// Function for rendering the action column
const MolGridDataRows = (props) => {
  const [collapsedRows, setCollapsedRows] = useState({});

  const toggleRow = (rowId) => {
    setCollapsedRows((prevState) => ({
      ...prevState,
      [rowId]: !prevState[rowId],
    }));
  };

  const renderGridCol = (rowData, col, rowIndex,parentRowData) => {
    if (!col.colType) {
      return rowData[col.fieldName];
    }
    switch (col.colType) {
      case GridColumnType.DATE:
        return renderGridDateColumn(rowData, col, rowIndex);
      case GridColumnType.MONEY:
        return renderGridMoneyColumn(rowData, col, rowIndex);
      case GridColumnType.LABLE:
        return renderGridLableColumn(rowData, col, rowIndex);
      case GridColumnType.LINK:
        return renderGridLinkColumn(rowData, col, rowIndex);
      case GridColumnType.CHECKBOX:
        return renderGridCheckboxColumn(rowData, col, rowIndex,parentRowData,props.onCellDataChange);
      case GridColumnType.ACTION:
        return renderGridAction(rowData, col, rowIndex, props.onActionChange);
      case GridColumnType.CUSTOM:
        return col.renderCustomCol
          ? col.renderCustomCol(rowData, rowIndex)
          : "";
      default:
        return rowData[col.fieldName];
    }
  };

  const renderChildGridHeader = () => {
    return !props.configuration.childGridSetting.hideChildHeader ? (
      <tr>
        {props.configuration.ChildTableColumn.map((col, index) => (
          <th
            key={`childcol_${index}`}
            className={` ${props.customHeaderClass || ""}`}
            style={col.colStyle?.width ? { width: col.colStyle.width } : null}
          >
            {col.name}
          </th>
        ))}
      </tr>
    ) : null;
  };

  const renderChildGridRow = (childDataSource, parentRow) => {
    return (
      <>
        {childDataSource &&
          childDataSource
            .filter((childRow) => {
              return (
                childRow[props.configuration.childGridSetting.childKeyDataField] ===
                parentRow[props.configuration.childGridSetting.parentKeyDataField]
              );
            })
            .map((row, rowIndex) => (
              <React.Fragment key={`row_${rowIndex}`}>
                <tr>
                  {props.configuration.ChildTableColumn.map((col, index) => (
                    <td
                      key={index}
                      className={`${props.customColumnClass || ""}`}
                      style={
                        col.colStyle?.width
                          ? { width: col.colStyle.width }
                          : null
                      }
                    >
                      {renderGridCol(row, col, rowIndex,parentRow)}
                    </td>
                  ))}
                </tr>
              </React.Fragment>
              //Need to render child grid and it's data
            ))}
      </>
    );
  };

  const renderChildGrid = (
    configuration,
    parentRow,
    childDataSource,
    rowIndex
  ) => {
    return (
      <>
        {collapsedRows[rowIndex] ? (
          <tr>
            <td className="first-td"></td>
            <td colSpan={configuration.columns.length} className="sub-table">
              <table>
                {renderChildGridHeader()}
                {renderChildGridRow(childDataSource, parentRow)}
              </table>
            </td>
          </tr>
        ) : (
          ""
        )}
      </>
    );
  };

  return (
    <>
      {props.dataSource &&
        props.dataSource.map((row, rowIndex) => (
          <React.Fragment key={`row_${rowIndex}`}>
            <tr
              className={`parent-row ${
                collapsedRows[rowIndex] ? "collapsed" : ""
              }`}
            >
              {props.configuration && props.configuration.hasChildGridTable ? (
                <td className="first-td" onClick={() => toggleRow(rowIndex)}>
                  <span
                    className={`bi bi-chevron-${
                      collapsedRows[rowIndex] ? "down" : "right"
                    }`}
                  ></span>
                </td>
              ) : null}
              {props.columns.map((col, colIndex) => (
                <td
                  key={`col_${colIndex}`}
                  className={`whitespace-nowrap ${
                    props.customColumnClass || ""
                  }`}
                >
                  {renderGridCol(row, col, rowIndex)}
                </td>
              ))}
            </tr>
            {props.configuration &&
              props.configuration.hasChildGridTable &&
              renderChildGrid(
                props.configuration,
                row,
                props.childTableDataSource,
                rowIndex
              )}
          </React.Fragment>
          //Need to render child grid and it's data
        ))}
    </>
  );
};

export default MolGridDataRows;
