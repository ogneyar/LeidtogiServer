import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import NavLink from '../../components/myBootstrap/NavLink'
import { getOrder } from '../../http/orderAPI'
import Loading from '../../components/Loading'
import InfoPage from '../info/InfoPage'
// eslint-disable-next-line
import { LK_ROUTE, SUPPORT_ROUTE } from '../../utils/consts'
import './SuccessPage.css'

const SuccessPage = () => {

    const { id, uuid } = useParams()

    const [ email, setEmail ] = useState("")
    const [ loading, setLoading ] = useState(true)
    const [ success, setSuccess ] = useState(false)

    useEffect(() => {
        setLoading(true)
        getOrder(id).then(data => {
            setEmail(data?.email)
            if (uuid === data?.uuid) {
                setSuccess(true)
                // сообщим админу

                // установим флаг pay = true

                // очистим корзину
                localStorage.removeItem('cart')
            }
        })
        setLoading(false)
        // для теста страницы
        setSuccess(true)
    }, [id, uuid])

    if (loading) return <Loading />

    return (
        <InfoPage>
            <div className="SuccessPage">
                {success
                ?
                    <div>
                        <header>Оплата упешно произведена!</header>
                        <p>Номер вашего заказа: <strong>{id}</strong></p>
                        <p>Подробности о заказе Вам отправят на указанный Вами email ({email}).</p>
                        {/* <p>Если Вы зарегистрированный клиент, то отследить заказ можете в <NavLink to={LK_ROUTE}>личном кабине</NavLink>, все возникшие вопросы направляйте в <NavLink to={SUPPORT_ROUTE}>тех. поддержку.</NavLink></p> */}
                        <p>Если Вы зарегистрированный клиент, то все возникшие вопросы можете направить в <NavLink to={SUPPORT_ROUTE}>тех. поддержку.</NavLink></p>
                        <p>Если Вы НЕ зарегистрированный клиент, тогда все возникающие вопросы направляйте на email адрес - <a href="mailto:info@leidtogi.ru">info@leidtogi.ru</a></p>
                    </div>
                :
                    <div>
                        <header>Возникла ОШИБКА при проверке номера заказа!</header>
                        <p>Номер вашего заказа: <strong>{id}</strong></p>
                        <p>Если Вы зарегистрированный клиент, то обратитесь в <NavLink to={SUPPORT_ROUTE}>тех. поддержку.</NavLink></p>
                        <p>Если Вы НЕ зарегистрированный клиент, тогда напишите нам на email адрес - <a href="mailto:info@leidtogi.ru">info@leidtogi.ru</a></p>
                    </div>
                }
            </div>
        </InfoPage>
    )
}

export default SuccessPage
