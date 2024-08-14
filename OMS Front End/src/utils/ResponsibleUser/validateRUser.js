/**
 * Checks if a user ID is included in a comma-separated string of IDs.
 * @param {string} userIdsString - Comma-separated string of IDs.
 * @param {number} loginUserId - The login user ID to check for.
 * @returns {boolean} - Returns true if the login user ID is included in the string, otherwise false.
 */
export const validateResponsibleUserId = (userIdsString, loginUserId) => {
    if (!userIdsString || !loginUserId) return false;

    const idsArray = userIdsString.split(',').map(id => id.trim());
    return idsArray.includes(loginUserId);
}