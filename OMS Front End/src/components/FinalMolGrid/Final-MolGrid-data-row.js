import React, { useState } from "react";

import { GridColumnType } from "../../data/gridColumnType";
import { EditGridColumnType } from "../../data/editGridColumnType";

import { renderGridAction } from "./Grid Columns/FinalActionColumn";
import { renderGridLinkColumn } from "./Grid Columns/FinalLinkColumn";
import { renderGridDateColumn } from "./Grid Columns/FinalDateColumn";
import { renderGridLableColumn } from "./Grid Columns/FinalLabelColumn";
import { renderGridMoneyColumn } from "./Grid Columns/FinalMoneyColumn";
import { renderGridCheckboxColumn } from "./Grid Columns/FinalCheckBoxColumn";

// Edit Columns
import EditInputColumn from "./Grid Columns/FinalEditColumns/EditInputColumn";
import EditCheckBoxColumn from "./Grid Columns/FinalEditColumns/EditCheckBoxColumn";
import EditDropdownColumn from "./Grid Columns/FinalEditColumns/EditDropdownColumn";
import EditDatepickerColumn from "./Grid Columns/FinalEditColumns/EditDatepickerColumn";
import { renderEditGridAction } from "./Grid Columns/FinalEditColumns/EditActionColumn";

// Function for rendering the action column
const MolGridDataRows = (props) => {

    const [errors, setErrors] = useState([]);
    const [collapsedRows, setCollapsedRows] = useState({});

    const toggleRow = (rowId) => {
        setCollapsedRows((prevState) => ({
            ...prevState,
            [rowId]: !prevState[rowId],
        }));
    };

    const validateField = (value, validations) => {
        for (let validation of validations) {
            switch (validation.type) {
                case 'required':
                    if (!value || (typeof value === 'string' && value.trim() === '')) {
                        return validation.message;
                    }
                    break;
                case 'minLength':
                    if (typeof value === 'string' && value.length < validation.value) {
                        return validation.message;
                    }
                    break;
                case 'min':
                    if (typeof value === 'number' && value < validation.value) {
                        return validation.message;
                    }
                    break;
                // Add more validation types as needed
                default:
                    break;
            }
        }
        return null;
    }

    /**
     * Handles saving the edited row data.
    * @param {number} rowIndex - The index of the row being saved.
    */
    const handleRowEditSave = (rowIndex) => {

        const newErrors = {};

        if (props.editRowIndex.includes(rowIndex)) {
            const updatedRowData = props.editedRowData[rowIndex];

            props.columns.forEach(col => {
                if (col.allowEditColumn && col.editColumn?.editColValidation?.length > 0) {
                    const error = validateField(updatedRowData[col.fieldName], col.editColumn.editColValidation);
                    if (error) {
                        newErrors[col.fieldName] = error;
                    }
                }
            });

            if (Object.keys(newErrors).length === 0) {
                // No validation errors, update the row data
                if (props.onRowDataUpdateSaving) {
                    props.onRowDataUpdateSaving(updatedRowData, rowIndex);
                }
                handleCancelEdit(rowIndex);
            } else {
                // Set validation errors
                setErrors(prevErrors => ({ ...prevErrors, [rowIndex]: newErrors }));
            }
        }

    };

    /**
     * Handles updating the row data.
     * @param {number} rowIndex - The index of the row being updated.
     * @param {object} updatedData - The updated data for the row.
     */
    const handleRowDataUpdate = (rowIndex, newRowData) => {
        const updatedRowData = [...props.editedRowData];

        // Create a new object to store validation errors
        const newErrors = {};

        // Perform validation on the newRowData
        props.columns.forEach(col => {
            if (col.allowEditColumn && col.editColumn?.editColValidation?.length > 0) {
                const error = validateField(newRowData[col.fieldName], col.editColumn.editColValidation);
                if (error) {
                    newErrors[col.fieldName] = error;
                }
            }
        });

        // Check if there are any validation errors
        if (Object.keys(newErrors).length === 0) {
            // No validation errors, update the row data
            // Clear errors for this row index
            setErrors(prevErrors => {
                const { [rowIndex]: _, ...restErrors } = prevErrors;
                return restErrors;
            });
        } else {
            // Set validation errors
            setErrors(prevErrors => ({ ...prevErrors, [rowIndex]: newErrors }));
        }

        updatedRowData[rowIndex] = { ...updatedRowData[rowIndex], ...newRowData };

        // Update the parent component with the new row data
        props.onRowDataUpdate(updatedRowData);
    };

    /**
   * Cancels the edit mode for a row.
   * @param {number} rowIndex - The index of the row to cancel edit mode for.
   */
    const handleCancelEdit = (rowIndex) => {
        if (props.editRowIndex.includes(rowIndex)) {
            // Filter out the row index to remove it from the list of edited rows
            const newEditRowIndex = [...props.editRowIndex].filter(index => index !== rowIndex);

            const newErrors = { ...errors };
            delete newErrors[rowIndex];
            setErrors(newErrors);
            // Update the parent component with the new list of edited row indices
            props.onRowEditRowIndexChange(newEditRowIndex);
        }
    };

    /**
     * Initiates the edit mode for a row.
     * @param {number} rowIndex - The index of the row to edit.
     * @param {object} data - The initial data for the row being edited.
     */
    const handleEditRow = (rowIndex, data) => {
        // Create a copy of the current editRowIndex array
        const editRowIndexes = [...props.editRowIndex];

        // Add the row index to the list of edited rows if it's not already present
        if (!editRowIndexes.includes(rowIndex)) {
            editRowIndexes.push(rowIndex);
        }

        // Create a copy of the current editedRowData array
        const editedRowData = [...props.editedRowData];

        // Set the data for the row being edited
        editedRowData[rowIndex] = data;

        // Update the parent component with the new row data and edited row indices
        props.onRowDataUpdate(editedRowData);
        props.onRowEditRowIndexChange(editRowIndexes);
    };

    const renderGridCol = (rowData, col, rowIndex, parentRowData) => {

        // Check if the current row is being edited
        const isRowEdited = props?.editRowIndex?.includes(rowIndex) || false;

        // Get the edited row data if it exists, otherwise set to null
        const editedRowData = props?.editedRowData?.[rowIndex] || null;

        if (col?.colType !== GridColumnType.ACTION && (!isRowEdited || !col?.allowEditColumn)) {
            switch (col?.colType) {
                case GridColumnType.DATE:
                    return renderGridDateColumn(rowData, col, rowIndex);
                case GridColumnType.MONEY:
                    return renderGridMoneyColumn(rowData, col, rowIndex);
                case GridColumnType.LABLE:
                    return renderGridLableColumn(rowData, col, rowIndex);
                case GridColumnType.LINK:
                    return renderGridLinkColumn(rowData, col, rowIndex);
                case GridColumnType.CHECKBOX:
                    return renderGridCheckboxColumn(rowData, col, rowIndex, parentRowData, props.onCellDataChange);
                case GridColumnType.ACTION:
                    return renderGridAction(rowData, col, rowIndex, props.onActionChange);
                case GridColumnType.CUSTOM:
                    return col.renderCustomCol
                        ? col.renderCustomCol(rowData, rowIndex)
                        : "";
                default:
                    return rowData[col.fieldName];
            }
        }
        // Handle editable columns when the row is being edited
        else if (col?.allowEditColumn && isRowEdited) {
            switch (col?.editColumn?.editColType) {
                case EditGridColumnType.INPUT:
                case EditGridColumnType.NUMERIC:
                    return (
                        <EditInputColumn
                            rowData={rowData}
                            col={col}
                            editColumn={col.editColumn}
                            rowIndex={rowIndex}
                            onChange={handleRowDataUpdate}
                            updatedData={editedRowData}
                            errors={errors}
                        />
                    )
                case EditGridColumnType.DROPDOWN:
                    return (
                        <EditDropdownColumn
                            rowData={rowData}
                            col={col}
                            editColumn={col.editColumn}
                            rowIndex={rowIndex}
                            onChange={handleRowDataUpdate}
                            updatedData={editedRowData}
                            errors={errors}
                        />
                    )
                case EditGridColumnType.DATEPICKER:
                    return (
                        <EditDatepickerColumn
                            rowData={rowData}
                            col={col}
                            editColumn={col.editColumn}
                            rowIndex={rowIndex}
                            onChange={handleRowDataUpdate}
                            updatedData={editedRowData}
                            errors={errors}
                        />
                    )
                case EditGridColumnType.CHECKBOX:
                    return (
                        <EditCheckBoxColumn
                            rowData={rowData}
                            col={col}
                            editColumn={col.editColumn}
                            rowIndex={rowIndex}
                            onChange={handleRowDataUpdate}
                            updatedData={editedRowData}
                            errors={errors}
                        />
                    )
                default:
                    return rowData?.[col?.fieldName];
            }
        }
        // Handle action columns separately
        else if (col?.colType === GridColumnType.ACTION) {
            // Render editable action columns if the grid allows editing and the row is being edited
            if (props?.allowEditGrid && isRowEdited) {
                return renderEditGridAction(rowData, col, rowIndex, props.allowEditGrid, handleRowEditSave, isRowEdited, handleCancelEdit);
            }
            // Render non-editable action columns
            else {
                return renderGridAction(rowData, col, rowIndex, props?.onActionChange, props.allowEditGrid, isRowEdited, handleEditRow);
            }
        }
    }

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
                {childDataSource?.filter((childRow) => {
                    return (
                        childRow[props.configuration.childGridSetting.childKeyDataField] ===
                        parentRow[props.configuration.childGridSetting.parentKeyDataField]
                    );
                }).map((row, rowIndex) => (
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
                                    {renderGridCol(row, col, rowIndex, parentRow)}
                                </td>
                            ))}
                        </tr>
                    </React.Fragment>
                    //Need to render child grid and it's data
                ))}
            </>
        );
    };

    const renderChildGrid = (configuration, parentRow, childDataSource, rowIndex) => {
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
            {props?.dataSource?.map((row, rowIndex) => (
                <React.Fragment key={`row_${rowIndex}`}>
                    <tr className={`parent-row ${collapsedRows[rowIndex] ? "collapsed" : ""}`}>
                        {props?.configuration?.hasChildGridTable ? (
                            <td className="first-td" onClick={() => toggleRow(rowIndex)}>
                                <span className={`bi bi-chevron-${collapsedRows[rowIndex] ? "down" : "right"}`}>
                                </span>
                            </td>
                        ) : null}
                        {props.columns.map((col, colIndex) => (
                            <td key={`col_${colIndex}`} style={{ width: col.width }} className={`whitespace-nowrap ${props.customColumnClass || ""}`}>
                                {renderGridCol(row, col, rowIndex)}
                            </td>
                        ))}
                    </tr>
                    {props?.configuration?.hasChildGridTable &&
                        renderChildGrid(props.configuration, row, props.childTableDataSource, rowIndex)}
                </React.Fragment>
                //Need to render child grid and it's data
            ))}
        </>
    );
};

export default MolGridDataRows;
