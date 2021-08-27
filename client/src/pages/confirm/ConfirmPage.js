import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import Loading from '../../components/Loading'
import InfoPage from '../info/InfoPage'
import LoginPage from '../login/LoginPage'
import Error from '../error/ErrorPage'
import { updateUser } from '../../http/userAPI'
import { Context } from '../..'

import './ConfirmPage.css'


const ConfirmPage = observer(() => {

    const { user } = useContext(Context)
    const { url } = useParams()
    const [ loading, setLoading ] = useState(false)

    useEffect(() => {
        if (user.user?.id) {
            if (!user.user?.isActivated) {
                if (user.user?.activationLink === url) {
                    setLoading(true)
                    updateUser(user.user?.id, {isActivated:1}).then(data => {
                        user.setUser({...user.user, isActivated:1})
                    })
                    setLoading(false)
                }
            }
            console.log("id", user.user?.id)
            console.log("activationLink", user.user?.activationLink)
            console.log("isActivated",user.user?.isActivated)
        }
    },[user.user?.id])


    if (loading) return <Loading />

    if (url) {

        if (user.user?.id) { 

            if (user.user?.isActivated ) 
            return (
                <InfoPage>
                    <div className="ConfirmPage">
                        <label>{user.user?.name}</label>
                        <label>Ваш почтовый ящик подтверждён!</label>
                        <hr />
                    </div>
                </InfoPage>
            )
            return <Error />
            
        }else return <LoginPage confirm url={url} />

        
    }else return <Error />

})

export default ConfirmPage;
