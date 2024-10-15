/**
 * Function to map options to a specific field in the form configuration.
 * 
 * @param {Object} formConfig - The entire form configuration object.
 * @param {string} sectionId - The ID of the section containing the field.
 * @param {string} fieldId - The ID of the field to map options to.
 * @param {Array} data - The array of data to be used for generating options.
 * @param {string} valueKey - The key to be used for the option's value.
 * @param {string} labelKey - The key to be used for the option's label.
 */
export const mapDropdownOptions1 = (formConfig, sectionId, fieldId, data, valueKey, labelKey) => {
    // Find the specified field in the form configuration
    const dropdownField = formConfig.section
        .find((section) => section.sectionId === sectionId)
        ?.fields.find((field) => field.id === fieldId);

    // If the field exists, map the data to the dropdown options
    if (dropdownField) {
        dropdownField.fieldSetting.options = data.map((item) => ({
            value: item[valueKey],
            label: item[labelKey]
        }));
    }
};


/**
 * Function to map options to a specific field in the form configuration.
 * 
 * @param {Object} formConfig - The entire form configuration object.
 * @param {string} sectionId - The ID of the section containing the field.
 * @param {string} fieldId - The ID of the field to map options to.
 * @param {Array} data - The array of data to be used for generating options.
 * @param {string} valueKey - The key to be used for the option's value.
 * @param {string} labelKey - The key to be used for the option's label.
 */
export const mapDropdownOptions = (formConfig, sectionId, fieldId, data, valueKey, labelKey) => {
    // Find the specified section
    const section = formConfig.section.find((section) => section.sectionId === sectionId);

    if (!section) return;

    let dropdownField;

    // Check if the section has fields at the top level
    if (section.fields) {
        dropdownField = section.fields.find((field) => field.id === fieldId);
    }

    // If not found in top-level fields, check within rowGroups
    if (!dropdownField && section.rowGroup) {
        section.rowGroup.some((row) => {
            dropdownField = row.fields.find((field) => field.id === fieldId);
            return dropdownField; // Break out of the loop if field is found
        });
    }

    // If the field exists, map the data to the dropdown options
    if (dropdownField) {
        dropdownField.fieldSetting.options = data.map((item) => ({
            value: item[valueKey],
            label: item[labelKey],
        }));
    }
};
