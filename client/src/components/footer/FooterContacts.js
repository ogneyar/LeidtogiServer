import React from 'react'
// import { Container, Row } from 'react-bootstrap'
import './FooterContacts.css'

const FooterContacts = () => {
    return (
        <div
            className="FooterContacts"
        >
            <div className="footer-title">
				<h3>Контакты</h3>
			</div>
            <div className="footer-static-content">
                <ul className="FooterContactsUl">
                    <li>
                        <span className="fa fa-map-marker">&nbsp;</span>
                        <div className="media-body">
                            <p>г. Курск, ул. Дмитрова, д. 33</p>
                        </div>
                    </li>
                    <li>
                        <span className="fa fa-mobile">&nbsp;</span>
                        <div className="media-body">
                            <p><a href="tel:+74712510776">+7 (4712) 51-07-76</a></p>
                            <p><a href="tel:+79312607792">+7 (931) 260-77-92</a></p>
                        </div>
                    </li>
                    <li>
                        <span className="fa fa-envelope-o">&nbsp;</span>
                        <div className="media-body">
                            <address>
                                <a href="mailto:info@leidtogi.ru">info@leidtogi.ru</a>
                            </address>
                        </div>
                    </li>
                    <li className="last">
                        <span className="fa fa-clock-o">&nbsp;</span>
                        <div className="media-body">
                            <p>пн - пт: 09:00 - 20:00</p>
                            <p>сб - вс: 09:00 - 18:00</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default FooterContacts
