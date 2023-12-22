// Імпортуємо функцію getData і об'єкт apiCategory з відповідних модулів.
import getData, { apiCategory } from "./api/api.js";

// Імпортуємо необхідні елементи з модулю elements.
import { boxCategory } from "./utils/elements.js";

// Функція для відображення продуктів на сторінці.
export default function viewCategory() {

    // Перевіряємо елемент на існування
    if (boxCategory) {

        // Викликаємо функцію getData з URL каталогу API.
        getData(apiCategory).then(categoryList => {

            // Перевіряємо, чи є категорії у каталозі.
            if (categoryList.length) {

                // Очищуємо контейнер для каталогу перед додаванням нових елементів.
                boxCategory.innerHTML = '<a href="0" class="dropdown-item">Скинути вибір</a>';

                // Ітерація по кожному продукту в каталозі.
                categoryList.forEach(product => {

                    // Деструктуризація об'єкту продукту для легкого доступу до його властивостей.
                    const { title, id } = product;

                    // Додавання HTML для кожного продукту в boxCategory.
                    boxCategory.insertAdjacentHTML(
                        'beforeend',
                        `<a href="${id}" class="dropdown-item">${title}</a>`)
                });

            } else {
                // Якщо продуктів немає, виводимо повідомлення про це.
                boxCategory.innerHTML = '<a href="#" class="dropdown-item">Не знайдено...</a>'
            }

        })
    }
}
