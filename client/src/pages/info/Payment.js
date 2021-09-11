import React from 'react'
import InfoPage from './InfoPage'
import './Payment.css'


const Payment = () => {
    return (
        <InfoPage>
            <div className="Payment">
                <header>Способы оплаты!</header>
                
                <ul>
                    <li>
                        <label>Безналичный расчет</label>
                        <p>Оплата по безналичному расчету проводится на основании счета. Счет можно получить от менеджеров компании или через личный кабинет на сайте после оформления и подтверждения заказа.</p>
                    </li>
                    <li>
                        <label>Оплата наличными</label>
                        <p>Наличный расчет производится в офисах компании во всех городах присутствия.</p>
                    </li>
                    <li>
                        <label>Оплата в режиме онлайн</label>
                        <p>Оплата проводится с помощью банковских карт через платежный агрегатор на нашем сайте. Для выбора оплаты товара с помощью банковской карты на соответствующей странице необходимо нажать кнопку «Оплатить банковской картой».</p>
                    </li>
                </ul>

                <p>Оплата банковскими картами осуществляется через АО «АЛЬФА-БАНК».</p>

                <div className="PaymentImage">
                    <img src="images/bank/AlfaBank.png" alt="Изображение бановской карты" />
                </div>

                {/* <br /> */}

                <p>К оплате принимаются карты VISA, MasterCard, Платежная система «Мир».</p>

                <div className="PaymentImage">
                    <img src="images/bank/Visa.jpg" alt="Изображение бановской карты" />
                    <img src="images/bank/MasterCard.jpg" alt="Изображение бановской карты" />
                    <img src="images/bank/Mir.jpg" alt="Изображение бановской карты" />
                </div>

            </div>
        </InfoPage>
    )
}

export default Payment
