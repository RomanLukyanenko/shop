// Імпорт масиву кошика з модуля cartArray.js
import cart from "../cart/cartArray.js";

// Імпорт елемента, який відображає кількість товарів у кошику, з модуля elements.js
import { boxListCartCount } from "./elements.js";

// Функція для виведення повідомлення, коли немає результатів
export function noResult() {
    return `<span class="no-result no-result--inline">
                <img src="img/no-result/no-result-v2.png" alt="No results" class="no-result__img">
                <span class="no-result__title">Результатів не знайдено</span>
            </span>`;
}

// Функція для отримання товарів з кошику з локального сховища
export function getCartProducts() {
    return JSON.parse(localStorage.getItem("cart")) ?? [];
}

// Функція для збереження поточного стану кошика у локальне сховище
export function setCartProducts() {
    localStorage.setItem("cart", JSON.stringify(cart));
}


// Функція для оновлення відображення кількості товарів у кошику
export function setCartCount(num = 0) {
    boxListCartCount.forEach((boxElCount) => {
        // Якщо кількість товару рівна 0, ховаємо індикатор кількості
        if (num === 0) {
            boxElCount.classList.remove('show-num');
        } else {
            // Якщо кількість більше нуля, показуємо індикатор кількості
            boxElCount.classList.add('show-num');
        };
        // Встановлюємо відображення кількості товарів
        boxElCount.innerHTML = num;
    })
};

// Функція для форматування ціни
export function formatPrice(num = 0, currency = 'грн') {
    // Відображення числа з роздільниками тисяч та вказаною валютою
    return `${parseInt(num, 10).toLocaleString('uk-UA')} ${currency}`;
}
