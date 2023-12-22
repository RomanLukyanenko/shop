import viewCategory from "./app/category.js";
import viewProducts from "./app/products.js";

// Імпортуємо необхідні елементи з модулю elements.
import { boxCategory, searchInput, searchBtn } from "./app/utils/elements.js";
import { getCategoryProducts, searchProducts } from "./app/utils/events.js";
import viewHotOffers from "./app/hotOffers.js";
import setCart from "./app/cart/setCart.js";
import setOrderPage from "./app/order.js";

// Виводимо список товарів
viewProducts();
viewCategory();
viewHotOffers();

// Виводимо товари по кліку категорії
if (boxCategory) boxCategory.onclick = getCategoryProducts;

// Слідкуємо за введеня в поле пошуку
if (searchInput) searchInput.oninput = searchProducts;
if (searchBtn) searchBtn.onclick = searchProducts;


// Робимо корзину замовлень
setCart();

// Перевіряємо чи це сторінка замовлення і пишемо код оформлення
if (document.querySelector('body').classList.contains('page-order')) {
    setOrderPage();
}