// categories_config.js - Центральный реестр
console.log('categories_config.js загружен');

const PAGE_ORDER_BY_CATEGORY = {
    'museum': [
        'kreml','SpasoEvfimiev_monastery','derevannoe_zodchestvo','rezidencia','dom_balzaminova','dinnikov','collider','larec','museum_vrema_steklo','museum_voskovih_figur','museum_mishka','posadskiy_dom'
    ],
    'religious': [
        'Pokrovsky_monastery', 'SpasoEvfimiev_monastery', 'Rizopolozhenskiy_monastery', 'Aleksandrovskiy_monastery', 'Vasilevskiy_monastery', 'Voskresenskiy', 'Kazanskiy', 'KrestoNikolskiy', 'IoannaPredtechi',
         'Pyatneckiy', 'Nikolskiy', 'Uspenskiy', 'FloraLavri', 'Lazarevskiy', 'Znamenskiy', 'Ilya_Prorok', 'Smolenskiy', 'Bogoyavlenskiy', 'BorisaGleba', 'KosmiDamiana'
    ],
    'entertainment': [
        'aqua','rechniye_progulki','arenda_katamaranov','torgovie_ryadi','torgovie_lavki_centre','churovo_gorodiche','centre_narodnogo_tvorchestva',  'torgovie_lavki', 'podvorye_masterov','progulka_v_karete','collider','arena','neskuchniy_museum',
        'galki','myra_centre','freska_naboyka','gorshechna','dymov_keramika'
    ],
    'nature': [
        'smotrovaya_zaradye','Kremlevskie_vali','gorodskoy_sad','smotrovaya_na_lug','Ilinskiy_lug','smotrovaya_SpasoEvfimiev','most','skver_Pozharskogo','smotrovaya_podvorye','smotrovaya_gasteva','smotrovaya_Alexandrovskiy'
    ]
};

function getCurrentPageOrder(category) {
    return PAGE_ORDER_BY_CATEGORY[category] || [];
}

function getPlaceConfig(placeId, category) {
    if (!category || !window.CATEGORIES?.[category]) {
        console.error('❌ Категория не найдена:', category);
        return null;
    }
    return window.CATEGORIES[category][placeId] || null;
}

function isBottomMenuOpen() {
    const frame = document.getElementById('frame');
    return frame && frame.classList.contains('mode-details');
}

function navigateToPrevPlace() {
    if (isBottomMenuOpen() || window.spaRouter?.isAnimating) return;
    
    const order = getCurrentPageOrder(window.spaRouter?.currentCategory);
    const currentIndex = order.indexOf(window.spaRouter?.currentPlaceId);
    
    if (currentIndex > 0) {
        const prevId = order[currentIndex - 1];
        window.spaRouter?.navigateToPlace(prevId, window.spaRouter.currentCategory);
    }
}

function navigateToNextPlace() {
    if (isBottomMenuOpen() || window.spaRouter?.isAnimating) return;
    
    const order = getCurrentPageOrder(window.spaRouter?.currentCategory);
    const currentIndex = order.indexOf(window.spaRouter?.currentPlaceId);
    
    if (currentIndex < order.length - 1) {
        const nextId = order[currentIndex + 1];
        window.spaRouter?.navigateToPlace(nextId, window.spaRouter.currentCategory);
    }
}

function updateNavArrows() {
    const currentId = window.spaRouter?.currentPlaceId;
    const category = window.spaRouter?.currentCategory;
    const prevArrow = document.getElementById('templePrevArrow');
    const nextArrow = document.getElementById('templeNextArrow');
    const frame = document.getElementById('frame');

    if (!prevArrow || !nextArrow || !currentId || !category) {
        console.warn('⚠️ Стрелки или параметры не найдены');
        return;
    }

    // На мобильных устройствах скрываем стрелки
    if (window.innerWidth <= 1080) {
        prevArrow.style.display = 'none';
        nextArrow.style.display = 'none';
        return;
    }

    const isDetailsMode = frame && frame.classList.contains('mode-details');
    const order = getCurrentPageOrder(category);
    const hasMultiplePages = order.length > 1;

    if (isDetailsMode) {
        // В режиме details скрываем стрелки
        prevArrow.style.display = 'none';
        nextArrow.style.display = 'none';
        prevArrow.style.pointerEvents = 'none';
        nextArrow.style.pointerEvents = 'none';
    } else {
        // Для бесконечной ленты показываем стрелки всегда, если страниц больше 1
        if (hasMultiplePages) {
            prevArrow.style.display = 'flex';
            nextArrow.style.display = 'flex';
            
            // Всегда активные стрелки
            prevArrow.classList.remove('hidden');
            nextArrow.classList.remove('hidden');
            prevArrow.style.opacity = '0.7';
            nextArrow.style.opacity = '0.7';
            prevArrow.style.pointerEvents = 'auto';
            nextArrow.style.pointerEvents = 'auto';
            prevArrow.style.cursor = 'pointer';
            nextArrow.style.cursor = 'pointer';
            
            // Устанавливаем обработчики
            prevArrow.onclick = navigateToPrevPlace;
            nextArrow.onclick = navigateToNextPlace;
        } else {
            // Если только одна страница, скрываем стрелки
            prevArrow.style.display = 'none';
            nextArrow.style.display = 'none';
        }
    }
}

window.PAGE_ORDER_BY_CATEGORY = PAGE_ORDER_BY_CATEGORY;
window.getCurrentPageOrder = getCurrentPageOrder;
window.getPlaceConfig = getPlaceConfig;
window.navigateToPrevPlace = navigateToPrevPlace;
window.navigateToNextPlace = navigateToNextPlace;
window.updateNavArrows = updateNavArrows;

window.CATEGORIES = {
    'religious': typeof RELIGIOUS_PLACES !== 'undefined' ? RELIGIOUS_PLACES : {},
    'museum': typeof MUSEUM_PLACES !== 'undefined' ? MUSEUM_PLACES : {},
    'entertainment': typeof ENTERTAINMENT_PLACES !== 'undefined' ? ENTERTAINMENT_PLACES : {},
    'nature': typeof NATURE_PLACES !== 'undefined' ? NATURE_PLACES : {}
};

console.log('✅ window.CATEGORIES инициализирован:', Object.keys(window.CATEGORIES));