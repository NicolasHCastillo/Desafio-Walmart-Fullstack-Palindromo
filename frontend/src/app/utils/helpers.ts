/**
 * Verify if a string is a numeric
 * @param value 
 * @returns true if NaN, otherwise false
 */
export const checkIsNumber = (value: string): boolean => {
    return value.length && !isNaN(Number(value));
}

/**
 * Verify if a string is a palindrome
 * @param value 
 * @returns true if is a palindrome, otherwise false
 */
export const checkPalindrome = (value: string) => {
    return value && value == value.split('').reverse().join('');
}
