import { SuccessMessage } from "../../../../../data/appMessages";

export const getTaxIdMinMaxLength = (countryId, formFields, formFieldsId) => {
    let minLength, maxLength, message, formField;

    switch (countryId) {
        case 1:
            minLength = 3;
            maxLength = 10;
            break;
        case 2:
            minLength = 10;
            maxLength = 15;
            break;
        case 82: //** GE
            minLength = 11;
            maxLength = 11;
            break;
        case 233: //** US
            minLength = 10;
            maxLength = 10;
            break;
        default:
            break;
    }

    if (minLength !== undefined && maxLength !== undefined) {
        message = SuccessMessage.TaxId.replace("{0}", minLength).replace("{1}", maxLength);
        formField = formFields.find((data) => data.id === formFieldsId);
        if (formField) {
            // const validation = formField.validation;
            formField.fieldSetting.minLength = minLength;
            formField.fieldSetting.maxLength = maxLength;
            formField.inputIcon.message = SuccessMessage.TaxId.replace("{0}", minLength).replace("{1}", maxLength);
            // validation.minLength = minLength;
            // validation.maxLength = maxLength;
        }
    }
    return { message, maxLength, minLength, formFields };
}
