export const setOptionFieldSetting = (apiResponseData, valueField, labelField, formFieldsData, fieldId, filterCondition = null) => {
    const filteredData = filterCondition ? apiResponseData.filter(filterCondition) : apiResponseData;
    const mappedData = filteredData.map((item) => ({
        value: item[valueField],
        label: item[labelField],
    }));
    const dropdownField = formFieldsData.formFields.find((item) => item.dataField === fieldId);
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