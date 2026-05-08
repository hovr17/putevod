

const ROUTES = {

    // ============================================
    // ПРИМЕР: Тайны города
    // ============================================
    'secrets_of_city': {
        id: 'secrets_of_city',
        title: 'лёгкая<br>прогулка',

        descriptions: [
            { text: 'Увидим Суздаль от древних улочек до современного искусства.', icon: 'ui/pictograms_button/binoculars.svg' },
            { text: 'Подберем особенные сувениры с историей для себя и друзей.', icon: 'ui/pictograms_button/matreshka.svg' },
            { text: 'Прокатимся по реке Каменке на весельной лодке и полюбуемся городом с воды.', icon: 'ui/pictograms_button/boat.svg' }
        ],
        places: [
             { type: 'existing', placeId: 'torgovie_ryadi', category: 'entertainment'},
        { type: 'existing', placeId: 'torgovie_lavki_centre', category: 'entertainment' },
        { type: 'existing', placeId: 'Pokrovsky_monastery', category: 'religious' },
        { type: 'existing', placeId: 'arenda_katamaranov', category: 'entertainment' , label: 'Сплав на лодке', image: 'stories_button_images/add_photos/2.jpg' },
         { type: 'existing', placeId: 'collider', category: 'museum' },
        { type: 'existing', placeId: 'dinnikov', category: 'museum' , image: 'stories_button_images/add_photos/3.jpg' },
        { type: 'existing', placeId: 'myra_centre', category: 'entertainment' }
        ],
        infoBlocks: [
            'Время прогулки: ~2 часа',
            'Мест для посещения: 6',
            'Цена билетов в музеи: 400₽'
        ],
        routeLink: '#',
        yandexMapsLink: 'https://yandex.ru/maps/10671/suzdal/?ll=40.441794%2C56.423191&mode=routes&rtext=56.420176%2C40.448047~56.419499%2C40.449250~56.429353%2C40.437135~56.426701%2C40.440887~56.420834%2C40.445772~56.417028%2C40.448934~56.418521%2C40.447807&rtt=pd&ruri=ymapsbm1%3A%2F%2Forg%3Foid%3D139713913337~ymapsbm1%3A%2F%2Ftransit%2Fstop%3Fid%3D1543210536~ymapsbm1%3A%2F%2Forg%3Foid%3D1081175827~ymapsbm1%3A%2F%2Forg%3Foid%3D146729477557~ymapsbm1%3A%2F%2Ftransit%2Fstop%3Fid%3D1543210565~ymapsbm1%3A%2F%2Forg%3Foid%3D237206315461~ymapsbm1%3A%2F%2Forg%3Foid%3D10100491530&source=serp_navig&z=16.16'
    },

    // ============================================
    // ПРИМЕР: С детьми
    // ============================================
    'with_kids': {
        id: 'with_kids',
        title: 'с детьми',

        descriptions: [
          { text: 'Перенесемся на 1000 лет назад и увидим, как жили люди.', icon: 'ui/pictograms_button/sun.svg'  },
{ text: 'Своими руками выкуем подкову и слепим глиняный горшок.', icon: 'ui/pictograms_button/horseshoe.svg'},
{ text: 'Прокатимся на карете с ветерком по всему городу!', icon: 'ui/pictograms_button/horse.svg'}
        ],
        places: [
            { type: 'existing', placeId: 'churovo_gorodiche', category: 'entertainment', image: 'stories_button_images/entertainment_places/churovo_gorodiche/2.jpg' },
            { type: 'existing', placeId: 'centre_narodnogo_tvorchestva', category: 'entertainment' },
            { type: 'existing', placeId: 'museum_mishka', category: 'museum' },
            { type: 'existing', placeId: 'aqua', category: 'entertainment' },
            { type: 'existing', placeId: 'museum_voskovih_figur', category: 'museum' },
            { type: 'existing', placeId: 'neskuchniy_museum', category: 'entertainment', image: 'stories_button_images/entertainment_places/neskuchniy_museum/4.jpg'},
            { type: 'existing', placeId: 'progulka_v_karete', category: 'entertainment' }
        ],
        infoBlocks: [
            'Время прогулки: ~6 часов',
            'Мест для посещения: 7',
            'Цена билетов: от 200 до 400₽'
        ],
        routeLink: '#',
        yandexMapsLink: 'https://yandex.ru/maps/10671/suzdal/?ll=40.447993%2C56.418213&mode=routes&rtext=56.439389%2C40.429295~56.431930%2C40.423654~56.421316%2C40.450047~56.417028%2C40.448934~56.418694%2C40.448229~56.417083%2C40.446009~56.418593%2C40.447757&rtt=pd&ruri=ymapsbm1%3A%2F%2Forg%3Foid%3D136781922713~ymapsbm1%3A%2F%2Forg%3Foid%3D26279280526~ymapsbm1%3A%2F%2Forg%3Foid%3D7107819269~ymapsbm1%3A%2F%2Forg%3Foid%3D237206315461~ymapsbm1%3A%2F%2Forg%3Foid%3D140917609572~ymapsbm1%3A%2F%2Forg%3Foid%3D127156267692~&source=serp_navig&z=19.09'
    },

    // ============================================
    // ПРИМЕР: По православным местам
    // ============================================
    'orthodox_route': {
        id: 'orthodox_route',
        title: 'ПРАВОСЛАВНЫй<br>МАРШРУТ',
        descriptions: [
            { text:'Приложимся к главным святыням Суздаля.', icon: 'ui/pictograms_button/kindle.svg'},
            { text:'Поднимемся на колокольню и увидим Суздаль с высоты 72 метров.', icon: 'ui/pictograms_button/church.svg'},
            { text:'Посетим монасытрь, который был построен на деньги мамы Петра I.', icon: 'ui/pictograms_button/coins.svg'}
        ],
        places: [
             { type: 'existing', placeId: 'kreml', category: 'museum', ticket: true},
               { type: 'existing', placeId: 'Voskresenskiy', category: 'religious', label: 'Воскресенская церковь' },
             { type: 'existing', placeId: 'Kazanskiy', category: 'religious', label: 'Казанская церковь' },
            { type: 'existing', placeId: 'Pokrovsky_monastery', category: 'religious' },
            { type: 'existing', placeId: 'SpasoEvfimiev_monastery', category: 'religious' },
            { type: 'existing', placeId: 'Rizopolozhenskiy_monastery', category: 'religious' },
            { type: 'existing', placeId: 'Aleksandrovskiy_monastery', category: 'religious' }
      
        ],
        infoBlocks: [
            'Время прогулки: целый день',
            'Мест для посещения: 7',
            'Цена всех билетов: 1400₽ '
        ],
        routeLink: '#',
        yandexMapsLink: 'https://yandex.ru/maps/10671/suzdal/?ll=40.442725%2C56.426225&mode=routes&rtext=56.419818%2C40.448783~56.420065%2C40.448628~56.424672%2C40.445960~56.427537%2C40.440620~56.432631%2C40.440601~56.429353%2C40.437135&rtt=pd&ruri=ymapsbm1%3A%2F%2Forg%3Foid%3D1710122205~ymapsbm1%3A%2F%2Forg%3Foid%3D10389671874~ymapsbm1%3A%2F%2Forg%3Foid%3D1354533355~ymapsbm1%3A%2F%2Forg%3Foid%3D1306751727~ymapsbm1%3A%2F%2Forg%3Foid%3D217223930675~ymapsbm1%3A%2F%2Forg%3Foid%3D1081175827&source=serp_navig&z=16.11'
    },

    // ============================================
    // ПРИМЕР: На выходные
    // ============================================
    'weekend_route': {
        id: 'weekend_route',
        title: 'НА ВЫХОДНЫЕ',
        descriptions: [
            { text:'Увидим храмы XVIII века, построенные без единого гвоздя.', icon: 'ui/pictograms_button/church_small.svg'},
            { text:'Сами напишем фреску, используя секреты старых мастеров.', icon: 'ui/pictograms_button/brush.svg'},
            { text: 'Встретим закат на главной смотровой площадке Суздаля.', icon: 'ui/pictograms_button/photo_small.svg'}
        ],
        places: [
            { type: 'existing', placeId: 'kreml', category: 'museum' },
        { type: 'existing', placeId: 'derevannoe_zodchestvo', category: 'museum' },
        { type: 'existing', placeId: 'torgovie_ryadi', category: 'entertainment' },
        { type: 'existing', placeId: 'freska_naboyka', category: 'entertainment' },
        { type: 'existing', placeId: 'arena', category: 'entertainment' },
        { type: 'existing', placeId: 'museum_vrema_steklo', category: 'museum' },
        { type: 'existing', placeId: 'dom_balzaminova', category: 'museum' },
        { type: 'existing', placeId: 'larec', category: 'museum' },
        { type: 'existing', placeId: 'dymov_keramika', category: 'entertainment' },
        { type: 'existing', placeId: 'gorshechna', category: 'entertainment' }
      
        ],
        infoBlocks: [
            'Время прогулки: целый день',
            'Мест для посещения: 7',
            'Цена билетов: от 0'
        ],
        routeLink: '#',
        yandexMapsLink: 'https://yandex.ru/maps/?ll=40.476926%2C56.422817&mode=routes&rtext=56.416218%2C40.442600~56.412487%2C40.437354~56.415646%2C40.446443~56.420176%2C40.448047~56.420814%2C40.446910~56.420834%2C40.445772~56.429353%2C40.437135~56.431102%2C40.426061~56.432631%2C40.440601~56.424206%2C40.447056~56.425001%2C40.527672&rtt=pd&ruri=ymapsbm1%3A%2F%2Forg%3Foid%3D1376506046~ymapsbm1%3A%2F%2Forg%3Foid%3D67321652841~ymapsbm1%3A%2F%2Forg%3Foid%3D158451097395~ymapsbm1%3A%2F%2Forg%3Foid%3D139713913337~ymapsbm1%3A%2F%2Forg%3Foid%3D53390171554~ymapsbm1%3A%2F%2Ftransit%2Fstop%3Fid%3D1543210565~ymapsbm1%3A%2F%2Forg%3Foid%3D1081175827~ymapsbm1%3A%2F%2Forg%3Foid%3D185974243295~ymapsbm1%3A%2F%2Forg%3Foid%3D217223930675~ymapsbm1%3A%2F%2Forg%3Foid%3D157400718554~ymapsbm1%3A%2F%2Forg%3Foid%3D187935772158&source=serp_navig&z=14.79'
    },


     'photo_walk': {
    id: 'photo_walk',
    title: 'ФОТОПРОГУЛКА',
    descriptions: [
        { text: 'Посетим лучшие смотровые площадки Суздаля.', icon: 'ui/pictograms_button/binoculars.svg'},
        { text: 'Прикоснёмся к истории в резиденции Юрия Долгорукого XII века.', icon: 'ui/pictograms_button/museum_small.svg'},
        { text:'Увидим Суздаль с 72-метровой высоты Преподобенской колокольни.', icon: 'ui/pictograms_button/church_small.svg'}
    ],
    places: [
        { type: 'existing', placeId: 'smotrovaya_na_lug', category: 'nature' },
        { type: 'existing', placeId: 'smotrovaya_SpasoEvfimiev', category: 'nature' },
        { type: 'existing', placeId: 'smotrovaya_gasteva', category: 'nature' },
        { type: 'existing', placeId: 'smotrovaya_podvorye', category: 'nature' },
        { type: 'existing', placeId: 'Kremlevskie_vali', category: 'nature' },
        { type: 'existing', placeId: 'Ilinskiy_lug', category: 'nature' },
        { type: 'existing', placeId: 'smotrovaya_Alexandrovskiy', category: 'nature' },
        { type: 'existing', placeId: 'FloraLavri', category: 'religious', label: 'Колокольня Флора и Лавра' },
        { type: 'existing', placeId: 'arenda_katamaranov', category: 'entertainment', label: 'Виды с реки' },
        { type: 'existing', placeId: 'gorodskoy_sad', category: 'nature' }
    ],
    infoBlocks: [
        'Время прогулки:\n~3-4 часа',
        'Точек для фото:\n10',
        'Лучшее время:\nутро / закат'
    ],
    routeLink: '#',
    yandexMapsLink: 'https://yandex.ru/maps/10671/suzdal/?ll=40.442514%2C56.413537&mode=routes&rtext=56.419255%2C40.428259~56.414522%2C40.438881~56.418154%2C40.444717~56.418444%2C40.445711~56.420814%2C40.446910~56.431526%2C40.440137~56.429124%2C40.440635~56.424206%2C40.447056~56.424994%2C40.527685&rtt=pd&ruri=ymapsbm1%3A%2F%2Forg%3Foid%3D13048950247~ymapsbm1%3A%2F%2Ftransit%2Fstop%3Fid%3D1737302861~~ymapsbm1%3A%2F%2Forg%3Foid%3D106499000654~ymapsbm1%3A%2F%2Forg%3Foid%3D53390171554~ymapsbm1%3A%2F%2Forg%3Foid%3D31094998510~ymapsbm1%3A%2F%2Forg%3Foid%3D232593776830~ymapsbm1%3A%2F%2Forg%3Foid%3D157400718554~ymapsbm1%3A%2F%2Forg%3Foid%3D187935772158&source=serp_navig&z=17.66'
}  

};

// Экспортируем для использования в route.js
window.ROUTES = ROUTES;