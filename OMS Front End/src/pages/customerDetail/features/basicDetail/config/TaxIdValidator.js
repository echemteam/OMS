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
        default:
            break;
    }

    if (minLength !== undefined && maxLength !== undefined) {
        const formField = formFields.find((data) => data.id === formFieldsId);
        if (formField) {
            formField.fieldSetting.minLength = minLength;
            formField.fieldSetting.maxLength = maxLength;
        }
        return { minLength, maxLength };
    }
}
