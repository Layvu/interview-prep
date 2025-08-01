// [1, 2, 5, 6, 7, 9, 11, 15] -> 1-2, 5-7, 9, 11, 15

const nums = [1, 2, 5, 6, 7, 9, 11, 15];

function getRanges(nums) {
    let ranges = [];
    let start = nums[0];
    let prev = nums[0];

    for (let i = 1; i <= nums.length; i++) {
        if (i === nums.length || nums[i] - prev > 1) {
            if (start === prev) {
                ranges.push(start);
            } else {
                ranges.push(`${start}-${prev}`);
            }
            start = nums[i];
        }
        prev = nums[i];
    }

    console.log(ranges.join(', '));
}

getRanges(nums);
