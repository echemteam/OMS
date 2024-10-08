//**
// This utility use to generate the validation rules from the form fields 
//
//**/

import { ErrorMessage } from "./../../data/appMessages";


export const getValidationRules = (sections) => {
    let valRules = {};

    sections && sections.forEach(section => {
        // Check if the section has rowGroup or direct fields
        if (section.rowGroup && section.rowGroup.length > 0) {
            // If rowGroup exists, loop through each rowGroup and its fields
            section.rowGroup.forEach(rowGroup => {
                rowGroup.fields.forEach(field => {
                    if (field.validation && field.validation.length > 0) {
                        let fieldValRules = field.validation.map(valItem => getValidationRule(field, valItem));
                        valRules = {
                            ...valRules,
                            [field.dataField]: fieldValRules
                        };
                    }
                });
            });
        } else if (section.fields && section.fields.length > 0) {
            // Handle sections with direct fields (no rowGroup)
            section.fields.forEach(field => {
                if (field.validation && field.validation.length > 0) {
                    let fieldValRules = field.validation.map(valItem => getValidationRule(field, valItem));
                    valRules = {
                        ...valRules,
                        [field.dataField]: fieldValRules
                    };
                }
            });
        }
    });

    return valRules;
};


// Note: Element is not use as of now
const getValidationRule = (element, validation) => {
    let valObj = {};
    let fieldName;

    switch (validation.type) {
        case "require":
            valObj = {
                type: validation.type,
                message: ErrorMessage.FieldRequired.replace('{0}', element.Field_Name)
            };
            break;
        case "email":
            valObj = {
                type: validation.type,
                message: ErrorMessage.EmailAddressNotValid
            };
            break;
        case "password":
            valObj = {
                type: validation.type,
                message: ErrorMessage.NOTVALIDPATTERN.replace("{0}", "Password")
            };
            break;
        case "compare":
            valObj = {
                type: validation.type,
                compareEle: validation.compareEle,
                message: ErrorMessage.CompareField.replace("{0}", element.Field_Name)
            };
            break;
        case 'validEIN':
            fieldName = "EIN number";
            break;
        case 'validPhone':
            fieldName = "phone number";
            break;
        case 'validFax':
            fieldName = "fax number";
            break;
        case "uniqueName":
            valObj = {
                type: validation.type,
                message: ErrorMessage.UniqueName
            }
            break;
        case "invalidBoundarySpaces":
            valObj = {
                type: validation.type,
                message: ErrorMessage.InvalidBoundarySpaces
            }
            break;
        case "website":
            valObj = {
                type: validation.type,
                message: ErrorMessage.Website.replace("{0}", "Website URL")
            }
            break;
        case "taxId":
            valObj = {
                type: validation.type,
                message: ErrorMessage.FieldRequired.replace("{0}", "valid Tax Id"),
                minLength: validation.minLength,
                maxLength: validation.maxLength
            }
            break;
        case "onlyText":
            valObj = {
                type: validation.type,
                message: ErrorMessage.InvalidField.replace("{0}", "Number")
            }
            break;
        case "validZipCode":
            valObj = {
                type: validation.type,
                message: ErrorMessage.Invalidpostalcode
            }
            break;
        case "validateCharacters":
            valObj = {
                type: validation.type,
                message: ErrorMessage.InvalidSpecialCharacters
            }
            break;
        default:
            break;
    }

    if (['validEIN', 'validPhone', 'validFax'].includes(validation.type)) {
        valObj = {
            type: validation.type,
            message: ErrorMessage.InvalidField.replace("{0}", fieldName)
        };
    }

    return valObj;
};
