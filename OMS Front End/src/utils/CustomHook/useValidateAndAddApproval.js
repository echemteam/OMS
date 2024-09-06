import { getData } from "../LocalStorage/LocalStorageManager";
//** Lib's */
import { AddressType, ContactType } from "../Enums/commonEnums";
import { ErrorMessage, SuccessMessage } from "../../data/appMessages";
import { FunctionalitiesName } from "../Enums/ApprovalFunctionalities";
//** Service */
import SwalAlert from "../../services/swalService/SwalService";
import ToastService from "../../services/toastService/ToastService";
import { useAddApprovalRequestsMutation } from "../../app/services/commonAPI";
import { useCheckFieldValueExistsMutation } from "../../app/services/ApprovalAPI";
import { useState } from "react";

const fieldValidationMapping = {
    [FunctionalitiesName.CUSTOMERUPDATE]: ['TaxId', 'Name']
    // [FunctionalitiesName.SUPPLIERADDADDRESS]: ['Email']
};

export const useValidateAndAddApprovalRequests = () => {
    // Hook to handle API requests for adding approval requests
    const { success, warning } = SwalAlert();
    const [isApprovelLoading, setIsApprovelLoading] = useState(false);

    const [addApprovalRequest] = useAddApprovalRequestsMutation();
    const [checkFieldValueExists] = useCheckFieldValueExistsMutation();


    /**
     * Validates and processes request data based on approval rules.
     * 
     * @param {Object} requestData - The data to be validated and processed. Should include:
     *   - newValue: An object representing the new values.
     *   - oldValue: An object representing the old values.
     *   - functionalityName: A string representing the name of the functionality.
     * 
     * @returns {Object} - The updated requestData object with normalized values.
    */
    const ValidateRequestByApprovalRules = async (requestData) => {
        setIsApprovelLoading(true); // Start loader

        // Retrieve approval rules from local storage
        const approvalRulesList = getData("approvalRules") || [];

        // If no approval rules List are found, return the original requestData
        if (!approvalRulesList.length) return requestData;

        // Destructure and provide default values for requestData properties
        const { eventName = '', newValue = {}, oldValue = {} } = requestData;

        // Filter the approval rules to only include those relevant to the given functionality
        const relevantRules = approvalRulesList.filter(rule => rule.eventName === eventName);

        // If no relevant rules are found, return the original requestData
        if (!relevantRules.length) return requestData;

        const { newValueNormalized, oldValueNormalized, originalValues } = normalizeValues(newValue, oldValue);

        if (requestData.isFunctionalObjMatch) {
            const isEqual = compareObj(newValue, oldValue);
            if (isEqual) {
                return requestData;
            }
        }

        let allSuccessful = false; // Flag to track if all requests are successful
        let FieldValueResponse = []; // Store the fields level messages

        // Process each approval rule
        for (const rule of relevantRules) {
            const { fieldName, moduleId, functionalityId, tableId, functionalitiesFieldId, functionalityEventId, isFunctional } = rule;

            if (isFunctional) {
                const request = {
                    moduleId,
                    functionalityId,
                    tableId,
                    functionalitiesFieldId,
                    functionalityEventId,
                    oldValue: JSON.stringify(originalValues.oldValue),
                    newValue: JSON.stringify(originalValues.newValue)
                };

                try {
                    // Add the approval request and revert the change in newValue
                    await addApprovalRequest(request);
                    allSuccessful = true;
                } catch (error) {
                    console.error('Error adding approval request:', error);
                }
            } else if (!isFunctional) {
                // Check if the rule specifies a field name to validate
                if (fieldName) {
                    const normalizedFieldName = fieldName.toLowerCase();
                    const originalKeyName = findOriginalKey(normalizedFieldName, originalValues.newValue);
                    const newFieldValue = newValueNormalized[normalizedFieldName];
                    const oldFieldValue = oldValueNormalized[normalizedFieldName];

                    if (newFieldValue !== oldFieldValue) {
                        const request = {
                            moduleId,
                            functionalityId,
                            tableId,
                            functionalitiesFieldId,
                            functionalityEventId,
                            oldValue: JSON.stringify(oldValueNormalized),
                            newValue: JSON.stringify(newValueNormalized)
                        };
                        try {
                            const fieldsToValidate = fieldValidationMapping[eventName] || [];
                            const shouldValidate = fieldsToValidate.includes(fieldName);

                            if (shouldValidate) {
                                // Validate field value
                                const response = await checkFieldValueExists({ fieldName: originalKeyName, fieldValue: newFieldValue });
                                if (!response.data.exist) {
                                    allSuccessful = true;
                                    await addApprovalRequest(request);
                                }
                                originalValues.newValue[originalKeyName] = oldFieldValue;
                                let req = {
                                    fieldName: originalKeyName,
                                    errorMessage: response.data.errorMessage,
                                    isExist: response.data.exist
                                }
                                FieldValueResponse.push(req);
                            } else {
                                // For other fields, add the approval request directly
                                allSuccessful = true;
                                await addApprovalRequest(request);
                                originalValues.newValue[originalKeyName] = oldFieldValue;
                            }
                        } catch (error) {
                            ToastService.warning(error);
                        }
                    }
                } else {
                    ToastService.warning(ErrorMessage.FieldNameNotFound);
                }
            }
        }

        let finalMessage = "";

        // If all requests were successful, show a success message
        if (allSuccessful) {
            if (FieldValueResponse.some(data => data.isExist === true)) {
                finalMessage = processFieldValueResponse(FieldValueResponse);
                finalMessage && warning(finalMessage);
            } else {
                success(SuccessMessage.ApprovalSuccess);
            }
        } else {
            if (FieldValueResponse.some(data => data.isExist === true)) {
                finalMessage = processFieldValueResponse(FieldValueResponse);
                finalMessage && warning(finalMessage);
            }
        }

        setIsApprovelLoading(false); // End loader

        // Return the updated requestData with normalized values
        return {
            ...requestData,
            newValue: originalValues.newValue,
            oldValue: originalValues.oldValue,
            isallSuccessful: allSuccessful
        };
    }
    // Utility function to deep compare two objects
    const compareObj = (obj1, obj2) => {
        const { newValueNormalized, oldValueNormalized } = normalizeValues(obj1, obj2, true);
        return JSON.stringify(newValueNormalized) === JSON.stringify(oldValueNormalized);
    };
    const normalizeValues = (newValue, oldValue, isStrictEquality) => {
        // Recursive function to normalize keys and values
        const normalize = obj => {
            if (Array.isArray(obj)) {
                return obj.map(item => normalize(item)); // Normalize each item in the array
            } else if (obj && typeof obj === 'object') {
                return Object.fromEntries(
                    Object.entries(obj).map(([key, value]) => [
                        key.toLowerCase(), typeof value === 'object' ? normalize(value) : isStrictEquality ? String(value) : value
                    ])
                );
            } else {
                return obj;
            }
        };
        // const normalize = obj => Object.fromEntries(Object.entries(obj).map(([key, value]) => [key.toLowerCase(), String(value)]));
        const newValueNormalized = newValue ? normalize(newValue) : newValue;
        const oldValueNormalized = oldValue ? normalize(oldValue) : oldValue;
        return { newValueNormalized, oldValueNormalized, originalValues: { newValue, oldValue } }
    }
    const getEventName = (id, isEdit, functionalityName) => {
        const getAddressEventName = () => {
            if (id === AddressType.BILLING.toString()) {
                return isEdit ? FunctionalitiesName.UPDATECUSTOMERBILLINGADDRESS : FunctionalitiesName.ADDCUSTOMERBILLINGADDRESS;
            } else if (id === AddressType.SHIPPING.toString()) {
                return isEdit ? FunctionalitiesName.UPDATECUSTOMERSHIPPINGADDRESS : FunctionalitiesName.ADDCUSTOMERSHIPPINGADDRESS;
            }
        };

        const getContactEventName = () => {
            if (id.toString() === ContactType.INVOICESUBMISSION.toString()) {
                return isEdit ? FunctionalitiesName.UPDATECUSTOMERINVOICESUBMISSIONCONTACT : FunctionalitiesName.ADDCUSTOMERINVOICESUBMISSIONCONTACT;
            } else if (id.toString() === ContactType.INVOICEFOLLOWUP.toString()) {
                return isEdit ? FunctionalitiesName.UPDATECUSTOMERINVOICEFOLLOWUPCONTACT : FunctionalitiesName.ADDCUSTOMERINVOICEFOLLOWUPCONTACT;
            }
        };

        switch (functionalityName) {
            case "AddEditAddressCustomer":
                return getAddressEventName();
            case "AddEditContactCustomer":
                return getContactEventName();
            default:
                return null;
        }
    };
    // Utility function to find the original key by normalized key
    const findOriginalKey = (normalizedKey, obj) => {
        return Object.keys(obj).find(key => key.toLowerCase() === normalizedKey);
    };

    const processFieldValueResponse = (response) => {
        const findExistFields = response.filter(data => data.isExist === true);
        const findNonExistFields = response.filter(data => data.isExist === false);

        let message = '';
        if (findNonExistFields.length > 0) {
            const nonExistFieldsNames = getFieldNames(findNonExistFields);
            message = SuccessMessage.FieldsApprovalSuccess.replace("{0}", nonExistFieldsNames);
        }
        if (findExistFields.length > 0) {
            const existFieldsNames = getFieldNames(findExistFields);
            message = message !== '' ? message + " and " + SuccessMessage.FieldsApprovalExists.replace("{0}", existFieldsNames) :
                SuccessMessage.FieldsApprovalExists.replace("{0}", existFieldsNames);
        }
        return message;
    };

    const getFieldNames = (fields) => {
        if (fields.length > 0) {
            const fieldNames = fields.map(data => data.fieldName);
            return fieldNames.length > 1
                ? fieldNames.slice(0, -1).join(', ') + ' and ' + fieldNames.slice(-1)
                : fieldNames[0];
        }
        return '';
    };

    return { ValidateRequestByApprovalRules, getEventName, compareObj, isApprovelLoading };
}