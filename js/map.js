// Найти неповторяющиеся числа:

const arr = [1, 2, 3, 4, 1, 2]; // [3,4]

const frequencies = (arr) => {
    const freq = new Map();
    let result = [];

    arr.forEach((num) => {
        freq.set(num, (freq.get(num) || 0) + 1);
    });

    for (let [key, value] of freq) {
        if (value === 1) {
            result.push(key);
        }
    }

    return result;
};

console.log(frequencies(arr));

// || -
