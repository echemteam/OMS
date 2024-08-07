import { getData } from "../LocalStorage/LocalStorageManager";
//** Service */
import { useAddApprovalRequestsMutation } from "../../app/services/commonAPI";

export const useValidateAndAddApprovalRequests = () => {
    // Hook to handle API requests for adding approval requests
    const [addApprovalRequest] = useAddApprovalRequestsMutation();

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

        // Destructure and provide default values for requestData properties
        const { functionalityName = '', newValue = {}, oldValue = {} } = requestData;

        // Filter the approval rules to only include those relevant to the given functionality
        const relevantRules = approvalRulesList.filter(rule => rule.functionalityName === functionalityName);

        // If no relevant rules are found, return the original requestData
        if (!relevantRules.length) return requestData;

        // Normalize field names to lowercase for both newValue and oldValue
        const normalize = obj => Object.fromEntries(Object.entries(obj).map(([key, value]) => [key.toLowerCase(), value]));
        const newValueNormalized = normalize(newValue);
        const oldValueNormalized = normalize(oldValue);

        // Process each approval rule
        for (const rule of relevantRules) {
            const { fieldName, moduleId, functionalityId, tableId, functionalitiesFieldId, functionalityEventId } = rule;

            // Check if the rule specifies a field name to validate
            if (fieldName) {
                const normalizedFieldName = fieldName.toLowerCase();
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
                        await addApprovalRequest(request);
                        newValueNormalized[normalizedFieldName] = oldFieldValue; // Revert change in newValue
                    } catch (error) {
                        console.error('Error adding approval request:', error);
                    }
                }
            } else {
                console.log('No fieldName property found in this rule');
            }
        }

        // Return the updated requestData with normalized values
        return {
            ...requestData,
            newValue: newValueNormalized,
            oldValue: oldValueNormalized
        };
    }

    return { ValidateRequestByApprovalRules };
}