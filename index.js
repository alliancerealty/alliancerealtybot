const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const bot = new TelegramBot(process.env.BOT_TOKEN, {
    polling: true,
});

bot.setMyCommands([{ command: '/start', description: 'Menu' }]);

const userState = {};

const start = () => {
    bot.on('message', (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text;
        const currentState = userState[chatId];

        const language = {
            reply_markup: {
                keyboard: [
                    [
                        {
                            text: 'Українська',
                        },
                        {
                            text: 'Русский',
                        },
                        {
                            text: 'Polski',
                        },
                    ],
                ],
                one_time_keyboard: true,
            },
        };
        if (
            text === '/start' ||
            text === 'Повернутись в початкове меню' ||
            text === 'Вернуться в начальное меню' ||
            text === 'Obróć w menu pochatkove'
        ) {
            bot.sendMessage(
                chatId,
                'Вітаю я Alliance_services бот! З радістю допоможу вирішити Ваш запит. Оберіть будь ласка мову:',
                language
            );

            delete userState[chatId];
        }
    });
};

bot.on('text', (msg) => {
    const chatId = msg.chat.id;
    const selectedLanguage = msg.text;

    switch (selectedLanguage) {
        case 'Українська':
            sendOptions(
                chatId,
                'Дякуємо! Для того щоб ми розглянули Ваш запит оберіть чого саме він стосується:',
                [
                    'Оплата рахунків',
                    'Технічні неполадки в квартирі',
                    'Легалізація',
                    'Інше',
                ]
            );
            break;
        case 'Русский':
            sendOptions(
                chatId,
                'Спасибо! Для того чтобы мы рассмотрели Ваш запрос выберите чего именно он касается:',
                [
                    'Оплата счетов',
                    'Технические неполадки в квартире',
                    'Легализация',
                    'Другое',
                ]
            );
            break;
        case 'Polski':
            sendOptions(
                chatId,
                'Dziękujemy! Aby upewnić się, że rozpatrzymy Twoją prośbę, wybierz, czego ona dotyczy:',
                [
                    'Płacenie rachunków',
                    'Problemy techniczne w apartamencie',
                    'Legalizacja',
                    'Inne',
                ]
            );
            break;
        default:
            break;
    }
});

bot.on('text', (msg) => {
    const chatId = msg.chat.id;
    const selectedOptions = msg.text;
    const currentState = userState[chatId];

    switch (selectedOptions) {
        case 'Оплата рахунків':
            sendOptions(chatId, 'Оплата рахунків', [
                'Оплата житла',
                'Оплата комунальних послуг',
                'Оплата інтернету',
                'Інше',
            ]);
            break;
        case 'Технічні неполадки в квартирі':
            sendOptions(chatId, 'Технічні неполадки в квартирі', [
                'Сантехніка',
                'Електрика',
                'Меблі в квартирі',
                'Вхідні двері',
                'Стіни',
                'Вікна',
                'Інше',
            ]);
            break;
        case 'Легалізація':
            bot.sendMessage(chatId, 'Опишіть свою ситуацію');
            userState[chatId] = 'awaiting_situation_ua';
            break;
        case 'Інше':
            bot.sendMessage(chatId, 'Опишіть свою ситуацію');
            userState[chatId] = 'awaiting_situation_ua';
            break;
        case 'Оплата счетов':
            sendOptions(chatId, 'Оплата счетов', [
                'Оплата жилья',
                'Оплата коммунальных услуг',
                'Оплата интернета',
                'Другое',
            ]);
            break;
        case 'Технические неполадки в квартире':
            sendOptions(chatId, 'Технические неполадки в квартире', [
                'Сантехника',
                'Электричество',
                'Мебель в квартире',
                'Входная дверь',
                'Стены',
                'Окна',
                'Другое',
            ]);
            break;
        case 'Легализация':
            bot.sendMessage(chatId, 'Опишите свою ситуацию');
            userState[chatId] = 'awaiting_situation_ru';
            break;
        case 'Другое':
            bot.sendMessage(chatId, 'Опишите свою ситуацию');
            userState[chatId] = 'awaiting_situation_ru';
            break;
        case 'Płacenie rachunków':
            sendOptions(chatId, 'Płacenie rachunków', [
                'Płatność za mieszkanie',
                'Płatność za media',
                'Płacenie za internet',
                'Inne',
            ]);
            break;
        case 'Problemy techniczne w apartamencie':
            sendOptions(chatId, 'Problemy techniczne w apartamencie', [
                'Hydraulika',
                'Elektryczność',
                'Meble w mieszkaniu',
                'Drzwi wejściowe',
                'Ściany',
                'Okna',
                'Inne',
            ]);
            break;
        case 'Legalizacja':
            bot.sendMessage(chatId, 'Opisz swoją sytuację');
            userState[chatId] = 'awaiting_situation_pl';
            break;
        case 'Inne':
            bot.sendMessage(chatId, 'Opisz swoją sytuację');
            userState[chatId] = 'awaiting_situation_pl';
            break;
        default:
            break;
    }
});

bot.on('text', (msg) => {
    const chatId = msg.chat.id;
    const selectedOptions = msg.text;
    const currentState = userState[chatId];

    switch (selectedOptions) {
        case 'Оплата житла':
            bot.sendMessage(
                chatId,
                'Дякуємо! Напишіть будь ласка свою адресу, наприклад: ul. Czartoryskiego 99, m.99'
            );
            userState[chatId] = 'awaiting_address_ua';
            break;
        case 'Оплата інтернету':
            bot.sendMessage(
                chatId,
                'Дякуємо! Напишіть будь ласка свою адресу, наприклад: ul. Czartoryskiego 99, m.99'
            );
            userState[chatId] = 'awaiting_address_ua';
            break;
        case 'Оплата комунальних послуг':
            sendOptions(chatId, 'Оберіть комунальну послугу.', [
                'Гаряча вода',
                'Холодна вода',
                'Газопостачання',
                'Світло',
                'Опалення',
            ]);
            break;
        case 'Сантехніка':
            sendOptions(chatId, 'Де потрібно локалізувати проблему?', [
                'Кухня',
                'Туалет',
                'Ванна',
                'Інше',
            ]);
            userState[chatId] = 'awaiting_tech_problem_place_ua';
            break;
        case 'Електрика':
            sendOptions(chatId, 'Де потрібно локалізувати проблему?', [
                'Кухня',
                'Туалет',
                'Ванна',
                'Коридор',
                'Кімната',
                'Інше',
            ]);
            userState[chatId] = 'awaiting_tech_problem_place_ua';
            break;
        case 'Меблі в квартирі':
            sendOptions(chatId, 'Де потрібно локалізувати проблему?', [
                'Кухня',
                'Туалет',
                'Ванна',
                'Коридор',
                'Кімната',
                'Інше',
            ]);
            userState[chatId] = 'awaiting_tech_problem_place_ua';
            break;
        case 'Вхідні двері':
            sendOptions(chatId, 'Яку проблему потрібно вирішити?', [
                'Замок',
                'Двері не закриваються',
                'Двері не відчиняються',
                'Інше',
            ]);
            userState[chatId] = 'awaiting_tech_problem_place_ua';
            break;
        case 'Стіни':
            sendOptions(chatId, 'Де потрібно локалізувати проблему?', [
                'Кухня',
                'Туалет',
                'Ванна',
                'Коридор',
                'Кімната',
                'Інше',
            ]);
            userState[chatId] = 'awaiting_tech_problem_place_ua';
            break;
        case 'Вікна':
            sendOptions(chatId, 'Де потрібно локалізувати проблему?', [
                'Кухня',
                'Туалет',
                'Ванна',
                'Коридор',
                'Кімната',
                'Інше',
            ]);
            userState[chatId] = 'awaiting_tech_problem_place_ua';
            break;
        case 'Оплата жилья':
            bot.sendMessage(
                chatId,
                'Спасибо! Напишите пожалуйста свой адрес, например: ul. Czartoryskiego 99, m.99'
            );
            userState[chatId] = 'awaiting_address_ru';
            break;
        case 'Оплата интернета':
            bot.sendMessage(
                chatId,
                'Спасибо! Напишите пожалуйста свой адрес, например: ul. Czartoryskiego 99, m.99'
            );
            userState[chatId] = 'awaiting_address_ua';
            break;
        case 'Оплата коммунальных услуг':
            sendOptions(chatId, 'Выберите коммунальную услугу.', [
                'Горячая вода',
                'Холодная вода',
                'Газ',
                'Свет',
                'Отопление',
            ]);
            break;
        case 'Сантехника':
            sendOptions(chatId, 'Где нужно локализировать проблему?', [
                'Кухня',
                'Туалет',
                'Ванная',
                'Другое',
            ]);
            userState[chatId] = 'awaiting_tech_problem_place_ru';
            break;
        case 'Электричество':
            sendOptions(chatId, 'Где нужно локализировать проблему?', [
                'Кухня',
                'Туалет',
                'Ванная',
                'Коридор',
                'Комната',
                'Другое',
            ]);
            userState[chatId] = 'awaiting_tech_problem_place_ru';
            break;
        case 'Мебель в квартире':
            sendOptions(chatId, 'Где нужно локализировать проблему?', [
                'Кухня',
                'Туалет',
                'Ванная',
                'Коридор',
                'Комната',
                'Другое',
            ]);
            userState[chatId] = 'awaiting_tech_problem_place_ru';
            break;
        case 'Входная дверь':
            sendOptions(chatId, 'Какую проблему нужно решить?', [
                'Замок',
                'Дверь не закрывается',
                'Дверь не открывается',
                'Другое',
            ]);
            userState[chatId] = 'awaiting_tech_problem_place_ru';
            break;
        case 'Стены':
            sendOptions(chatId, 'Где нужно локализировать проблему?', [
                'Кухня',
                'Туалет',
                'Ванная',
                'Коридор',
                'Комната',
                'Другое',
            ]);
            userState[chatId] = 'awaiting_tech_problem_place_ru';
            break;
        case 'Окна':
            sendOptions(chatId, 'Где нужно локализировать проблему?', [
                'Кухня',
                'Туалет',
                'Ванная',
                'Коридор',
                'Комната',
                'Другое',
            ]);
            userState[chatId] = 'awaiting_tech_problem_place_ru';
            break;
        case 'Płatność za mieszkanie':
            bot.sendMessage(
                chatId,
                'Dziękujemy! Prosimy o podanie adresu, na przykład: ul. Czartoryskiego 99, m.99'
            );
            userState[chatId] = 'awaiting_address_pl';
            break;
        case 'Płacenie za internet':
            bot.sendMessage(
                chatId,
                'Dziękujemy! Prosimy o podanie adresu, na przykład: ul. Czartoryskiego 99, m.99'
            );
            userState[chatId] = 'awaiting_address_pl';
            break;
        case 'Płatność za media':
            sendOptions(chatId, 'Wybierz usługę użyteczności publicznej.', [
                'Gorąca woda',
                'Zimna woda',
                'Gaz',
                'Energia',
                'Ogrzewanie',
            ]);
            break;
        case 'Hydraulika':
            sendOptions(chatId, 'Gdzie musimy zlokalizować problem?', [
                'Kuchnia',
                'Toaleta',
                'Łazienka',
                'Inne',
            ]);
            userState[chatId] = 'awaiting_tech_problem_place_pl';
            break;
        case 'Elektryczność':
            sendOptions(chatId, 'Gdzie musimy zlokalizować problem?', [
                'Kuchnia',
                'Toaleta',
                'Łazienka',
                'Corridor',
                'Pokój',
                'Inne',
            ]);
            userState[chatId] = 'awaiting_tech_problem_place_pl';
            break;
        case 'Meble w mieszkaniu':
            sendOptions(chatId, 'Gdzie musimy zlokalizować problem?', [
                'Kuchnia',
                'Toaleta',
                'Łazienka',
                'Corridor',
                'Pokój',
                'Inne',
            ]);
            userState[chatId] = 'awaiting_tech_problem_place_pl';
            break;
        case 'Drzwi wejściowe':
            sendOptions(chatId, 'Jaki problem należy rozwiązać?', [
                'Blokada',
                'Drzwi się nie zamykają',
                'Drzwi się nie otwierają',
                'Inne',
            ]);
            userState[chatId] = 'awaiting_tech_problem_place_pl';
            break;
        case 'Ściany':
            sendOptions(chatId, 'Gdzie musimy zlokalizować problem?', [
                'Kuchnia',
                'Toaleta',
                'Łazienka',
                'Corridor',
                'Pokój',
                'Другое',
            ]);
            userState[chatId] = 'awaiting_tech_problem_place_pl';
            break;
        case 'Okna':
            sendOptions(chatId, 'Gdzie musimy zlokalizować problem?', [
                'Kuchnia',
                'Toaleta',
                'Łazienka',
                'Corridor',
                'Pokój',
                'Inne',
            ]);
            userState[chatId] = 'awaiting_tech_problem_place_pl';
            break;
        default:
            break;
    }
});

bot.on('text', (msg) => {
    const chatId = msg.chat.id;
    const selectedOptions = msg.text;
    const currentState = userState[chatId];

    switch (selectedOptions) {
        case 'Гаряча вода':
            bot.sendMessage(chatId, 'Відправте фото лічильника.');
            userState[chatId] = 'awaiting_photo_ua';
            break;
        case 'Холодна вода':
            bot.sendMessage(chatId, 'Відправте фото лічильника.');
            userState[chatId] = 'awaiting_photo_ua';
            break;
        case 'Газопостачання':
            bot.sendMessage(chatId, 'Відправте фото лічильника.');
            userState[chatId] = 'awaiting_photo_ua';
            break;
        case 'Світло':
            bot.sendMessage(chatId, 'Відправте фото лічильника.');
            userState[chatId] = 'awaiting_photo_ua';
            break;
        case 'Опалення':
            bot.sendMessage(chatId, 'Відправте фото лічильника.');
            userState[chatId] = 'awaiting_photo_ua';
            break;
        // ======================================================================
        case 'Горячая вода':
            bot.sendMessage(chatId, 'Отправьте фото счетчика.');
            userState[chatId] = 'awaiting_photo_ru';
            break;
        case 'Холодная вода':
            bot.sendMessage(chatId, 'Отправьте фото счетчика.');
            userState[chatId] = 'awaiting_photo_ru';
            break;
        case 'Газ':
            bot.sendMessage(chatId, 'Отправьте фото счетчика.');
            userState[chatId] = 'awaiting_photo_ru';
            break;
        case 'Свет':
            bot.sendMessage(chatId, 'Отправьте фото счетчика.');
            userState[chatId] = 'awaiting_photo_ru';
            break;
        case 'Отопление':
            bot.sendMessage(chatId, 'Отправьте фото счетчика.');
            userState[chatId] = 'awaiting_photo_ru';
            break;
        // ======================================================================
        case 'Gorąca woda':
            bot.sendMessage(chatId, 'Wyślij zdjęcie licznika.');
            userState[chatId] = 'awaiting_photo_pl';
            break;
        case 'Zimna woda':
            bot.sendMessage(chatId, 'Wyślij zdjęcie licznika.');
            userState[chatId] = 'awaiting_photo_pl';
            break;
        case 'Gaz':
            bot.sendMessage(chatId, 'Wyślij zdjęcie licznika.');
            userState[chatId] = 'awaiting_photo_pl';
            break;
        case 'Energia':
            bot.sendMessage(chatId, 'Wyślij zdjęcie licznika.');
            userState[chatId] = 'awaiting_photo_pl';
            break;
        case 'Ogrzewanie':
            bot.sendMessage(chatId, 'Wyślij zdjęcie licznika.');
            userState[chatId] = 'awaiting_photo_pl';
            break;
        default:
            break;
    }
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const selectedOptions = msg.text;
    const currentState = userState[chatId];

    switch (currentState) {
        case 'awaiting_address_ua':
            bot.sendMessage(chatId, 'Напишіть свій номер телефону');
            userState[chatId] = 'awaiting_number_ua';
            break;
        case 'awaiting_number_ua':
            sendOptions(
                chatId,
                'Ваш запит на розгляді у менеджера, він зв`яжеться з Вами найближчим часом.',
                ['Повернутись в початкове меню']
            );
            delete userState[chatId];
            break;
        case 'awaiting_photo_ua':
            if (msg.photo) {
                bot.sendMessage(
                    chatId,
                    'Дякуємо! Напишіть будь ласка свою адресу, наприклад: ul. Czartoryskiego 99, m.99'
                );
                userState[chatId] = 'awaiting_address_ua';
            } else {
                bot.sendMessage(
                    chatId,
                    'Спробуйте відправити ще раз фото (не файлом).'
                );
                userState[chatId] = 'awaiting_photo_ua';
            }
            break;
        case 'awaiting_tech_problem_place_ua':
            bot.sendMessage(chatId, 'Опишіть проблему.');
            userState[chatId] = 'awaiting_problem_description_ua';
            break;
        case 'awaiting_problem_description_ua':
            bot.sendMessage(chatId, 'Відправте фото.');
            userState[chatId] = 'awaiting_photo_ua';
            break;
        case 'awaiting_situation_ua':
            bot.sendMessage(
                chatId,
                'Дякуємо! Напишіть будь ласка свою адресу, наприклад: ul. Czartoryskiego 99, m.99'
            );
            userState[chatId] = 'awaiting_address_ua';
            break;
        // ======================================================================
        case 'awaiting_address_ru':
            bot.sendMessage(chatId, 'Напишите свой номер телефона.');
            userState[chatId] = 'awaiting_number_ru';
            break;
        case 'awaiting_number_ru':
            sendOptions(
                chatId,
                'Ваш запрос на рассмотрении у менеджера, он свяжется с Вами в ближайшее время.',
                ['Вернуться в начальное меню']
            );
            delete userState[chatId];
            break;
        case 'awaiting_photo_ru':
            if (msg.photo) {
                bot.sendMessage(
                    chatId,
                    'Спасибо! Напишите пожалуйста свой адрес, например: ul. Czartoryskiego 99, m.99'
                );
                userState[chatId] = 'awaiting_address_ru';
            } else {
                bot.sendMessage(
                    chatId,
                    'Попробуйте отправить еще раз фото (не файлом).'
                );
                userState[chatId] = 'awaiting_photo_ru';
            }
            break;
        case 'awaiting_tech_problem_place_ru':
            bot.sendMessage(chatId, 'Опишите проблему.');
            userState[chatId] = 'awaiting_problem_description_ru';
            break;
        case 'awaiting_problem_description_ru':
            bot.sendMessage(chatId, 'Отправьте фото.');
            userState[chatId] = 'awaiting_photo_ru';
            break;
        case 'awaiting_situation_ru':
            bot.sendMessage(
                chatId,
                'Спасибо! Напишите пожалуйста свой адрес, например: ul. Czartoryskiego 99, m.99'
            );
            userState[chatId] = 'awaiting_address_ru';
            break;
        // ======================================================================
        case 'awaiting_address_pl':
            bot.sendMessage(chatId, 'Wpisz swój numer telefonu.');
            userState[chatId] = 'awaiting_number_pl';
            break;
        case 'awaiting_number_pl':
            sendOptions(
                chatId,
                'Twoje zapytanie jest rozpatrywane przez kierownika i wkrótce się z Tobą skontaktuje.',
                ['Obróć w menu pochatkove']
            );
            delete userState[chatId];
            break;
        case 'awaiting_photo_pl':
            if (msg.photo) {
                bot.sendMessage(
                    chatId,
                    'Dziękujemy! Prosimy o podanie adresu, na przykład: ul. Czartoryskiego 99, m.99'
                );
                userState[chatId] = 'awaiting_address_pl';
            } else {
                bot.sendMessage(
                    chatId,
                    'Spróbuj ponownie wysłać zdjęcie (nie plik).'
                );
                userState[chatId] = 'awaiting_photo_pl';
            }
            break;
        case 'awaiting_tech_problem_place_pl':
            bot.sendMessage(chatId, 'Opisz problem.');
            userState[chatId] = 'awaiting_problem_description_pl';
            break;
        case 'awaiting_problem_description_pl':
            bot.sendMessage(chatId, 'Wyślij zdjęcie.');
            userState[chatId] = 'awaiting_photo_pl';
            break;
        case 'awaiting_situation_pl':
            bot.sendMessage(
                chatId,
                'Dziękujemy! Prosimy o podanie adresu, na przykład: ul. Czartoryskiego 99, m.99'
            );
            userState[chatId] = 'awaiting_address_pl';
            break;
        default:
            break;
    }
});

function sendOptions(chatId, messageText, optionsArray) {
    const options = {
        reply_markup: {
            keyboard: [optionsArray],
            one_time_keyboard: true,
        },
    };

    for (let i = 0; i < optionsArray.length; i += 2) {
        const row = [optionsArray[i]];

        if (optionsArray[i + 1]) {
            row.push(optionsArray[i + 1]);
        }
        options.reply_markup.keyboard.splice(i, 1, row);
    }

    bot.sendMessage(chatId, messageText, options);
}

start();
