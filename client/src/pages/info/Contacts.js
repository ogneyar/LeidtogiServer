import React from 'react'
import InfoPage from './InfoPage'
import './Contacts.css'


const Contacts = () => {
    return (
        <InfoPage>
            <div className="Contacts">
                <label className="ContactsTitle">Наши контакты!</label>
                <div
                    className="ContactsBody"
                >
                    <adress className="ContactsBodyDiv">
                        <span>Адрес:</span>
                        <label>г. Курск, ул. Дмитрова, д. 33</label>
                    </adress>
                    <phone className="ContactsBodyDiv">
                        <span>Телефоны:</span>
                        <label><a href="tel:+74712510776">+7 (4712) 51-07-76</a></label>
                        <label><a href="tel:+79312607792">+7 (931) 260-77-92</a></label>
                    </phone>
                    <mail className="ContactsBodyDiv">
                        <span>Эл.Почта:</span>
                        <label><a href="mailto:info@leidtogi.ru">info@leidtogi.ru</a></label>
                    </mail>
                    <div className="ContactsBodyDiv">
                        <span>Время работы:</span>
                        <label>пн - пт: 09:00 - 20:00</label>
                        <label>сб - вс: 09:00 - 18:00</label>
                    </div>
                </div>
            </div>
        </InfoPage>
    )
}

export default Contacts
