// Как принудительно закончить promise через 5 сек?

const promiseWithTimeout = (promice, ms) => {
    const timeout = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Ошибка сервера :(')), ms);
    });

    return Promise.race([promice, timeout]);
};

function operation() {
    return new Promise((resolve) => {
        setTimeout(() => resolve('Успех'), 10000);
    });
}

promiseWithTimeout(operation(), 5000)
    .then((result) => console.log(result))
    .catch((error) => console.log(error));
