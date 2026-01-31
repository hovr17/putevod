// religious_places.js 
const RELIGIOUS_PLACES = {
    'Pokrovsky_monastery': {
        title: 'Покровский монастырь',
        heading: 'Покровский <br> монастырь',
        video: { src: 'videos/religious_places/Pokrovsky_monastery.mp4', poster: null },
        paidEntry: null,
        photoButtons: [
            { label: 'О монастыре', image: 'stories_button_images/religious_places/Pokrovsky_monastery/1.jpg', link: 'stories.html?cat=religious&place=Pokrovsky_monastery.o_monastery' },
            { label: 'Покровский собор', image: 'stories_button_images/religious_places/Pokrovsky_monastery/2.jpg', link: 'stories.html?cat=religious&place=Pokrovsky_monastery.Pokrovskiy_sobor' },
            { label: 'Зачатьев-ский храм', image: 'stories_button_images/religious_places/Pokrovsky_monastery/3.jpg', link: 'stories.html?cat=religious&place=Pokrovsky_monastery.Zachatievskiy_hram' },
            { label: 'Трапезная', image: 'stories_button_images/religious_places/Pokrovsky_monastery/4.jpg', link: 'stories.html?cat=religious&place=Pokrovsky_monastery.Trapeznaya' },
            { label: 'Музей', image: 'stories_button_images/religious_places/Pokrovsky_monastery/5.jpg', link: 'stories.html?cat=religious&place=Pokrovsky_monastery.Museum' },
            { label: 'Храм Петра и Павла', image: 'stories_button_images/religious_places/Pokrovsky_monastery/6.jpg', link: 'stories.html?cat=religious&place=Pokrovsky_monastery.HramPetraPavla' }
        ],
        address: { text: 'ул. Покровская, 76', link: 'https://yandex.ru/maps/-/CLalNSjI' },
        usefulInfo: {
            enabled: true,
            content: [
                'Часы работы трапезной: ср-вс 11:00-17:00 <br> <br>',
                'Часы работы музея: ежедневно, 11:00-16:00 <br> <br>',
                'Цена билета в музей: 100₽ <br> <br>',
              { prefix: 'Сайт: ', text: 'spokrovmon.ru', link: 'http://spokrovmon.ru/' }
            ]
        }
    },


   'SpasoEvfimiev_monastery': {
        title: 'Спасо-Евфимиев монастырь',
        heading: 'Спасо-Евфимиев <br> монастырь',
      headingSize: 'clamp(28px, 10vw, 56px)',
        video: { src: 'videos/religious_places/SpasoEvfimiev_monastery.mp4', poster: null },
        paidEntry: { text: 'вход платный', enabled: true },
        photoButtons: [
            { label: 'О монастыре', image: 'stories_button_images/religious_places/SpasoEvfimiev_monastery/1.jpg', link: 'stories.html?cat=religious&place=SpasoEvfimiev_monastery.o_territorii' },
            { label: 'Преображен-ский собор', image: 'stories_button_images/religious_places/SpasoEvfimiev_monastery/2.jpg', link: 'stories.html?cat=religious&place=SpasoEvfimiev_monastery.Preobrazhenskiy_sobor' },
            { label: 'Тюрьма', image: 'stories_button_images/religious_places/SpasoEvfimiev_monastery/3.jpg', link: 'stories.html?cat=religious&place=SpasoEvfimiev_monastery.Turma' },
            { label: 'Золотая кладовая', image: 'stories_button_images/religious_places/SpasoEvfimiev_monastery/4.jpg', link: 'stories.html?cat=religious&place=SpasoEvfimiev_monastery.Zolotaya_kladovaya' },
            { label: 'Русская икона', image: 'stories_button_images/religious_places/SpasoEvfimiev_monastery/5.jpg', link: 'stories.html?cat=religious&place=SpasoEvfimiev_monastery.Russkaya_ikona' },
            { label: 'Колокола', image: 'stories_button_images/religious_places/SpasoEvfimiev_monastery/6.jpg', link: 'stories.html?cat=religious&place=SpasoEvfimiev_monastery.Blagovestniki. Kolokola' },
            { label: 'Стены', image: 'stories_button_images/religious_places/SpasoEvfimiev_monastery/7.jpg', link: 'stories.html?cat=religious&place=SpasoEvfimiev_monastery.Steni' }
        ],
        address: { text: 'ул. Ленина, 133Г', link: 'https://yandex.ru/maps/-/CLeRQZZ9' },
        usefulInfo: {
            enabled: true,
            content: [
                'Оценка на картах 5,0 <br> <br>',
                'Часы работы: вт-пт, вс 10:00-18:00; сб 10:00-19:00 <br> <br>',
                'Цена билета за посещение собора и музеев:<br>',
                '•Взрослые - 700₽ (350₽*)',
                '•Учащиеся и студенты с 14 лет - 500₽ (290₽*)',
                '•Дети от 7 до 14 лет - 500₽ (290₽*)',
                '•Дети до 7 лет, участники СВО, члены семей участников СВО - 0₽ <br>',
                '*Посещение только территории и собора<br><br>',
              { prefix: 'Сайт: ', text: 'vladmuseum.ru', link: 'https://vladmuseum.ru/ru/geografiya-muzeya/suzdal/spaso-evfimiev-monastyr/' }
            ]
        }
    },


'Rizopolozhenskiy_monastery': {
        title: 'Ризоположенский монастырь',
        heading: 'Ризоположенский <br> монастырь',
         headingSize: 'clamp(28px, 9vw, 56px)',
        video: { src: 'videos/religious_places/Rizopolozhenskiy_monastery.mp4', poster: null },
        paidEntry: null,
        photoButtons: [
            { label: 'Ризополо-женский собор', image: 'stories_button_images/religious_places/Rizopolozhenskiy_monastery/1.jpg', link: 'stories.html?cat=religious&place=Rizopolozhenskiy_monastery.Rizopolozhenskiy_sobor' },
            { label: 'Колокольня', image: 'stories_button_images/religious_places/Rizopolozhenskiy_monastery/2.jpg', link: 'stories.html?cat=religious&place=Rizopolozhenskiy_monastery.Kolokolna' }
        ],
        address: { text: 'ул. Ленина, д. 79', link: 'https://yandex.ru/maps/-/CLa2YQ1T' },
        usefulInfo: {
            enabled: true,
            content: [
                'Часы работы: ежедневно, 08:00–19:00 <br> <br>',
                'Цена подъема на колокольню:<br>',
                '•200₽ взрослый<br>',
                '•100₽ дети и льготные категории',
                '•Бесплатно дети дошкольного возраста'
            ]
        }
    },


    'Aleksandrovskiy_monastery': {
        title: 'Александровский монастырь',
        heading: 'Александровский <br> монастырь',
         headingSize: 'clamp(28px, 9vw, 56px)',
        video: { src: 'videos/religious_places/Aleksandrovskiy_monastery.mp4', poster: null },
        paidEntry: null,
        photoButtons: [
            { label: 'О монастыре', image: 'stories_button_images/religious_places/Aleksandrovskiy_monastery/1.jpg', link: 'stories.html?cat=religious&place=Aleksandrovskiy_monastery.o_monastery' },
            { label: 'Вознесен-ская церковь', image: 'stories_button_images/religious_places/Aleksandrovskiy_monastery/2.jpg', link: 'stories.html?cat=religious&place=Aleksandrovskiy_monastery.Voznesenskaya_cerkov' }
        ],
        address: { text: 'ул. Гастева, 15', link: 'https://yandex.ru/maps/-/CLU-7M1Z' },
        usefulInfo: {
            enabled: false
        }
    },


   'Vasilevskiy_monastery': {
        title: 'Васильевский монастырь',
        heading: 'Васильевский <br> монастырь',
        video: { src: 'videos/religious_places/Vasilevskiy_monastery.mp4', poster: null },
        paidEntry: null,
        photoButtons: [
            { label: 'О монастыре', image: 'stories_button_images/religious_places/Vasilevskiy_monastery/1.jpg', link: 'stories.html?cat=religious&place=Vasilevskiy_monastery.o_monastery' },
            { label: 'Васильев-ский собор', image: 'stories_button_images/religious_places/Vasilevskiy_monastery/2.jpg', link: 'stories.html?cat=religious&place=Vasilevskiy_monastery.Vasilievskiy_sobor' },
            { label: 'Сретенская церковь', image: 'stories_button_images/religious_places/Vasilevskiy_monastery/3.jpg', link: 'stories.html?cat=religious&place=Vasilevskiy_monastery.Sretenskiy_hram' }
        ],
        address: { text: 'Васильевская ул., 32Б', link: 'https://yandex.ru/maps/-/CLUlAUi4' },
        usefulInfo: {
            enabled: false
        }
    },


 'Voskresenskiy': {
        title: 'Храм Воскресенский',
        heading: 'Храм <br> Воскресенский',
        video: { src: 'videos/religious_places/Voskresenskiy.mp4', poster: null },
        paidEntry: null,
        photoButtons: [
            { label: 'Храм снаружи', image: 'stories_button_images/religious_places/Voskresenskiy/1.jpg', link: 'stories.html?cat=religious&place=Voskresenskiy.Hram_snaruzhi' },
            { label: 'Храм внутри', image: 'stories_button_images/religious_places/Voskresenskiy/2.jpg', link: 'stories.html?cat=religious&place=Voskresenskiy.Hram_vnutri' }
        ],
        address: { text: 'ул. Ленина, 63Б', link: 'https://yandex.ru/maps/-/CLazfMzX' },
        usefulInfo: {
            enabled: false
        }
    },


 'Kazanskiy': {
        title: 'Храм Казанский',
        heading: '<br>Храм Казанский',
        video: { src: 'videos/religious_places/Kazanskiy.mp4', poster: null },
        paidEntry: null,
        photoButtons: [
            { label: 'Храм снаружи', image: 'stories_button_images/religious_places/Kazanskiy/1.jpg', link: 'stories.html?cat=religious&place=Kazanskiy.Hram_snaruzhi' },
            { label: 'Храм внутри', image: 'stories_button_images/religious_places/Kazanskiy/2.jpg', link: 'stories.html?cat=religious&place=Kazanskiy.Hram_vnutri' }
        ],
        address: { text: 'ул. Ленина, 63В', link: 'https://yandex.ru/maps/-/CLrTyJ9z' },
        usefulInfo: {
            enabled: false
        }
    },


 'KrestoNikolskiy': {
        title: 'Храм Кресто-Никольский',
        heading: 'Храм Кресто-<br>Никольский',
        video: { src: 'videos/religious_places/KrestoNikolskiy.mp4', poster: null },
        paidEntry: null,
        photoButtons: [
            { label: 'Фото', image: 'stories_button_images/religious_places/KrestoNikolskiy/1.jpg', link: 'stories.html?cat=religious&place=KrestoNikolskiy.Photo' }
        ],
        address: { text: 'ул. Ленина, 65А', link: 'https://yandex.ru/maps/-/CLa7ROzm' },
        usefulInfo: {
            enabled: false
        }
    },


     'IoannaPredtechi': {
        title: 'Храм Иоанна Предтечи',
        heading: 'Храм Иоанна<br>Предтечи',
        video: { src: 'videos/religious_places/IoannaPredtechi.mp4', poster: null },
        paidEntry: null,
        photoButtons: [
            { label: 'Храм снаружи', image: 'stories_button_images/religious_places/IoannaPredtechi/1.jpg', link: 'stories.html?cat=religious&place=IoannaPredtechi.Hram_snaruzhi' },
             { label: 'Храм внутри', image: 'stories_button_images/religious_places/IoannaPredtechi/2.jpg', link: 'stories.html?cat=religious&place=IoannaPredtechi.Hram_vnutri' }
        ],
        address: { text: 'ул. Ленина, 55А', link: 'https://yandex.ru/maps/-/CLaCeY7e' },
        usefulInfo: {
            enabled: false
        }
    },


    'Pyatneckiy': {
        title: 'Храм Пятницкий и Входоиерусалимский',
        heading: 'Храм <br> Пятницкий',
        video: { src: 'videos/religious_places/Pyatneckiy.mp4', poster: null },
        paidEntry: null,
        photoButtons: [
            { label: 'Фото', image: 'stories_button_images/religious_places/Pyatneckiy/1.jpg', link: 'stories.html?cat=religious&place=Pyatneckiy.Photo' }
        ],
        address: { text: 'ул. Кремлёвская, 4', link: 'https://yandex.ru/maps/-/CLa77V-u' },
        usefulInfo: {
            enabled: false
        }
    },


            'Nikolskiy': {
        title: 'Храм Никольский и Рождественский',
        heading: 'Храм <br>Рождественский',
        headingSize: 'clamp(28px, 10vw, 56px)',
        video: { src: 'videos/religious_places/Nikolskiy.mp4', poster: null },
        paidEntry: null,
        photoButtons: [
            { label: 'Фото', image: 'stories_button_images/religious_places/Nikolskiy/1.jpg', link: 'stories.html?cat=religious&place=Nikolskiy.Photo' }
        ],
        address: { text: 'ул. Алексея Лебедева, 17А', link: 'https://yandex.ru/maps/-/CLa7vDlF' },
        usefulInfo: {
            enabled: true,
            content: [
                'Оценка мастер-класса на картах: 5,0 <br> <br>',
                'Стоимость мастер-класса: от 2000₽<br> <br>',
              { prefix: 'Сайт: ', text: 'vk.com/mkfreska', link: ' https://vk.com/mkfreska' }
            ]
        }
    },

       'Uspenskiy': {
        title: 'Храм Успенский',
        heading: '<br>Храм Успенский',
        video: { src: 'videos/religious_places/Uspenskiy.mp4', poster: null },
        paidEntry: null,
        photoButtons: [
            { label: 'Храм снаружи', image: 'stories_button_images/religious_places/Uspenskiy/1.jpg', link: 'stories.html?cat=religious&place=Uspenskiy.Hram_snaruzhi' },
            { label: 'Храм внутри', image: 'stories_button_images/religious_places/Uspenskiy/2.jpg', link: 'stories.html?cat=religious&place=Uspenskiy.Hram_vnutri' }
        ],
        address: { text: 'Кремлёвская ул., 8', link: 'https://yandex.ru/maps/-/CLaCqKzw' },
        usefulInfo: {
            enabled: false
        }
    },

        'FloraLavri': {
        title: 'Храм Флора и Лавры, Архангела Михаила',
        heading: 'Храм Архангела<br>Михаила',
        video: { src: 'videos/religious_places/FloraLavri.mp4', poster: null },
        paidEntry: null,
        photoButtons: [
            { label: 'О храмах', image: 'stories_button_images/religious_places/FloraLavri/1.jpg', link: 'stories.html?cat=religious&place=FloraLavri.o_hramah' }
        ],
        address: { text: 'Михайловская ул., 58', link: 'https://yandex.ru/maps/-/CLaamHLy' },
        usefulInfo: {
            enabled: false
        }
    },

        'Lazarevskiy': {
        title: 'Храм Лазаревский и Антипьевский',
        heading: 'Храм Лазаревский<br>и Антипьевский',
        headingSize: 'clamp(28px, 9.5vw, 56px)',
        video: { src: 'videos/religious_places/Lazarevskiy.mp4', poster: null },
        paidEntry: null,
        photoButtons: [
            { label: 'Фото', image: 'stories_button_images/religious_places/Lazarevskiy/1.jpg', link: 'stories.html?cat=religious&place=Lazarevskiy.Photo' }
        ],
        address: { text: 'ул. Ленина, 73Б', link: 'https://yandex.ru/maps/-/CLa7bQIC' },
        usefulInfo: {
            enabled: false
        }
    },

          'Znamenskiy': {
        title: 'Храм Знаменский и Ризоположенский',
        heading: 'Храм<br>Знаменский',
        video: { src: 'videos/religious_places/Znamenskiy.mp4', poster: null },
        paidEntry: null,
        photoButtons: [
            { label: 'Храм снаружи', image: 'stories_button_images/religious_places/Znamenskiy/1.jpg', link: 'stories.html?cat=religious&place=Znamenskiy.Hram_snaruzhi' },
            { label: 'Храм внутри', image: 'stories_button_images/religious_places/Znamenskiy/2.jpg', link: 'stories.html?cat=religious&place=Znamenskiy.Hram_vnutri' }
        ],
        address: { text: 'ул. Ленина, 22', link: 'https://yandex.ru/maps/-/CLaz7UiE' },
        usefulInfo: {
            enabled: false
        }
    },


        'Ilya_Prorok': {
        title: 'Храм Ильи Пророка',
        heading: 'Храм<br>Ильи Пророка',
        video: { src: 'videos/religious_places/Ilya_Prorok.mp4', poster: null },
        paidEntry: null,
        photoButtons: [
            { label: 'Храм снаружи', image: 'stories_button_images/religious_places/Ilya_Prorok/1.jpg', link: 'stories.html?cat=religious&place=Ilya_Prorok.Hram_snaruzhi' }
        ],
        address: { text: 'Пушкарская улица, 50', link: 'https://yandex.ru/maps/-/CLUtvI6P' },
        usefulInfo: {
            enabled: false
        }
    },


       'Smolenskiy': {
        title: 'Храм Смоленский и Симеоновский',
        heading: 'Храм<br>Смоленский',
        video: { src: 'videos/religious_places/Smolenskiy.mp4', poster: null },
        paidEntry: null,
        photoButtons: [
            { label: 'Храмы снаружи', image: 'stories_button_images/religious_places/Smolenskiy/1.jpg', link: 'stories.html?cat=religious&place=Smolenskiy.Hram_snaruzhi' },
            { label: 'Смоленский храм внутри', image: 'stories_button_images/religious_places/Smolenskiy/2.jpg', link: 'stories.html?cat=religious&place=Smolenskiy.Hram_vnutri' }
        ],
        address: { text: 'ул. Ленина, 148А', link: 'https://yandex.ru/maps/-/CLaCYCPw' },
        usefulInfo: {
            enabled: false
        }
    },

       'Bogoyavlenskiy': {
        title: 'Храм Богоявленский и Предтеченский',
        heading: 'Храм<br>Богоявленский',
        video: { src: 'videos/religious_places/Bogoyavlenskiy.mp4', poster: null },
        paidEntry: null,
        photoButtons: [
            { label: 'Фото', image: 'stories_button_images/religious_places/Bogoyavlenskiy/1.jpg', link: 'stories.html?cat=religious&place=Bogoyavlenskiy.Photo' }
        ],
        address: { text: 'ул. Шмидта, 7', link: 'https://yandex.ru/maps/-/CLazjAyk' },
        usefulInfo: {
            enabled: false
        }
    },


       'BorisaGleba': {
        title: 'Храм Бориса и Глеба',
        heading: 'Храм<br>Бориса и Глеба',
        video: { src: 'videos/religious_places/BorisaGleba.mp4', poster: null },
        paidEntry: null,
        photoButtons: [
            { label: 'Храм снаружи', image: 'stories_button_images/religious_places/BorisaGleba/1.jpg', link: 'stories.html?cat=religious&place=BorisaGleba.Hram_snaruzhi' },
             { label: 'Храм внутри', image: 'stories_button_images/religious_places/BorisaGleba/2.jpg', link: 'stories.html?cat=religious&place=BorisaGleba.Hram_vnutri' }
        ],
        address: { text: 'ул. Борисова Сторона, 2', link: 'https://yandex.ru/maps/-/CLUhER9E' },
        usefulInfo: {
            enabled: false
        }
    },


       'KosmiDamiana': {
        title: 'Храм Космы и Дамиана',
        heading: 'Храм Космы<br>и Дамиана',
        video: { src: 'videos/religious_places/KosmiDamiana.mp4', poster: null },
        paidEntry: null,
        photoButtons: [
            { label: 'Фото', image: 'stories_button_images/religious_places/KosmiDamiana/1.jpg', link: 'stories.html?cat=religious&place=KosmiDamiana.Photo' }
        ],
        address: { text: 'Ярунова Гора', link: 'https://yandex.ru/maps/-/CLa7JY9l' },
        usefulInfo: {
            enabled: false
        }
    }
    
};

