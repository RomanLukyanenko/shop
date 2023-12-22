import cart from "./cartArray.js";
import { cartViewProducts } from "./cartViewProducts.js";

// Функція добавлення товару
export default function cartAddProduct(el) {
    // Отримуємо дані про товар
    const productData = el.dataset;

    // Перетворюємо 'count' в число
    const count = parseInt(productData.count, 10);

    // Знаходимо товар у кошику
    const productIndex = cart.findIndex(item => item.productId === productData.productId);

    // Перевіряємо чи товар існує в кошику
    if (productIndex !== -1) {
        // Якщо товар вже є в кошику, збільшуємо його кількість
        cart[productIndex].count += count;
    } else {
        // Якщо товару немає в кошику, додаємо його з заданою кількістю
        cart.push({
            ...productData,
            count // Переконайтеся, що інші дані також правильно передані
        });
    }

    // Оновлюємо відображення товарів у кошику
    cartViewProducts();
}
