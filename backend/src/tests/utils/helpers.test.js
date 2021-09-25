import { checkPalindrome } from '../../utils/helpers';

describe('Palindrome', () => {

    const validPalindrome = 'anitalavalatina';
    const notValidPalindrome = 'noesunpalindromo';

    test('Should validate a valid palindrome', () => {
        const result = checkPalindrome(validPalindrome);
        expect(result).toBe(true);
    });

    test('Should validate a not valid palindrome', () => {
        const result = checkPalindrome(notValidPalindrome);
        expect(result).toBe(false)
    });

});