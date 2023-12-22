// Імпортуємо функцію getData і об'єкт apiCatalog з відповідних модулів.
import getData, { apiCatalog } from "./api/api.js";

// Підключаємо функцію виводу товарів в каталог
import { renderProducts } from "./utils/renderProducts.js";

// Імпортуємо необхідні елементи з модулю elements.
import { boxNum, boxCatalog } from "./utils/elements.js";

// Функція для відображення продуктів на сторінці.
export default function viewProducts(url = apiCatalog) {
    if (boxCatalog) {
        
        // Викликаємо функцію getData з URL каталогу API.
        getData(url).then(catalog => {

            // Встановлюємо кількість товарів у boxNum.
            boxNum.innerHTML = catalog.length;

            // Виводимо карточки на сторінку
            renderProducts(catalog, boxCatalog);

            // Якщо продуктів немає, виводимо повідомлення про це.
            if (catalog.length === 0) {
                boxCatalog.innerHTML = '<h1 class="no-result">Товарів не знайдено...</h1>'
            }
        })
        
    }
} 
