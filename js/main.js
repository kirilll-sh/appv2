// ===== ФУНКЦИИ НАВИГАЦИИ И МОДАЛЬНЫХ ОКОН =====

// Открыть модальное окно с деталями объекта
function openCard(cardId) {
    const modal = document.getElementById('cardModal');
    modal.classList.add('active');
    
    // Данные карточек
    const cardsData = {
        1: {
            title: 'Трёхкомнатная квартира в центре',
            address: 'ул. Пушкина, 42, Ижевск',
            price: '2 500 000',
            rooms: '3',
            area: '85',
            floor: '5',
            type: 'Квартира',
            description: 'Светлая квартира с евроремонтом, все окна на солнечную сторону'
        },
        2: {
            title: 'Двухкомнатная квартира',
            address: 'Комсомольская площадь, 7, Ижевск',
            price: '1 800 000',
            rooms: '2',
            area: '65',
            floor: '3',
            type: 'Квартира',
            description: 'Уютная квартира с видом на площадь, рядом метро'
        },
        3: {
            title: 'Коттедж с участком',
            address: 'пос. Кизнер, Ижевск',
            price: '4 200 000',
            rooms: '5',
            area: '150',
            floor: '1',
            type: 'Коттедж',
            description: 'Красивый коттедж в ухоженном поселке, скважина, баня'
        },
        4: {
            title: 'Студия в новостройке',
            address: 'ул. Красногвардейская, 15, Ижевск',
            price: '950 000',
            rooms: 'Студия',
            area: '35',
            floor: '12',
            type: 'Студия',
            description: 'Современная студия в новом доме с паркингом и фитнесом'
        },
        5: {
            title: 'Четырёхкомнатная квартира',
            address: 'пр. Пролетарский, 28, Ижевск',
            price: '3 200 000',
            rooms: '4',
            area: '110',
            floor: '7',
            type: 'Квартира',
            description: 'Большая квартира, подходит для семьи, кухня 15 м²'
        },
        6: {
            title: 'Офисное помещение',
            address: 'ул. Свободы, 53, Ижевск',
            price: '2 000 000',
            rooms: 'Открытая планировка',
            area: '120',
            floor: '1',
            type: 'Офис',
            description: 'Отличное коммерческое помещение в оживленной части города'
        }
    };
    
    const card = cardsData[cardId];
    if (card) {
        document.getElementById('cardTitle').textContent = card.title;
        document.getElementById('cardAddress').textContent = card.address;
        document.getElementById('cardPrice').textContent = card.price + ' ₽';
        document.getElementById('cardRooms').textContent = card.rooms;
        document.getElementById('cardArea').textContent = card.area;
        document.getElementById('cardFloor').textContent = card.floor;
        document.getElementById('cardType').textContent = card.type;
        document.getElementById('cardDescription').textContent = card.description;
        
        // Устанавливаем значение ипотеки по умолчанию
        document.getElementById('mortgageAmount').value = parseInt(card.price.replace(/\s+/g, '')) / 2;
    }
    
    // Скроллим к модальному окну
    window.scrollTo({top: 0, behavior: 'smooth'});
}

// Закрыть модальное окно
function closeCard() {
    const modal = document.getElementById('cardModal');
    modal.classList.remove('active');
}

// Закрыть модальное окно при клике вне содержимого
window.onclick = function(event) {
    const modal = document.getElementById('cardModal');
    if (event.target == modal) {
        modal.classList.remove('active');
    }
}

// ===== ФУНКЦИИ КАЛЬКУЛЯТОРА ИПОТЕКИ =====

function calculateMortgage() {
    const principal = parseFloat(document.getElementById('mortgageAmount').value);
    const annualRate = parseFloat(document.getElementById('mortgageRate').value);
    const years = parseFloat(document.getElementById('mortgageTerm').value);
    
    if (!principal || !annualRate || !years) {
        alert('Заполните все поля калькулятора');
        return;
    }
    
    const monthlyRate = annualRate / 100 / 12;
    const numberOfPayments = years * 12;
    
    if (monthlyRate === 0) {
        var monthlyPayment = principal / numberOfPayments;
    } else {
        var monthlyPayment = principal * 
            (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
            (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    }
    
    const resultDiv = document.getElementById('mortgageResult');
    const monthlyPaymentElement = document.getElementById('monthlyPayment');
    
    monthlyPaymentElement.textContent = Math.round(monthlyPayment).toLocaleString('ru-RU');
    resultDiv.style.display = 'block';
}

// ===== ФУНКЦИИ ОТПРАВКИ ФОРМ =====

function submitRequest(event) {
    event.preventDefault();
    alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.');
    event.target.reset();
    closeCard();
}

// ===== ФУНКЦИИ КАРУСЕЛИ =====

function scrollCarousel(direction, button) {
    const carousel = button?.closest('.carousel')?.querySelector('.carousel__inner');
    if (!carousel) return;
    
    const firstCard = carousel.firstElementChild;
    const styles = window.getComputedStyle(carousel);
    const gap = parseFloat(styles.columnGap || styles.gap || '0');
    const scrollAmount = firstCard
        ? firstCard.getBoundingClientRect().width + gap
        : 300;

    carousel.scrollBy({
        left: direction > 0 ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
    });
}

// ===== ФУНКЦИИ ПРОКРУТКИ СТРАНИЦЫ =====

function scrollToSearch() {
    const searchSection = document.querySelector('.quick-search');
    searchSection.scrollIntoView({behavior: 'smooth'});
}

function scrollToCatalog() {
    const catalogSection = document.getElementById('catalog');
    catalogSection.scrollIntoView({behavior: 'smooth'});
}

// ===== ИНИЦИАЛИЗАЦИЯ =====

function resetCarouselPositions() {
    document.querySelectorAll('.carousel__inner').forEach(carousel => {
        carousel.scrollLeft = 0;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    resetCarouselPositions();

    // Добавляем обработчики клавиш для закрытия модального окна
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeCard();
        }
    });
    
    // Добавляем обработчики для кнопок "В избранное"
    const favoriteButtons = document.querySelectorAll('.button--secondary');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.textContent.includes('❤')) {
                this.textContent = '🤍 В избранное';
                this.style.opacity = '0.7';
            } else {
                this.textContent = '❤ В избранное';
                this.style.opacity = '1';
            }
        });
    });
    
    // Добавляем плавные переходы при загрузке страницы
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease';
    }, 100);
});

window.addEventListener('load', resetCarouselPositions);
window.addEventListener('pageshow', resetCarouselPositions);

// ===== ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ =====

// Функция для подсчета объектов по фильтрам
function applyFilters() {
    const checkboxes = document.querySelectorAll('.catalog__checkbox input:checked');
    const selectedFilters = [];
    
    checkboxes.forEach(checkbox => {
        selectedFilters.push(checkbox.parentElement.textContent.trim());
    });
    
    console.log('Выбранные фильтры:', selectedFilters);
    // Здесь можно добавить логику фильтрации
    alert('Фильтры применены: ' + selectedFilters.join(', '));
}

// Функция для поиска по адресу
function searchByAddress(query) {
    const cards = document.querySelectorAll('.catalog-card');
    let found = 0;
    
    cards.forEach(card => {
        const address = card.querySelector('.address').textContent.toLowerCase();
        if (address.includes(query.toLowerCase())) {
            card.style.display = 'block';
            found++;
        } else {
            card.style.display = 'none';
        }
    });
    
    return found;
}

// Обработчик для поля поиска в каталоге
const searchInput = document.querySelector('.catalog__search input');
if (searchInput) {
    searchInput.addEventListener('keyup', function() {
        const found = searchByAddress(this.value);
        if (this.value && found === 0) {
            alert('Объектов не найдено');
        }
    });
}

// ===== АНИМАЦИИ ПРИ СКРОЛЛИНГЕ =====

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.object-card, .advantages__card, .contact__item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.5s ease';
    observer.observe(element);
});

// ===== ФУНКЦИИ ДЛЯ МЕНЮ ЛИЧНОГО КАБИНЕТА =====

function showCabinet() {
    const cabinet = document.getElementById('cabinet');
    const catalog = document.getElementById('catalog');
    
    if (cabinet) {
        cabinet.style.display = 'block';
        catalog.style.display = 'none';
    }
}

function showCatalog() {
    const cabinet = document.getElementById('cabinet');
    const catalog = document.getElementById('catalog');
    
    if (cabinet) {
        cabinet.style.display = 'none';
        catalog.style.display = 'block';
    }
}




