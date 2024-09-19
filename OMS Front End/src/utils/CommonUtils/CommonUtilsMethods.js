export const getDropdownLabelName = (apiResponseData, valueField, labelField, selectedId) => {
    if (apiResponseData && selectedId && valueField && labelField) {
        // Map the data to the required format
        const mappedData = apiResponseData.map((item) => ({
            value: item[valueField],
            label: item[labelField]
        }));

        // Find the matching entry based on selectedId
        const labelName = mappedData.find(data => Number(data.value) === Number(selectedId));
        if (labelName) {
            return labelName.label; // Return the label field value
        }
    }
    return null;
}


export const removeIdSuffix = (fieldName) => {
    if (fieldName.toLowerCase().endsWith('id')) {
        return fieldName.slice(0, -2); // Remove the last 2 characters ("Id")
    }
    return fieldName;
};