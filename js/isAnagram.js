/*
Напишите функцию, проверяющую, являются ли две строки анаграммами друг друга (регистр букв не имеет значения). Важны только символы, пробелы или знаки препинания не учитываются:
*/

function isAnagram(str1, str2) {
    const cleanStr1 = str1.toLowerCase().replace(/[^a-z]/g, '');
    const cleanStr2 = str2.toLowerCase().replace(/[^a-z]/g, '');

    if (cleanStr1.length !== cleanStr2.length) return false;

    const charMap = new Map();

    for (let char of cleanStr1) {
        charMap.set(char, (charMap.get(char) || 0) + 1);
    }

    for (let char of cleanStr2) {
        if (!charMap.has(char)) return false;

        charMap.set(char, charMap.get(char) - 1);

        if (charMap.get(char) === 0) charMap.delete(char);
    }

    return charMap.size === 0;
}

console.log(isAnagram('finder', 'Friend')); // true
console.log(isAnagram('hello', 'bye')); // false
console.log(isAnagram('helll', 'hleee')); // false
