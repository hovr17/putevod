// pages_manager.js - Добавлена мобильная инициализация видео + адаптация шрифта под высоту
class PagesManager {
    constructor() {
        this.config = null;
        this.placeId = null;
        this.category = null;
        this._resizeHandler = null; // Для хранения обработчика resize
        console.log('📦 PagesManager создан');
    }

    setPlaceId(placeId, category) {
        this.placeId = placeId;
        this.category = category;
        this.config = getPlaceConfig(placeId, category);
        console.log('📦 Загружен config для', placeId, this.config ? '✅' : '❌');
        return !!this.config;
    }

    applyConfig() {
        if (!this.config) {
            console.error('❌ Конфигурация не загружена');
            return;
        }

        // 1. Заголовок
        const titleBlock = document.querySelector('.title-block h1');
        if (titleBlock) {
            titleBlock.innerHTML = this.config.heading || this.config.title || '';
            
            // Индивидуальный размер шрифта
            if (this.config.headingSize) {
                titleBlock.style.fontSize = this.config.headingSize;
            } else {
                // Сбрасываем inline-стиль, чтобы применились стандартные стили из CSS
                titleBlock.style.fontSize = '';
            }
            
            console.log('✅ Заголовок установлен:', titleBlock.innerHTML, this.config.headingSize ? `(${this.config.headingSize})` : '(default)');
        }

        // 2. Видео (МОБИЛЬНАЯ ИНИЦИАЛИЗАЦИЯ)
        const bgVideo = document.getElementById('bgVideo');
        if (bgVideo && this.config.video?.src) {
            bgVideo.pause();
            bgVideo.src = '';
            bgVideo.load();
            
            bgVideo.src = this.config.video.src;
            bgVideo.poster = this.config.video.poster || '';
            
            bgVideo.muted = true;
            bgVideo.setAttribute('muted', '');
            bgVideo.setAttribute('playsinline', '');
            bgVideo.setAttribute('webkit-playsinline', '');
            bgVideo.setAttribute('preload', 'auto');
            bgVideo.setAttribute('autoplay', '');
            
            console.log('✅ Видео src и атрибуты установлены:', bgVideo.src);
        }

        // 3. "Вход платный"
        const entryNoteSpan = document.querySelector('.entry-note span');
        const paidBtn = document.getElementById('paidBtn');
        const entryNoteEl = document.querySelector('.entry-note');
        const h1El = document.querySelector('.title-block h1');
        
        if (entryNoteSpan && paidBtn) {
            if (this.config.paidEntry && this.config.paidEntry.enabled) {
                entryNoteSpan.textContent = this.config.paidEntry.text || '';
                paidBtn.style.display = 'flex';
                
                if (entryNoteEl) entryNoteEl.style.display = '';
                if (h1El) h1El.style.marginTop = '';
                
                console.log('✅ Платный вход:', entryNoteSpan.textContent);
            } else {
                entryNoteSpan.textContent = '\u00A0';
                paidBtn.style.display = 'none';
                
                if (entryNoteEl && h1El) {
                    entryNoteEl.style.display = '';
                    const height = entryNoteEl.getBoundingClientRect().height;
                    entryNoteEl.style.display = 'none';
                    h1El.style.marginTop = `${height}px`;
                }
            }
        }

        // 4. Фото-кнопки
        const photoWrapper = document.querySelector('.photo-wrapper');
        if (photoWrapper) {
            photoWrapper.innerHTML = '';
            this.config.photoButtons?.forEach((btn, index) => {
                const card = document.createElement('a');
                card.className = 'photo-card';
                card.href = btn.link || '#';
                card.id = `photoCard${index + 1}`;
                
                card.addEventListener('click', function(e) {
                    if (this.href && this.href.includes('stories.html')) {
                        const frame = document.getElementById('frame');
                        const isMenuOpen = frame && frame.classList.contains('mode-details');
                        const usefulDrop = document.getElementById('usefulDrop');
                        const isDropdownOpen = usefulDrop && usefulDrop.classList.contains('open');
                        
                        if (isMenuOpen) {
                            sessionStorage.setItem('menuState', 'open');
                            console.log('💾 Сохранено: меню открыто');
                        } else {
                            sessionStorage.removeItem('menuState');
                        }
                        
                        if (isDropdownOpen) {
                            sessionStorage.setItem('usefulDropdownState', 'open');
                            console.log('💾 Сохранено: dropdown открыт');
                        } else {
                            sessionStorage.removeItem('usefulDropdownState');
                        }
                    }
                });
                
                if (btn.image) {
                    card.style.backgroundImage = `url('${btn.image}')`;
                    card.style.backgroundSize = 'cover';
                    card.style.backgroundPosition = 'center';
                    card.style.backgroundRepeat = 'no-repeat';
                }
                
                const label = document.createElement('div');
                label.className = 'photo-label';
                label.textContent = btn.label || '';
                card.appendChild(label);
                photoWrapper.appendChild(card);
                
                console.log(`✅ Фото-кнопка ${index + 1}:`, btn.label);
            });
        }

        // 5. Дропдауны
        this.createDropdowns();

        // 6. Title страницы
        document.title = this.config.title || '';
        
        // 7. Обновление счетчика места
        this.updatePlaceCounter();

        // 8. Инициализируем меню (для дропдаунов и свайпов)
        if (typeof window.initializeMenu === 'function') {
            setTimeout(() => {
                window.initializeMenu();
            }, 100);
        }

        // 9. Адаптация шрифта под размер экрана
        this.setupScreenAdaptation();

        console.log('✅ Конфигурация применена полностью');
    }

    createDropdowns() {
        const container = document.getElementById('dropdownsContainer');
        if (!container || !this.config) return;

        container.innerHTML = '';

        // Адрес
        if (this.config.address?.text) {
            this.createAddressDropdown();
        }

        // Полезное
        if (this.config.usefulInfo?.enabled) {
            this.createUsefulDropdown();
        }
    }

    createAddressDropdown() {
        const container = document.getElementById('dropdownsContainer');
        const dropdown = document.createElement('div');
        dropdown.className = 'dropdown';
        dropdown.id = 'addressDrop';
        
        dropdown.innerHTML = `
            <div class="dropdown-header">
                <div class="dropdown-icon geo-icon"></div>
                <div class="dropdown-title">Aдрес</div>
                <div class="dropdown-arrow">
                    <div class="arrow-down-icon"></div>
                </div>
            </div>
            <div class="dropdown-body">
                <p><a href="${this.config.address.link}" class="address-link" target="_blank" rel="noopener noreferrer">${this.config.address.text}</a></p>
            </div>
        `;
        container.appendChild(dropdown);
        console.log('✅ Дропдаун Адрес создан');
    }

    createUsefulDropdown() {
        const container = document.getElementById('dropdownsContainer');
        const dropdown = document.createElement('div');
        dropdown.className = 'dropdown';
        dropdown.id = 'usefulDrop';
        
        dropdown.innerHTML = `
            <div class="dropdown-header">
                <div class="dropdown-icon bulb-icon"></div>
                <div class="dropdown-title">Полезное</div>
                <div class="dropdown-arrow">
                    <div class="arrow-down-icon"></div>
                </div>
            </div>
            <div class="dropdown-body"></div>
        `;
        container.appendChild(dropdown);

        const body = dropdown.querySelector('.dropdown-body');
        if (body && this.config.usefulInfo.content) {
            this.config.usefulInfo.content.forEach(line => {
                const p = document.createElement('p');
                
                if (typeof line === 'object' && line.link) {
                    const linkText = line.text || line.link;
                    const prefixText = line.prefix ? line.prefix + ' ' : '';
                    p.innerHTML = `${prefixText}<a href="${line.link}" class="address-link" target="_blank" rel="noopener noreferrer">${linkText}</a>`;
                } else if (typeof line === 'string') {
                    p.innerHTML = line.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" class="address-link" target="_blank" rel="noopener noreferrer">$1</a>');
                } else {
                    p.textContent = String(line);
                }
                
                body.appendChild(p);
                console.log('✅ Добавлен пункт:', line);
            });
        }
        console.log('✅ Дропдаун Полезное создан');
    }

    updatePlaceCounter() {
        if (!this.placeId || !this.category) return;
        
        const order = window.PAGE_ORDER_BY_CATEGORY?.[this.category] || [];
        const currentIndex = order.indexOf(this.placeId);
        
        if (currentIndex !== -1) {
            const counterEl = document.getElementById('placeCounter');
            if (counterEl) {
                counterEl.textContent = `${currentIndex + 1}/${order.length}`;
                console.log(`📊 Счетчик обновлен: ${currentIndex + 1}/${order.length}`);
            }
        }
    }

    /**
     * Настраивает адаптацию заголовка под изменение размеров окна
     */
    setupScreenAdaptation() {
        // Удаляем предыдущий обработчик, если есть
        if (this._resizeHandler) {
            window.removeEventListener('resize', this._resizeHandler);
            this._resizeHandler = null;
        }

        // Функция адаптации с debounce
        const adapt = () => {
            this.adjustFontSizeForScreen();
        };

        // Выполняем сразу
        adapt();

        // Добавляем обработчик resize с debounce (150 мс)
        let timeout;
        this._resizeHandler = () => {
            clearTimeout(timeout);
            timeout = setTimeout(adapt, 150);
        };
        window.addEventListener('resize', this._resizeHandler);
    }

    /**
     * Проверяет размеры экрана и при необходимости изменяет размер шрифта заголовка
     */
    adjustFontSizeForScreen() {
        const titleBlock = document.querySelector('.title-block h1');
        if (!titleBlock) return;

        const width = window.innerWidth;
        const height = window.innerHeight;

        // Условие: ширина > 1080px и высота < 1060px
        if (width > 1080 && height < 1060) {
            // Сохраняем исходный размер (если ещё не сохранили)
            if (!titleBlock.dataset.originalFontSize) {
                // Запоминаем текущий inline-стиль (если он был от headingSize) или пустую строку
                titleBlock.dataset.originalFontSize = titleBlock.style.fontSize || '';
            }
            // Устанавливаем уменьшенный размер (можно настроить под свой дизайн)
            titleBlock.style.fontSize = 'clamp(24px, 3vmin, 40px)'; // пример уменьшенного размера
        } else {
            // Восстанавливаем исходный размер, если он был изменён
            if (titleBlock.dataset.originalFontSize !== undefined) {
                if (titleBlock.dataset.originalFontSize) {
                    // Возвращаем сохранённый inline-стиль
                    titleBlock.style.fontSize = titleBlock.dataset.originalFontSize;
                } else {
                    // Если исходного inline-стиля не было, удаляем inline, чтобы вернуться к CSS
                    titleBlock.style.fontSize = '';
                }
                delete titleBlock.dataset.originalFontSize;
            }
        }
    }

    getPageConfig(placeId) {
        return PAGES_CONFIG[placeId];
    }
}

window.pagesManager = new PagesManager();
