import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { Button, Card, Container, Form, Row } from 'react-bootstrap'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { login, registration } from '../../http/userAPI'
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../../utils/consts'
import { Context } from '../..'
import { Input, Alert } from '../../components/myBootstrap'

const Auth = observer(() => {
    const { user } = useContext(Context)
    const location = useLocation()
    const history = useHistory()

    const isLogin = location.pathname === LOGIN_ROUTE

    const [ alertVisible, setAlertVisible ] = useState(false)
    const [ alertMessage, setAlertMessage ] = useState('')

    const [ surname, setSurname ] = useState('')
    const [ name, setName ] = useState('')
    const [ patronymic, setPatronymic ] = useState('')
    const [ phone, setPhone ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ address, setAddress ] = useState('')
    const [ password, setPassword ] = useState('')
    
    const [ role, setRole ] = useState("USER")

    const [ checked, setChecked ] = useState(false)


    useEffect(() => {
        if (checked) {
            setRole("CORP")
        }else {
            setRole("USER")
        }
    },[checked])

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password)
            }else {
                data = await registration(
                    {
                        surname,
                        name,
                        patronymic,
                        phone,
                        email, 
                        address,
                        password, 
                        role,
                        isActivated: 0,
                        activationLink: "test"
                    })
            }
            user.setUser(data)
            user.setIsAuth(true)
            
            // window.location.href = window.location.origin
            
            history.push(SHOP_ROUTE)
        }catch(e) {
            // alert(e.response.data.message)
            setAlertVisible(true)
            setAlertMessage(e.response.data.message)
        }
    }

    return (
        <Container 
            className="d-flex justify-content-center align-items-center"
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">
                    {isLogin ? 'Авторизация' : 'Регистрация'}
                </h2>
                <Form className="d-flex flex-column">
                    {isLogin 
                    ? 
                    <>
                        <Form.Control 
                            className="mt-3"
                            placeholder="Введите Ваш email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <Form.Control 
                            className="mt-3"
                            placeholder="Введите пароль"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                        />
                    </>
                    : 
                    <>
                        <Form.Control 
                            className="mt-3"
                            placeholder="Введите фамилию"
                            value={surname}
                            onChange={e => setSurname(e.target.value)}
                        />
                        <Form.Control 
                            className="mt-3"
                            placeholder="Введите имя"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <Form.Control 
                            className="mt-3"
                            placeholder="Введите отчество (если имеется)"
                            value={patronymic}
                            onChange={e => setPatronymic(e.target.value)}
                        />
                        <Form.Control 
                            className="mt-3"
                            placeholder="Введите номер телефона"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                        <Form.Control 
                            className="mt-3"
                            placeholder="Введите адрес"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                        />
                        <Form.Control 
                            className="mt-3"
                            placeholder="Введите email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <Form.Control 
                            className="mt-3"
                            placeholder="Введите пароль"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
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
                            />
                            <label
                                className='pl-2'
                                style={{cursor:"pointer"}}
                            >Юр.лицо</label>
                        </div>
                        {checked 
                        ? 
                        <>
                            <Form.Control 
                                className=""
                                placeholder="Введите Ваш адрес"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </>
                        : null}
                    </>}
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin ? 
                            <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь!</NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                            </div>
                        }
                        <Button 
                            variant={"outline-success"} 
                            onClick={click}
                        >
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                    </Row>
                    
                </Form>
            </Card>

            <Alert show={alertVisible} onHide={() => setAlertVisible(false)} message={alertMessage} />

        </Container>
    )
})

export default Auth