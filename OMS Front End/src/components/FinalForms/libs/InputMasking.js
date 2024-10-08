
export const localStringToNumber = (s) => {
    return Number(String(s).replace(/[^0-9.,-]+/g, ""));
};



function formatCurrency(value) {
        
    // Remove the dollar sign and split the value and format
    if (value === "" || value === null || value === undefined) {
        return "";
    }

    const valueStr = String(value); // Ensure the value is a string

    // Remove the dollar sign and split the value and format
    const values = valueStr.replace(/[$,%]/g, '');
    let [leftPart, rightPart] = values.split('.');
     // Count the number of underscores in the original input for both parts
    const originalLeftLength = leftPart.length;
     const originalRightLength = rightPart ? rightPart.length : 0;
      // Replace any remaining underscores with '0'
      leftPart = leftPart.replace(/_/g, '');
      rightPart = rightPart ? rightPart.replace(/_/g, '') : '';

    // Pad the left part with leading zeros to match the original length
if (leftPart.length < originalLeftLength) {
    leftPart = leftPart.padStart(originalLeftLength, '0');
}

// Pad the right part with trailing zeros to match the original length
if (rightPart.length < originalRightLength) {
    rightPart = rightPart.padEnd(originalRightLength, '0');
}

return `${leftPart}.${rightPart}`;
    
}


export function formatNumberInput(input, mask) {

    // debugger;
    let cleanInput = formatCurrency(input);
    if(cleanInput==="")
    {
        return  input;
    }
    let formattedValue = '';
    let inputIndex = 0;

    // Iterate over the mask and replace underscores with input digits
    for (let i = 0; i < mask.length; i++) {
        if (mask[i] === '_' ||  mask[i] === '.') {
            if (inputIndex < cleanInput.length) {
                formattedValue += cleanInput[inputIndex];
                inputIndex++;
            } else {
                formattedValue += '0'; // Pad with '0' if input is shorter
            }
        } else {
            formattedValue += mask[i]; // Add the mask character as is
        }
    }

    return formattedValue;
}

export function formatMaskedInput(input, mask) {
    let cleanInput = input.replace(/[^0-9]/g, ''); // Keep only digits
    let formattedValue = '';
    let inputIndex = 0;

    // Iterate over the mask and replace underscores with input digits
    for (let i = 0; i < mask.length; i++) {
        if (mask[i] === '_') {
            if (inputIndex < cleanInput.length) {
                formattedValue += cleanInput[inputIndex];
                inputIndex++;
            } else {
                formattedValue += '0'; // Pad with '0' if input is shorter
            }
        } else {
            formattedValue += mask[i]; // Add the mask character as is
        }
    }

    return formattedValue;
}


export function unmaskValue(maskedValue, placeholder = "0") {
    // Replace placeholders with the specified value
    let filledValue = maskedValue.replace(/_/g, placeholder);

    // Remove any characters that are not digits or a period (.)
    let numericString = filledValue.replace(/[^\d\.]/g, "");

    // Convert the cleaned string to a number
    let numericValue = parseFloat(numericString);

    // Return the numeric value (or NaN if the conversion fails)
    return isNaN(numericValue) ? null : numericValue;
}