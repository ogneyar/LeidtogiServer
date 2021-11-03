import React from 'react'
import ReactHtmlParser from 'react-html-parser'

import { MAIL, ADDRESS, PHONE_ONE, TIME_TO_WORK } from '../../utils/consts'
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
                            <p>{ADDRESS}</p>
                        </div>
                    </li>
                    <li>
                        <span className="fa fa-mobile">&nbsp;</span>
                        <div className="media-body">
                            <p>{ReactHtmlParser(PHONE_ONE)}</p>
                        </div>
                    </li>
                    <li>
                        <span className="fa fa-envelope-o">&nbsp;</span>
                        <div className="media-body">
                            <address>
                                {ReactHtmlParser(MAIL)}
                            </address>
                        </div>
                    </li>
                    <li className="last">
                        <span className="fa fa-clock-o">&nbsp;</span>
                        <div className="media-body">
                            {ReactHtmlParser(TIME_TO_WORK)}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default FooterContacts
