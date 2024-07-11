/**
 * Resets form data and optionally other states to their initial values.
 * 
 * @param {object} formData - The current form data object.
 * @param {function} setFormData - The state setter function for the form data.
 * @param {object} initialState - The initial state object to reset the form data to.
 * @param {Array} [otherSettersWithValues=[]] - An optional array of objects containing setter functions and values to reset other states to.
 * 
 * Example object for 
    otherSettersWithValues: [
        { setter: setSomeState, value: null },
        { setter: setAnotherState, value: 0 }
    ]
*/
export const onResetForm = (formData, setFormData, initialState = null, otherSettersWithValues = []) => {
    // Create a copy of the form data and reset it to its initial state
    let resetData = { ...formData };
    const initialData = !initialState ? resetData.initialState : initialState;
    resetData.initialState = { ...initialData };
    setFormData(resetData);

    // Reset other states with specified values if provided
    if (otherSettersWithValues.length > 0) {
        otherSettersWithValues.forEach(({ setter, value }) => setter(value));
    }
};