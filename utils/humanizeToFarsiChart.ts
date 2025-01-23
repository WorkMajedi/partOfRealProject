const numeral = require('numeral');

/**
 * Accept a number greater than 999 and return (e.g. 1.2m) string
 *
 * @param num
 */

export function humanizeToEnglish(num: number | string) {
    if (typeof num !== 'number') {
        return num;
    }

    if (Math.abs(num) < 1000) {
        return num;
    }

    return numeral(num).format('0a');
}
