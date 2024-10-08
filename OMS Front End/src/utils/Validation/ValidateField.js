import React from 'react';
import validator from 'validator';

export const required = (value) => value !== undefined && value !== null && String(value).trim() !== '' && value !== false;

export const email = (value) => value === undefined || value === null || validator.isEmail(String(value));

export const number = (value) => value === 0 || !isNaN(value);

export const maxLength = (value, maxLen) => String(value).trim().length <= maxLen;

export const minLength = (value, minLen) => String(value).trim().length >= minLen;

export const compare = (value, compareValue) => value === compareValue;

export const distinct = (value, compareValue) => value !== '' && value !== compareValue;

export const maxProspects = (value, maxProspectsValue) => value <= maxProspectsValue;

export const minEndDate = (date, minEndDateValue) => date >= minEndDateValue;

export const maxSum = (sum, maxSumValue) => sum <= maxSumValue;

export const password = (value, props, components) => value === components['confirm'][0].value ? undefined : <span className="error">Passwords are not equal.</span>;

export const uniqueIdentifier = (value) => !!(value && String(value).trim().length && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value));

export const isvalidPassword = (value) => {
    if (!value || !String(value).trim().length || value.length < 8) return false;
    let fulfilledCategories = 0;
    if (/[a-z]/.test(value)) fulfilledCategories++;
    if (/[A-Z]/.test(value)) fulfilledCategories++;
    if (/\d/.test(value)) fulfilledCategories++;
    if (/[!@#$%^&*]/.test(value)) fulfilledCategories++;
    return fulfilledCategories >= 3;
}

export const isValidEIN = (value) => {
    const unmaskedValue = value.replace(/\D/g, '')
    const isValid = /^\d{9}$/.test(unmaskedValue);
    return isValid;
};

export const isValidPhone = (value) => {
    const unmaskedValue = value.replace(/\D/g, '')
    const isValid = /^\d{10,15}$/.test(unmaskedValue);
    return isValid;
}

export const isValidFax = (value) => {
    const unmaskedValue = value.replace(/\D/g, '')
    const isValid = /^\d{10}$/.test(unmaskedValue);
    return isValid;
}

export const isWebsite = (value) => !!(
    value &&
    String(value).trim().length &&
    /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(\S*)$/.test(value)
);

export const isUnique = (value) => {
    const invalidChars = /[^a-zA-Z0-9\-& ]/;
    return !invalidChars.test(value);
}

export const isTaxId = (value, minLengthValue = 0, maxLengthValue = 0) => {
    const taxIdRegex = new RegExp(`^[0-9]{${minLengthValue},${maxLengthValue}}$`);
    return taxIdRegex.test(value);
}

export const isOnlyText = (value) => {
    const invalidChars = /^\D*$/;
    return invalidChars.test(value);
}

export const isInvalidBoundarySpaces = (value) => {
    // Otherwise, check if the string contains spaces only between characters
    const validPattern = /^[^\s][a-zA-Z\s]*[^\s]$/;
    return validPattern.test(value);
}

// Utility function to validate Characters
export const validateCharacters = (value) => {
    const specialCharsRegex = /^[A-Za-z0-9]+$/;
    // Returns true if the string contains any special character
    return specialCharsRegex.test(value);
};


export const isValidZipCode = (rule, value) => {
    const patternData = getPostalCodePattern(value?.countryId);
    if (patternData && patternData.pattern) {
        const isValid = patternData.pattern.test(value?.zipCode);
        const lengthMessage = patternData.minLength === patternData.maxLength ? `${patternData.minLength}`
            : `${patternData.minLength} or ${patternData.maxLength}`;
        return {
            isValid: isValid,
            customMessage: rule.message.replace('{length}', lengthMessage || '')
        };
    } else {
        const lengthMessage = patternData.minLength === patternData.maxLength ? `${patternData.minLength}`
            : `${patternData.minLength} or ${patternData.maxLength}`;
        return {
            isValid: true,
            customMessage: rule.message.replace('{length}', lengthMessage || '')
        };
    }
}

const getPostalCodePattern = (country) => {
    switch (country) {
        case 11: // Argentina: B1234ABC
            return { pattern: /^[A-Za-z]\d{4}[A-Za-z]{3}$/, minLength: 8, maxLength: 8 };
        /**
         * Australia, Switzerland, South Africa, Norway, Denmark, 
         * Belgium, Austria, New Zealand, Hungary, Luxembourg  
         **/
        case 14: case 15: case 22: case 59: case 99:
        case 127: case 158: case 165: case 204: case 214:
            return { pattern: /^\d{4}$/, minLength: 4, maxLength: 4 };
        case 31: // Brazil: 12345-678
            return { pattern: /^\d{5}-\d{3}$/, minLength: 9, maxLength: 9 };
        case 39: // Canada: A1A 1A1
            return { pattern: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/, minLength: 6, maxLength: 7 };
        /**
         * France, Germany, Italy, Spain, Mexico, South Korea, 
         * Finland, Turkey, Saudi Arabia, Malaysia, UAE
         **/
        case 75: case 74: case 82: case 107: case 116: case 194:
        case 207: case 225: case 132: case 142: case 231:
            return { pattern: /^\d{5}$/, minLength: 5, maxLength: 5 };
        /**
         * India, Russia, China, Singapore
         **/
        case 45: case 101: case 182: case 199:
            return { pattern: /^\d{6}$/, minLength: 6, maxLength: 6 };
        case 58: // Czech Republic: 123 45
            return { pattern: /^\d{3}\s?\d{2}$/, minLength: 5, maxLength: 6 };
        case 85: // Greece: 123 45
            return { pattern: /^\d{3}\s?\d{2}$/, minLength: 5, maxLength: 6 };
        case 100: // Iceland: 101
            return { pattern: /^\d{3}$/, minLength: 3, maxLength: 3 };
        case 106: // Israel: 12345 or 1234567
            return { pattern: /^\d{5,7}$/, minLength: 5, maxLength: 7 };
        case 109: // Japan: 123-4567
            return { pattern: /^\d{3}-\d{4}$/, minLength: 8, maxLength: 8 };
        case 135: // Malta: ABC 1234
            return { pattern: /^[A-Za-z]{3}\s?\d{4}$/, minLength: 7, maxLength: 8 };
        case 156: // Netherlands: 1234 AB
            return { pattern: /^\d{4}\s?[A-Za-z]{2}$/, minLength: 6, maxLength: 6 };
        case 176: // Poland: 12-345
            return { pattern: /^\d{2}-\d{3}$/, minLength: 6, maxLength: 6 };
        case 177: // Portugal: 1234-567
            return { pattern: /^\d{4}-\d{3}$/, minLength: 8, maxLength: 8 };
        case 213: // Sweden: 123 45
            return { pattern: /^\d{3}\s?\d{2}$/, minLength: 5, maxLength: 6 };
        case 232: // UK: AA9A 9AA
            return { pattern: /^[A-Za-z]{1,2}\d{1,2}[A-Za-z]?\d[A-Za-z]{2}$/, minLength: 6, maxLength: 8 };
        case 233: // US: 12345 or 12345-6789
            return { pattern: /^\d{5}(-\d{4})?$/, minLength: 5, maxLength: 10 };
        default:
            return { pattern: null, minLength: 5, maxLength: 10 };
    }
};