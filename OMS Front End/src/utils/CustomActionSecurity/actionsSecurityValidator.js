/**
 * @param {Object[]} customAction - The list of custom actions.
 * @param {string} actionName - The name of the action to check or modify.
 * @param {boolean} hasAccess - Indicates whether access should be granted.
 */
export const securityValidator = (hasAccess, customAction, actionName) => {

    //** This Check is action is exist in our customeAction configuration  */
    const customActionExist = customAction && customAction?.some(action => action?.name === actionName);

    /** This Check is action is exist in our customeAction configuration  */
    const checkActionExistOnConfiguration = customAction && customAction?.some(action => action?.name === actionName);

    if (customActionExist && hasAccess === false) {
        // EX: Remove the blocked action if it exists
        customAction = customAction?.filter(action => action?.name !== actionName);
    } else {
        // EX: Add the blocked action if it does not exist
        if (!customActionExist && checkActionExistOnConfiguration) {
            customAction = [
                ...(customAction || []),
                customAction.find(action => action?.name === actionName)
            ];
        }
    }
    return customAction;
}