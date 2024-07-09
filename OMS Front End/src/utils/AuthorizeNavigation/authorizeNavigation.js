// // Import the `getData` function from 'LocalStorageManager' to get security permission data.
import { getData } from '../LocalStorage/LocalStorageManager';

// /**
//  * Checks if a user has permission based on a security key.
//  * @param {string} securityKey - The security key to check for permission.
//  * @returns {boolean} - `true` if the user has permission, `false` otherwise.
//  */
export const hasPermission = (securityKey) => {
    // Retrieve security permission data from local storage, or initialize as an empty array if not found.
    const permissionData = getData("SecurityPermission") || [];

    // Assign the security permissions to the `securityPermission` variable.
    const securityPermission = permissionData;

    // Initialize `obj` with `securityPermission`, or `null` if it's falsy.
    const permissionList = securityPermission ? securityPermission : null;

    // Call the `findKeyByKeyName` function to check if the security key exists.
    const hasAccess = securityPermission ? findKeyByKeyName(permissionList, securityKey) : false;

    return hasAccess; // Return the result of the check.
}

// /**
//  * Finds a security key in the security permission data and checks if the user has permission.
//  * @param {Object} obj - The object containing security permission data.
//  * @param {string} targetSecurityKeyName - The security key to search for.
//  * @returns {boolean} - `true` if the user has permission, `false` otherwise.
//  */
function findKeyByKeyName(obj, targetSecurityKeyName) {
    if (!obj) {
        return false; // If `obj` is not available, return `false`.
    }

    // Find the security permission with the specified key.
    const foundItem = obj.securityPermissions?.find(item =>
        item.securityKeyName === targetSecurityKeyName
    );

    if (foundItem) {
        // Check the security setting ID and return `true` for certain values.
        switch (foundItem.securitySettingId) {
            case 1:
                return true;
            case 2:
                return false;
            case 6:
                return true;
            default:
                return false;
        }
    } else {
        return false; // If no matching security key is found, return `false`.
    }
}

// /**
//  * Checks if a user has permission based on a security key.
//  * @param {string} securityKey - The security key to check for permission.
//  * @returns {boolean} - `true` if the user has permission.
//  */
export const hasFunctionalPermission = (securityKey) => {

    const permissionData = getData("SecurityPermission") || [];

    const securityPermission = permissionData;

    const permissionList = securityPermission ? securityPermission : null;

    const hasAccessforPage = securityPermission ? checkPermissionAtFunctional(permissionList, securityKey) : false;
    return hasAccessforPage;

}

// /**
//  * Finds a security key in the security permission data and checks if the user has permission.
//  * @param {Object} obj - The object containing security permission data.
//  * @param {string} targetSecurityKeyName - The security key to search for.
//  * @returns {Object} - `foundItem Object` if the user has permission, `null` otherwise.
//  */
function checkPermissionAtFunctional(obj, targetSecurityKeyName) {

    let permissionObj = {
        isViewOnly: false,
        isEditable: false,
        hasAccess: false
    }

    if (!obj) {
        return null;
    };

    const foundItem = obj.securityPermissions?.find(item =>
        item.securityKeyName === targetSecurityKeyName
    );

    if (foundItem) {
        switch (foundItem.securitySettingId) {
            case 1:
                return { ...permissionObj, hasAccess: true };
            case 2:
                return { ...permissionObj, hasAccess: false };
            case 3:
                return { ...permissionObj, isViewOnly: true };
            case 4:
                return { ...permissionObj, isEditable: true };
            case 5:
                return { ...permissionObj, hasAccess: false };
            case 6:
                return { ...permissionObj, hasAccess: false };
            default:
                return permissionObj;
        }
    }
    else {
        return null;
    }
}