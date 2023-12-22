// Імпорт необхідних елементів та функцій з інших модулів
import { boxCartAddedList } from "../utils/elements.js";
import { formatPrice, noResult, setCartCount, setCartProducts } from "../utils/helpers.js";
import cart from "./cartArray.js";

// Функція debounce для запобігання багаторазового виклику cartViewProducts
function debounce(func, timeout = 300) {
    // Створення таймеру, який можна скасувати
    let timer;
    return (...args) => {
        // Очищення попереднього таймера, якщо він існує
        clearTimeout(timer);
        // Встановлення нового таймера
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

// Застосування debounce до функції cartViewProducts
function cartViewProducts() {

    // Перевірка наявності товарів у кошику
    if (cart.length) {

        // Очищення контейнера перед додаванням нових елементів
        boxCartAddedList.innerHTML = '';

        // Ітерація по кожному товару у кошику
        for (const product of cart) {
            
            // Додавання HTML для кожного товару
            boxCartAddedList.insertAdjacentHTML(
                'afterbegin',
                `<div class="cart-added-list__item">
                    <button class="cart-added-list__item-btn-delete btn-light js-cart-delete" data-id="${product.productId}"><svg class='icon icon-close'><use xlink:href='#icon-close'></use></svg></button>
                    <img src="img/catalog/${product.img}" alt="" class="cart-added-list__item-img">
                    <p class="cart-added-list__item-text-hold">
                        <a href="#" class="cart-added-list__item-title-link">${product.title}</a>
                        <span class="cart-added-list__item-meta-list">
                            <span class="cart-added-list__item-meta">Ціна: <span data-currency-num="${product.price}">${formatPrice(product.price)}</span></span>
                        </span>
                    </p>
                    <input type="text" class="cart-added-list__item-count" placeholder="0" value="${product.count}">
                    <button class="cart-added-list__item-btn-plus btn-light js-cart-plus"
                            data-product-id="${product.productId}"
                            data-img="${product.img}"
                            data-title="${product.title}"
                            data-price="${product.price}"
                            data-count="1"></button>
                    <button class="cart-added-list__item-btn-minus btn-light js-cart-minus"
                            data-product-id="${product.productId}"></button>
                </div>`
            );
        }
    } else {
        // Показ повідомлення, якщо товарів у кошику немає
        boxCartAddedList.innerHTML = noResult();
    }
    // Зберігання оновленого стану кошика
    setCartProducts();
    // Оновлення кількості товарів у кошику
    setCartCount(cart.length);
}; // Затримка в 300 мілісекунд для дебаунсу

// Експорт дебаунсованої версії cartViewProducts для використання в інших частинах програми
export { cartViewProducts };