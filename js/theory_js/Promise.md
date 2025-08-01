### Что такое Promise?
**Promise** (обещание) - это объект, представляющий результат выполнения асинхронной операции. Используется для упрощения асинхронного кода

**Состояния**: 
1. Pending (Ожидание): Начальное состояние; операция не завершена
2. Fulfilled (Исполнено): Операция завершена успешно, и promise возвращает результат
3. Rejected (Отклонено): Операция завершена с ошибкой, и promise возвращает причину

**Методы**:
- .then(onFulfilled, onRejected): Обрабатывает успешное выполнение или ошибку. Возможна цепочка вызовов
- .catch(onRejected): Обрабатывает ошибку.
- .finally(onFinally): Выполняется в любом случае (успех или ошибка).

```Js
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        const success = true;
        if (success) {
            resolve('Операция успешна!'); // Успех
        } else {
            reject('Ошибка!'); // Ошибка
        }
    }, 1000);
});

promise
    .then(result => console.log(result)) // Операция успешна!
    .catch(error => console.log(error))
    .finally(() => console.log('Завершено'));
```

**Статические методы**:
- Promise.resolve(value): 
  Создаёт выполненный Promise с заданным значением
- Promise.reject(error): 
  Создаёт отклонённый Promise с ошибкой
- Promise.all(iterable): 
  Ждёт завершения всех Promise в итерируемом объекте, возвращает массив результатов или отклоняется при первой ошибке
- Promise.race(iterable): 
  Возвращает результат первого завершённого Promise (успех или ошибка)

**Асинхронные операции**: Запросы к API (fetch), таймеры, работа с файлами

### Может ли promise никогда не закончиться? Ни then, ни catch не вызовутся
Да, если в Promise не вызываются функции resolve или reject, либо если асинхронная операция внутри Promise не завершается (сервер не отвечает)

**Последствия**:
- Это может привести к "зависанию" программы (особенно при использовании await)
- В цепочке Promise последующие .then также не выполнятся, пока предыдущий Promise не завершится.

**Как избежать** "вечного" Promise:
- Добавить таймаут (promiseWithTimeout с timeoutPromise, который точно завершится - `Promise.race([promise, timeoutPromise])`)
- Гарантировать вызов resolve или reject

### Как принудительно закончить promise через 5 сек?
Можно использовать Promise.race в сочетании с таймером, который создаёт Promise

Файл: js\promise.js


### Для чего нужен async/await? Как он относится к promise?

async/await — это **синтаксический сахар** над Promise. Упрощает работу с асинхронным кодом, делая его более похожим на синхронный

async/await напрямую работает с Promise:
- **async** указывает, что функция **всегда возвращает Promise**. Даже если функция возвращает обычное значение, оно оборачивается в `Promise.resolve(value)`
- **await**: Используется внутри async-функций для ожидания выполнения Promise и "распаковки" результата

Удобен для случаев, когда нужно дождаться завершения одной операции перед началом другой (API)
Однако Promise.all позволяет запустить все запросы одновременно:
```JS
async function parallelFetch() {
    try {
        const [response1, response2] = await Promise.all([
            fetch('https://api.example.com/data1').then(res => res.json()),
            fetch('https://api.example.com/data2').then(res => res.json())
        ]);
        console.log('Данные 1:', response1);
        console.log('Данные 2:', response2);
        return [response1, response2];
    } catch (err) {
        console.error('Ошибка:', err);
    }
}

parallelFetch(); // Запросы выполняются параллельно
```

