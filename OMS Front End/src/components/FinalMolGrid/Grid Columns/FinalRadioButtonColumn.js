import React, { useState } from 'react';
import GridRadioButton from '../ui/radioButton/GridRadioButton';

const RenderGridRadioButtonColumn = ({ rowData, col, rowIndex, onColumnDataChange }) => {

    const [selectedOption, setSelectedOption] = useState(rowData[col.fieldName]);
    const { fieldName } = col;

    /**
    * Handles change in dropdown selection.
    * @param {object|string} selectedValue - The selected option.
    */
    const handleOnChange = (selectedValue) => {
        setSelectedOption(selectedValue);

        if (onColumnDataChange) {
            const newRowData = { ...rowData, [fieldName]: selectedValue };
            onColumnDataChange(fieldName, newRowData, rowIndex);
        }
    };

    return (
        <GridRadioButton
            name={col.name}
            onChange={handleOnChange}
            radioId={`${fieldName}-${rowIndex}`}
            isChecked={selectedOption === rowData[fieldName]}
            valueName={selectedOption}
        />
    );
};

export default RenderGridRadioButtonColumn;
