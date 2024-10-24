import PropTypes from 'prop-types';

/**
 * Finds a specific field data object within the form fields data by its field ID.
 * @param {Object} formFieldsData - The object containing all form fields data.
 * @param {string} fieldId - The identifier of the field to find.
 * @returns {Object|null} - The field data object if found, otherwise null.
 */
export const getFieldData = (formFieldsData, fieldId) => {
    if (formFieldsData?.section) {
        for (const section of formFieldsData?.section) {
            let field = section.fields.find((item) => item.dataField === fieldId);
            if (field) return field;

            if (section.rowGroup) {
                for (const row of section.rowGroup) {
                    field = row.fields.find((field) => field.id === fieldId);
                    if (field) return field;
                }
            }
        }
    } else {
        return formFieldsData.formFields?.find((item) => item.dataField === fieldId) || null;
    }
    return null;
};
// Define propTypes for the function parameters
getFieldData.propTypes = {
    formFieldsData: PropTypes.array.isRequired,
    fieldId: PropTypes.string.isRequired
};


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
 * setDropDownOptionField(apiResponseData, 'id', 'name', formFieldsData, 'countryDropdown', filterCondition);
 */
export const setDropDownOptionField = (apiResponseData, valueField, labelField, formFieldsData, fieldId, filterCondition = null, setFormData) => {

    // Filter the API response data if a filter condition is provided
    const filteredData = filterCondition ? apiResponseData?.filter(filterCondition) : apiResponseData;

    // Map the filtered data to the required format
    const mappedData = filteredData?.map((item) => ({
        value: item[valueField],
        label: item[labelField],
    }));

    // Find the dropdown field within the form fields data
    const dropdownField = getFieldData(formFieldsData, fieldId);

    // If the dropdown field is found, set its options to the mapped data
    if (dropdownField) {
        dropdownField.fieldSetting.options = mappedData;
    }
    setFormData && setFormData({ ...formFieldsData });
};

// Define propTypes for the function parameters
setDropDownOptionField.propTypes = {
    apiResponseData: PropTypes.array.isRequired,
    valueField: PropTypes.string.isRequired,
    labelField: PropTypes.string.isRequired,
    formFieldsData: PropTypes.array.isRequired,
    fieldId: PropTypes.string.isRequired,
    filterCondition: PropTypes.func
};


/**
 * Sets a specific field setting for a given field within form fields data.
 * 
 * @param {object} formFieldsData - The object containing form fields data.
 * @param {string} fieldId - The identifier for the field to be updated.
 * @param {string} fieldSettingType - The type of setting to be updated (e.g., 'isMultiSelect', 'isDisabled') and Also, create Enums for the setting type.
 * @param {any} [value=false] - The value to set for the specified setting type. Default is `false`.
 * 
 * Example usage:
 * setFieldSetting(formFieldsData, 'countryDropdown', FieldSettingType.DISABLED/FieldSettingType.MULTISELECT, true);
 */
export const setFieldSetting = (formFieldsData, fieldId, fieldSettingType, value = false) => {
    const selectField = getFieldData(formFieldsData, fieldId);
    if (selectField && selectField.fieldSetting) {
        switch (fieldSettingType) {
            case 'isMultiSelect':
                selectField.fieldSetting.isMultiSelect = value;
                break;
            case 'isDisable':
                selectField.fieldSetting.isDisable = value;
                break;
            case 'isPrimaryButtonVisible':
                selectField.inputButtonGroupConfig.isPrimaryButtonVisible = value;
                break;
            case 'isInfoButtonVisible':
                selectField.inputButtonGroupConfig.infoButtonConfig.isInfoButtonVisible = value;
                break;
            case 'isText':
                //selectField.fieldSetting.isText = value;
                selectField.fieldSetting.isText = value;
                break;
            case 'CKEditorDisabled':
                selectField.fieldSetting.isDisable = value;
                break;
            case 'isMultiple':
                selectField.fieldSetting.isMultiple = value;
                break;
            case 'isFileNameCleared':
                selectField.fieldSetting.isFileNameCleared = value;
                break;
            default:
                break;
        }
    }
};
// Define propTypes for the function parameters
setFieldSetting.propTypes = {
    formFieldsData: PropTypes.array.isRequired,
    fieldId: PropTypes.string.isRequired,
    fieldSettingType: PropTypes.array.isRequired,
    value: PropTypes.bool
};


/********************************  New Form Creator Fields Settings   ********************************/