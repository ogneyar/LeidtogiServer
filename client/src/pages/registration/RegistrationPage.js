import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Container, Form, Row } from 'react-bootstrap'
import { NavLink, useHistory } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import uuid from 'react-uuid'
import $ from 'jquery'

import { getUser, registration } from '../../http/userAPI'
import { LOGIN_ROUTE, LK_ROUTE } from '../../utils/consts'
import { Input, Alert } from '../../components/myBootstrap'
import Loading from '../../components/Loading'
import { Context } from '../..'


const RegistrationPage = observer(() => {

    const { user } = useContext(Context)

    const history = useHistory()

    const [ alertVisible, setAlertVisible ] = useState(false)
    const [ alertMessage, setAlertMessage ] = useState('')
    
    const [ info, setInfo ] = useState({
        role:"USER",isActivated:0,activationLink:uuid(),
        surname: '', name: '', patronymic: '', phone: '',
        email: '', address: '', password: '',  
        companyName: '', INN: '', KPP: '', OGRN: '',
        OKVED: '', juridicalAddress: '', bank: '', 
        BIK: '', corAccount: '', payAccount: '', post: ''
    })

    const [ checked, setChecked ] = useState(false)

    const [ loading, setLoading ] = useState(false)

    useEffect(() => {
        if (checked) {
            setInfo({...info,role:"CORP"})
        }else {
            setInfo({...info,role:"USER"})
        }
    },[checked])

    const click = async () => {
        try {
            setLoading(true)
            let data = await registration(info)
            if (data?.id) {
                user.setIsAuth(true)
                getUser().then(dat => user.setUser(dat))
            }
            setLoading(false)
            // history.push(LOGIN_ROUTE)
            history.push(LK_ROUTE)
            scrollUp()

        }catch(e) {
            setLoading(false)
            setAlertVisible(true)
            setAlertMessage(e.response?.data?.message)
        }
    }

    const scrollUp = () => {
        $('html, body').animate(
            {scrollTop: 0}, 
            700, 
            function(){}
        )
    }

    if (loading) return <Loading />

    return (
        <Container 
            className="d-flex justify-content-center align-items-center"
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">
                    Регистрация
                </h2>
                <Form className="d-flex flex-column">
                    
                        <label>Фамилия: <span style={{color:"#f00"}}>*</span></label>
                        <Form.Control 
                            className="mb-2"
                            maxLength="256"
                            placeholder="Введите фамилию"
                            value={info?.surname}
                            onChange={e => setInfo({...info,surname:e.target.value})}
                        />
                        <label>Имя: <span style={{color:"#f00"}}>*</span></label>
                        <Form.Control 
                            className="mb-2"
                            maxLength="256"
                            placeholder="Введите имя"
                            value={info?.name}
                            onChange={e => setInfo({...info,name:e.target.value})}
                        />
                        <label>Отчество: (при наличии)</label>
                        <Form.Control 
                            className="mb-2"
                            maxLength="256"
                            placeholder="Введите отчество"
                            value={info?.patronymic}
                            onChange={e => setInfo({...info,patronymic:e.target.value})}
                        />
                        <label>Телефон: <span style={{color:"#f00"}}>*</span></label>
                        <Form.Control 
                            className="mb-2"
                            maxLength="13"
                            placeholder="Введите номер телефона"
                            value={info?.phone}
                            onChange={e => setInfo({...info,phone:e.target.value})}
                        />
                        <label>Адрес: <span style={{color:"#f00"}}>*</span></label>
                        <Form.Control 
                            className="mb-2"
                            maxLength="1024"
                            placeholder="Введите адрес"
                            value={info?.address}
                            onChange={e => setInfo({...info,address:e.target.value})}
                        />
                        <label>Email: <span style={{color:"#f00"}}>*</span></label>
                        <Form.Control 
                            className="mb-2"
                            maxLength="256"
                            placeholder="Введите email"
                            value={info?.email}
                            onChange={e => setInfo({...info,email:e.target.value})}
                        />
                        <label>Пароль: <span style={{color:"#f00"}}>*</span></label>
                        <Form.Control 
                            className="mb-2"
                            maxLength="256"
                            placeholder="Введите пароль"
                            value={info?.password}
                            onChange={e => setInfo({...info,password:e.target.value})}
                            type="password"
                        />

                        <div
                            className='pt-3 pb-3'
                            onClick={() => setChecked(!checked)}
                        >
                            <Input 
                                type="checkbox" 
                                className=''
                                checked={checked}
                                title="Регистрация юр.лица"
                                style={{cursor:"pointer"}}
                                onChange={() => {}}
                            />
                            <label
                                className='pl-2'
                                style={{cursor:"pointer"}}
                            >Юр.лицо</label>
                        </div>
                        {checked 
                        ? 
                        <>
                            <label>Название компании: <span style={{color:"#f00"}}>*</span></label>
                            <Form.Control 
                                className="mb-2"
                                maxLength="256"
                                placeholder="Введите название компании"
                                value={info?.companyName}
                                onChange={e => setInfo({...info,companyName:e.target.value})}
                            />
                            <label>ИНН: <span style={{color:"#f00"}}>*</span></label>
                            <Form.Control 
                                className="mb-2"
                                maxLength="10"
                                placeholder="Введите ИНН"
                                value={info?.INN}
                                onChange={e => setInfo({...info,INN:e.target.value})}
                            />
                            <label>КПП: <span style={{color:"#f00"}}>*</span></label>
                            <Form.Control 
                                className="mb-2"
                                maxLength="9"
                                placeholder="Введите КПП"
                                value={info?.KPP}
                                onChange={e => setInfo({...info,KPP:e.target.value})}
                            />
                            <label>ОГРН:</label>
                            <Form.Control 
                                className="mb-2"
                                maxLength="15"
                                placeholder="Введите ОГРН"
                                value={info?.OGRN}
                                onChange={e => setInfo({...info,OGRN:e.target.value})}
                            />
                            <label>ОКВЭД:</label>
                            <Form.Control 
                                className="mb-2"
                                maxLength="6"
                                placeholder="Введите ОКВЭД"
                                value={info?.OKVED}
                                onChange={e => setInfo({...info,OKVED:e.target.value})}
                            />
                            <label>Юр.адрес: <span style={{color:"#f00"}}>*</span></label>
                            <Form.Control 
                                className="mb-2"
                                maxLength="1024"
                                placeholder="Введите юр.адрес"
                                value={info?.juridicalAddress}
                                onChange={e => setInfo({...info,juridicalAddress:e.target.value})}
                            />
                            <label>Название банка: <span style={{color:"#f00"}}>*</span></label>
                            <Form.Control 
                                className="mb-2"
                                maxLength="256"
                                placeholder="Введите название банка"
                                value={info?.bank}
                                onChange={e => setInfo({...info,bank:e.target.value})}
                            />
                            <label>БИК: <span style={{color:"#f00"}}>*</span></label>
                            <Form.Control 
                                className="mb-2"
                                maxLength="9"
                                placeholder="Введите БИК"
                                value={info?.BIK}
                                onChange={e => setInfo({...info,BIK:e.target.value})}
                            />
                            <label>Кор.счёт: <span style={{color:"#f00"}}>*</span></label>
                            <Form.Control 
                                className="mb-2"
                                maxLength="20"
                                placeholder="Введите кор.счёт"
                                value={info?.corAccount}
                                onChange={e => setInfo({...info,corAccount:e.target.value})}
                            />
                            <label>Расчетный счет: <span style={{color:"#f00"}}>*</span></label>
                            <Form.Control 
                                className="mb-2"
                                maxLength="20"
                                placeholder="Введите расчетный счет"
                                value={info?.payAccount}
                                onChange={e => setInfo({...info,payAccount:e.target.value})}
                            />
                            <label>Должность: <span style={{color:"#f00"}}>*</span></label>
                            <Form.Control 
                                className="mb-2"
                                maxLength="256"
                                placeholder="Введите должность"
                                value={info?.post}
                                onChange={e => setInfo({...info,post:e.target.value})}
                            />
                        </>
                        : null}

                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        <div>
                            Есть аккаунт? <NavLink onClick={scrollUp} to={LOGIN_ROUTE}>Войдите!</NavLink>
                        </div>
                        <Button 
                            variant={"outline-success"} 
                            onClick={click}
                        >
                            Регистрация
                        </Button>
                    </Row>
                    
                </Form>
            </Card>

            <Alert show={alertVisible} onHide={() => setAlertVisible(false)} message={alertMessage} />

        </Container>
    )
})

export default RegistrationPage;
