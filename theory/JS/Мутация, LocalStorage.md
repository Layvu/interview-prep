### Что такое мутация в js?

**Мутация в JS** - это изменение свойств объекта, элементов массива или других изменяемых данных напрямую, **без создания новой копии**

Это может проблемы в React, т.к. он не распознаёт мутации - сравнивает ссылки объектов
```JS
function Counter() {
    const [state, setState] = useState({ count: 0 });
    const increment = () => {
        state.count += 1; // Мутация: прямое изменение объекта
        setState(state); // React не увидит изменений, рендеринг не обновится
    };
    return <button onClick={increment}>{state.count}</button>;
}
```

Во избежание мутаций:
- Объекты и массивы: **spread-оператор**
```JS
function Counter() {
    const [state, setState] = useState({ count: 0 });
    const increment = () => {
        setState({ ...state, count: state.count + 1 }); // Новая копия
    };
    return <button onClick={increment}>{state.count}</button>;
}
```
- Массивы: **map, filter, slice, concat**

### Какие есть варианты хранения информации на клиенте?

1. **LocalStorage:** ключ-значение хранилище в браузере, сохраняющее данные в виде строк без срока истечения (до ручной очистки)
- Синхронный API, может блокировать поток при больших данных
- Для долгосрочного хранения небольших данных (настройки, токены)

```JS
function UserSettings() {
    const [settings, setSettings] = useState(() => {
        return JSON.parse(localStorage.getItem('settings')) || {};
    });
    useEffect(() => {
        localStorage.setItem('settings', JSON.stringify(settings));
    }, [settings]);
    return <button onClick={() => setSettings({ theme: 'dark' })}>Set Dark</button>;
}
```

2. **SessionStorage**: аналог LocalStorage, но данные сохраняются только на время сессии вкладки
- Данные уникальны для каждой вкладки

3. **Cookies**: небольшие текстовые данные, хранящиеся в браузере и отправляемые с HTTP-запросами (сервер-клиент)
- Для аутентификации (токены)
```JS
import Cookies from 'js-cookie';
// Сохранение
Cookies.set('token', 'abc123', { expires: 7 }); // На 7 дней
// Чтение
const token = Cookies.get('token');
```

4. **IndexedDB** - асинхронная NoSQL-база данных в браузере для хранения больших объёмов структурированных данных (объекты, файлы). Оффлайн приложения

5. **Переменные в памяти (JavaScript):** хранение данных в переменных или состоянии React. Данные теряются при перезагрузке страницы.

6. **query-параметры:** передача данных между страницами, сохранение состояния в URL
- Данные доступны в window.location.search, или хук **useSearchParams** из react-router-dom

```JS
import { useSearchParams } from 'react-router-dom';

function FilterComponent() {
    const [searchParams, setSearchParams] = useSearchParams();
    const sort = searchParams.get('sort') || 'asc';
    const handleSort = (newSort) => {
        setSearchParams({ sort: newSort }); // Обновляет URL
    };
    return (
        <button onClick={() => handleSort('desc')}>
            Sort: {sort}
        </button>
    );
}
```