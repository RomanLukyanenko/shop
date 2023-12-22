import getData, { apiHotOffer } from "./api/api.js";
import { renderProducts } from "./utils/renderProducts.js";
import cartAddProduct from "./cart/cartAddProduct.js"; // Імпорт функції додавання товару в корзину
import { hotOffer, boxHotOffer } from "./utils/elements.js";

export default function viewHotOffers() {
    if (hotOffer) {
        getData(apiHotOffer).then(catalog => {
            // Виводимо карточки на сторінку
            renderProducts(catalog, hotOffer);

            // Додавання обробника подій для кнопок додавання в корзину
            hotOffer.querySelectorAll('.js-cart-add').forEach(button => {
                button.addEventListener('click', function(event) {
                    event.preventDefault();
                    cartAddProduct(this);
                });
            });

            // Якщо продуктів немає, виводимо повідомлення про це.
            if (catalog.length === 0) {
                boxHotOffer.classList.add("hidden");
            }
        });
        
    }
}

