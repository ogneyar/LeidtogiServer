import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import InfoPage from '../info/InfoPage'
import Loading from '../../components/Loading'
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../utils/consts'
import { Context } from '../..'

import './SupportPage.css'


const SupportPage = observer(() => {
    
    const { user } = useContext(Context)

    const [ info, setInfo ] = useState({})
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        if (user.user?.id) {
            setInfo(user.user)
        }
        setLoading(false)
    },[user.user])

    if (loading) return <Loading />


    return (
        <InfoPage>
            <div className="SupportPage">
                <header>Тех.поддержка!</header>
                <hr />

                {!info.name
                ?
                <div>
                    <p>Для обращения в тех. поддержку необходимо&nbsp;
                    <NavLink
                        className="NavLink"
                        to={LOGIN_ROUTE}
                    >
                        войти
                    </NavLink>
                    &nbsp;или&nbsp;
                    <NavLink
                        className="NavLink"
                        to={REGISTRATION_ROUTE}
                    >
                        зарегистрироваться
                    </NavLink>
                    !</p>
                </div>
                :
                    <div>Здравствуйте {info.name}!</div>
                }
               
            </div>
        </InfoPage>
    )
})

export default SupportPage
