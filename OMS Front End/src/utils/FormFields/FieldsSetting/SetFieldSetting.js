/**
 * Sets the options for a dropdown field within form fields data based on API response data.
 * 
 * @param {Array} apiResponseData - The data received from an API response.
 * @param {string} valueField - The field name to be used for option values.
 * @param {string} labelField - The field name to be used for option labels.
 * @param {object} formFieldsData - The object containing form fields data.
 * @param {string} fieldId - The identifier for the dropdown field to be updated.
 * @param {function} [filterCondition=null] - An optional filter condition function to filter the API response data.
 * 
 * Example usage:
 * const filterCondition = (item) => {
        return (item) => item.isActive;
    };
 * setOptionFieldSetting(apiResponseData, 'id', 'name', formFieldsData, 'countryDropdown', filterCondition);
 */
export const setOptionFieldSetting = (apiResponseData, valueField, labelField, formFieldsData, fieldId, filterCondition = null) => {

    // Filter the API response data if a filter condition is provided
    const filteredData = filterCondition ? apiResponseData.filter(filterCondition) : apiResponseData;

    // Map the filtered data to the required format
    const mappedData = filteredData.map((item) => ({
        value: item[valueField],
        label: item[labelField],
    }));

    // Find the dropdown field within the form fields data
    const dropdownField = formFieldsData.formFields.find((item) => item.dataField === fieldId);

    // If the dropdown field is found, set its options to the mapped data
    if (dropdownField) {
        dropdownField.fieldSetting.options = mappedData;
    }
};

export const findFieldData = (formFieldsData, fieldId) => {
    return formFieldsData.formFields.find((item) => item.dataField === fieldId);
}


/**
 * Sets a specific field setting for a given field within form fields data.
 * 
 * @param {object} formFieldsData - The object containing form fields data.
 * @param {string} fieldId - The identifier for the field to be updated.
 * @param {string} settingType - The type of setting to be updated (e.g., 'isMultiSelect', 'isDisabled') and Also, create Enums for the setting type.
 * @param {any} [value=false] - The value to set for the specified setting type. Default is `false`.
 * 
 * Example usage:
 * setFieldSetting(formFieldsData, 'countryDropdown', settingTypeEnums.isDisabled/settingTypeEnums.isMultiSelect, true);
 */
export const setFieldSetting = (formFieldsData, fieldId, settingType, value = false) => {
    const selectField = formFieldsData.formFields.find((item) => item.dataField === fieldId);
    if (selectField) {
        switch (settingType) {
            case 'isMultiSelect':
                selectField.fieldSetting.isMultiSelect = value;
                break;
            case 'isDisabled':
                selectField.fieldSetting.isDisabled = value;
                break;
            default:
                break;
        }
    }
};