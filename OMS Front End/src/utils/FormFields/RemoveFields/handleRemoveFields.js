import PropTypes from 'prop-types';
/**
 * Remove specific form fields from form data and update the state with the modified data.
 * 
 * @param {object} formData - The current form data object.
 * @param {Array} fieldsToRemove - An array of field dataField IDs to remove from the form data.
 */
export const removeFormFields = (formData, fieldsToRemove) => {
    // Create a copy of the formData object
    const modifiedData = { ...formData };

    // If formFields are directly in formData, filter them
    if (modifiedData.formFields) {
        modifiedData.formFields = modifiedData.formFields.filter((field) => !fieldsToRemove.includes(field.dataField));
    }

    // Normalize fieldsToRemove to lowercase for case-insensitive comparison
    const lowerCaseFieldsToRemove = fieldsToRemove.map((field) => field?.toLowerCase());

    // If there are sections, iterate over each to filter fields and nested fields
    if (modifiedData.section) {
        modifiedData.section = modifiedData.section.map((section) => {
            // Remove fields at the section level
            const updatedSection = { ...section };
            updatedSection.fields = updatedSection.fields.filter((field) => !lowerCaseFieldsToRemove.includes(field.dataField?.toLowerCase()));

            // If there are rowGroups, filter fields within each row
            if (updatedSection.rowGroup) {
                updatedSection.rowGroup = updatedSection.rowGroup.map((row) => {
                    const updatedRow = { ...row };
                    updatedRow.fields = updatedRow.fields.filter(
                        (field) => !fieldsToRemove.includes(field.id)
                    );
                    return updatedRow;
                });
            }

            return updatedSection;
        });
    }

    // Return the modified form data
    return modifiedData;

};
// Define propTypes for the function parameters
removeFormFields.propTypes = {
    formData: PropTypes.object.isRequired,
    fieldsToRemove: PropTypes.array.isRequired
};

/**
 * Remove specific form fields from form data and update the state with the modified data.
 * 
 * @param {object} formData - The current form data object.
 * @param {Array} fieldsToRemove - An array of field dataField IDs to remove from the form data.
 */
export const addFormFields = (formData, fieldsToAdd) => {
    // Create a copy of the formData object
    const modifiedData = { ...formData };

    // Add new fields to the formFields array
    modifiedData.formFields = [...modifiedData.formFields, ...fieldsToAdd];

    // Update the state with the modified form data
    return modifiedData;
};
// Define propTypes for the function parameters
addFormFields.propTypes = {
    formData: PropTypes.object.isRequired,
    fieldsToRemove: PropTypes.array.isRequired
};