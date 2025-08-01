/*
Теория перед заданием

1. Object.keys(obj) - не включает свойства из прототипа (только перечисляемые)
2. for...in - включает свойства из прототипа (только перечисляемые) - можно исправить проверкой в цикле obj.hasOwnProperty(key)

1. count + 1 (возвращает значение count + 1, не меняя count)
2. count++ (увеличивает count на 1, возвращает старое значение)
3. ++count (увеличивает count на 1, возвращает новое значение)

*/

// Для каждого вложенного объекта нужно добавить свойство level, которое равняется числу (номер вложенности). Если значение свойства будет не объект, то ничего не добавлять:

const object = {
    a: {
        d: {
            h: 4,
        },
        e: 2,
    },
    b: 1,
    c: {
        f: {
            g: 3,
            k: {},
        },
    },
};

// Должно получиться так:
const result = {
    a: {
        level: 1,
        d: {
            level: 2,
            h: 4,
        },
        e: 2,
    },
    b: 1,
    c: {
        level: 1,
        f: {
            level: 2,
            g: 3,
            k: {
                level: 3,
            },
        },
    },
};

import equal from 'fast-deep-equal';

const addLevel = (obj, count = 0) => {
    if (count > 0) {
        obj.level = count;
    }

    Object.keys(obj).forEach((key) => {
        const currKeyValue = obj[key];
        // Если это объект, не null и не массив
        if (typeof currKeyValue === 'object' && currKeyValue !== null && !Array.isArray(currKeyValue)) {
            addLevel(currKeyValue, count + 1);
        }
    });
};

addLevel(object);

console.log(equal(object, result));
console.log(JSON.stringify(object, null, 4));
