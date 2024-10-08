/* Component  */
import {
  compare, email, number, required, uniqueIdentifier, isvalidPassword, maxLength, minLength, maxProspects, minEndDate, maxSum, distinct, isValidEIN,
  isValidPhone, isValidFax, isUnique, isInvalidBoundarySpaces, isWebsite, isTaxId, isOnlyText, isValidZipCode, validateCharacters
} from './ValidateField'

// Validation functions 

export function ValidateAll(state, rules) {
  let result = {
    isValid: true,
    error: {}
  }
  let keys = Object.keys(rules);
  let error = {};
  keys.forEach(key => {
    let fieldRules = rules[key]
    let validateResult = ValidateField(state[key], fieldRules, state);
    if (!validateResult.isvalid) {
      result.isValid = false;
      error[key] = validateResult.message;
    }
  });
  result.error = error;
  return result;
}

export function Validate(state, rules, key) {
  let result = {
    isValid: true,
    error: {}
  }
  let error = {};
  let fieldRules = rules[key]
  let validateResult = ValidateField(state[key], fieldRules, state);
  if (!validateResult.isvalid) {
    result.isValid = false;
    error[key] = validateResult.message;
  }
  result.error = error;
  return result;
}

export function ValidateField(value, fieldRules, state) {
  const result = { isvalid: true, message: '' };

  for (const rule of fieldRules) {
    if (!result.isvalid) break; // Exit early if already invalid

    const validator = getValidator(rule.type);

    const validationResponse = validator && validator(value, rule, state);

    if (validator && !validationResponse) {
      result.isvalid = false;
      result.message = rule.message;
    } else if (!validationResponse.isValid && validationResponse.customMessage) {
      result.isvalid = false;
      result.message = validationResponse.customMessage;
    }
  }

  return result;
}

const validators = {
  require: (value) => required(value),
  email: (value) => email(value),
  password: (value) => isvalidPassword(value),
  compare: (value, rule, state) => compare(value, state[rule.compareEle]),
  distinct: (value, rule, state) => distinct(value, state[rule.distinctEle]),
  number: (value) => number(value),
  uniqueIdentifier: (value) => uniqueIdentifier(value),
  maxLength: (value, rule) => maxLength(value, rule.maxLength),
  minLength: (value, rule) => minLength(value, rule.minLength),
  maxProspects: (value, rule) => maxProspects(value, rule.maxProspects),
  minEndDate: (value, rule) => minEndDate(value, rule.minEndDate),
  maxSum: (value, rule) => maxSum(value, rule.maxSum),
  validEIN: (value) => isValidEIN(value),
  validPhone: (value) => isValidPhone(value),
  validFax: (value) => isValidFax(value),
  uniqueName: (value) => isUnique(value),
  invalidBoundarySpaces: (value) => isInvalidBoundarySpaces(value),
  website: (value) => isWebsite(value),
  taxId: (value) => isTaxId(value),
  onlyText: (value) => isOnlyText(value),
  validZipCode: (value, rule, state) => isValidZipCode(rule, state),
  validateCharacters: (value) => validateCharacters(value),
};

const getValidator = (type) => {
  return validators[type] || null;
};
