import {ISDEKWidjet} from 'https://widget.cdek.ru/widget/widjet.js'

let ourWidjet = new ISDEKWidjet ({
    defaultCity: 'Белая Калитва', //какой город отображается по умолчанию
    cityFrom: 'Москва', // из какого города будет идти доставка
    country: 'Россия', // можно выбрать страну, для которой отображать список ПВЗ
    link: 'forpvz', // id элемента страницы, в который будет вписан виджет
    path: 'https://widget.cdek.ru/widget/scripts/', //директория с библиотеками
    // servicepath: '%PUBLIC_URL%/service.php' //ссылка на файл service.php на вашем сайте
    servicepath: 'https://media.prizmarket.ru/service.php', //ссылка на файл service.php на вашем сайте

    // showWarns: true,

    // showErrors: true,
    // showLogs: true,
    // hideMessages: false,
    // templatepath: 'https://widget.cdek.ru/widget/scripts/template.php',
    // choose: true,
    // popup: true,
    // // link: false,
    // hidedress: true,
    // hidecash: true,
    // hidedelt: false,
    detailAddress: true,
    // region: true,
    // apikey: '',
    goods: [{
        length: 10,
        width: 10,
        height: 10,
        weight: 1
    }],
    // onReady: onReady,
    onChoose: onChoose,
    onChooseProfile: onChooseProfile,
    // onCalculate: onCalculate
});

function onReady() {
  alert('Виджет загружен');
}

function onChoose(wat) {
    alert(
        'Выбран пункт выдачи заказа ' + wat.id + "\n" +
        'цена ' + wat.price + "\n" +
        'срок ' + wat.term + " дн.\n" +
        'город ' + wat.cityName + ', код города ' + wat.city
    );
}

function onChooseProfile(wat) {
    alert(
        'Выбрана доставка курьером в город ' + wat.cityName + ', код города ' + wat.city + "\n" +
        'цена ' + wat.price + "\n" +
        'срок ' + wat.term + ' дн.'
    );
}

function onCalculate(wat) {
    alert('Расчет стоимости доставки произведен');
}