// Імпорт елемента, що представляє контейнер для каталогу товарів
import { boxCatalog } from "./elements.js";

// Імпорт функцій для конвертації валюти та форматування ціни
import { formatPrice } from "./helpers.js";

// Функція для відображення товарів у каталозі
export const renderProducts = (array = [], boxElement = boxCatalog) => {
    // Перевірка наявності товарів у переданому масиві
    if (array.length && boxElement) {
        // Очищення контейнера каталогу перед додаванням нових товарів
        boxElement.innerHTML = '';

        // Перебір кожного товару в масиві
        array.forEach(product => {
            // Витягування даних кожного товару для зручності
            const { img, title, price, oldprice, id } = product;

            // Додавання HTML-коду для кожного товару в контейнер каталогу
            boxElement.insertAdjacentHTML(
                'afterbegin',
                `<div class="card-product">
                    <div class="card-product__img-hold">
                        <img src="img/catalog/${img}" alt="" class="card-product__img">
                    </div>
                    <div class="card-product__text-hold">
                        <a href="#" class="card-product__title-link">${title}</a>
                        <span class="card-product__price js-currency-num" data-original-price="${price}">
                            <span data-currency-num="${price}">${formatPrice(price)}</span>
                            <small data-currency-num="${oldprice}">${formatPrice(oldprice)}</small>
                        </span>
                        <a href="#" class="card-product__btn-add js-cart-add"
                            data-product-id="${id}"
                            data-img="${img}"
                            data-title="${title}"
                            data-price="${price}"
                            data-count="1"
                            >
                            <svg class='icon icon-cart'>
                                <use xlink:href='#icon-cart-add'></use>
                            </svg>
                        </a>
                        <!--<div class="social">
                            <a href="#" class="social__item facebook js-change-currency" data-currency-type="UAH">₴</a>
                            <a href="#" class="social__item facebook js-change-currency" data-currency-type="USD">$</a>
                            <a href="#" class="social__item facebook js-change-currency" data-currency-type="EUR">€</a>
                        </div>
                        -->
                    </div>
                </div>`
            );
        });
    }
};

renderProducts();
