export const getTaxIdMinMaxLength = (countryId, formFields, formFieldsId) => {
    let minLength, maxLength;

    switch (countryId) {
        case 1:
            minLength = 3;
            maxLength = 10;
            break;
        case 2:
            minLength = 10;
            maxLength = 15;
            break;
        case 233: //** US
            minLength = 10;
            maxLength = 10;
            break;
        default:
            break;
    }

    if (minLength !== undefined && maxLength !== undefined) {
        const formField = formFields.find((data) => data.id === formFieldsId);
        if (formField) {
            const validation = formField.validation?.find((data) => data.type === formFieldsId);
            formField.fieldSetting.minLength = minLength;
            formField.fieldSetting.maxLength = maxLength;
            validation.minLength = minLength;
            validation.maxLength = maxLength;
        }
    }
    return formFields;
}
