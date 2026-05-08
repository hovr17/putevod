// spa_router.js - FINAL VERSION (Robust Video + Network Retry)
console.log('spa_router.js загружен (Final Video Fix)');

class SPARouter {
    constructor() {
        this.currentPlaceId = null;
        this.currentCategory = null;
        this.PLACE_PARAM = 'id';
        this.CATEGORY_PARAM = 'cat';
        this.isAnimating = false;
        this.videoRetryCount = 0;
        this.maxVideoRetries = 2;

        // Режим маршрута
        this.routeMode = false;
        this.routePlaces = []; // [{placeId, category}, ...]
        this.routeIndex = -1;
        this.routeLink = '#';
        this.routeTitle = '';
        this.yandexMapsLink = '#';

        // Страница, с которой пришли на place.html
        this.referrerPage = 'categories.html';
    }

    /**
     * Определяет страницу-источник по document.referrer
     * и устанавливает href кнопки «Назад»
     */
    setupBackButton() {
        var backBtn = document.getElementById('backBtn');
        if (!backBtn) return;

        var referrer = document.referrer;
        var href = 'categories.html'; // fallback

        if (referrer) {
            try {
                var refUrl = new URL(referrer);
                // Проверяем, что реферер с того же хоста
                if (refUrl.hostname === window.location.hostname) {
                    // Берём только имя файла + search (без подпапки, для совместимости с GitHub Pages)
                    var filename = refUrl.pathname.split('/').pop();
                    var candidateHref = filename + refUrl.search;
                    // stories.html — подстраница, не считаем её как реферер для кнопки «Назад»
                    if (!candidateHref.startsWith('stories.html')) {
                        href = candidateHref;
                    }
                }
            } catch (e) {
                console.warn('Не удалось разобрать referrer:', e);
            }
        }

        // В режиме маршрута — назад ведёт на страницу маршрута (route.html с параметрами)
        if (this.routeMode && sessionStorage.getItem('routeLink')) {
            var routeSource = sessionStorage.getItem('routeSource');
            if (routeSource) {
                href = routeSource;
            }
        }

        this.referrerPage = href;
        backBtn.href = href;

        // Если мы в режиме маршрута — при нажатии «Назад» очищаем sessionStorage,
        // чтобы при следующем заходе из categories не остался маршрутный контекст
        if (this.routeMode) {
            backBtn.addEventListener('click', function () {
                sessionStorage.removeItem('routeMode');
                sessionStorage.removeItem('routePlaces');
                sessionStorage.removeItem('routeIndex');
                sessionStorage.removeItem('routeLink');
                sessionStorage.removeItem('routeTitle');
                sessionStorage.removeItem('routeTotal');
                sessionStorage.removeItem('yandexMapsLink');
                sessionStorage.removeItem('routeSource');
                console.log('🧹 Контекст маршрута очищен при выходе');
            });
        }

        console.log('🔙 Кнопка «Назад» ведёт на:', href);
    }

    /** Показать/скрыть кнопку "открыть маршрут в яндекс картах" */
    updateYandexMapsButton() {
        var btn = document.getElementById('yandexMapsBtn');
        if (!btn) return;

        if (!this.routeMode || !this.yandexMapsLink || this.yandexMapsLink === '#') {
            btn.style.display = 'none';
            return;
        }

        btn.style.display = 'flex';
        btn.href = this.yandexMapsLink;
    }

    /** Проверяем и загружаем контекст маршрута из sessionStorage */
    initRouteMode() {
        if (sessionStorage.getItem('routeMode') !== 'true') return false;

        try {
            this.routePlaces = JSON.parse(sessionStorage.getItem('routePlaces') || '[]');
            this.routeIndex = parseInt(sessionStorage.getItem('routeIndex') || '0', 10);
            this.routeLink = sessionStorage.getItem('routeLink') || '#';
            this.routeTitle = sessionStorage.getItem('routeTitle') || '';
            this.yandexMapsLink = sessionStorage.getItem('yandexMapsLink') || '#';
        } catch (e) {
            console.warn('Ошибка чтения контекста маршрута:', e);
            return false;
        }

        if (this.routePlaces.length === 0) return false;

        this.routeMode = true;
        console.log('🗺️ Режим маршрута активен:', this.routePlaces.length, 'мест, начинаем с', this.routeIndex);
        this.updateYandexMapsButton();
        return true;
    }

    /** Обновить индекс маршрута по текущему placeId */
    updateRouteIndex() {
        if (!this.routeMode) return;
        for (var i = 0; i < this.routePlaces.length; i++) {
            if (this.routePlaces[i].placeId === this.currentPlaceId &&
                this.routePlaces[i].category === this.currentCategory) {
                this.routeIndex = i;
                sessionStorage.setItem('routeIndex', String(i));
                return;
            }
        }
    }

    /** Показать финальный экран маршрута */
    showRouteComplete() {
        console.log('🏁 Финальный экран маршрута');
        var frame = document.getElementById('frame');
        var completeScreen = document.getElementById('routeCompleteScreen');
        if (!frame || !completeScreen) return;

        // Скрываем всё содержимое place.html
        var screen = frame.querySelector('.screen');
        var storiesProgress = document.getElementById('storiesProgress');
        var navArrows = document.getElementById('templeNavArrows');
        var backBtn = document.getElementById('backBtn');

        if (screen) screen.style.display = 'none';
        if (storiesProgress) storiesProgress.style.display = 'none';
        if (navArrows) navArrows.style.display = 'none';

        // Скрываем кнопку Яндекс Карт
        var yandexBtn = document.getElementById('yandexMapsBtn');
        if (yandexBtn) yandexBtn.style.display = 'none';

        // Скрываем видео
        var bgVideo = document.getElementById('bgVideo');
        var videoPoster = document.getElementById('videoPoster');
        if (bgVideo) bgVideo.style.display = 'none';
        if (videoPoster) videoPoster.style.background = 'white';

        // Скрываем обычную кнопку «Назад» (есть отдельная для финального экрана)
        if (backBtn) backBtn.style.display = 'none';

        // Заполняем данные финального экрана
        var titleEl = completeScreen.querySelector('.route-complete-title');
        var mapBtn = completeScreen.querySelector('.route-complete-map-btn');
        var placesBtn = completeScreen.querySelector('.route-complete-places-btn');
        var backToPlaceBtn = document.getElementById('routeCompleteBackBtn');

        if (titleEl) titleEl.innerHTML = this.routeTitle || 'МАРШРУТ<br>ПРОЙДЕН';

        // Кнопка «ОТКРЫТЬ В ЯНДЕКС КАРТАХ»
        if (mapBtn) {
            var self = this;
            mapBtn.onclick = function () {
                var link = sessionStorage.getItem('yandexMapsLink') || self.routeLink || '#';
                window.location.href = link;
            };
        }

        // Кнопка «ВЕРНУТЬСЯ К ВЫБОРУ МАРШРУТА»
        if (placesBtn) {
            placesBtn.onclick = function () {
                // Очищаем контекст маршрута
                sessionStorage.removeItem('routeMode');
                sessionStorage.removeItem('routePlaces');
                sessionStorage.removeItem('routeIndex');
                sessionStorage.removeItem('routeLink');
                sessionStorage.removeItem('routeTitle');
 sessionStorage.removeItem('routeTotal');
                sessionStorage.removeItem('yandexMapsLink');
                sessionStorage.removeItem('routeSource');
                window.location.href = 'plan_walk.html';
            };
        }

        // Кнопка «Назад» — скрыть финальный экран и вернуться к последнему месту
        if (backToPlaceBtn) {
            var self = this;
            backToPlaceBtn.onclick = function (e) {
                e.preventDefault();
                self.hideRouteComplete();
            };
        }

        // Показываем финальный экран
        completeScreen.style.display = 'flex';
        frame.classList.remove('mode-intro', 'mode-details');
        frame.classList.add('route-complete-active');
        document.title = 'Маршрут пройден — Путеводитель по Суздалю';
    }

    /** Скрыть финальный экран и вернуться к просмотру последнего места */
    hideRouteComplete() {
        console.log('🔙 Скрытие финального экрана, возврат к последнему месту');
        var frame = document.getElementById('frame');
        var completeScreen = document.getElementById('routeCompleteScreen');
        if (!frame || !completeScreen) return;

        // 1. Скрываем финальный экран
        completeScreen.style.display = 'none';

        // 2. Показываем все элементы place.html обратно
        var screen = frame.querySelector('.screen');
        var storiesProgress = document.getElementById('storiesProgress');
        var navArrows = document.getElementById('templeNavArrows');
        var backBtn = document.getElementById('backBtn');
        var bgVideo = document.getElementById('bgVideo');
        var videoPoster = document.getElementById('videoPoster');

        if (screen) screen.style.display = '';
        if (storiesProgress) storiesProgress.style.display = '';
        if (navArrows) navArrows.style.display = '';
        if (backBtn) backBtn.style.display = '';
        if (bgVideo) bgVideo.style.display = '';
        if (videoPoster) videoPoster.style.background = '';

        // 3. Восстанавливаем режим фрейма
        frame.classList.remove('route-complete-active');
        frame.classList.add('mode-intro');

        // 4. Устанавливаем индекс маршрута на последнее место
        this.routeIndex = this.routePlaces.length - 1;
        sessionStorage.setItem('routeIndex', String(this.routeIndex));

        // 5. Обновляем UI: полоски прогресса, стрелки, кнопка Яндекс Карт
        this.updateYandexMapsButton();

        if (window.pagesManager && typeof window.pagesManager.updateStoriesProgress === 'function') {
            window.pagesManager.updateStoriesProgress();
        }
        if (window.updateNavArrows) {
            window.updateNavArrows();
        }

        document.title = window.pagesManager.config?.title || 'Путеводитель по Суздалю';
    }

    getParamsFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const placeId = urlParams.get(this.PLACE_PARAM);
        const category = urlParams.get(this.CATEGORY_PARAM) || 'religious';
        
        if (!placeId && window.PAGE_ORDER_BY_CATEGORY?.[category]) {
            return {
                placeId: window.PAGE_ORDER_BY_CATEGORY[category][0],
                category: category
            };
        }
        
        return { placeId, category };
    }

    updateURL(placeId, category) {
        const newUrl = `${window.location.pathname}?${this.PLACE_PARAM}=${placeId}&${this.CATEGORY_PARAM}=${category}`;
        window.history.pushState({ placeId, category }, '', newUrl);
        document.title = window.pagesManager.config?.title || '';
    }

    setupPopStateHandler() {
        window.addEventListener('popstate', (event) => {
            console.log('🔄 Popstate:', event.state);
            this.isAnimating = false;
            
            if (event.state?.placeId && event.state?.category) {
                this.navigateToPlace(event.state.placeId, event.state.category, false, 'prev');
            }
        });
    }

    navigateToPlace(placeId, category, updateHistory = true, direction = 'next') {
        if (!placeId) {
            console.error('❌ ID места не указан');
            return false;
        }

        // В режиме маршрута — проверяем выход за границы
        if (this.routeMode) {
            if (direction === 'next' && this.routeIndex >= this.routePlaces.length - 1) {
                // После последнего места — финальный экран
                this.showRouteComplete();
                return true;
            }
        }

        if (placeId === this.currentPlaceId && category === this.currentCategory) {
            console.log('⏳ Уже на этом месте:', placeId);
            return true;
        }

        if (this.isAnimating) {
            console.warn('⏳ Анимация уже выполняется, пропуск');
            return false;
        }

        console.log(`🚀 Навигация к: ${placeId} (категория: ${category}, направление: ${direction})`);

        const isMobile = window.innerWidth <= 1080;
        const useAnimation = isMobile && updateHistory;
        const frame = document.getElementById('frame');

        try {
            const config = getPlaceConfig(placeId, category);
            if (!config) {
                console.error(`❌ Конфиг для ${placeId}/${category} не найден`);
                return false;
            }

            const completeNavigation = () => {
                this.currentPlaceId = placeId;
                this.currentCategory = category;
                this.isAnimating = false;

                // Обновляем индекс маршрута
                this.updateRouteIndex();

                window.pagesManager.setPlaceId(placeId, category);
                window.pagesManager.applyConfig();

                // 📱 ЗАГРУЗКА ВИДЕО (Без fetch, с обработкой сетевых ошибок)
                this.loadVideoSafe();

               window.pagesManager.updateStoriesProgress();

                if (updateHistory) {
                    this.updateURL(placeId, category);
                }

                if (typeof window.initializeMenu === 'function') {
                    window.initializeMenu();
                }

                if (window.updateNavArrows) {
                    window.updateNavArrows();
                }

                console.log(`✅ Переход к ${placeId} завершен`);
            };

            if (useAnimation && frame) {
                this.isAnimating = true;
                console.log('📚 Запуск анимации Layered Parallax');
                
                frame.classList.remove(
                    'page-exit-parallax-left', 'page-exit-parallax-right', 
                    'page-enter-parallax-left', 'page-enter-parallax-right'
                );
                
                const exitClass = direction === 'next' ? 'page-exit-parallax-left' : 'page-exit-parallax-right';
                frame.classList.add(exitClass);
                
                setTimeout(() => {
                    completeNavigation();
                    
                    frame.classList.remove(exitClass);
                    const enterClass = direction === 'next' ? 'page-enter-parallax-left' : 'page-enter-parallax-right';
                    frame.classList.add(enterClass);
                    
                    setTimeout(() => {
                        frame.classList.remove(enterClass);
                    }, 800);
                }, 150);
            } else {
                completeNavigation();
            }

            return true;

        } catch (error) {
            console.error(`❌ Ошибка перехода к ${placeId}:`, error);
            this.isAnimating = false;
            return false;
        }
    }

    // 🆕 БЕЗОПАСНАЯ ЗАГРУЗКА ВИДЕО (С Retry для сетевых ошибок)
    loadVideoSafe() {
        const bgVideo = document.getElementById('bgVideo');
        const videoPoster = document.getElementById('videoPoster');
        
        if (!bgVideo) return;
        
        const videoSrc = window.pagesManager.config?.video?.src;
        const posterSrc = window.pagesManager.config?.video?.poster;
        
        console.log('🎬 Начало загрузки видео:', videoSrc);
        
        // 1. Если видео нет в конфиге -> показываем постер
        if (!videoSrc) {
            console.log('⚠️ Видео не указано в конфиге');
            this.showFallback(posterSrc);
            return;
        }

        let loadAttempts = 0;
        const maxLoadRetries = 3; // Количество попыток загрузки файла при сетевых ошибках

        const attemptLoad = () => {
            // Сбрасываем обработчики перед каждой попыткой, чтобы избежать дублей
            bgVideo.onloadeddata = null;
            bgVideo.onerror = null;
            
            // 2. Полный сброс предыдущего состояния
            bgVideo.pause();
            bgVideo.removeAttribute('src'); 
            bgVideo.load(); // Сбрасываем внутренний буфер

            // 3. Показываем постер на время загрузки
            if (posterSrc) {
                videoPoster.style.backgroundImage = `url('${posterSrc}')`;
                videoPoster.style.backgroundSize = 'cover';
                videoPoster.style.backgroundPosition = 'center';
                videoPoster.style.display = 'block';
            } else {
                videoPoster.style.display = 'none';
            }

            // 4. Устанавливаем параметры
            bgVideo.src = videoSrc;
            bgVideo.poster = posterSrc || '';
            
            bgVideo.muted = true;
            bgVideo.loop = (window.pagesManager.config?.video?.loop !== false);
            bgVideo.playsInline = true;
            bgVideo.webkitPlaysInline = true;
            bgVideo.preload = 'auto';
            
            // 5. Обработчик удачной загрузки данных
            bgVideo.onloadeddata = () => {
                console.log('✅ Видео данные загружены (loadeddata)');
                if (videoPoster) videoPoster.style.display = 'none';
                this.playVideoWithRetry(bgVideo);
            };

            // 6. Обработчик ошибки С АВТОПОВТОРОМ
            bgVideo.onerror = (e) => {
                const error = bgVideo.error;
                const errorCode = error ? error.code : 0;
                
                // MEDIA_ERR_NETWORK = 2, MEDIA_ERR_DECODE = 3
                const isNetworkError = errorCode === 2 || errorCode === 3;

                if (isNetworkError && loadAttempts < maxLoadRetries) {
                    loadAttempts++;
                    console.warn(`⚠️ Ошибка загрузки (Code: ${errorCode}), попытка ${loadAttempts} из ${maxLoadRetries} через 500мс...`);
                    
                    // Ждем и пробуем снова
                    setTimeout(() => {
                        attemptLoad();
                    }, 500); // Задержка 500мс
                } else {
                    console.error('❌ Фатальная ошибка загрузки видео или превышен лимит попыток:', error);
                    this.showFallback(posterSrc);
                }
            };

            bgVideo.load();
        };

        // Запускаем первую попытку
        attemptLoad();
    }

    // Попытка воспроизведения с ретраем (для обработки блокировок автоплея)
    playVideoWithRetry(video) {
        const tryPlay = () => {
            video.play().then(() => {
                console.log('✅ Видео воспроизводится');
                this.videoRetryCount = 0;
            }).catch((err) => {
                console.warn('⚠️ Воспроизведение блокировано или ошибка:', err.name, err.message);
                
                if (this.videoRetryCount < this.maxVideoRetries) {
                    this.videoRetryCount++;
                    console.log(`🔄 Повторная попытка воспроизведения ${this.videoRetryCount}...`);
                    setTimeout(tryPlay, 200 * this.videoRetryCount);
                } else {
                    // Если все попытки провалились — показываем постер
                    console.error('❌ Не удалось воспроизвести видео после нескольких попыток');
                    this.showFallback(video.poster);
                }
            });
        };
        
        tryPlay();
    }

    // Показываем постер вместо видео
    showFallback(posterSrc) {
        const bgVideo = document.getElementById('bgVideo');
        const videoPoster = document.getElementById('videoPoster');
        
        if (!bgVideo || !videoPoster) return;
        
        console.log('🖼️ Показываем постер как fallback');
        
        // Скрываем видео
        bgVideo.pause();
        bgVideo.style.display = 'none';
        
        // Показываем постер
        if (posterSrc) {
            videoPoster.style.backgroundImage = `url('${posterSrc}')`;
            videoPoster.style.backgroundSize = 'cover';
            videoPoster.style.backgroundPosition = 'center';
            videoPoster.style.display = 'block';
        } else {
            // Если нет постера, можно показать черный фон
            videoPoster.style.backgroundColor = '#000';
            videoPoster.style.display = 'block';
        }
    }

    async init() {
        await new Promise(resolve => {
            const check = () => {
                if (window.CATEGORIES && window.PAGE_ORDER_BY_CATEGORY && window.pagesManager) {
                    resolve();
                } else {
                    setTimeout(check, 50);
                }
            };
            check();
        });

        // Инициализируем режим маршрута (если пришёл из route.html)
        this.initRouteMode();

        // Устанавливаем кнопку «Назад» на страницу-источник
        this.setupBackButton();

        const params = this.getParamsFromURL();
        await this.navigateToPlace(params.placeId, params.category, false);

        this.setupPopStateHandler();

        console.log('✅ SPA Router (Final Video Fix) готов', this.routeMode ? '(режим маршрута)' : '');
    }
}

window.spaRouter = new SPARouter();

window.navigateToPrevPlace = function() {
    const frame = document.getElementById('frame');
    if (frame && frame.classList.contains('mode-details')) return;
    if (window.spaRouter?.isAnimating) return;

    // === Режим маршрута: навигация по местам маршрута ===
    if (window.spaRouter?.routeMode) {
        var idx = window.spaRouter.routeIndex;
        if (idx <= 0) {
            console.log('🗺️ Это первое место маршрута');
            return;
        }
        var prev = window.spaRouter.routePlaces[idx - 1];
        window.spaRouter.navigateToPlace(prev.placeId, prev.category, true, 'prev');
        return;
    }
    // === Обычный режим ===
    
    const order = getCurrentPageOrder(window.spaRouter?.currentCategory);
    const currentIndex = order.indexOf(window.spaRouter?.currentPlaceId);
    
    // Если в категории только одна страница — ничего не делаем
    if (order.length <= 1) {
        console.log('🎯 В категории только одна страница');
        return;
    }
    
    // Бесконечная лента: если на первой странице, переходим к последней
    const targetIndex = currentIndex === 0 ? order.length - 1 : currentIndex - 1;
    const prevId = order[targetIndex];
    
    window.spaRouter.navigateToPlace(prevId, window.spaRouter.currentCategory, true, 'prev');
};

window.navigateToNextPlace = function() {
    const frame = document.getElementById('frame');
    if (frame && frame.classList.contains('mode-details')) return;
    if (window.spaRouter?.isAnimating) return;

    // === Режим маршрута: навигация по местам маршрута ===
    if (window.spaRouter?.routeMode) {
        var idx = window.spaRouter.routeIndex;
        if (idx >= window.spaRouter.routePlaces.length - 1) {
            // Последнее место — показываем финальный экран
            window.spaRouter.showRouteComplete();
            return;
        }
        var next = window.spaRouter.routePlaces[idx + 1];
        window.spaRouter.navigateToPlace(next.placeId, next.category, true, 'next');
        return;
    }
    // === Обычный режим ===
    
    const order = getCurrentPageOrder(window.spaRouter?.currentCategory);
    const currentIndex = order.indexOf(window.spaRouter?.currentPlaceId);
    
    // Если в категории только одна страница — ничего не делаем
    if (order.length <= 1) {
        console.log('🎯 В категории только одна страница');
        return;
    }
    
    // Бесконечная лента: если на последней странице, переходим к первой
    const targetIndex = currentIndex === order.length - 1 ? 0 : currentIndex + 1;
    const nextId = order[targetIndex];
    
    window.spaRouter.navigateToPlace(nextId, window.spaRouter.currentCategory, true, 'next');
};

document.addEventListener('DOMContentLoaded', () => {
    window.spaRouter.init();

});
