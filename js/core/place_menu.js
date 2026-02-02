console.log('place_menu.js загружен');

let mode = "intro";
let isAnimating = false;
let touchStartX = null;
let touchStartY = null;
let isHorizontalSwipe = false;
const SWIPE_THRESHOLD = 50;

// =============================================================================
// SWIPE HINT SYSTEM (Подсказка свайпа после бездействия)
// =============================================================================
let inactivityTimer = null;
const INACTIVITY_DELAY = 7000; // 7 секунд
let isHintShowing = false;

/**
 * Запускает таймер бездействия
 */
function startInactivityTimer() {
    // Очищаем предыдущий таймер
    if (inactivityTimer) {
        clearTimeout(inactivityTimer);
        inactivityTimer = null;
    }
    
    // Не запускаем, если:
    // - Меню открыто (details)
    // - Идет анимация перехода
    // - Нет следующей страницы (всего 1 страница в категории)
    if (mode === 'details' || isAnimating || window.spaRouter?.isAnimating) {
        return;
    }
    
    // Проверяем, есть ли страницы для свайпа
    const order = getCurrentPageOrder(window.spaRouter?.currentCategory);
    if (!order || order.length <= 1) return; // Только одна страница - не показываем подсказку
    
    inactivityTimer = setTimeout(() => {
        showSwipeHint();
    }, INACTIVITY_DELAY);
}

/**
 * Сбрасывает таймер и убирает подсказку
 */
function resetInactivityTimer() {
    if (inactivityTimer) {
        clearTimeout(inactivityTimer);
        inactivityTimer = null;
    }
    
    // Убираем анимацию подсказки, если она активна
    if (isHintShowing) {
        hideSwipeHint();
    }
    
    // Перезапускаем таймер снова
    startInactivityTimer();
}

/**
 * Показывает анимацию-подсказку свайпа
 */
function showSwipeHint() {
    if (isHintShowing || mode === 'details' || isAnimating || window.spaRouter?.isAnimating) {
        return;
    }
    
    const frame = document.getElementById('frame');
    if (!frame) return;
    
    // Проверяем еще раз, что мы в режиме intro
    if (frame.classList.contains('mode-details')) return;
    
    isHintShowing = true;
    frame.classList.add('swipe-hint-active');
    
    console.log('💡 Показана подсказка свайпа (7 сек бездействия)');
    
    // Автоматически убираем класс после окончания анимации (1.4s = 2 цикла по 0.7s)
    setTimeout(() => {
        hideSwipeHint();
    }, 1400);
}

/**
 * Скрывает подсказку
 */
function hideSwipeHint() {
    if (!isHintShowing) return;
    
    const frame = document.getElementById('frame');
    if (frame) {
        frame.classList.remove('swipe-hint-active');
    }
    isHintShowing = false;
}

/**
 * Настраивает отслеживание активности пользователя
 */
function setupInactivityTracking() {
    // События, которые считаются активностью и сбрасывают таймер
    const events = ['touchstart', 'touchmove', 'click', 'scroll', 'keydown', 'wheel'];
    
    const resetHandler = () => {
        resetInactivityTimer();
    };
    
    events.forEach(event => {
        document.addEventListener(event, resetHandler, { passive: true });
    });
    
    // При уходе с вкладки останавливаем таймер
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Вкладка неактивна - очищаем таймер
            if (inactivityTimer) {
                clearTimeout(inactivityTimer);
                inactivityTimer = null;
            }
        } else {
            // Вернулись на вкладку - запускаем заново
            startInactivityTimer();
        }
    });
    
    // Добавляем очистку в registry
    cleanupRegistry.add(() => {
        if (inactivityTimer) clearTimeout(inactivityTimer);
        events.forEach(event => {
            document.removeEventListener(event, resetHandler);
        });
    });
}

// =============================================================================
// СИСТЕМА ОЧИСТКИ (для SPA)
// =============================================================================

const cleanupRegistry = {
    handlers: [],
    observers: [],
    timeouts: [],
    
    add(handler) {
        this.handlers.push(handler);
    },
    
    clear() {
        this.handlers.forEach(fn => {
            try { fn(); } catch(e) { console.error('Cleanup error:', e); }
        });
        this.handlers = [];
        
        this.observers.forEach(obs => {
            try { obs.disconnect(); } catch(e) {}
        });
        this.observers = [];
        
        this.timeouts.forEach(id => clearTimeout(id));
        this.timeouts = [];
        
        console.log('🧹 Cleanup выполнен');
    },
    
    setTimeout(fn, delay) {
        const id = setTimeout(fn, delay);
        this.timeouts.push(id);
        return id;
    },
    
    observe(observer) {
        this.observers.push(observer);
    }
};

// =============================================================================
// МИНИМАЛЬНАЯ ПРОВЕРКА БРАУЗЕРА
// =============================================================================

function isYandexBrowser() {
    return /YaBrowser/i.test(navigator.userAgent);
}

// =============================================================================
// АВТОМАТИЧЕСКАЯ КОРРЕКЦИЯ ОБРЕЗАНИЙ ДЛЯ МОБИЛЬНЫХ
// =============================================================================

function correctMobileUI() {
    if (window.innerWidth > 1080) return false;
    
    const screen = document.querySelector('.screen');
    if (!screen) return false;
    
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isIOS) {
        screen.style.paddingBottom = 'env(safe-area-inset-bottom, 20px)';
        console.log('📱 iOS: применен env() для коррекции Safe Area');
        return true;
    }
    
    if (window.visualViewport) {
        const updatePadding = () => {
            const viewportHeight = window.visualViewport.height;
            const windowHeight = window.innerHeight;
            const uiHeight = Math.max(0, windowHeight - viewportHeight);
            
            if (uiHeight > 0) {
                screen.style.paddingBottom = (uiHeight + 20) + 'px';
            } else {
                screen.style.paddingBottom = '0px';
            }
        };
        
        updatePadding();
        
        window.visualViewport.addEventListener('resize', updatePadding);
        cleanupRegistry.add(() => {
            window.visualViewport.removeEventListener('resize', updatePadding);
        });
        
        window.addEventListener('orientationchange', () => {
            const timeoutId = setTimeout(updatePadding, 100);
            cleanupRegistry.timeouts.push(timeoutId);
        });
        
        console.log('📱 Android: активен динамический фолбек');
        return true;
    }
    
    screen.style.paddingBottom = '60px';
    console.log('📱 Применен фиксированный padding-bottom = 60px');
    return true;
}

// =============================================================================
// УПРАВЛЕНИЕ ВИДИМОСТЬЮ КНОПОК НАВИГАЦИИ
// =============================================================================

function updateNavigationVisibility() {
    if (window.innerWidth <= 1080) return;

    const navArrows = document.querySelectorAll('.temple-nav-arrow, .nav-arrow, .arrow');
    const isMenuOpen = (mode === "details");

    navArrows.forEach(btn => {
        btn.style.transition = 'opacity 0.3s ease, visibility 0.3s';
        
        if (isMenuOpen) {
            btn.style.opacity = '0';
            btn.style.pointerEvents = 'none';
        } else {
            btn.style.opacity = '';
            btn.style.pointerEvents = 'auto';
        }
    });
}

// =============================================================================
// ОСНОВНАЯ ЛОГИКА МЕНЮ
// =============================================================================

function setMode(newMode, { expandUseful = false, scrollToBottom = false } = {}) {
    if (mode === newMode || isAnimating) return;
    
    console.log('Смена режима с', mode, 'на', newMode);
    isAnimating = true;
    mode = newMode;

    // Управление таймером бездействия (SWIPE HINT)
    if (newMode === 'details') {
        // Меню открыто - останавливаем таймер подсказки
        if (inactivityTimer) {
            clearTimeout(inactivityTimer);
            inactivityTimer = null;
        }
        hideSwipeHint();
    } else {
        // Меню закрыто - запускаем таймер
        startInactivityTimer();
    }

    // === ИЗМЕНЕНИЕ: Управление тегами <br> ===
    adjustTitleBreaks(newMode);
    // =========================================

    if (newMode === 'details') {
        sessionStorage.setItem('menuState', 'open');
    } else if (newMode === 'intro') {
        sessionStorage.setItem('menuState', 'closed');
    }

    const frame = document.getElementById('frame');
    const bgVideo = document.getElementById('bgVideo');
    const videoPoster = document.getElementById('videoPoster');
    const scrollZone = document.getElementById('scrollZone');
    const addressDrop = document.getElementById('addressDrop');
    const usefulDrop = document.getElementById('usefulDrop');
    
    // Применяем стили к videoPoster (белый фон)
    if (videoPoster) {
        if (newMode === 'details') {
            videoPoster.style.setProperty('background', 'white', 'important');
            videoPoster.style.setProperty('display', 'block', 'important');
            videoPoster.style.setProperty('transition', 'none', 'important');
        } else {
            videoPoster.style.setProperty('background', 'transparent', 'important');
            videoPoster.style.setProperty('display', 'none', 'important');
        }
    }
    
    if (bgVideo) {
        bgVideo.style.setProperty('filter', (newMode === 'details') ? 'blur(5px)' : 'none', 'important');
    }
    
    if (mode === "details") {
        frame?.classList.remove("mode-intro");
        frame?.classList.add("mode-details");
        
        scrollZone?.classList.add('animating');
        
        if (bgVideo) bgVideo.pause();
        
        // Создаем белую полосу снизу если нужно
        let bottomStripe = document.getElementById('videoBottomStripe');
        if (!bottomStripe && videoPoster) {
            bottomStripe = document.createElement('div');
            bottomStripe.id = 'videoBottomStripe';
            bottomStripe.style.cssText = `
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 80px;
                background: white;
                z-index: 3;
                pointer-events: none;
            `;
            videoPoster.appendChild(bottomStripe);
        }
        
        if (expandUseful && usefulDrop) {
            cleanupRegistry.setTimeout(() => {
                usefulDrop.classList.add("open");
                sessionStorage.setItem('usefulDropdownState', 'open');
                
                // 🆕 Автоматическая прокрутка до самого низа
                if (scrollToBottom) {
                    cleanupRegistry.setTimeout(() => {
                        if (scrollZone) {
                            scrollZone.scrollTo({
                                top: scrollZone.scrollHeight,
                                behavior: 'smooth'
                            });
                        }
                    }, 300); // Задержка для завершения анимации раскрытия дропдауна
                }
            }, 1);
        }
        
        cleanupRegistry.setTimeout(() => {
            scrollZone?.classList.remove('animating');
            isAnimating = false;
        }, 1000);
    } else {
        frame?.classList.remove("mode-details");
        frame?.classList.add("mode-intro");
        
        scrollZone?.classList.add('animating');
        
        // Удаляем белую полосу снизу
        const bottomStripe = document.getElementById('videoBottomStripe');
        if (bottomStripe) bottomStripe.remove();
        
        if (bgVideo) {
            bgVideo.pause(); 
            requestAnimationFrame(() => {
                if (mode === 'intro') bgVideo.play().catch(() => {});
            });
        }
        
        smoothScrollTo(0, 700);
        if (addressDrop) addressDrop.classList.remove("open");
        if (usefulDrop) usefulDrop.classList.remove("open");
        sessionStorage.removeItem('usefulDropdownState');
        
        cleanupRegistry.setTimeout(() => {
            scrollZone?.classList.remove('animating');
            isAnimating = false;
        }, 500);
    }

    updateNavigationVisibility();
    
    cleanupRegistry.setTimeout(() => {
        if (window.updateNavArrows) {
            window.updateNavArrows();
        }
    }, 50);
}

function smoothScrollTo(targetY, duration = 700) {
    const scrollZone = document.getElementById('scrollZone');
    if (!scrollZone) return;
    
    const startY = scrollZone.scrollTop;
    const distance = targetY - startY;
    const startTime = performance.now();
    
    function easeInOut(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }
    
    function step(now) {
        const elapsed = now - startTime;
        const t = Math.min(1, elapsed / duration);
        const eased = easeInOut(t);
        scrollZone.scrollTop = startY + distance * eased;
        if (t < 1) requestAnimationFrame(step);
    }
    
    requestAnimationFrame(step);
}

// =============================================================================
// ОХРАНА ВИДЕО ОТ ЯНДЕКС БРАУЗЕРА
// =============================================================================

function setupVideoGuards() {
    const bgVideo = document.getElementById('bgVideo');
    if (!bgVideo) return;

    const guardPlay = () => {
        if (mode === 'details') {
            console.log('🛡️ Попытка автозапуска в режиме "details" -> ПАУЗА');
            bgVideo.pause();
        }
    };

    bgVideo.addEventListener('play', guardPlay);
    cleanupRegistry.add(() => bgVideo.removeEventListener('play', guardPlay));
}

// =============================================================================
// ОБРАБОТЧИКИ СВАЙПОВ И СКРОЛЛА
// =============================================================================

function setupSwipeHandlers() {
    const scrollZone = document.getElementById('scrollZone');
    if (!scrollZone) return;
    
    let isSwipeInProgress = false;
    let initialScrollTop = 0;
    
    function onTouchStart(e) {
        if (isAnimating || window.spaRouter?.isAnimating) return;
        
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        isHorizontalSwipe = false;
        isSwipeInProgress = false;
        initialScrollTop = scrollZone.scrollTop;
    }
    
    function onTouchMove(e) {
        if (!touchStartX || !touchStartY || isAnimating || window.spaRouter?.isAnimating) return;
        
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        const deltaX = touchX - touchStartX;
        const deltaY = touchY - touchStartY;
        
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 20) {
            isHorizontalSwipe = true;
            isSwipeInProgress = true;
            
            if (e.cancelable) e.preventDefault();
        }
        
        if (mode === "details" && deltaY > 0 && !isHorizontalSwipe && initialScrollTop <= 0) {
            if (e.cancelable) e.preventDefault();
        }
    }
    
    function onTouchEnd(e) {
        if (!touchStartX || !touchStartY || isAnimating || window.spaRouter?.isAnimating) return;
        
        const touchX = e.changedTouches[0].clientX;
        const touchY = e.changedTouches[0].clientY;
        
        const deltaX = touchX - touchStartX;
        const deltaY = touchY - touchStartY;
        
        const isVerticalSwipe = Math.abs(deltaY) > Math.abs(deltaX);
        
        if (mode === "details" && deltaY > 30 && isVerticalSwipe && !isHorizontalSwipe) {
            const scrollTop = scrollZone.scrollTop;
            const swipeStartedAtTop = touchStartY < window.innerHeight * 0.25;
            
            if (scrollTop <= 0 || swipeStartedAtTop) {
                if (e.cancelable) e.preventDefault();
                setMode("intro");
                console.log('⬇️ Свайп вниз - закрытие меню');
            }
        } else if (mode === "intro" && deltaY < -30 && isVerticalSwipe && !isHorizontalSwipe) {
            if (e.cancelable) e.preventDefault();
            setMode("details");
            console.log('⬆️ Свайп вверх - открытие меню');
        } else if (isHorizontalSwipe && Math.abs(deltaX) > SWIPE_THRESHOLD && isSwipeInProgress) {
            e.preventDefault();
            
            const order = getCurrentPageOrder(window.spaRouter?.currentCategory);
            if (order.length <= 1) {
                console.log('🎯 В категории только одна страница, свайп не работает');
                touchStartX = null;
                touchStartY = null;
                isHorizontalSwipe = false;
                isSwipeInProgress = false;
                return;
            }
            
            if (deltaX > 0) {
                console.log('➡️ Свайп вправо, переход к предыдущей странице');
                navigateToPrevPlace();
            } else {
                console.log('⬅️ Свайп влево, переход к следующей странице');
                navigateToNextPlace();
            }
        }
        
        touchStartX = null;
        touchStartY = null;
        isHorizontalSwipe = false;
        isSwipeInProgress = false;
    }
    
    function onWheel(e) {
        if (isAnimating) {
            if (e.cancelable) e.preventDefault();
            return;
        }
        
        if (mode === "intro" && e.deltaY > 10) {
            if (e.cancelable) e.preventDefault();
            setMode("details");
        } else if (mode === "details" && scrollZone.scrollTop <= 0 && e.deltaY < -10) {
            if (e.cancelable) e.preventDefault();
            setMode("intro");
        }
    }
    
    scrollZone.addEventListener("touchstart", onTouchStart, { passive: true });
    scrollZone.addEventListener("touchmove", onTouchMove, { passive: false });
    scrollZone.addEventListener("touchend", onTouchEnd, { passive: false });
    scrollZone.addEventListener("wheel", onWheel, { passive: false });
    
    cleanupRegistry.add(() => {
        scrollZone.removeEventListener("touchstart", onTouchStart);
        scrollZone.removeEventListener("touchmove", onTouchMove);
        scrollZone.removeEventListener("touchend", onTouchEnd);
        scrollZone.removeEventListener("wheel", onWheel);
    });
}

// =============================================================================
// ДРОПДАУНЫ И КНОПКИ
// =============================================================================

function initializeDropdownsAndButtons() {
    console.log('📋 Инициализация дропдаунов и кнопок...');
    
    const paidBtn = document.getElementById('paidBtn');
    const addressDrop = document.getElementById('addressDrop');
    const usefulDrop = document.getElementById('usefulDrop');
    const entryNote = document.querySelector(".entry-note");
    
    function createDropdownHandler(dropdown) {
        return function(e) {
            e.stopPropagation();
            if (isAnimating) return;
            dropdown.classList.toggle("open");
            console.log('Дропдаун:', dropdown.id, dropdown.classList.contains('open') ? 'открыт' : 'закрыт');
        };
    }
    
    if (addressDrop) {
        const arrow = addressDrop.querySelector(".dropdown-arrow");
        if (arrow) {
            const handler = createDropdownHandler(addressDrop);
            arrow.addEventListener("click", handler);
            cleanupRegistry.add(() => arrow.removeEventListener("click", handler));
        }
    }
    
    if (usefulDrop) {
        const arrow = usefulDrop.querySelector(".dropdown-arrow");
        if (arrow) {
            const handler = createDropdownHandler(usefulDrop);
            arrow.addEventListener("click", handler);
            cleanupRegistry.add(() => arrow.removeEventListener("click", handler));
        }
    }
    
    const globalClickHandler = function(e) {
        if (!e.target.closest('.dropdown')) {
            if (addressDrop) addressDrop.classList.remove("open");
            if (usefulDrop) usefulDrop.classList.remove("open");
        }
    };
    
    document.addEventListener('click', globalClickHandler);
    cleanupRegistry.add(() => document.removeEventListener('click', globalClickHandler));
    
    if (paidBtn) {
        const paidHandler = () => {
            console.log('Клик на paidBtn');
            setMode("details", { expandUseful: true, scrollToBottom: true });
        };
        paidBtn.addEventListener('click', paidHandler);
        cleanupRegistry.add(() => paidBtn.removeEventListener('click', paidHandler));
    }
    
    if (entryNote) {
        const entryHandler = (e) => {
            if (!e.target.closest("#paidBtn")) {
                console.log('Клик на entryNote');
                setMode("details", { expandUseful: true, scrollToBottom: true });
            }
        };
        entryNote.addEventListener('click', entryHandler);
        cleanupRegistry.add(() => entryNote.removeEventListener('click', entryHandler));
    }
}

// =============================================================================
// КЛАВИАТУРА (для ПК)
// =============================================================================

function setupKeyboardHandlers() {
    function onKeyDown(e) {
        if (e.key === 'Escape' && mode === 'details') {
            setMode('intro');
        }
    }
    
    document.addEventListener('keydown', onKeyDown);
    cleanupRegistry.add(() => document.removeEventListener('keydown', onKeyDown));
}

// =============================================================================
// УПРАВЛЕНИЕ <br> В ЗАГОЛОВКЕ (НОВАЯ ФУНКЦИЯ)
// =============================================================================

function adjustTitleBreaks(currentMode) {
    const h1 = document.querySelector('.title-block h1');
    if (!h1) return;

    // 1. Сохраняем оригинальный HTML заголовка, если это первый запуск
    if (!h1.dataset.originalHtml) {
        h1.dataset.originalHtml = h1.innerHTML;
    } 
    // Если произошел переход на другую страницу (SPA) и заголовок изменился, обновляем оригинал
    else if (h1.dataset.originalHtml !== h1.innerHTML && currentMode === 'intro') {
        h1.dataset.originalHtml = h1.innerHTML;
    }

    // 2. Логика показа/скрытия
    if (currentMode === 'details') {
        // Меню открыто: удаляем <br> в начале строки (от 1 до 2 штук)
        let html = h1.dataset.originalHtml;
        // Регулярка ищет <br> только в самом начале текста, не трогая переносы по центру
        h1.innerHTML = html.replace(/^\s*(<br\s*\/?>\s*){1,2}/, '');
    } else {
        // Меню закрыто: возвращаем заголовок как был (с <br>)
        h1.innerHTML = h1.dataset.originalHtml;
    }
}

// =============================================================================
// ОСНОВНАЯ ИНИЦИАЛИЗАЦИЯ
// =============================================================================

window.initializeMenu = function() {
    console.log('🔄 Инициализация меню...');
    
    cleanupRegistry.clear();
    isAnimating = false;
    
    if (isYandexBrowser()) {
        document.body.classList.add('yandex-browser');
        console.log('🔧 Обнаружен Яндекс.Браузер');
    }
    
    correctMobileUI();
    
    const savedMenuState = sessionStorage.getItem('menuState');
    const shouldOpenMenu = savedMenuState === 'open';
    mode = shouldOpenMenu ? "details" : "intro";
    
    const frame = document.getElementById('frame');
    const bgVideo = document.getElementById('bgVideo');
    const videoPoster = document.getElementById('videoPoster');
    const scrollZone = document.getElementById('scrollZone');
    const usefulDrop = document.getElementById('usefulDrop');
    
    // Применение начального состояния без анимации
    if (shouldOpenMenu) {
        document.body.classList.add('no-transition');
        
        const elementsToDisable = [
            frame, 
            bgVideo, 
            scrollZone,
            document.querySelector('.title-block'),
            document.querySelector('.hero-details'),
            document.getElementById('dropdownsContainer'),
            document.querySelector('.entry-note'),
            document.getElementById('paidBtn'),
            videoPoster
        ].filter(el => el);
        
        elementsToDisable.forEach(el => {
            el.style.setProperty('transition', 'none', 'important');
            el.style.setProperty('animation', 'none', 'important');
        });
        
        cleanupRegistry.setTimeout(() => {
            elementsToDisable.forEach(el => {
                el.style.removeProperty('transition');
                el.style.removeProperty('animation');
            });
            document.body.classList.remove('no-transition');
        }, 10);
    }
    
    // Применение классов
    if (frame) {
        if (shouldOpenMenu) {
            frame.classList.remove('mode-intro');
            frame.classList.add('mode-details');
        } else {
            frame.classList.remove('mode-details');
            frame.classList.add('mode-intro');
        }
    }
    
    // Управление видео
    if (bgVideo) {
        bgVideo.muted = true;
        bgVideo.setAttribute('muted', '');
        bgVideo.setAttribute('playsinline', '');
        bgVideo.style.setProperty('filter', shouldOpenMenu ? 'blur(5px)' : 'none', 'important');
        
        if (shouldOpenMenu) {
            bgVideo.pause();
            if (isYandexBrowser()) {
                const currentTime = bgVideo.currentTime;
                bgVideo.currentTime = 0;
                bgVideo.currentTime = currentTime;
            }
            console.log('⏸️ Видео на паузе (меню открыто)');
        } else {
            cleanupRegistry.setTimeout(() => bgVideo.play().catch(() => {}), 100);
        }
    }
    
    // !!! КЛЮЧЕВОЕ ИСПРАВЛЕНИЕ: Белый фон при открытом меню !!!
    if (videoPoster) {
        if (shouldOpenMenu) {
            // Применяем стили как в CSS .mode-details .video-background
            videoPoster.style.setProperty('background', 'white', 'important');
            videoPoster.style.setProperty('display', 'block', 'important');
            videoPoster.style.setProperty('transition', 'none', 'important');
            videoPoster.style.setProperty('opacity', '1', 'important');
            videoPoster.style.setProperty('visibility', 'visible', 'important');
            
            // Создаем белую полосу снизу (аналог ::after из CSS)
            let bottomStripe = document.getElementById('videoBottomStripe');
            if (!bottomStripe) {
                bottomStripe = document.createElement('div');
                bottomStripe.id = 'videoBottomStripe';
                bottomStripe.style.cssText = `
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 80px;
                    background: white;
                    z-index: 3;
                    pointer-events: none;
                `;
                videoPoster.appendChild(bottomStripe);
            }
            
            console.log('🎨 VideoPoster: БЕЛЫЙ ФОН ВКЛЮЧЕН (возврат с открытым меню)');
        } else {
            // Скрываем фон для режима intro
            videoPoster.style.setProperty('background', 'transparent', 'important');
            videoPoster.style.setProperty('display', 'none', 'important');
            
            // Удаляем белую полосу
            const bottomStripe = document.getElementById('videoBottomStripe');
            if (bottomStripe) bottomStripe.remove();
        }
        
        // Принудительный reflow
        void videoPoster.offsetHeight;
    }
    
    if (scrollZone) {
        scrollZone.scrollTop = 0;
        scrollZone.style.pointerEvents = "auto";
    }
    
    // Восстанавливаем состояние dropdown
    const savedDropdownState = sessionStorage.getItem('usefulDropdownState');
    if (savedDropdownState === 'open' && usefulDrop) {
        usefulDrop.classList.add("open");
    } else {
        if (usefulDrop) usefulDrop.classList.remove("open");
    }
    
    initializeDropdownsAndButtons();
    setupSwipeHandlers();
    setupKeyboardHandlers();
    setupVideoGuards();
    
    // 🆕 ИНИЦИАЛИЗАЦИЯ СИСТЕМЫ ПОДСКАЗКИ СВАЙПА
    setupInactivityTracking();
    if (!shouldOpenMenu) {
        startInactivityTimer();
    }
    
    updateNavigationVisibility();

    // === ИЗМЕНЕНИЕ: Управление тегами <br> ===
    adjustTitleBreaks(mode);
    // ==========================================
    
    console.log('✅ Меню инициализировано:', shouldOpenMenu ? 'открыто (белый фон активен)' : 'закрыто');
};

// =============================================================================
// SPA ИНТЕГРАЦИЯ
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('place_menu.js: DOMContentLoaded');
    cleanupRegistry.setTimeout(window.initializeMenu, 50);
});

const spaObserver = new MutationObserver((mutations) => {
    const frame = document.getElementById('frame');
    if (frame && !frame.dataset.menuInitialized) {
        frame.dataset.menuInitialized = 'true';
        console.log('🔄 Обнаружена смена контента (SPA), переинициализируем меню');
        window.initializeMenu();
    }
});

spaObserver.observe(document.body, { 
    childList: true, 
    subtree: true 
});

cleanupRegistry.observe(spaObserver);

const originalPushState = history.pushState;
history.pushState = function(...args) {
    originalPushState.apply(this, args);
    console.log('🔄 History pushState detected');
    cleanupRegistry.setTimeout(window.initializeMenu, 100);
};

const originalReplaceState = history.replaceState;
history.replaceState = function(...args) {
    originalReplaceState.apply(this, args);
    cleanupRegistry.setTimeout(window.initializeMenu, 100);
};

window.addEventListener('popstate', () => {
    console.log('🔄 Popstate event');
    cleanupRegistry.setTimeout(window.initializeMenu, 100);
});

if (window.spaRouter) {
    if (window.spaRouter.navigate) {
        const originalNavigate = window.spaRouter.navigate;
        window.spaRouter.navigate = function(...args) {
            const result = originalNavigate.apply(this, args);
            cleanupRegistry.setTimeout(window.initializeMenu, 150);
            return result;
        };
    }
    
    if (window.spaRouter.on) {
        window.spaRouter.on('pageChange', () => {
            cleanupRegistry.setTimeout(window.initializeMenu, 100);
        });
    }
}

window.reinitMenu = function() {
    console.log('🔄 Ручная переинициализация меню');
    window.initializeMenu();
};

console.log('✅ place_menu.js полностью загружен');



