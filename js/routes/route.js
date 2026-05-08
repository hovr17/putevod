// ============================================
// route.js — Рендерер страницы маршрута
// ============================================
// Читает ?route=id из URL, берёт данные из ROUTES,
// заполняет заголовок, блоки описания, карточки мест,
// информационные прямоугольники и ссылку кнопки.

document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const routeId = params.get('route');

    if (!routeId || !window.ROUTES || !window.ROUTES[routeId]) {
        console.error('Маршрут не найден:', routeId);
        if (window.ROUTES) {
            const firstId = Object.keys(window.ROUTES)[0];
            if (firstId) {
                renderRoute(window.ROUTES[firstId]);
                return;
            }
        }
        document.getElementById('routeTitle').textContent = 'маршрут не найден';
        return;
    }

    renderRoute(window.ROUTES[routeId]);
});

/**
 * Основная функция рендера маршрута
 */
function renderRoute(route) {
    // 1. Заголовок
    renderTitle(route.title);

    // 2. Три блока описания
    renderDescBlocks(route.descriptions || [], route.blockIcons);

    // 3. Карточки мест
    renderPlaces(route.places || []);

    // 4. Информационные прямоугольники (2x2)
    renderInfoBlocks(route.infoBlocks || []);

    // 5. Кнопка "смотреть маршрут"
    renderRouteButton(route.routeLink || '#', route);

    // 6. Заголовок страницы
    document.title = 'Маршрут — Путеводитель по Суздалю';

}

/**
 * 1. Заголовок
 */
function renderTitle(titleHtml) {
    const el = document.getElementById('routeTitle');
    if (el) el.innerHTML = titleHtml || '';
}

/**
 * 2. Три блока описания
 * Поддерживает два формата descriptions:
 * - Массив строк: ['текст1', 'текст2', 'текст3']
 * - Массив объектов: [{ text: 'текст1', icon: 'путь/к/иконке.svg' }, ...]
 * 
 * @param {Array} descriptions - массив строк или объектов с текстом и иконкой
 * @param {string} defaultIcon - путь к иконке по умолчанию (из поля blockIcons маршрута)
 */
function renderDescBlocks(descriptions, defaultIcon) {
    const container = document.getElementById('descBlocks');
    if (!container) return;

    container.innerHTML = '';

    descriptions.forEach(function (item) {
        const block = document.createElement('div');
        block.className = 'desc-block';

        // Определяем текст и иконку
        var text = '';
        var iconSrc = defaultIcon || null;  // иконка по умолчанию из blockIcons

        if (typeof item === 'string') {
            // Старый формат: просто строка
            text = item;
        } else if (typeof item === 'object' && item !== null) {
            // Новый формат: объект с text и icon
            text = item.text || '';
            if (item.icon) {
                iconSrc = item.icon;  // переопределяем иконку
            }
        }

        // Добавляем пиктограмму, если указана
        if (iconSrc) {
            const icon = document.createElement('img');
            icon.className = 'desc-block-icon';
            icon.src = iconSrc;
            icon.alt = '';
            block.appendChild(icon);
        }

        const textEl = document.createElement('div');
        textEl.className = 'desc-block-text';
        textEl.textContent = text || '';

        block.appendChild(textEl);
        container.appendChild(block);
    });
}

/**
 * 3. Карточки мест
 * 
 * Поддерживает два типа:
 * - 'existing': берёт фото и название из window.CATEGORIES (базы мест)
 * - 'custom': использует указанные image, label и link
 * 
 * Для 'existing' можно переопределить фото через поле image
 * и название через поле label
 * 
 * Значок билета: ticket: true в данных маршрута
 */
function renderPlaces(places) {
    const grid = document.getElementById('placesGrid');
    if (!grid) return;

    grid.innerHTML = '';

    places.forEach(function (place) {
        const cardData = resolvePlaceCard(place);
        if (!cardData) return;

        const card = document.createElement('a');
        card.className = 'place-card';
        card.href = cardData.link || '#';

        // Изображение через <img> тег
        if (cardData.image) {
            const img = document.createElement('img');
            img.src = cardData.image;
            img.alt = cardData.label || '';
            img.loading = 'lazy';
            card.appendChild(img);
        }

        // Значок билета (правый верхний угол)
        if (place.ticket) {
            const badge = document.createElement('img');
            badge.className = 'place-card-badge';
            badge.src = 'ui/ticket.svg';
            badge.alt = '';
            card.appendChild(badge);
        }

        // Overlay с градиентом
        const overlay = document.createElement('div');
        overlay.className = 'place-card-overlay';

        const label = document.createElement('div');
        label.className = 'place-card-label';
        label.textContent = cardData.label || '';

        overlay.appendChild(label);
        card.appendChild(overlay);
        grid.appendChild(card);
    });
}

/**
 * Определяет данные карточки (image, label, link) по типу
 */
function resolvePlaceCard(place) {
    // По умолчанию — existing
    var type = place.type || 'existing';

    if (type === 'custom') {
        // Ручная карточка: image, label, link заданы явно
        return {
            image: place.image || '',
            label: place.label || '',
            link: place.link || '#'
        };
    }

    if (type === 'existing') {
        // Берём из базы CATEGORIES
        var placeId = place.placeId;
        var category = place.category;

        if (!placeId || !category) {
            console.warn('Не указан placeId или category для карточки:', place);
            return null;
        }

        // Ищем в window.CATEGORIES
        var placeConfig = null;
        if (window.CATEGORIES && window.CATEGORIES[category]) {
            placeConfig = window.CATEGORIES[category][placeId];
        }

        if (!placeConfig) {
            console.warn('Место не найдено в базе:', category + '/' + placeId);
            return null;
        }

        // Берём первое фото из photoButtons
        var image = '';
        var label = placeConfig.title || placeId;

        if (placeConfig.photoButtons && placeConfig.photoButtons.length > 0) {
            image = placeConfig.photoButtons[0].image || '';
        }

        // Переопределение фото, если указано в маршруте
        if (place.image) {
            image = place.image;
        }

        // Переопределение названия, если указано в маршруте
        if (place.label) {
            label = place.label;
        }

        // Ссылка ведёт на страницу места
        var link = 'place.html?id=' + encodeURIComponent(placeId) + '&cat=' + encodeURIComponent(category);

        return {
            image: image,
            label: label,
            link: link
        };
    }

    console.warn('Неизвестный тип карточки:', type);
    return null;
}

/**
 * 4. Информационные прямоугольники (2x2 сетка)
 */
function renderInfoBlocks(infoTexts) {
    var container = document.getElementById('infoGrid');
    if (!container) return;

    container.innerHTML = '';

    infoTexts.forEach(function (text) {
        var block = document.createElement('div');
        block.className = 'info-block';

        var textEl = document.createElement('div');
        textEl.className = 'info-block-text';
        textEl.textContent = text || '';

        block.appendChild(textEl);
        container.appendChild(block);
    });
}

/**
 * 5. Кнопка "смотреть маршрут"
 * Сохраняет контекст маршрута в sessionStorage и ведёт на place.html
 */
function renderRouteButton(link, route) {
    var btn = document.getElementById('viewRouteBtn');
    if (!btn) return;

    // Убираем стандартный переход
    btn.href = '#';

    btn.addEventListener('click', function (e) {
        e.preventDefault();

        if (!route || !route.places || route.places.length === 0) return;

        // Фильтруем только existing-места (у них есть placeId и category)
        var routePlaces = [];
        route.places.forEach(function (p) {
            if (p.placeId && p.category) {
                routePlaces.push({ placeId: p.placeId, category: p.category });
            }
        });

        if (routePlaces.length === 0) {
            console.warn('Нет мест для маршрута');
            return;
        }

        // Сохраняем контекст маршрута
        sessionStorage.setItem('routeMode', 'true');
        sessionStorage.setItem('routePlaces', JSON.stringify(routePlaces));
        sessionStorage.setItem('routeIndex', '0');
        sessionStorage.setItem('routeLink', route.routeLink || '#');
        sessionStorage.setItem('routeTitle', (route.title || '').replace(/<br\s*\/?>/gi, ' '));
        sessionStorage.setItem('routeTotal', String(routePlaces.length));
        sessionStorage.setItem('yandexMapsLink', route.yandexMapsLink || '#');
        // Сохраняем страницу, с которой запустили маршрут (для кнопки «Назад»)
        sessionStorage.setItem('routeSource', window.location.pathname.replace(/^\//, '') + window.location.search);

        console.log('🗺️ Запуск маршрута:', routePlaces.length, 'мест');

        // Переходим к первому месту маршрута
        var first = routePlaces[0];
        window.location.href = 'place.html?id=' + encodeURIComponent(first.placeId) + '&cat=' + encodeURIComponent(first.category);
    });
}

/**
 * 6. Подстраивает скрол-зону под заголовок
 * Если заголовок занимает 1 строку — увеличиваем скрол-зону
 * на высоту одной строки, чтобы убрать лишний отступ
 * Только для ПК (ширина >= 1081px)
 */
function adjustScrollSection() {
    var titleEl = document.getElementById('routeTitle');
    var scrollEl = document.getElementById('scrollSection');
    if (!titleEl || !scrollEl) return;

    // Только для ПК (ширина >= 1081px)
    if (window.innerWidth < 1081) return;

    var titleHeight = titleEl.offsetHeight;
    var lineHeight = parseFloat(getComputedStyle(titleEl).lineHeight);
    
    if (!lineHeight || lineHeight <= 0) return;

    var lines = Math.round(titleHeight / lineHeight);

    if (lines <= 1) {
        var extraHeight = lineHeight * 1.1;
        scrollEl.style.minHeight = 'calc(100% + ' + extraHeight + 'px)';
    } else {
        scrollEl.style.minHeight = '';
    }
}