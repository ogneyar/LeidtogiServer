import React, { useContext, useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'

import InfoPage from '../info/InfoPage'
import Loading from '../../components/Loading'
import Error from '../error/ErrorPage'
import { Context } from '../..'
import './LkPage.css'


const Lk = observer(() => {

    const { user } = useContext(Context)

    const [ info, setInfo ] = useState({})
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        if (user.user?.id) {
            setInfo(user.user)
            setLoading(false)
        }
    },[user.user])

    if (loading) return <Loading />

    if (!user.user?.isActivated) {
        return (
            <InfoPage>
                <div className="Lk" style={{textAlign:"center"}}>
                    <label>{info?.name ? info.name : "Уважаемый клиент"}, добро пожаловать в личный кабинет!</label>
                    <hr/>
                    <p>Для продолжения Вам необходимо подтвердить свой почтовый ящик <span style={{color:"green"}}>{user.user.email}</span>.</p>
                    <p>Вам на него отправлена ссылка для активации аккаунта.</p>
                    <p>Если письмо не пришло проверьте папку СПАМ.</p>
                    {/* <p>Если и в папке СПАМ письма нет, напишите нам в тех.поддержку.</p> */}
                </div>
            </InfoPage>
        )
    }

    if (info?.name) {
        return (
            <InfoPage>
                <div className="Lk">
                    <label>{info.name}, добро пожаловать в личный кабинет!</label>
                    <hr/>

                    <label>Фамилия: <span style={{color:"#f00"}}>*</span></label>
                    <Form.Control 
                        className="mb-2"
                        maxLength="256"
                        placeholder="Введите фамилию"
                        disabled
                        value={info.surname}
                        onChange={e => setInfo({...info,surname:e.target.value})}
                    />

                    <label>Имя: <span style={{color:"#f00"}}>*</span></label>
                    <Form.Control 
                        className="mb-2"
                        maxLength="256"
                        placeholder="Введите имя"
                        disabled
                        value={info.name}
                        onChange={e => setInfo({...info,name:e.target.value})}
                    />

                    <label>Отчество: (при наличии)</label>
                    <Form.Control 
                        className="mb-2"
                        maxLength="256"
                        placeholder="Введите отчество"
                        disabled
                        value={info.patronymic}
                        onChange={e => setInfo({...info,patronymic:e.target.value})}
                    />

                    <label>Телефон: <span style={{color:"#f00"}}>*</span></label>
                    <Form.Control 
                        className="mb-2"
                        maxLength="20"
                        placeholder="Введите номер телефона"
                        disabled
                        value={info.phone}
                        onChange={e => setInfo({...info,phone:e.target.value})}
                    />

                    <label>Адрес: <span style={{color:"#f00"}}>*</span></label>
                    <Form.Control 
                        className="mb-2"
                        maxLength="1024"
                        placeholder="Введите адрес"
                        disabled
                        value={info.address}
                        onChange={e => setInfo({...info,address:e.target.value})}
                    />

                    <label>Email: <span style={{color:"#f00"}}>*</span></label>
                    <Form.Control 
                        className="mb-2"
                        maxLength="256"
                        placeholder="Введите email"
                        disabled
                        value={info.email}
                        onChange={e => setInfo({...info,email:e.target.value})}
                    />

                    <label>Пароль: <span style={{color:"#f00"}}>*</span></label>
                    <Form.Control 
                        className="mb-2"
                        maxLength="256"
                        placeholder="Введите пароль"
                        disabled
                        // value={info.password}
                        value={"88888888"}
                        onChange={e => setInfo({...info,password:e.target.value})}
                        type="password"
                    />

                    {info.role === 'CORP' 
                    ?
                    <>
                    <label>Название компании: <span style={{color:"#f00"}}>*</span></label>
                    <Form.Control 
                        className="mb-2"
                        maxLength="256"
                        placeholder="Введите название компании"
                        disabled
                        value={info.companyName}
                        onChange={e => setInfo({...info,companyName:e.target.value})}
                    />

                    <label>ИНН: <span style={{color:"#f00"}}>*</span></label>
                    <Form.Control 
                        className="mb-2"
                        maxLength="10"
                        placeholder="Введите ИНН"
                        disabled
                        value={info.INN}
                        onChange={e => setInfo({...info,INN:e.target.value})}
                    />

                    <label>КПП: <span style={{color:"#f00"}}>*</span></label>
                    <Form.Control 
                        className="mb-2"
                        maxLength="9"
                        placeholder="Введите КПП"
                        disabled
                        value={info.KPP}
                        onChange={e => setInfo({...info,KPP:e.target.value})}
                    />

                    <label>ОГРН:</label>
                    <Form.Control 
                        className="mb-2"
                        maxLength="15"
                        placeholder="Введите ОГРН"
                        disabled
                        value={info.OGRN}
                        onChange={e => setInfo({...info,OGRN:e.target.value})}
                    />

                    <label>ОКВЭД:</label>
                    <Form.Control 
                        className="mb-2"
                        maxLength="6"
                        placeholder="Введите ОКВЭД"
                        disabled
                        value={info.OKVED}
                        onChange={e => setInfo({...info,OKVED:e.target.value})}
                    />

                    <label>Юр.адрес: <span style={{color:"#f00"}}>*</span></label>
                    <Form.Control 
                        className="mb-2"
                        maxLength="1024"
                        placeholder="Введите юр.адрес"
                        disabled
                        value={info.juridicalAddress}
                        onChange={e => setInfo({...info,juridicalAddress:e.target.value})}
                    />

                    <label>Название банка: <span style={{color:"#f00"}}>*</span></label>
                    <Form.Control 
                        className="mb-2"
                        maxLength="256"
                        placeholder="Введите название банка"
                        disabled
                        value={info.bank}
                        onChange={e => setInfo({...info,bank:e.target.value})}
                    />

                    <label>БИК: <span style={{color:"#f00"}}>*</span></label>
                    <Form.Control 
                        className="mb-2"
                        maxLength="9"
                        placeholder="Введите БИК"
                        disabled
                        value={info.BIK}
                        onChange={e => setInfo({...info,BIK:e.target.value})}
                    />

                    <label>Кор.счёт: <span style={{color:"#f00"}}>*</span></label>
                    <Form.Control 
                        className="mb-2"
                        maxLength="20"
                        placeholder="Введите кор.счёт"
                        disabled
                        value={info.corAccount}
                        onChange={e => setInfo({...info,corAccount:e.target.value})}
                    />

                    <label>Расчетный счет: <span style={{color:"#f00"}}>*</span></label>
                    <Form.Control 
                        className="mb-2"
                        maxLength="20"
                        placeholder="Введите расчетный счет"
                        disabled
                        value={info.payAccount}
                        onChange={e => setInfo({...info,payAccount:e.target.value})}
                    />

                    <label>Должность: <span style={{color:"#f00"}}>*</span></label>
                    <Form.Control 
                        className="mb-2"
                        maxLength="256"
                        placeholder="Введите должность"
                        disabled
                        value={info.post}
                        onChange={e => setInfo({...info,post:e.target.value})}
                    />
                    </>
                    
                    : null}

                </div>
            </InfoPage>
        )
    }else return <Error />
})

export default Lk
