import React from 'react';

import DropdownSelect from "../../ui/dropdown/DropDrown";

export const RenderDropdownColumn = (rowData, col, rowIndex, props) => {

    const columnValue = rowData?.[col.fieldName];

    const handleChange = () => {
        if (props.onChange) {
            props.onChange(columnValue);
        }
    }

    return (
        <DropdownSelect
            value={columnValue}
            options={col.colSettings.listOptions}
            placeholder={col.colSettings.placeholder}
            onChange={handleChange}
        />
    )

}
