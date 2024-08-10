import React, { useState } from 'react'
import GridDropdown from '../ui/dropdown/GridDropdown';

const RenderDropdownColumn = ({ rowData, col, rowIndex, onColumnDataChange }) => {

    const [value, setValue] = useState(rowData[col.fieldName]);
    const { colSettings, fieldName } = col;

    /**
     * Handles change in dropdown selection.
     * @param {object|string} selectedOption - The selected option.
     */
    const handleOnChange = (selectedOption) => {
        let selectedValue;

        if (typeof selectedOption === 'object' && selectedOption !== null && 'value' in selectedOption) {
            selectedValue = selectedOption.value;
        } else {
            selectedValue = selectedOption;
        }

        setValue(selectedValue);

        if (onColumnDataChange) {
            const newRowData = { ...rowData, [fieldName]: selectedValue };
            onColumnDataChange(fieldName, newRowData, rowIndex);
        }
    };

    return (
    
       
            <GridDropdown
                placeholder={colSettings?.placeHolder}
                isMultiSelect={col.isMultiSelect}
                options={colSettings.options}
                value={value}
                onChange={handleOnChange}
                onBlur={col.handleOnBlur}
                isDropdownDisabled={colSettings.isDisable}
            />
    
    )
}

export default RenderDropdownColumn