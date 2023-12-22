import cart from "./cartArray.js";
import { cartViewProducts } from "./cartViewProducts.js";


// Видалення товару з корзини
export const cardDeleteProduct = (el) => {

    // Формуємо id твоару, який будемо видаляти
    const id = el.dataset.id;

    // Шукаємо товар в корзині
    // cart = cart.filter(item => item.productId != id);
    const productExist = cart.findIndex(item => item.productId == id);
    
    // Видаляємо товар з корзини
    cart.splice(productExist, 1);

    // Виводимо оновлений масив товарів в html
    cartViewProducts();
};