document.addEventListener('DOMContentLoaded', async () => {
    const loader = document.getElementById('loader');
    const itemsContainer = document.getElementById('items');
    const url = 'https://students.netoservices.ru/nestjs-backend/slow-get-courses';

    function populateItems(valuteData) {
        itemsContainer.innerHTML = ''; // Очистка контейнера
        for (const key in valuteData) {
            if (Object.prototype.hasOwnProperty.call(valuteData, key)) {
                const { CharCode, Value } = valuteData[key];
                const itemHTML = `
            <div class="item">
              <div class="item__code">${CharCode}</div>
              <div class="item__value">${Value}</div>
              <div class="item__currency">руб.</div>
            </div>
          `;
                itemsContainer.insertAdjacentHTML('beforeend', itemHTML);
            }
        }
    }

    const cachedData = localStorage.getItem('currencyData');
    if (cachedData) {
        const valute = JSON.parse(cachedData);
        populateItems(valute);
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        const valute = data.response.Valute;

        localStorage.setItem('currencyData', JSON.stringify(valute));

        populateItems(valute);
    } catch (error) {
        console.error('Ошибка при загрузке данных о курсах:', error);
    } finally {
        loader.classList.remove('loader_active');
    }
});