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

export const isvalidPassword = (value) => !!(value && String(value).trim().length && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,})/.test(value));

// export const isWebsite = (value) => !!(value && String(value).trim().length && /^(https?|ftp):\/\/(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(\S*)$/.test(value));

export const isWebsite = (value) => !!(
    value &&
    String(value).trim().length &&
    /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(\S*)$/.test(value)
);

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

export const invalidBoundarySpaces = (value) => {
    // Otherwise, check if the string contains spaces only between characters
    const validPattern = /^[^\s][a-zA-Z\s]*[^\s]$/;
    return validPattern.test(value);
}

export const isValidZipCode = (value) => {
    const patternData = getPostalCodePattern(value?.countryId);
    if (patternData && patternData.pattern) {
        const isValid = patternData.pattern.test(value?.zipCode);
        return { isValid: isValid, maxLength: patternData.maxLength };
    } else {
        return { isValid: true, maxLength: patternData.maxLength };
    }
}

const getPostalCodePattern = (country) => {
    switch (country) {
        case 11:
            return { pattern: /^[A-Za-z]\d{4}[A-Za-z]{3}$/, maxLength: 8 }; // Argentina: B1234ABC
        /**
            * Australia, Switzerland, South Africa, Norway, Denmark, 
            * Belgium, Austria, New Zealand, Hungary, Luxembourg  
        **/
        case 14: case 15: case 22: case 59: case 99:
        case 127: case 158: case 165: case 204: case 214:
            return { pattern: /^\d{4}$/, maxLength: 4 };
        case 31:
            return { pattern: /^\d{5}-\d{3}$/, maxLength: 9 }; // Brazil: 12345-678
        case 39:
            return { pattern: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/, maxLength: 7 }; // Canada: A1A 1A1
        /**
            * France, Germany, Italy, Spain, Mexico, South Korea, 
            * Finland, Turkey, Saudi Arabia, Malaysia, United Arab Emirates
        **/
        case 75: case 74: case 82: case 107: case 116: case 194:
        case 207: case 225: case 132: case 142: case 231:
            return { pattern: /^\d{5}$/, maxLength: 5 };
        /**
            * India, Russia, China, Singapore
        **/
        case 45: case 101: case 182: case 199:
            return { pattern: /^\d{6}$/, maxLength: 6 };
        case 58:
            return { pattern: /^\d{3}\s?\d{2}$/, maxLength: 6 }; // Czech Republic: 123 45
        case 85:
            return { pattern: /^\d{3}\s?\d{2}$/, maxLength: 6 }; // Greece: 123 45
        case 100:
            return { pattern: /^\d{3}$/, maxLength: 3 }; // Iceland: 101
        case 106:
            return { pattern: /^\d{5,7}$/, maxLength: 7 }; // Israel: 12345 or 1234567
        case 109:
            return { pattern: /^\d{3}-\d{4}$/, maxLength: 8 }; // Japan: 123-4567
        case 135:
            return { pattern: /^[A-Za-z]{3}\s?\d{4}$/, maxLength: 8 }; // Malta: ABC 1234
        case 156:
            return { pattern: /^\d{4}\s?[A-Za-z]{2}$/, maxLength: 6 }; // Netherlands: 1234 AB
        case 176:
            return { pattern: /^\d{2}-\d{3}$/, maxLength: 6 }; // Poland: 12-345
        case 177:
            return { pattern: /^\d{4}-\d{3}$/, maxLength: 8 }; // Portugal: 1234-567
        case 213:
            return { pattern: /^\d{3}\s?\d{2}$/, maxLength: 6 }; // Sweden: 123 45
        case 232:
            return { pattern: /^[A-Za-z]{1,2}\d{1,2}[A-Za-z]?\d[A-Za-z]{2}$/, maxLength: 8 }; // UK: AA9A 9AA
        case 233: //** US
            return { pattern: /^\d{5}(-\d{4})?$/, maxLength: 10 }; // USA: 12345 or 12345-6789
        default:
            return { pattern: null, maxLength: 10 }; // Default length 
    }
};