const MUSEUM_PLACES = {

'kreml': {
        title: 'Кремль',
        heading: '<br>Кремль',
        video: { src: 'videos/museum_places/kreml.mp4', poster: null },
         paidEntry: { text: 'вход бесплатный, есть платные музеи', enabled: true },
        photoButtons: [
            { label: 'Рождествен-ский собор', image: 'stories_button_images/museum_places/kreml/1.jpg', link: 'stories.html?cat=museum&place=kreml.Rozhdestvenskiy_sobor' },
            { label: 'Архиерейские палаты', image: 'stories_button_images/museum_places/kreml/2.jpg', link: 'stories.html?cat=museum&place=kreml.palati' },
            { label: 'Колокольня', image: 'stories_button_images/museum_places/kreml/3.jpg', link: 'stories.html?cat=museum&place=kreml.kolokolna' },
            { label: 'Никольский храм', image: 'stories_button_images/museum_places/kreml/4.jpg', link: 'stories.html?cat=museum&place=kreml.Nikolskiy_hram' },
            { label: 'Виды с валов', image: 'stories_button_images/museum_places/kreml/5.jpg', link: 'stories.html?cat=museum&place=kreml.vidi_vali' }
           
        ],
        address: { text: 'Кремлёвская ул., 20', link: 'https://yandex.ru/maps/-/CLa5FY56' },
       usefulInfo: {
            enabled: true,
            content: [
                'Оценка на картах 4,9 <br> <br>',
                'Часы работы: пн-пт 10:00–18:00; сб 10:00–19:00; вс 10:00–18:00 <br> <br>',
                'Цена билета за посещение собора и музеев:<br>',
                '•Взрослые - 600₽ (350₽*)',
                '•Учащиеся и студенты с 14 лет - 400₽ (290₽*)',
                '•Дети от 7 до 14 лет - 400₽ (290₽*)',
                '•Дети до 7 лет, участники СВО, члены семей участников СВО - 0₽ <br>',
                '*Посещение только территории и собора<br><br>',
              { prefix: 'Сайт:', text: 'vladmuseum.ru', link: 'https://vladmuseum.ru/ru/geografiya-muzeya/suzdal/muzeynyy-kompleks-kreml/?ysclid=mfim0k1m1c597256294' }
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
              { prefix: 'Сайт:', text: 'vladmuseum.ru', link: 'https://vladmuseum.ru/ru/geografiya-muzeya/suzdal/spaso-evfimiev-monastyr/' }
            ]
        }
    },


    'derevannoe_zodchestvo': {
        title: 'Музей деревянного зодчества',
        heading: 'Музей деревянного зодчества',
         headingSize: 'clamp(28px, 9vw, 56px)',
        video: { src: 'videos/museum_places/derevannoe_zodchestvo.mp4', poster: null },
         paidEntry: { text: 'вход платный', enabled: true },
        photoButtons: [
            { label: 'О музее', image: 'stories_button_images/museum_places/derevannoe_zodchestvo/1.jpg', link: 'stories.html?cat=museum&place=derevannoe_zodchestvo.o_museum' },
            { label: 'На территории', image: 'stories_button_images/museum_places/derevannoe_zodchestvo/2.jpg', link: 'stories.html?cat=museum&place=derevannoe_zodchestvo.na_territorii' }
           
        ],
        address: { text: 'Пушкарская ул., 27', link: 'https://yandex.ru/maps/-/CLUljTyD' },
       usefulInfo: {
            enabled: true,
            content: [
                'Оценка на картах 4,9 <br> <br>',
                'Часы работы: пн-пт 10:00–18:00; сб 10:00–19:00; вс 10:00–18:00 <br> <br>',
                'Цена билета:<br>',
                '•Взрослые - 600₽',
                '•Учащиеся и студенты с 14 лет - 400₽',
                '•Дети от 7 до 14 лет - 400₽',
                '•Дети до 7 лет, участники СВО, члены семей участников СВО - 0₽ <br><br>',
              { prefix: 'Сайт:', text: 'vladmuseum.ru', link: 'https://vladmuseum.ru/ru/geografiya-muzeya/suzdal/muzey-derevyannogo-zodchestva/?ysclid=mfgqsy9ygb375025161' }
            ]
        }
    },

'rezidencia': {
        title: 'Резиденция Юрия Долгорукого',
        heading: 'Резиденция Юрия Долгорукого',
        headingSize: 'clamp(28px, 9vw, 56px)',
        video: { src: 'videos/museum_places/rezidencia.mp4', poster: null },
         paidEntry: { text: 'вход бесплатный, есть платный музей', enabled: true },
        photoButtons: [
            { label: 'Резиденция', image: 'stories_button_images/museum_places/rezidencia/1.jpg', link: 'stories.html?cat=museum&place=rezidencia.rezidencia' },
            { label: 'Храмы внутри', image: 'stories_button_images/museum_places/rezidencia/2.jpg', link: 'stories.html?cat=museum&place=rezidencia.hrami_vnutri' }
           
        ],
        address: { text: 'Старая ул., 2А', link: 'https://yandex.ru/maps/-/CLezAUYS' },
       usefulInfo: {
            enabled: true,
            content: [
                'Оценка на картах 5,0 <br> <br>',
                'Часы работы музея: вт-ср 10:00-16:00; чт-вс 10:00-17:00 <br> <br>',
                'Цена билета:<br>',
                '•Взрослые - 250₽',
                '•Учащиеся и студенты с 14 лет - 200₽',
                '•Дети от 7 до 14 лет - 200₽',
                '•Дети до 7 лет, участники СВО, члены семей участников СВО - 0₽ <br><br>',
              { prefix: 'Сайт:', text: 'vladmuseum.ru', link: 'https://vladmuseum.ru/ru/geografiya-muzeya/kideksha/?ysclid=mfh1e9l7go117259201' }
            ]
        }
    },


    'dom_balzaminova': {
        title: 'Дом Бальзаминова',
        heading: 'Дом Бальзаминова',
        video: { src: 'videos/museum_places/dom_balzaminova.mp4', poster: null },
         paidEntry: { text: 'вход платный', enabled: true },
        photoButtons: [
            { label: 'О доме', image: 'stories_button_images/museum_places/dom_balzaminova/1.jpg', link: 'stories.html?cat=museum&place=dom_balzaminova.o_dome' }
           
        ],
        address: { text: 'Старая ул., 13', link: 'https://yandex.ru/maps/-/CLUpfAnN' },
       usefulInfo: {
            enabled: true,
            content: [
                'Оценка на картах 4,9 <br> <br>',
                'Часы работы: ежедневно, 10:00-18:00 <br> <br>',
                'Цена билета: 100₽'
            ]
        }
    },


  'dinnikov': {
        title: 'Музей и арт-центр Дынниковых',
        heading: 'Музей и арт-центр Дынниковых',
        headingSize: 'clamp(28px, 9vw, 56px)',
        video: { src: 'videos/museum_places/dinnikov.mp4', poster: null },
         paidEntry: { text: 'вход бесплатный', enabled: true },
        photoButtons: [
            { label: 'Внутри музея', image: 'stories_button_images/museum_places/dinnikov/1.jpg', link: 'stories.html?cat=museum&place=dinnikov.vnutri' }
           
        ],
        address: { text: 'ул. Ленина, 63А', link: 'https://yandex.ru/maps/-/CLeeaSoK' },
       usefulInfo: {
            enabled: true,
            content: [
                'Оценка на картах 4,6 <br> <br>',
                'Часы работы: ср-вс 10:00–18:00 <br> <br>',
                'Цена билета: 0₽<br> <br>',
                { prefix: 'Сайт:', text: 'artcentredynnikovs.ru', link: 'https://artcentredynnikovs.ru/' }
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


      'larec': {
        title: 'Ларец. Выставочный центр',
        heading: '<br>Ларец',
        video: { src: 'videos/museum_places/larec.mp4', poster: null },
         paidEntry: { text: 'вход платный', enabled: true },
        photoButtons: [
            { label: 'Внутри музея', image: 'stories_button_images/museum_places/larec/1.jpg', link: 'stories.html?cat=museum&place=larec.o_museum' }
           
        ],
        address: { text: 'Слободская ул., 45', link: 'https://yandex.ru/maps/-/CLa45Wi~' },
       usefulInfo: {
            enabled: true,
            content: [
                'Оценка на картах 4,6 <br> <br>',
                'Часы работы: ежедневно, 11:00–20:00 <br> <br>',
                'Цена билета: 350₽<br>',
                '175₽ для жителей Владимирской области, студентов, пенсионеров<br><br>',
                { prefix: 'Сайт:', text: 'myra.ru', link: ' https://myra.ru/larets' }
            ]
        }
    },



    
      'museum_vrema_steklo': {
        title: 'Музей время и стекло',
        heading: 'Музей время и стекло',
        video: { src: 'videos/museum_places/museum_vrema_steklo.mp4', poster: null },
         paidEntry: { text: 'вход платный', enabled: true },
        photoButtons: [
            { label: 'Внутри музея', image: 'stories_button_images/museum_places/museum_vrema_steklo/1.jpg', link: 'stories.html?cat=museum&place=museum_vrema_steklo.vnutri_museum' }
           
        ],
        address: { text: 'Кремлёвская ул., 19', link: 'https://yandex.ru/maps/-/CLaeN-94' },
       usefulInfo: {
            enabled: true,
            content: [
                'Оценка на картах 4,5 <br> <br>',
                'Часы работы: ежедневно, 10:00-19:00 <br> <br>',
                'Цена билета: 400₽<br>',
                '250₽ - школьники<br><br>',
                { prefix: 'Сайт:', text: 'vremyasteklo.ru', link: 'https://vremyasteklo.ru/' }
            ]
        }
    },


       'museum_voskovih_figur': {
        title: 'Музей восковых фигур',
        heading: 'Музей восковых фигур',
        video: { src: 'videos/museum_places/museum_voskovih_figur.mp4', poster: null },
         paidEntry: { text: 'вход платный', enabled: true },
        photoButtons: [
            { label: 'Внутри музея', image: 'stories_button_images/museum_places/museum_voskovih_figur/1.jpg', link: 'stories.html?cat=museum&place=museum_voskovih_figur.vnutri_museum' }
           
        ],
        address: { text: 'Кремлёвская ул., 19', link: 'https://yandex.ru/maps/-/CLaeN-94' },
       usefulInfo: {
            enabled: true,
            content: [
                'Оценка на картах 4,8 <br> <br>',
                'Часы работы: ежедневно, 10:00–19:00 <br> <br>',
                'Цена билета: 400₽<br>',
                '•250₽ - льготный билет<br>',
                '•Бесплатно для детей до 7 лет<br><br>',
                { prefix: 'Сайт:', text: 'museum-wax.ru', link: 'https://museum-wax.ru/' }
            ]
        }
    },


     'museum_mishka': {
        title: 'Музей истории плюшевого мишки',
        heading: 'Музей истории плюшевого мишки',
        headingSize: 'clamp(28px, 9vw, 56px)',
        video: { src: 'videos/museum_places/museum_mishka.mp4', poster: null },
         paidEntry: { text: 'вход платный', enabled: true },
        photoButtons: [
            { label: 'Внутри музея', image: 'stories_button_images/museum_places/museum_mishka/1.jpg', link: 'stories.html?cat=museum&place=museum_mishka.vnutri_museum' }
           
        ],
        address: { text: 'Торговая площадь, 1Б', link: 'https://yandex.ru/maps/-/CLaiQC4n' },
       usefulInfo: {
            enabled: true,
            content: [
                'Оценка на картах 4,7 <br> <br>',
                'Часы работы: сб, вс; 11:00-16:00 <br> <br>',
                'Цена билета: 200₽<br>',
                'Дети до 14 лет - бесплатно'
            ]
        }
    },



    
     'posadskiy_dom': {
        title: 'Посадский дом',
        heading: '<br>Посадский дом',
        video: { src: 'videos/museum_places/posadskiy_dom.mp4', poster: null },
          paidEntry: null,
        photoButtons: [
            { label: 'Фото', image: 'stories_button_images/museum_places/posadskiy_dom/1.jpg', link: 'stories.html?cat=museum&place=posadskiy_dom.photo' }
           
        ],
        address: { text: 'ул. Ленина, 148', link: 'https://yandex.ru/maps/-/CLeeMI~t' },
         usefulInfo: {
            enabled: false
        }
    },
};