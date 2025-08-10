// Задача с собеседовния

// Каждое значение - курс валюты в конкретный день. Необходимо вывести 2 значения - курс покупки и курс продажи для максимального профита. При этом движение однонаправленное, мы не можем купить за 70 и продать за 130, так как движемся слева направо

const prices = [130, 100, 90, 95, 97, 80, 85, 100, 95, 81, 125, 70];
// const prices = [10, 30, 5, 7, 2, 80, 4, 6];

let buyPrice = prices[0];
let sellPrice = prices[0];

let min = prices[0];
let diff = 0;

prices.forEach((currPrice) => {
    if (currPrice < min) {
        min = currPrice;
    }

    if (currPrice - min > diff) {
        diff = currPrice - min;

        buyPrice = min;
        sellPrice = currPrice;
    }
});

console.log(buyPrice, sellPrice);
