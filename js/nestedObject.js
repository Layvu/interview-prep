// Сделать вложенный объект из строки:

const str = 'one.two.three.four.five';

/*{
    one: {
        two: {
            three: {
                ...
            }
        }
    }
}*/

const createNestedObject1 = (str) => {
    const words = str.split('.').filter((word) => word);
    let obj = {};

    for (let i = words.length - 1; i >= 0; i--) {
        obj = { [words[i]]: obj };
    }

    return obj;
};

const createNestedObject2 = (str) => {
    const words = str.split('.').filter((word) => word);
    return words.reduceRight((acc, curr) => ({ [curr]: acc }), {});
};

const createNestedObject3 = (str) => {
    const words = str.split('.').filter((word) => word);
    const obj = {}; // корневой объект obj содержит всю структуру
    let current = obj;

    for (let word of words) {
        current[word] = {};
        current = current[word]; // перемещаем указатель current на новый вложенный объект
    }

    return obj;
};

console.log(JSON.stringify(createNestedObject3(str), null, 2));
