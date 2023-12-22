import getData, { apiCurrency } from "../api/api.js";
import { formatPrice } from "./helpers.js";

// Зберігаємо дані про валююти
let currencyData = {
    USD: false,
    EUR: false
};

// Функція, яка буде відповідати за зміну валюти на всій сторінці
function setNewCurrency(currency, currencyData = currencyData) {
    
    // Відбираємо елементи з цінами
    const priceList = document.querySelectorAll('[data-currency-num]');
    
    // Перебираємо для зміни валюти
    priceList.forEach(item => {

        // Дістаємо ціну з поточного елемента
        let price = Number(item.getAttribute('data-currency-num'));
        
        // Відносно вибраної валюти формуємо ціну
        switch (currency) {
            case 'EUR':
                price = price * currencyData.EUR;

                // Змінюємо ціну відповідно до валюти
                item.innerHTML = formatPrice(price, 'євр');
                break;

            case 'USD':
                price = price * currencyData.USD;
                
                // Змінюємо ціну відповідно до валюти
                item.innerHTML = formatPrice(price, 'дол');
                break;
                
            case 'UAH':
            default:
                // Змінюємо ціну відповідно до валюти
                item.innerHTML = formatPrice(price);
                break;
        }
    });
}

export default function convertCurrency(e) {
    e.preventDefault();

    // Отримуємо назву валюти
    const currency = e.target.getAttribute('data-currency-type').toUpperCase();
    
    // Отримуємо дані з сервера
    if (!currencyData.EUR && !currencyData.USD) {   
        getData(apiCurrency).then(({ conversion_rates }) => {
            
            // Отримуємо дані 
            const { EUR, USD } = conversion_rates;
            
            // Записуємо дані в глобальний об'єкт
            currencyData = { EUR, USD }

            // Конвертуємо валюту на сторінці
            setNewCurrency(currency, currencyData);
        });
    } else {
        
        // Конвертуємо валюту на сторінці
        setNewCurrency(currency, currencyData);
    }
}

