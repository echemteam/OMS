/**
 * Remove specific form fields from form data and update the state with the modified data.
 * 
 * @param {object} formData - The current form data object.
 * @param {Array} fieldsToRemove - An array of field dataField IDs to remove from the form data.
 * @param {function} setFormData - The state setter function for updating the form data.
 */
export const removeFormFields = (formData, fieldsToRemove, setFormData) => {
    // Create a copy of the formData object
    const modifiedData = { ...formData };

    // Filter out form fields based on fieldsToRemove array
    modifiedData.formFields = modifiedData.formFields.filter((field) => !fieldsToRemove.includes(field.dataField));

    // Update the state with the modified form data
    setFormData(modifiedData);
};