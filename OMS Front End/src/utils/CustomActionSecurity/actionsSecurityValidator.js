/**
 * Checks if a user ID is included in a comma-separated string of IDs.
 * @param {Object} actionColumn - The column actions object.
 * @param {Object} actionColumn.defaultAction - The default actions object.
 * @param {Object[]} actionColumn.customAction - The list of custom actions.
 * @param {string} actionName - The name of the action to check or modify.
 * @param {boolean} hasAccess - Indicates whether access should be granted.
 * @param {Object[]} actions - List of available actions.
 * @param {string} actions.name - The name of the action.
 */
export const securityValidator = (hasAccess, customAction, actionName) => {
    if (hasAccess === false) {
        // Remove the blocked action if it exists
        customAction = customAction?.filter(action => action?.name !== actionName);
    } else {
        // Add the blocked action if it does not exist
        if (!customAction?.some(action => action?.name === actionName)) {
            customAction = [
                ...(customAction || []),
                customAction.find(action => action?.name === actionName)
            ];
        }
    }
    return customAction;
}