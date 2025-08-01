/* 
Написать функцию сложения вида sum(1)(2)(3)...:

function sum(num) {
    //...
}
*/

function sum(num) {
    let currentSum = num;

    function func(newNum) {
        if (newNum === undefined) {
            return currentSum;
        }

        currentSum += newNum;
        return func;
    }

    func.toString = function () {
        return currentSum;
    };

    return func;
}

console.log(sum(1)(2)(3)(4)()); // 10
console.log(sum(1)(2)(3)(4).toString()); // 10

// func.toString переопределён для возврата currentSum, что делает функцию совместимой с alert и console.log в браузере, где toString может вызываться автоматически
