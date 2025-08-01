/*
for..in - перебирает ключи (свойства) объектов, включая наследуемые перечисляемые свойства. Подходит для объектов, но не для массивов

for..of - перебирает значения итерируемых коллекций (массивы, строки, Map, Set). Гарантирует порядок, не работает с обычными объектами (можно по Object.keys(obj), Object.values(obj))
*/

function task(title) {
    console.log(`${title}` + '_'.repeat(60));
}

console.log('Не забыть вызвать нужную IIFE');
task(1);
/*
arr.push(0) повлияет на массив так же, как если бы мы выполнили: 
*/

() => {
    const arr = [1, 2, 3, 4, 5];
    /*1 arr[0] = 0; */
    /*2 arr[arr.length] = 0; */
    /*3 arr[arr.length – 1] = 0; */
    /*4 arr[-1] = 0; */

    // ans: 2

    // fun: массивы - это на самом деле объекты
    arr[-1] = 0;
    console.log(arr); // [ 1, 2, 3, 4, 5, '-1': 0 ]
};

task(2);
/*
Какие логические значения будут получены?:
*/

() => {
    const object = {
        foo: 1,
    };
    console.log([
        'foo' in object, // ?
        'toString' in object, // ?
        object.hasOwnProperty('foo'), // ?
        object.hasOwnProperty('toString'), // ?
    ]);
};

// Оператор in проверяет, существует ли свойство в объекте или в его прототипе
// Метод toString не определён в самом объекте, но он унаследован от Object.prototype
// Метод hasOwnProperty проверяет, является ли свойство собственным (не унаследованным)

// [true, true, true, false]

task(3);
/*
Чтобы исколючить встроенные функции при создании, когда объект используется как коллекция, лучше создавать его через
Object.create(null). Такой объект не имеет прототипа, а значит в нём нет лишних свойств
*/

() => {
    var data1 = Object.create(null);
    var data2 = {};

    data1.text = 'Привет';
    data2.text = 'Привет';

    console.log(data1.text, data1.toString); // Привет undefined
    console.log(data2.text, data2.toString); // Привет Привет [Function: toString]
};

task(4);
/*
Что вернёт следующий код?:
*/

() => {
    Object.create(null).hasOwnProperty('toString');
};

// Метод Object.create(null) создаёт новый объект, который не имеет прототипа (Object.prototype) => у него нет метода hasOwnProperty и js выбросит ошибку Object.create(...).hasOwnProperty is not a function

// Как тогда проверить свойство?

() => {
    const obj = Object.create(null);
    obj.foo = 52;

    const isFoo = Object.prototype.hasOwnProperty.call(obj, 'foo');
    // call - вызывает метод в контексте переданного объекта (this)

    console.log(isFoo);
};

task(5);
/*
Какое значение будет в object2.property?:
*/

() => {
    const object2 = {};
    object2.constructor.prototype.property = 1;
    console.log(object2.property); // ?

    object2.constructor.prototype = null;
    console.log(object2.property); // ?
};

// prototype - неизменяемое свойство. Выведется 1, после вызовется ошибка TypeError

task(6);
/*
Что выведется в console.log?:
*/

(() => {
    let i = 10;
    let array = [];

    while (i--) {
        // замыкание. Решение - добавить let currentI = i;
        array.push(() => i + i);
    }

    console.log([array[0](), array[0]()]); // ?
})();

// i-- и --i оба изменяют i, но i-- возвращает старое значение, а --i - новое
// В данном случае на 1 итерации в условии проверяем i равное 10, а в цикле i уже равно 9
// на предпоследней итерации i = 1, в цикле = 0. На последней i = 0 => false, но i-- сработал и i = -1
// Далее в массиве все значения равны -2 ( -1 + (-1) ) из-за замыкания i в цикле - во всех колбеках ссылка на одну и ту же i, равную -1 в конце цикла
// ans: [ -2, -2 ]
