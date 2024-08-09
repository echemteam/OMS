export const renderMaskedColumn = (rowData, col) => {
    const phoneNumber = rowData[col.fieldName];
    if (!phoneNumber) return "";

    // Remove non-digit characters
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');

    // Determine which format to use based on the length
    if (cleaned.length === 10) {
        return formatPhoneNumber(cleaned, col?.colSettings?.maskFormat);
    } else if (cleaned.length > 10 && cleaned.length <= 15) {
        // Adjust the length as needed
        // Generate an extended format with the correct number of placeholders
        const extraDigits = cleaned.length - 10;
        const baseExtendedFormat = "(###) ###-#### x ";
        const extraPlaceholder = "#".repeat(extraDigits);
        const extendedFormat = baseExtendedFormat + extraPlaceholder;
        return formatPhoneNumber(cleaned, extendedFormat);
    } else {
        return phoneNumber; // Return the original number if it doesn't match any expected format length
    }
}

function formatPhoneNumber(phoneNumber, format) {
    let formatted = format;
    for (const element of phoneNumber) {
        formatted = formatted.replace('#', element);
    }
    return formatted;
}
