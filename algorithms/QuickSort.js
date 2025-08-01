const nums = [2, 3, 4, 7, 2, 1, 8, 5, 3];

const swap = (nums, i, j) => {
    [nums[i], nums[j]] = [nums[j], nums[i]];
};

const partitions3 = (l, r) => {
    const pivot = Math.floor(Math.random() * (r - l) + l);
    let m1 = l;
    let m2 = l;

    for (let i = l; i < r; i++) {
        if (nums[i] < pivot) {
            swap(nums, i, m2);
            swap(nums, m2, m1);
            m1++;
            m2++;
        } else if (nums[i] === pivot) {
            swap(nums, i, m2);
            m2++;
        }
    }

    return [m1, m2];
};

const sort = (l, r) => {
    if (r - l <= 1) return;

    [m1, m2] = partitions3(l, r);
    sort(l, m1);
    sort(m2, r);
};

sort(0, nums.length);

console.log(nums);
