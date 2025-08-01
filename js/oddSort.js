// Нечётные числа должны отсортироваться по возрастанию, а чётные должны остаться на своих местах:

// const nums = [1, 9, 4, 2, 3, 6, 7, 1, 5]; // [1,1,4,2,3,6,5,7,9]
const nums = [2, 3, 4, 7, 2, 1, 8, 5, 3]; // [2, 1, 4, 3, 2, 3, 8, 5, 7]

let oddNumbers = [];
let oddIndices = [];

nums.forEach((num, i) => {
    if (num % 2 !== 0) {
        oddNumbers.push(nums[i]);
        oddIndices.push(i);
    }
});

oddNumbers.sort((a, b) => a - b); // !
oddIndices.forEach((index, i) => (nums[index] = oddNumbers[i]));

console.log(nums);
