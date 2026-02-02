console.log('place_menu.js загружен');

let mode = "intro";
let isAnimating = false;
let touchStartX = null;
let touchStartY = null;
let isHorizontalSwipe = false;
const SWIPE_THRESHOLD = 50;

// =============================================================================
// SWIPE HINT SYSTEM (Подсказка свайпа с лимитом на 3 страницы)
// =============================================================================
let inactivityTimer = null;
const INACTIVITY_DELAY = 5000; // 5 секунд (изменено с 7)
let isHintShowing = false;
let hintVideoElement = null;
let pagesOpenedCount = 0; // Счетчик открытых страниц
const MAX_PAGES_FOR_HINT = 3; // Показывать подсказку только первые 3 страницы
let hasShownHintOnCurrentPage = false; // Флаг: показывали ли уже на текущей странице

/**
 * Проверяет, должна ли показываться подсказка
 */
function shouldShowHint() {
    return pagesOpenedCount < MAX_PAGES_FOR_HINT;
}

/**
 * Увеличивает счетчик при открытии новой страницы
 */
function incrementPageCounter() {
    // Проверяем, не открывали ли мы уже эту страницу (через sessionStorage)
    const currentPageId = window.spaRouter?.currentPlaceId;
    const viewedPages = JSON.parse(sessionStorage.getItem('viewedPages') || '[]');
    
    if (currentPageId && !viewedPages.includes(currentPageId)) {
        viewedPages.push(currentPageId);
        sessionStorage.setItem('viewedPages', JSON.stringify(viewedPages));
        pagesOpenedCount = viewedPages.length;
        console.log('📄 Новая страница открыта, всего уникальных:', pagesOpenedCount);
    } else {
        pagesOpenedCount = viewedPages.length;
    }
    
    // Сбрасываем флаг для новой страницы
    hasShownHintOnCurrentPage = false;
}

/**
 * Запускает таймер бездействия (только если лимит не исчерпан)
 */
function startInactivityTimer() {
    if (inactivityTimer) {
        clearTimeout(inactivityTimer);
        inactivityTimer = null;
    }
    
    // Не показываем если: меню открыто, идет анимация, лимит исчерпан, уже показывали на этой странице
    if (mode === 'details' || isAnimating || window.spaRouter?.isAnimating || !shouldShowHint() || hasShownHintOnCurrentPage) {
        return;
    }
    
    const order = getCurrentPageOrder(window.spaRouter?.currentCategory);
    if (!order || order.length <= 1) return;
    
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
    
    if (isHintShowing) {
        hideSwipeHint();
    }
    
    // Перезапускаем только если еще не показывали на этой странице
    if (!hasShownHintOnCurrentPage) {
        startInactivityTimer();
    }
}

/**
 * Показывает анимацию-подсказку со следующей страницей
 */
function showSwipeHint() {
    if (isHintShowing || mode === 'details' || isAnimating || window.spaRouter?.isAnimating || !shouldShowHint()) {
        return;
    }
    
    const frame = document.getElementById('frame');
    if (!frame) return;
    
    if (frame.classList.contains('mode-details')) return;
    
    // Получаем следующую страницу
    const order = getCurrentPageOrder(window.spaRouter?.currentCategory);
    const currentIndex = order.indexOf(window.spaRouter?.currentPlaceId);
    const nextIndex = (currentIndex + 1) % order.length;
    const nextPlaceId = order[nextIndex];
    const nextConfig = getPlaceConfig(nextPlaceId, window.spaRouter?.currentCategory);
    
    if (!nextConfig) return;
    
    // Создаем или получаем контейнер превью
    let preview = frame.querySelector('.next-page-preview');
    if (!preview) {
        preview = document.createElement('div');
        preview.className = 'next-page-preview';
        frame.appendChild(preview);
    }
    
    // Очищаем предыдущее содержимое
    preview.innerHTML = '';
    hintVideoElement = null;
    
    // Заполняем видео или постер следующей страницы
    if (nextConfig.video?.src) {
        const video = document.createElement('video');
        video.src = nextConfig.video.src;
        video.poster = nextConfig.video.poster || '';
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.autoplay = true;
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'cover';
        
        // Обработка ошибок загрузки
        video.onerror = () => {
            if (nextConfig.video.poster) {
                preview.innerHTML = '';
                const img = document.createElement('img');
                img.src = nextConfig.video.poster;
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
                preview.appendChild(img);
            }
        };
        
        preview.appendChild(video);
        hintVideoElement = video;
        
        video.play().catch(() => {});
    } else if (nextConfig.video?.poster) {
        const img = document.createElement('img');
        img.src = nextConfig.video.poster;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        preview.appendChild(img);
    } else {
        preview.style.background = 'linear-gradient(135deg, #1a1a1a 0%, #333 100%)';
        preview.style.display = 'flex';
        preview.style.alignItems = 'center';
        preview.style.justifyContent = 'center';
        preview.style.color = 'white';
        preview.style.fontFamily = 'Zametka, sans-serif';
        preview.style.fontSize = '2vw';
        preview.style.textAlign = 'center';
        preview.style.padding = '1vw';
        preview.innerHTML = '<span style="opacity:0.6">→</span>';
    }
    
    isHintShowing = true;
    hasShownHintOnCurrentPage = true; // Отмечаем, что показали на этой странице
    frame.classList.add('swipe-hint-active');
    
    console.log('💡 Показана подсказка свайпа (страница ' + (pagesOpenedCount + 1) + ' из ' + MAX_PAGES_FOR_HINT + '):', nextPlaceId);
    
    // Автоматически убираем через 1.6s
    setTimeout(() => {
        hideSwipeHint();
    }, 1600);
}

/**
 * Скрывает подсказку и останавливает видео
 */
function hideSwipeHint() {
    if (!isHintShowing) return;
    
    const frame = document.getElementById('frame');
    if (frame) {
        frame.classList.remove('swipe-hint-active');
    }
    
    if (hintVideoElement) {
        hintVideoElement.pause();
        hintVideoElement.src = '';
        hintVideoElement.load();
        hintVideoElement = null;
    }
    
    const preview = document.querySelector('.next-page-preview');
    if (preview) {
        setTimeout(() => {
            preview.remove();
        }, 300);
    }
    
    isHintShowing = false;
}

/**
 * Настраивает отслеживание активности
 */
function setupInactivityTracking() {
    const events = ['touchstart', 'touchmove', 'click', 'scroll', 'keydown', 'wheel'];
    
    const resetHandler = () => {
        resetInactivityTimer();
    };
    
    events.forEach(event => {
        document.addEventListener(event, resetHandler, { passive: true });
    });
    
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (inactivityTimer) {
                clearTimeout(inactivityTimer);
                inactivityTimer = null;
            }
            hideSwipeHint();
        } else {
            // При возвращении на вкладку проверяем, нужно ли перезапустить
            if (!hasShownHintOnCurrentPage && shouldShowHint()) {
                startInactivityTimer();
            }
        }
    });
    
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
        if (inactivityTimer) {
            clearTimeout(inactivityTimer);
            inactivityTimer = null;
        }
        hideSwipeHint();
    } else {
        // При закрытии меню запускаем таймер только если подсказка еще не показывалась
        startInactivityTimer();
    }

    adjustTitleBreaks(newMode);

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
                
                if (scrollToBottom) {
                    cleanupRegistry.setTimeout(() => {
                        if (scrollZone) {
                            scrollZone.scrollTo({
                                top: scrollZone.scrollHeight,
                                behavior: 'smooth'
                            });
                        }
                    }, 300);
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
// УПРАВЛЕНИЕ <br> В ЗАГОЛОВКЕ
// =============================================================================

function adjustTitleBreaks(currentMode) {
    const h1 = document.querySelector('.title-block h1');
    if (!h1) return;

    if (!h1.dataset.originalHtml) {
        h1.dataset.originalHtml = h1.innerHTML;
    } else if (h1.dataset.originalHtml !== h1.innerHTML && currentMode === 'intro') {
        h1.dataset.originalHtml = h1.innerHTML;
    }

    if (currentMode === 'details') {
        let html = h1.dataset.originalHtml;
        h1.innerHTML = html.replace(/^\s*(<br\s*\/?>\s*){1,2}/, '');
    } else {
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
    
    // Увеличиваем счетчик при инициализации (новая страница загружена)
    incrementPageCounter();
    
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
    
    if (frame) {
        if (shouldOpenMenu) {
            frame.classList.remove('mode-intro');
            frame.classList.add('mode-details');
        } else {
            frame.classList.remove('mode-details');
            frame.classList.add('mode-intro');
        }
    }
    
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
    
    if (videoPoster) {
        if (shouldOpenMenu) {
            videoPoster.style.setProperty('background', 'white', 'important');
            videoPoster.style.setProperty('display', 'block', 'important');
            videoPoster.style.setProperty('transition', 'none', 'important');
            videoPoster.style.setProperty('opacity', '1', 'important');
            videoPoster.style.setProperty('visibility', 'visible', 'important');
            
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
            
            console.log('🎨 VideoPoster: БЕЛЫЙ ФОН ВКЛЮЧЕН');
        } else {
            videoPoster.style.setProperty('background', 'transparent', 'important');
            videoPoster.style.setProperty('display', 'none', 'important');
            
            const bottomStripe = document.getElementById('videoBottomStripe');
            if (bottomStripe) bottomStripe.remove();
        }
        
        void videoPoster.offsetHeight;
    }
    
    if (scrollZone) {
        scrollZone.scrollTop = 0;
        scrollZone.style.pointerEvents = "auto";
    }
    
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
    setupInactivityTracking();
    
    // Запускаем таймер только если меню закрыто и лимит не исчерпан
    if (!shouldOpenMenu && shouldShowHint()) {
        startInactivityTimer();
        console.log('⏱️ Таймер подсказки запущен (страница ' + (pagesOpenedCount) + ' из ' + MAX_PAGES_FOR_HINT + ')');
    } else if (!shouldShowHint()) {
        console.log('🚫 Подсказка отключена (лимит ' + MAX_PAGES_FOR_HINT + ' страниц исчерпан)');
    }
    
    updateNavigationVisibility();
    adjustTitleBreaks(mode);
    
    console.log('✅ Меню инициализировано:', shouldOpenMenu ? 'открыто' : 'закрыто');
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
