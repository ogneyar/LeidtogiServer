import React from 'react'
import ReactHtmlParser from 'react-html-parser'

import { MAIL, ADDRESS, PHONE_ONE, TIME_TO_WORK } from '../../utils/consts'
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
                    <div className="ContactsBodyDiv">
                        <span>Название компании:</span>
                        <label>ООО "ЛЕИДТОГИ"</label>
                    </div>
                    {/* <div className="ContactsBodyDiv">
                        <span>Генеральный директор:</span>
                        <label>Пухкало Александр Андреевич</label>
                    </div> */}
                    <div className="ContactsBodyDiv">
                        <span>ИНН / КПП:</span>
                        <label>4632267704 / 463201001</label>
                    </div>
                    <div className="ContactsBodyDiv">
                        <span>ОГРН:</span>
                        <label>1204600005830</label>
                    </div>
                    <div className="ContactsBodyDiv">
                        <span>Адрес:</span>
                        <label>{ADDRESS}</label>
                    </div>
                    <div className="ContactsBodyDiv">
                        <span>Телефон:</span>
                        <label>{ReactHtmlParser(PHONE_ONE)}</label>
                    </div>
                    <div className="ContactsBodyDiv">
                        <span>Эл.Почта:</span>
                        <label>{ReactHtmlParser(MAIL)}</label>
                    </div>
                    <div className="ContactsBodyDiv">
                        <span>Время работы:</span>
                        {ReactHtmlParser(TIME_TO_WORK)}
                    </div>
                </div>
            </div>
        </InfoPage>
    )
}

export default Contacts
