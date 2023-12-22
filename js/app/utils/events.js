import { renderProducts } from "./renderProducts.js";
import getData, { apiCatalog, apiCatalogByCategory, apiSearch } from "../api/api.js";
import { boxCatalog, boxListBtnCurrency, boxNum, btnBurger, menuMobile, searchInput } from "./elements.js";
import convertCurrency from "./convertCurrency.js";

// Мобільне меню
if (btnBurger) {
    btnBurger.onchange = () => menuMobile.classList.toggle('show');
}

// Зміна валюти
if (typeof boxListBtnCurrency !== 'null') {
    boxListBtnCurrency.forEach((btnCurrency) => {
        btnCurrency.onclick = convertCurrency;
    })
}

// Виводимо товари по кліку на категорію
export function getCategoryProducts(e) {
    e.preventDefault();

    // Відбираємо ади категорію
    const catId = Number(e.target.getAttribute('href'));

    // Відносно категорії формуємо посилання
    const url = (catId !== 0) ? apiCatalogByCategory + catId : apiCatalog;

    // Викликаємо функцію getData з URL каталогу API.
    getData(url).then(catalog => {

        renderProducts(catalog);
        
        // Встановлюємо кількість товарів у boxNum.
        boxNum.innerHTML = catalog.length;
    });
}


// Робимо пошук товарів
let debounceTimer;

export function searchProducts(e) {
    e.preventDefault();

    // Очистити попередній таймер, якщо він існує
    if (debounceTimer) clearTimeout(debounceTimer);

    // Налаштуйте новий таймер
    debounceTimer = setTimeout(() => {

        // Відбиремаємо пошукову фразу
        const val = searchInput.value;
        
        // Сформувати url
        const url = (val) ? apiSearch + val : apiCatalog;
        
        // виводимо товари
        getData(url).then(catalog => {
            
            // перевірка масиву на пустоту
            if (catalog.length !== 0) {

                // Якщо масив не пустий - виводимо товари
                renderProducts(catalog) 
            } else {
                
                // Якщо масив пустий - виводимо фразу про пустотий результат
                boxCatalog.innerHTML = `<h3 class="no-result">По пошуковій фразі ${val} товорів не знайдено</h3>`
            };
    
            // Встановлюємо кількість товарів у boxNum.
            boxNum.innerHTML = catalog.length;
        });
        
    }, 1000);
}
