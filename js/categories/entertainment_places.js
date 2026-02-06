const ENTERTAINMENT_PLACES = {  
    
       'aqua': {
        title: 'Суздаль Аква. Аквапарк',
        heading: 'Суздаль Аква.<br>Аквапарк',
        video: { src: 'videos/entertainment_places/aqua.mp4', poster: null },
        paidEntry: null,
        photoButtons: [
            { label: 'Аквапарк снаружи', image: 'stories_button_images/entertainment_places/aqua/1.jpg', link: 'stories.html?cat=entertainment&place=aqua.snaruzhi' },
            { label: 'Аквапарк внутри', image: 'stories_button_images/entertainment_places/aqua/2.jpg', link: 'stories.html?cat=entertainment&place=aqua.vnutri' }
        ],
        address: { text: 'ул. Коровники, 45', link: 'https://yandex.ru/maps/-/CLU-yWNG' },
       usefulInfo: {
            enabled: true,
            content: [
                'Оценка на картах 4,8 <br> <br>',
                'Часы работы: ежедневно, 10:00–22:00 <br> <br>',
              { prefix: 'Цены: ', text: 'aquasuzdal.ru', link: 'https://aquasuzdal.ru/tariffs' }
            ]
        }
    },

        'rechniye_progulki': {
        title: 'Речные прогулки',
        heading: 'Речные<br>прогулки',
        video: { src: 'videos/entertainment_places/rechniye_progulki.mp4', poster: null },
         paidEntry: { text: 'цены варьируются', enabled: true },
        photoButtons: [
            { label: 'Фото', image: 'stories_button_images/entertainment_places/rechniye_progulki/1.jpg', link: 'stories.html?cat=entertainment&place=rechniye_progulki.photo' }
        ],
        address: { text: 'Пушкарская ул.', link: 'https://yandex.ru/maps/-/CLa26L8-' },
        usefulInfo: {
            enabled: true,
            content: [
                'Оценка на картах 5,0 <br> <br>',
                'Часы работы: ежедневно, 10:00-19:30 <br> <br>',
                'Цена билета: <br>',
                '•800₽ взрослый билет ',
                '•600₽ дети от 6 до 12 лет',
                '•Бесплатно дети до 5 лет<br> <br>',
              { prefix: 'Сайт:', text: 'vk.com/kolibrisuzdal', link: 'https://vk.com/kolibrisuzdal?ysclid=mfms8m5gqq501611867' }
            ]
        }
    },


        'arenda_katamaranov': {
        title: 'Аренда катамаранов, лодок, сапов, ладьи',
        heading: 'Аренда лодок, сапов, ладьи',
        video: { src: 'videos/entertainment_places/arenda_katamaranov.mp4', poster: null },
         paidEntry: { text: 'цены варьируются', enabled: true },
        photoButtons: [
            { label: 'Фото', image: 'stories_button_images/entertainment_places/arenda_katamaranov/1.jpg', link: 'stories.html?cat=entertainment&place=arenda_katamaranov.photo' }
        ],
        address: { text: 'Набережная ул., 1', link: 'https://yandex.ru/maps/-/CLa252yf' },
        usefulInfo: {
            enabled: true,
            content: [
                'Оценка на картах 5,0 <br> <br>',
                'Часы работы: ежедневно, 10:00-20:00 <br> <br>',
                'Цена билета: от 500₽ <br><br>',
              { prefix: 'Сайт:', text: 'vk.com', link: 'https://vk.com/club221854496?ysclid=mfmrc3ajqx966465746' }
            ]
        }
    },



     'torgovie_ryadi': {
        title: 'Торговые ряды',
        heading: 'Торговые<br>ряды',
        video: { src: 'videos/entertainment_places/torgovie_ryadi.mp4', poster: null },
        paidEntry: null,
        photoButtons: [
            { label: 'Фото', image: 'stories_button_images/entertainment_places/torgovie_ryadi/1.jpg', link: 'stories.html?cat=entertainment&place=torgovie_ryadi.photo' }
        ],
        address: { text: 'ул. Ленина, 63А', link: 'https://yandex.ru/maps/-/CLaPUMyg' },
        usefulInfo: {
            enabled: false
        }
    },


        'torgovie_lavki_centre': {
        title: 'Торговые лавки в центре города',
        heading: 'Торговые лавки в центре города',
        headingSize: 'clamp(28px, 9vw, 56px)',
        video: { src: 'videos/entertainment_places/torgovie_lavki_centre.mp4', poster: null },
        paidEntry: null,
        photoButtons: [
            { label: 'Фото', image: 'stories_button_images/entertainment_places/torgovie_lavki_centre/1.jpg', link: 'stories.html?cat=entertainment&place=torgovie_lavki_centre.photo' }
        ],
        address: { text: 'Торговая площадь', link: 'https://yandex.ru/maps/-/CLezMK5L' },
        usefulInfo: {
            enabled: false
        }
    },



            'churovo_gorodiche': {
        title: 'Щурово городище',
        heading: 'Щурово<br>городище',
        video: { src: 'videos/entertainment_places/churovo_gorodiche.mp4', poster: null },
         paidEntry: { text: 'вход платный', enabled: true },
        photoButtons: [
            { label: 'О территории', image: 'stories_button_images/entertainment_places/churovo_gorodiche/1.jpg', link: 'stories.html?cat=entertainment&place=churovo_gorodiche.territoria' },
            { label: 'Животные', image: 'stories_button_images/entertainment_places/churovo_gorodiche/2.jpg', link: 'stories.html?cat=entertainment&place=churovo_gorodiche.animals' }
        ],
        address: { text: 'ул. Коровники, 14', link: 'https://yandex.ru/maps/-/CLeYaKKd' },
        usefulInfo: {
            enabled: true,
            content: [
                'Оценка на картах 4,5 <br> <br>',
                'Часы работы: ежедневно, 11:00–17:00 <br> <br>',
                'Цена билета: 500₽ <br><br>',
              { prefix: 'Сайт:', text: 'goryachiekluchi.ru', link: 'https://goryachiekluchi.ru/services/shchurovo-gorodishche.html?ysclid=mfo8de3v5d974321836' }
            ]
        }
    },


    
        'centre_narodnogo_tvorchestva': {
        title: 'Центр народного творчества',
        heading: 'Центр народного творчества',
        headingSize: 'clamp(28px, 9vw, 56px)',
        video: { src: 'videos/entertainment_places/centre_narodnogo_tvorchestva.mp4', poster: null },
         paidEntry: { text: 'цены варьируются', enabled: true },
        photoButtons: [
            { label: 'Фото', image: 'stories_button_images/entertainment_places/centre_narodnogo_tvorchestva/1.jpg', link: 'stories.html?cat=entertainment&place=centre_narodnogo_tvorchestva.photo' }
        ],
        address: { text: 'ул. Алексея Лебедева, 3', link: 'https://yandex.ru/maps/-/CLe6Z2~4' },
        usefulInfo: {
            enabled: true,
            content: [
                'Оценка на картах 4,4 <br> <br>',
                'Часы работы: ежедневно, 10:00-17:00. (в порядке живой очереди) <br> *На Я.Картах написано, что Центр закрыт – это неверно.<br><br>',
                'Цена мастер-классов: <br>',
                '•МК по работе с берестой, ткацкий, роспись по дереву – от 600₽',
                '•Гончарный – 600₽ (работает по сб-вс, продолжительность МК ~15 мин)',
                '•Кузнечный – 700₽-3000₽ в зависимости от сложности изделия (работает по сб-вс)<br> <br>'           
            ]
        }
    },




        'torgovie_lavki': {
        title: 'Торговые лавки',
        heading: 'Торговые<br>лавки',
        video: { src: 'videos/entertainment_places/torgovie_lavki.mp4', poster: null },
         paidEntry: null,
        photoButtons: [
            { label: 'Фото', image: 'stories_button_images/entertainment_places/torgovie_lavki/1.jpg', link: 'stories.html?cat=entertainment&place=torgovie_lavki.photo' }
        ],
        address: { text: 'Кремлёвская ул., 19', link: 'https://yandex.ru/maps/-/CLejuYZD' },
        usefulInfo: {
            enabled: false
        }
    },


        'podvorye_masterov': {
        title: 'Подворье мастеров',
        heading: 'Подворье<br>мастеров',
        video: { src: 'videos/entertainment_places/podvorye_masterov.mp4', poster: null },
          paidEntry: null,
        photoButtons: [
            { label: 'Фото', image: 'stories_button_images/entertainment_places/podvorye_masterov/1.jpg', link: 'stories.html?cat=entertainment&place=podvorye_masterov.photo' }
        ],
        address: { text: 'Кремлёвская ул., 10Г', link: 'https://yandex.ru/maps/-/CLa2rHkb' },
        usefulInfo: {
            enabled: false
        }
    },



     'progulka_v_karete': {
        title: 'Прогулка в карете',
        heading: 'Прогулка<br>в карете',
        video: { src: 'videos/entertainment_places/progulka_v_karete.mp4', poster: null },
         paidEntry: { text: 'цены варьируются', enabled: true },
        photoButtons: [
            { label: 'Фото', image: 'stories_button_images/entertainment_places/progulka_v_karete/1.jpg', link: 'stories.html?cat=entertainment&place=progulka_v_karete.photo' }
        ],
        address: { text: 'Кремлёвская ул.', link: 'https://yandex.ru/maps/-/CLeyESLj' },
        usefulInfo: {
            enabled: true,
            content: [
                'Цена: 2 000₽ – 10 000₽ <br>',
                'Цена зависит от дня. В праздники дороже.'
            ]
        }
    },




    'collider': {
        title: 'Коллайдер. Выставочный центр',
        heading: '<br>Коллайдер',
        video: { src: 'videos/entertainment_places/collider.mp4', poster: null },
         paidEntry: { text: 'вход платный', enabled: true },
        photoButtons: [
            { label: 'Внутри', image: 'stories_button_images/entertainment_places/collider/1.jpg', link: 'stories.html?cat=entertainment&place=collider.vnutri' }
        ],
        address: { text: 'ул. Гастева, 3', link: 'https://yandex.ru/maps/-/CLaAZV8A' },
        usefulInfo: {
            enabled: true,
            content: [
                'Оценка на картах 4,4 <br><br>',
                'Часы работы: ежедневно, 11:00-20:00<br><br>',
                'Цена билета: 500₽<br><br>',
                 { prefix: 'Сайт:', text: 'myra.ru', link: 'https://myra.ru/suzdal-collider?ysclid=mfh2b5eo0423326801' }
            ]
        }
    },


    'arena': {
        title: 'Суздаль арена. Спорткомплекс',
        heading: 'Суздаль арена. Спорткомплекс',
        headingSize: 'clamp(28px, 10vw, 56px)',
        video: { src: 'videos/entertainment_places/arena.mp4', poster: null },
         paidEntry: { text: 'вход платный', enabled: true },
        photoButtons: [
              { label: 'Арена снаружи', image: 'stories_button_images/entertainment_places/arena/1.jpg', link: 'stories.html?cat=entertainment&place=arena.snaruzhi' },
            { label: 'Арена внутри', image: 'stories_button_images/entertainment_places/arena/2.jpg', link: 'stories.html?cat=entertainment&place=arena.vnutri' }
        ],
        address: { text: 'ул. Коровники, 45А', link: 'https://yandex.ru/maps/-/CLUdFD~R' },
        usefulInfo: {
            enabled: true,
            content: [
                'Оценка на картах 5,0 <br><br>',
                'Часы работы: ежедневно, 09:00–21:00<br><br>',
                'Цены:<br>',
                '•1ч. большого тенниса - 2500₽<br>',
                '•1,5ч. спортзала - 350₽',
                '•1ч. футбола/баскетбола/волейбола - 6000₽',
                 { prefix: 'Сайт:', text: 'gtksuzdal.ru', link: 'https://gtksuzdal.ru/arena/?ysclid=mfgmb91ad0442821875' }
            ]
        }
    },




     'neskuchniy_museum': {
        title: 'Нескучный музей',
        heading: 'Нескучный<br>музей',
        video: { src: 'videos/entertainment_places/neskuchniy_museum.mp4', poster: null },
         paidEntry: { text: 'цены варьируются', enabled: true },
        photoButtons: [
            { label: 'Трактирные истории', image: 'stories_button_images/entertainment_places/neskuchniy_museum/1.jpg', link: 'stories.html?cat=entertainment&place=neskuchniy_museum.traktirnie_istorii' },
            { label: 'Чаепитие у купчихи', image: 'stories_button_images/entertainment_places/neskuchniy_museum/2.jpg', link: 'stories.html?cat=entertainment&place=neskuchniy_museum.chaepitie' },
            { label: 'Чайные истории', image: 'stories_button_images/entertainment_places/neskuchniy_museum/3.jpg', link: 'stories.html?cat=entertainment&place=neskuchniy_museum.chaynie_istorii' },
            { label: 'Русская изба', image: 'stories_button_images/entertainment_places/neskuchniy_museum/4.jpg', link: 'stories.html?cat=entertainment&place=neskuchniy_museum.russkaya_izba' },
            { label: 'Мастер-классы', image: 'stories_button_images/entertainment_places/neskuchniy_museum/5.jpg', link: 'stories.html?cat=entertainment&place=neskuchniy_museum.master_class' }
        ],
        address: { text: 'ул. Ленина, 62', link: 'https://yandex.ru/maps/-/CLazAW7z' },
        usefulInfo: {
            enabled: true,
            content: [
                'Оценка на картах 5,0 <br><br>',
                'Часы работы: вт-пт 17:00–19:30; сб 11:00–20:00; вс 11:00–15:00 (по предварительной записи)<br><br>',
                'Цена билета: от 1000₽',
                { prefix: 'Все цены -', text: 'neskuchmuseum.ru<br><br>', link: 'https://neskuchmuseum.ru/#options' },
                 { prefix: 'Сайт:', text: 'neskuchmuseum.ru', link: ' https://neskuchmuseum.ru/' }
            ]
        }
    },


      'galki': {
        title: 'Галки',
        heading: '<br>Галки',
        video: { src: 'videos/entertainment_places/galki.mp4', poster: null },
          paidEntry: null,
        photoButtons: [
            { label: 'Туча из галок', image: 'stories_button_images/entertainment_places/galki/1.jpg', link: 'stories.html?cat=entertainment&place=galki.tucha' }
        ],
        address: { text: 'просто находитесь в центре города)', link: 'https://yandex.ru/maps/-/CPAR7Mk5' },
        usefulInfo: {
            enabled: false
        }
    },



        'myra_centre': {
        title: 'Мира центр. Культурный центр',
        heading: '<br>Мира центр',
        video: { src: 'videos/entertainment_places/myra_centre.mp4', poster: null },
         paidEntry: { text: 'вход бесплатный', enabled: true },
        photoButtons: [
            { label: 'Внутри', image: 'stories_button_images/entertainment_places/myra_centre/1.jpg', link: 'stories.html?cat=entertainment&place=myra_centre.vnutri' }
        ],
        address: { text: 'Кремлёвская ул., 5', link: 'https://yandex.ru/maps/-/CLaaYBnz' },
        usefulInfo: {
            enabled: true,
            content: [
                'Оценка на картах 5,0 <br><br>',
                'Часы работы: ежедневно, 10:00–20:00<br><br>',
                 { prefix: 'Сайт:', text: 'myra.ru', link: ' https://myra.ru/' }
            ]
        }
    },



    'freska_naboyka': {
        title: 'Мастер-классы по фреске и набойке',
        heading: 'Мастер-классы. фреска, набойка',
         headingSize: 'clamp(28px, 10vw, 56px)',
        video: { src: 'videos/entertainment_places/freska_naboyka.mp4', poster: null },
         paidEntry: { text: 'цены варьируются', enabled: true },
        photoButtons: [
            { label: 'Создание фрески', image: 'stories_button_images/entertainment_places/freska_naboyka/1.jpg', link: 'stories.html?cat=entertainment&place=freska_naboyka.freska' },
             { label: 'Набойка на ткани', image: 'stories_button_images/entertainment_places/freska_naboyka/2.jpg', link: 'stories.html?cat=entertainment&place=freska_naboyka.naboyka' }
        ],
        address: { text: 'ул. Алексея Лебедева, 17А', link: 'https://yandex.ru/maps/-/CLqnmSY4' },
        usefulInfo: {
            enabled: true,
            content: [
                'Оценка на картах 5,0 <br><br>',
                'Часы работы: ежедневно, 8:00-21:00. (по предварительной записи)<br><br>',
                'Цена мастер-классов: от 2000₽<br><br>',
                 { prefix: 'Сайт:', text: 'vk.com/mkfreska', link: 'https://vk.com/mkfreska' }
            ]
        }
    },




'gorshechna': {
        title: 'Горшечня Коровиных',
        heading: 'Горшечня<br>Коровиных',
        video: { src: 'videos/entertainment_places/gorshechna.mp4', poster: null },
         paidEntry: { text: 'цены варьируются', enabled: true },
        photoButtons: [
            { label: 'Гончарный мастер-класс', image: 'stories_button_images/entertainment_places/gorshechna/1.jpg', link: 'stories.html?cat=entertainment&place=gorshechna.master_class' }
        ],
        address: { text: 'Рябиновая ул., 15', link: 'https://yandex.ru/maps/-/CLq7aG1q' },
        usefulInfo: {
            enabled: true,
            content: [
                'Оценка на картах 5,0 <br><br>',
                'Часы работы: ежедневно, 10:00-20:00 (по предварительной записи)<br><br>',
                'Цена мастер-класса: 2000₽<br><br>',
                 { prefix: 'Сайт:', text: 'vk.com/suzdalkorovin', link: ' https://vk.com/suzdalkorovin' }
            ]
        }
    },




    
'dymov_keramika': {
        title: 'Дымов керамика',
        heading: 'Дымов<br>керамика',
        video: { src: 'videos/entertainment_places/dymov_keramika.mp4', poster: null },
         paidEntry: { text: 'цены варьируются', enabled: true },
        photoButtons: [
            { label: 'Мастер-классы', image: 'stories_button_images/entertainment_places/dymov_keramika/1.jpg', link: 'stories.html?cat=entertainment&place=dymov_keramika.master_class' }
        ],
        address: { text: 'Транспортная ул., 9', link: 'https://yandex.ru/maps/-/CLvAnS~G' },
        usefulInfo: {
            enabled: true,
            content: [
                'Оценка на картах 5,0 <br><br>',
                'Часы работы: ежедневно, 9:00-18:00 <br><br>',
                'Цены: <br>',
                '•Гончарное ремесло – 2500₽ (+роспись 500₽)',
                '•Изготовление изразцов – 2000₽ (+роспись 700₽)',
                '•Роспись керамических тарелок – 1800₽',
                '•Экскурсия по производству – 1000₽ (взрослый), 600₽ (ребёнок)<br><br>',
                 { prefix: 'Сайт:', text: 'dymovceramicschool.ru', link: 'https://dymovceramicschool.ru/suzdal/?ysclid=mhkcqif6rf246288120' }
            ]
        }
    }


};



