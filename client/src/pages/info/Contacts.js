import React from 'react'
import InfoPage from './InfoPage'
import './Contacts.css'


const Contacts = () => {
    return (
        <InfoPage>
            <div className="Contacts">
                <header>Контактная информация!</header>
                {/* <label className="ContactsTitle">Контактная информация!</label> */}
                <div
                    className="ContactsBody"
                >
                    <name className="ContactsBodyDiv">
                        <span>Название компании:</span>
                        <label>ООО "Леидтоги"</label>
                    </name>
                    <div className="ContactsBodyDiv">
                        <span>ИНН / КПП:</span>
                        <label>0000000000 / 00000000000</label>
                    </div>
                    <div className="ContactsBodyDiv">
                        <span>ОГРН:</span>
                        <label>000000000000</label>
                    </div>
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
