import React, { useState, useCallback, memo } from "react";
import PropTypes from "prop-types";

import { validateColumns } from "../FinalMolGrid/libs/Validation/gridValidation";
import { GridColumnType } from "./libs/data/gridColumnType";
import { EditGridColumnType } from "./libs/data/editGridColumnType";

import { renderGridAction } from "./Grid Columns/FinalActionColumn";
import { renderMaskedColumn } from "./Grid Columns/MaskedColumn";
import { renderGridLinkColumn } from "./Grid Columns/FinalLinkColumn";
import { renderGridDateColumn } from "./Grid Columns/FinalDateColumn";
import { renderGridLabelColumn } from "./Grid Columns/FinalLabelColumn";
import { renderGridMoneyColumn } from "./Grid Columns/FinalMoneyColumn";
import RenderGridCheckboxColumn from "./Grid Columns/FinalCheckBoxColumn";
import RenderGridToggleColumn from "./Grid Columns/FinalToggleColumn";
import RenderDropdownColumn from "./Grid Columns/FinalDropdownColumn";
import RenderGridRadioButtonColumn from "./Grid Columns/FinalRadioButtonColumn";

// Edit Columns
import EditInputColumn from "./Grid Columns/FinalEditColumns/EditInputColumn";
import EditCheckBoxColumn from "./Grid Columns/FinalEditColumns/EditCheckBoxColumn";
import EditDropdownColumn from "./Grid Columns/FinalEditColumns/EditDropdownColumn";
import EditDatepickerColumn from "./Grid Columns/FinalEditColumns/EditDatepickerColumn";
import { renderEditGridAction } from "./Grid Columns/FinalEditColumns/EditActionColumn";

// Function for rendering the action column
const MolGridDataRows = ({
  dataSource,
  childTableDataSource,
  columns,
  configuration,
  customColumnClass,
  customHeaderClass,
  allowEditGrid,
  editGridSettings,
  slectedRowIndex,
  onColumnDataChange,
  onRowDataUpdateSaving,
  onActionChange,
  onRowDataDelete,
  onRowSelect,
}) => {

  const [editRowData, setEditRowData] = useState([]);
  const [editRowIndex, setEditRowIndex] = useState([]);

  const [errors, setErrors] = useState([]);
  const [collapsedRows, setCollapsedRows] = useState({});

  const toggleRow = useCallback((rowId) => {
    setCollapsedRows((prevState) => ({
      ...prevState,
      [rowId]: !prevState[rowId],
    }));
  }, []);

  // Handle Row Click
  const handleRowClick = (e, rowData, rowIndex) => {
    if (onRowSelect) {
      onRowSelect(rowData, rowIndex);
    }
  };

  /**
   * Handles saving the edited row data.
   * @param {number} rowIndex - The index of the row being saved.
   */
  const handleRowEditSave = useCallback(
    (rowIndex) => {
      if (editRowIndex.includes(rowIndex) || editGridSettings?.defualtEditableView) {
        const updatedRowData = editRowData[rowIndex];
        if (updatedRowData) {
          const newErrors = validateColumns(columns, updatedRowData);

          if (Object.keys(newErrors).length === 0) {
            if (onRowDataUpdateSaving) {
              onRowDataUpdateSaving(updatedRowData, rowIndex);
            }
            handleCancelEdit(rowIndex);
          } else {
            setErrors((prevErrors) => ({ ...prevErrors, [rowIndex]: newErrors }));
          }
        }
      }
    },
    [editRowData, columns, onRowDataUpdateSaving]
  );

  /**
   * Handles updating the row data.
   * @param {number} rowIndex - The index of the row being updated.
   * @param {object} updatedData - The updated data for the row.
   */
  const handleRowDataUpdate = useCallback(
    (rowIndex, newRowData, fieldName, dataField) => {

      const updatedRowData = [...editRowData];


      if (newRowData) {
        const newErrors = validateColumns(columns, newRowData);

        if (Object.keys(newErrors).length === 0) {
          setErrors((prevErrors) => {
            const updatedErrors = { ...prevErrors };
            delete updatedErrors[rowIndex];
            return updatedErrors;
          });
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, [rowIndex]: newErrors }));
        }

      }


      updatedRowData[rowIndex] = { ...updatedRowData[rowIndex], ...newRowData };
      setEditRowData(updatedRowData);

      if (onColumnDataChange) {
        onColumnDataChange(fieldName, newRowData, rowIndex);
      }
    },
    [editRowData, columns, setEditRowData]
  );

  /**
   * Cancels the edit mode for a row.
   * @param {number} rowIndex - The index of the row to cancel edit mode for.
   */
  const handleCancelEdit = useCallback(
    (rowIndex) => {
      if (editRowIndex.includes(rowIndex)) {
        const newEditRowIndex = editRowIndex.filter(
          (index) => index !== rowIndex
        );
        const newErrors = { ...errors };
        delete newErrors[rowIndex];
        setErrors(newErrors);
        setEditRowIndex(newEditRowIndex);
      }
    },
    [editRowIndex, errors, setEditRowIndex]
  );

  /**
   * Initiates the edit mode for a row.
   * @param {number} rowIndex - The index of the row to edit.
   * @param {object} data - The initial data for the row being edited.
   */
  const handleEditRow = useCallback(
    (rowIndex, data) => {
      const editRowIndexes = [...editRowIndex];

      if (!editRowIndexes.includes(rowIndex)) {
        editRowIndexes.push(rowIndex);
      }

      const editedData = [...editRowData];
      editedData[rowIndex] = data;

      setEditRowData(editedData);
      setEditRowIndex(editRowIndexes);
    },
    [editRowIndex, editRowData, setEditRowIndex]
  );

  const renderGridCol = (rowData, col, rowIndex) => {
    const isRowEdited = editRowIndex.includes(rowIndex);
    const editedData = editRowData[rowIndex] || null;

    if (
      col.colType !== GridColumnType.ACTION &&
      ((!isRowEdited && !editGridSettings?.defualtEditableView) || !col.allowEditColumn)
    ) {
      return renderNonEditableColumn(rowData, col, rowIndex);
    }

    if ((col.allowEditColumn && isRowEdited) || (col.allowEditColumn && editGridSettings?.defualtEditableView)) {
      return renderEditableColumn(rowData, col, rowIndex, editedData);
    }

    if (col.colType === GridColumnType.ACTION) {
      return renderActionColumn(rowData, col, rowIndex, isRowEdited);
    }

    return rowData[col.fieldName];
  };

  const renderNonEditableColumn = (rowData, col, rowIndex) => {
    switch (col.colType) {
      case GridColumnType.DATE:
        return renderGridDateColumn(rowData, col, rowIndex);
      case GridColumnType.MONEY:
        return renderGridMoneyColumn(rowData, col, rowIndex);
      case GridColumnType.LABLE:
        return renderGridLabelColumn(rowData, col, rowIndex);
      case GridColumnType.LINK:
        return renderGridLinkColumn(rowData, col, rowIndex);
      case GridColumnType.MASKED:
        return renderMaskedColumn(rowData, col, rowIndex);
      case GridColumnType.RADIO:
        return (
          <RenderGridRadioButtonColumn
            rowData={rowData}
            col={col}
            rowIndex={rowIndex}
            onColumnDataChange={onColumnDataChange}
          />
        );
      case GridColumnType.CHECKBOX:
        return (
          <RenderGridCheckboxColumn
            rowData={rowData}
            col={col}
            rowIndex={rowIndex}
            onColumnDataChange={onColumnDataChange}
          />
        );
      case GridColumnType.TOGGLE:
        return (
          <RenderGridToggleColumn
            rowData={rowData}
            col={col}
            rowIndex={rowIndex}
            onColumnDataChange={onColumnDataChange}
          />
        );
      case GridColumnType.DROPDOWN:
        return (
          <RenderDropdownColumn
            rowData={rowData}
            col={col}
            rowIndex={rowIndex}
            onColumnDataChange={onColumnDataChange}
          />
        );
      case GridColumnType.CUSTOM:
        return col.renderCustomCol
          ? col.renderCustomCol(rowData, rowIndex, onColumnDataChange)
          : "";
      default:
        return rowData[col.fieldName];
    }
  };

  const renderEditableColumn = (rowData, col, rowIndex, editRowData) => {
    const commonProps = {
      rowData,
      col,
      editColumn: col.editColumn,
      rowIndex,
      onChange: handleRowDataUpdate,
      updatedData: editRowData,
      errors,
      onColumnDataChange: onColumnDataChange,
    };

    switch (col.editColumn.editColType) {
      case EditGridColumnType.INPUT:
      case EditGridColumnType.NUMERIC:
        return <EditInputColumn {...commonProps} />;
      case EditGridColumnType.DROPDOWN:
        return <EditDropdownColumn {...commonProps} />;
      case EditGridColumnType.DATEPICKER:
        return <EditDatepickerColumn {...commonProps} />;
      case EditGridColumnType.CHECKBOX:
        return <EditCheckBoxColumn {...commonProps} />;
      default:
        return rowData[col.fieldName];
    }
  };

  console.log("onRowDataDelete" , onRowDataDelete)

  const renderActionColumn = (rowData, col, rowIndex, isRowEdited) => {
    if ((allowEditGrid && isRowEdited) || (allowEditGrid && editGridSettings?.defualtEditableView)) {
      return renderEditGridAction(
        rowData,
        col,
        rowIndex,
        allowEditGrid,
        handleRowEditSave,
        isRowEdited || editGridSettings?.defualtEditableView,
        handleCancelEdit,
        editGridSettings,
        onRowDataDelete
      );
    } else {
      return renderGridAction(
        rowData,
        col,
        rowIndex,
        onActionChange,
        allowEditGrid,
        isRowEdited,
        handleEditRow
      );
    }
  };

  const renderChildGridHeader = () =>
    !configuration.childGridSetting.hideChildHeader ? (
      <tr>
        {configuration.ChildTableColumn.map((col) => (
          <th
            key={`childcol_${col.name}`}
            className={customHeaderClass || ""}
            style={{
              width: col.colStyle?.width || "auto",
              textAlign: col.colStyle?.textAlign || "left",
              ...col.colStyle,
            }}
          >
            {col.name}
          </th>
        ))}
      </tr>
    ) : null;

  const renderChildGridRow = (childDataSource, parentRow) => (
    <>
      {childDataSource
        .filter(
          (childRow) =>
            childRow[configuration.childGridSetting.childKeyDataField] ===
            parentRow[configuration.childGridSetting.parentKeyDataField]
        )
        .map((row, rowIndex) => (
          <React.Fragment key={`row_${rowIndex}`}>
            <tr>
              {configuration.ChildTableColumn.map((col) => (
                <td
                  key={col.name}
                  className={customColumnClass || ""}
                  style={
                    col.colStyle?.width ? { width: col.colStyle.width } : null
                  }
                >
                  {renderGridCol(row, col, rowIndex, parentRow)}
                </td>
              ))}
            </tr>
          </React.Fragment>
        ))}
    </>
  );

  const renderChildGrid = (
    configuration,
    parentRow,
    childDataSource,
    rowIndex
  ) =>
    collapsedRows[rowIndex] ? (
      <tr>
        <td className="first-td"></td>
        <td colSpan={configuration.columns.length} className="sub-table">
          <table>
            {renderChildGridHeader()}
            {renderChildGridRow(childDataSource, parentRow)}
          </table>
        </td>
      </tr>
    ) : null;

  return (
    <>
      {dataSource.map((row, rowIndex) => (
        <React.Fragment key={`row_${rowIndex}`}>
          <tr
            key={`row_${rowIndex}`}
            className={`parent-row ${collapsedRows[rowIndex] ? "collapsed" : ""
              }`}
            onClick={(e) => handleRowClick(e, row, rowIndex)}
          >
            {configuration.hasChildGridTable ? (
              <td className="first-td" onClick={() => toggleRow(rowIndex)}>
                <span
                  className={`bi bi-chevron-${collapsedRows[rowIndex] ? "down" : "right"
                    }`}
                ></span>
              </td>
            ) : null}
            {columns.map((col) => (
              <td
                key={`col_${col.name}_${rowIndex}`}
                className={`whitespace-nowrap ${customColumnClass || ""}`}
                style={{
                  width: col.colStyle?.width || "auto",
                  textAlign: col.colStyle?.textAlign || "center",
                  ...col.colStyle,
                }}
              >
                <div className="input-validation">
                  {renderGridCol(row, col, rowIndex)}
                </div>
              </td>
            ))}
          </tr>
          {configuration.hasChildGridTable &&
            renderChildGrid(configuration, row, childTableDataSource, rowIndex)}
        </React.Fragment>
      ))}
    </>
  );
};

MolGridDataRows.propTypes = {
  dataSource: PropTypes.array.isRequired,
  childTableDataSource: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  configuration: PropTypes.object.isRequired,
  customColumnClass: PropTypes.string,
  customHeaderClass: PropTypes.string,
  allowEditGrid: PropTypes.bool,
  editGridSettings: PropTypes.object,
  slectedRowIndex: PropTypes.number,
  onColumnDataChange: PropTypes.func,
  onRowDataUpdateSaving: PropTypes.func,
  onActionChange: PropTypes.func,
  onRowSelect: PropTypes.func, // Add this line
};

export default memo(MolGridDataRows);
