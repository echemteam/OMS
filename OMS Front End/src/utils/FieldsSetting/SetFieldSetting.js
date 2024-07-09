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

export const setMultiSelectFieldSetting = (formFieldsData, fieldId, isMultiSelectValue = false) => {
    const multiSelectField = formFieldsData.formFields.find((item) => item.dataField === fieldId);
    if (multiSelectField) {
        multiSelectField.fieldSetting.isMultiSelect = isMultiSelectValue;
    }
};

export const setDisabledFieldSetting = (formFields, setState, fieldId, disabled) => {
    let field = formFields.formFields.find(data => data.id === fieldId);
    if (field) {
        field.fieldSetting = { ...field.fieldSetting, isDisabled: disabled };
        let request = {
            ...formFields
        }
        setState(request);
    }
}