export const setFieldDisabled = (formFields, setState, fieldId, disabled) => {
    let field = formFields.formFields.find(data => data.id === fieldId);
    if (field) {
        field.fieldSetting = { ...field.fieldSetting, isDisabled: disabled };
        let request = {
            ...formFields
        }
        setState(request);
    }
}