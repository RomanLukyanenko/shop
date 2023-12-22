const urlPart = 'https://654ca14b77200d6ba8591faa.mockapi.io/';

export const apiCatalog = urlPart + 'catalog';
export const apiCatalogByCategory = apiCatalog + '?catid=';
export const apiSearch = apiCatalog + '?search=';
export const apiCategory = urlPart + 'category';
export const apiHotOffer = apiCatalog + '?hotoffer=yes';
export const apiCurrency = 'https://v6.exchangerate-api.com/v6/64642e161f19cb31cf210149/latest/UAH';

export default function getData(url) {
    return fetch(url).then(data => data.json());
}
