// Определите порядок вывода в консоль

setTimeout(function timeout() {
    console.log('Таймаут');
}, 0); // добавится в Microtask Queue после истечения таймера

let p = new Promise(function (resolve, reject) {
    console.log('Создание промиса');
    resolve();
});

// когда Promise разрешён, добавляет коллбэк из .then в Microtask Queue
p.then(function () {
    console.log('Обработка промиса');
});

console.log('Конец скрипта');

// resolve() разрешает Promise немедленно. Это означает, что все обработчики, зарегистрированные через p.then, будут добавлены в Microtask Queue для выполнения после синхронного кода.

// Т.е. по сути мы идём сверху вниз, setTimeout изначально ждёт время, дальше смотрим let p, синхронно обрабатываем создание промиса и резолвим его. Далее синхронно обрабатываем p.then, не ждём, т.к. зарезолвлен, закидываем коллбэк из .then в Microtask Queue. Далее синхронный код вывода в консоль 'Конец скрипта'. Далее разбираем микротаски, выводим 'Обработка промиса' и далее макротаски - 'Таймаут'

// Создание промиса
// Конец скрипта
// Обработка промиса
// Таймаут

// Задача с собеса в банк:
console.log(1);

setTimeout(() => console.log(2));

Promise.reject(3).catch(console.log);

new Promise((resolve) => setTimeout(resolve)).then(() => console.log(4));

Promise.resolve(5).then(console.log);

console.log(6);

setTimeout(() => console.log(7), 0);

// 1 6 3 5 2 4 7

console.log(1);

setTimeout(() => console.log(2));

Promise.resolve().then(() => console.log(3));

Promise.resolve().then(() => setTimeout(() => console.log(4)));

Promise.resolve().then(() => console.log(5));

setTimeout(() => console.log(6));

console.log(7);

// 1 7 3 5 2 6 4

function* generator() {
    yield new Promise((resolve) => {
        setTimeout(() => {
            console.log('Generator timeout');
            resolve();
        }, 0);
    });
}

async function asyncFunction() {
    console.log('Async start');
    await generator().next().value; // интересный момент - await получает Promise и приостанавливает выполнение asyncFunction, пока Promise не разрешится
    console.log('After generator'); // добавляется в Microtask Queue, чтобы выполниться после разрешения Promise
}

asyncFunction();

console.log('Main thread');

// Async start
// Main thread
// Generator timeout
// After generator

document.getElementById('button').addEventListener('click', () => {
    console.log('Button clicked');
    setTimeout(() => {
        console.log('Timeout after click');
    }, 0);
});

setTimeout(() => {
    console.log('Initial timeout');
    document.getElementById('button').click();
}, 0);

// Initial timeout
// Button clicked
// Timeout after click

function recursivePromise(n) {
    if (n <= 0) return Promise.resolve();
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Recursive ${n}`);
            recursivePromise(n - 1).then(resolve);
        }, 0);
    });
}

recursivePromise(3);

console.log('Outside recursion');

// Outside recursion
// Recursive 3
// Recursive 2
// Recursive 1

function fetchData(url) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Fetched data from ${url}`);
            resolve(url);
        }, Math.random() * 1000);
    });
}

Promise.all([
    fetchData('https://api.example.com/data1'),
    fetchData('https://api.example.com/data2'),
    fetchData('https://api.example.com/data3'),
]).then((results) => {
    console.log('All data fetched:', results);
});

console.log('Starting fetches');

// Starting fetches
// Fetched data from ... (в случайном порядке)
// ll data fetched: [...]

console.log('Start');

setTimeout(() => {
    console.log('Timeout 1');
    Promise.resolve().then(() => console.log('Promise inside Timeout 1'));
}, 0);

Promise.resolve()
    .then(() => {
        console.log('Promise 1');
        setTimeout(() => console.log('Timeout inside Promise 1'), 0);
        queueMicrotask(() => console.log('Microtask inside Promise 1'));
    })
    .then(() => console.log('Promise 2'));

setTimeout(() => console.log('Timeout 2'), 0);

console.log('End');

// Start
// End
// Promise 1
// Microtask inside Promise 1
// Promise 2
// Timeout 1
// Promise inside Timeout 1
// Timeout 2
// Timeout inside Promise 1

setTimeout(() => {
    console.log('Timeout 1');
    Promise.resolve().then(() => {
        console.log('Promise in timeout');
    });
}, 0);

Promise.resolve().then(() => {
    console.log('First promise');
    Promise.resolve().then(() => {
        console.log('Second promise');
    });
});

console.log('Start');

// Start
// First promise
// Second promise
// Timeout 1
// Promise in timeout
