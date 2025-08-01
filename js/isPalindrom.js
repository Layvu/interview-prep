// Написать функцию, которая будет возвращать true если строка (слово) является палиндромом, иначе false:

/*
isPalindrom('казак'); // true
isPalindrom('строка'); // false
isPalindrom('шалаш'); // true
*/

function isPalindrom(str) {
    const len = str.length;

    for (let i = 0; i < len / 2; i++) {
        if (str[i] !== str[len - 1 - i]) {
            return false;
        }
    }
    return true;
}

console.log(isPalindrom('казак') === true);
console.log(isPalindrom('строка') === false);
console.log(isPalindrom('шалаш') === true);

console.log(isPalindrom('шалаша') === false);
console.log(isPalindrom('аааааа') === true);
console.log(isPalindrom('a') === true);
