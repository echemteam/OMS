import React, { useEffect, useState } from 'react'
import CheckBox from '../../../ui/inputs/checkBox/CheckBox'
import ValidationText from '../../../ui/inputs/validation/ValidationText';

const EditCheckBoxColumn = ({ rowData, col, editColumn, rowIndex, onChange, updatedData, errors }) => {

    const [checked, setChecked] = useState(rowData[col.fieldName]);

    const handleCheckboxChange = (dataField, newValue) => {
        setChecked(newValue);

        if (onChange) {
            // Merge the new checked value into a copy of rowData or updatedData if it exists
            const newRowData = updatedData
                ? { ...updatedData, [col.fieldName]: newValue }
                : { ...rowData, [col.fieldName]: newValue };
            onChange(rowIndex, newRowData);
        }
    }

    const hasError = errors && errors[rowIndex] && errors[rowIndex][col.fieldName] ? true : false;
    const errorMessage = hasError && errors[rowIndex] && errors[rowIndex][col.fieldName] ? errors[rowIndex][col.fieldName] : '';

    useEffect(() => {
        // Update checked state if rowData changes
        setChecked(rowData[col.fieldName]);
    }, [rowData, col.fieldName]);

    return (
        <>
            <CheckBox
                name={col.name}
                className="form-checkbox"
                type="checkbox"
                dataField={editColumn.editColFieldName}
                // checked={rowData[col.fieldName]}
                checked={checked}
                onChange={handleCheckboxChange}
                disabled={editColumn.isDisable}
            />
            {hasError && <ValidationText error={errorMessage ? errorMessage : ' '} className="error-message" />}
        </>
    )
}

export default EditCheckBoxColumn