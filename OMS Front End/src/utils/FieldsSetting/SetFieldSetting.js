/* 
    EXAMPLE : -

    ////// DEFINE THE FILTER CONDITION AS A FUNCTION: //////
    const filterCondition = (item) => {
        return item.roleName === null || !excludingRoles.map(role => role.toLowerCase()).includes(item.roleName.toLowerCase());
    };

    ////// Call the setOptionFieldSetting function with the filterCondition: //////
    setOptionFieldSetting(allGetAlluserData, 'userId', 'fullName', reasonData, 'responsibleUserId', filterCondition);

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