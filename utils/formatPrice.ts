/* eslint-disable no-restricted-globals */
/* eslint-disable no-param-reassign */
export function formatPrice(str: string) {
    // Remove any single quotes (') used as thousand separators
    str = str.replace(/'/g, '');
    // Remove all commas used as thousand separators
    str = str.replace(/,/g, '');
    // Convert to a float and format to 2 decimal places
    const formattedNumber = parseFloat(str)?.toFixed(3) ?? 0;
    // Check if the formatted number is a valid number
    if (isNaN(+formattedNumber)) {
        throw new Error('Invalid number format');
    }

    return formattedNumber;
}
