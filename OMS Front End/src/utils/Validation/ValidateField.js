import React from 'react';
import validator from 'validator';

export const required = (value) => value !== undefined && value !== null && String(value).trim() !== '';

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

export const isvalidPassword = (value) => !!(value && String(value).trim().length && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{12,})/.test(value));

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