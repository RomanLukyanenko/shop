import { cardDeleteProduct } from "./cardDeleteProduct.js";
import cartAddProduct from "./cartAddProduct.js";
import { cartViewProducts } from "./cartViewProducts.js";
import { boxCartAddedList, boxCatalog, cartAddedBtn } from "../utils/elements.js";
import cart from "./cartArray.js";

export default function setCart() {

    // Ховаємо і показуємо корзину
    cartAddedBtn.onclick = () => boxCartAddedList.classList.toggle("show");

    // Виводимо додані товари в корзину
    cartViewProducts();

    // Вішаємо подію на добавлення в козину
    if (boxCatalog) {
        boxCatalog.onclick = (e) => {
            e.preventDefault();

            // відбираємо елемент по якому був клік
            let el = e.target;

            // Додаткова перевірка на непотрібні елементи
            if (el.nodeName == 'svg' || el.nodeName == 'use') {
                el = (el.nodeName == 'use') ? el.parentNode.parentNode : el.parentNode;
            }

            // Перехоплюємо елемент добавлення в корзину
            if(el.classList.contains('js-cart-add')) {

                // Добавляємо товар в корзину
                cartAddProduct(el);
            }
        }; 
    }

    // Видалення добавленого товару
    boxCartAddedList.onclick = (e) => {
        e.preventDefault();

        // відбираємо елемент по якому був клік
        let el = e.target;

        // Додаткова перевірка на непотрібні елементи
        if (el.nodeName == 'svg' || el.nodeName == 'use') {
            el = (el.nodeName == 'use') ? el.parentNode.parentNode : el.parentNode;
        }

        // Перехоплюємо елемент видалення з корзини
        if(el.classList.contains('js-cart-delete'))
            cardDeleteProduct(el);

        // Перехоплюємо елемент додавання з корзини
        if(el.classList.contains('js-cart-plus')) {

            cartAddProduct(el);
        }

        // Перехоплюємо елемент зменшення з корзини
        if(el.classList.contains('js-cart-minus')) {

            cartRemoveProduct(el);
        }
    }
};

function cartRemoveProduct(el) {
    const productId = el.dataset.productId;
    const productIndex = cart.findIndex(item => item.productId === productId);
    if (productIndex !== -1) {
        if (cart[productIndex].count > 1) {
            cart[productIndex].count--;
        } else {
            cart.splice(productIndex, 1); // видалення товару, якщо його кількість 0
        }
    }
    cartViewProducts(); // оновлюємо відображення кошика
}

