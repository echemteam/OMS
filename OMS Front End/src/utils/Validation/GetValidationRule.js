//**
// This utility use to generate the validation rules from the form fields 
//
//**/

import { ErrorMessage } from "./../../data/appMessages";


export const getValidationRules = (fromFields) => {

    let valRules = {}
    fromFields.forEach(element => {
        if (element.validation && element.validation.length > 0) {
            let vallist = element.validation;
            let fieldValRules = [];
            vallist.forEach(valItem => {
                let valRule = getValidationRule(element, valItem)
                fieldValRules.push(valRule);
            });
            valRules = {
                ...valRules,
                [element.dataField]: fieldValRules
            }
        }
    });
    return valRules;
}


// Note: Element is not use as of now
const getValidationRule = (element, validation) => {

    let valObj = {};
    switch (validation.type) {
        case "require":
            valObj = {
                type: validation.type,
                message: ErrorMessage.FieldRequired.replace('{0}', element.Field_Name)
            }
            break;
        case "email":
            valObj = {
                type: validation.type,
                message: ErrorMessage.EmailAddressNotValid
            }
            break;
        case "password":
            valObj = {
                type: validation.type,
                message: ErrorMessage.NOTVALIDPATTERN.replace("{0}", "Password")
            }
            break;
        case 'compare':
            valObj = {
                type: validation.type,
                compareEle: validation.compareEle,
                message: ErrorMessage.CompareField.replace("{0}", element.Field_Name)
            }
            break;
        case 'validEIN':
        case 'validPhone':
        case 'validFax':
            valObj = {
                type: validation.type,
                message: ErrorMessage.InvalidField.replace("{0}", validation.type === 'validEIN' ? "EIN number" : validation.type === 'validPhone' ? "phone number" : "fax number")
            };
            break;
        default:
            break;
    }
    // Please enter all the case
    return valObj;

}