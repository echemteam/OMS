import { getData } from "../LocalStorage/LocalStorageManager";
//** Lib's */
import { AddressType, ContactType } from "../Enums/commonEnums";
import { ErrorMessage, SuccessMessage } from "../../data/appMessages";
import { FunctionalitiesName } from "../Enums/ApprovalFunctionalities";
//** Service */
import SwalAlert from "../../services/swalService/SwalService";
import ToastService from "../../services/toastService/ToastService";
import { useAddApprovalRequestsMutation } from "../../app/services/commonAPI";

export const useValidateAndAddApprovalRequests = () => {
    // Hook to handle API requests for adding approval requests
    const { success } = SwalAlert();
    const [addApprovalRequest] = useAddApprovalRequestsMutation();

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

                    // If the field value has changed, create an approval request
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
                            // Add the approval request and revert the change in newValue
                            allSuccessful = true;
                            await addApprovalRequest(request);
                            originalValues.newValue[originalKeyName] = oldFieldValue
                        } catch (error) {
                            console.error('Error adding approval request:', error);
                        }
                    }
                } else {
                    ToastService.warning(ErrorMessage.FieldNameNotFound);
                }
            }
        }

        // If all requests were successful, show a success message
        if (allSuccessful) {
            success(SuccessMessage.ApprovalSuccess);
        }

        // Return the updated requestData with normalized values
        return {
            ...requestData,
            newValue: originalValues.newValue,
            oldValue: originalValues.oldValue
        };
    }

    return { ValidateRequestByApprovalRules, getEventName, compareObj };
}