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

    // Filter out form fields based on fieldsToRemove array
    modifiedData.formFields = modifiedData.formFields.filter((field) => !fieldsToRemove.includes(field.dataField));

    // Update the state with the modified form data
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