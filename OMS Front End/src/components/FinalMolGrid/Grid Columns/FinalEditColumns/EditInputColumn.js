import React, { useState } from 'react';
import Input from "../../../ui/inputs/input/Input";
import { TextInputType } from '../../../../data/formControlTypes';
import ValidationText from '../../../ui/inputs/validation/ValidationText';



const EditInputColumn = ({ rowData, col, editColumn, rowIndex, onChange, updatedData, errors }) => {

    const [value, setValue] = useState(rowData[col.fieldName]);

    const handleOnChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);

        if (onChange) {
            // Merge the new value into a copy of rowData or updatedData if it exists
            const newRowData = updatedData ? { ...updatedData, [col.fieldName]: newValue } : { ...rowData, [col.fieldName]: newValue };
            onChange(rowIndex, newRowData);
        }
    }

    const hasError = errors && errors[rowIndex] && errors[rowIndex][col.fieldName] ? true : false;
    const errorMessage = hasError && errors[rowIndex] && errors[rowIndex][col.fieldName] ? errors[rowIndex][col.fieldName] : '';



    return (
        <>
            <Input
                type={editColumn?.editColType === 3 ? TextInputType.NUMBER : TextInputType.TEXT}
                placeholder={`Please Enter ${col.name}`}
                value={value}
                min={0}
                max={0}
                onChange={handleOnChange}
                onBlur={col.handleOnBlur}
                minLength={0}
                maxLength={0}
                cssClass={`input-field ${hasError ? 'error' : ''}`}
                allowSpace={true}
                isDisable={editColumn.isDisable}

            />
            {/* {hasError && <div className="error-message">{errorMessage}</div>} */}
            {hasError && <ValidationText error={errorMessage ? errorMessage : ' '} className="error-message" />}
        </>
    )
}

export default EditInputColumn