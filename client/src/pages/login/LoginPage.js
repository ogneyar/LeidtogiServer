import React, { useContext, useState } from 'react'
import { Button, Card, Container, Form, Row } from 'react-bootstrap'
import { NavLink, useHistory } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import $ from 'jquery'

import { login, getUserInfo } from '../../http/userAPI'
import { REGISTRATION_ROUTE, SHOP_ROUTE, LK_ROUTE, CONFIRM_ROUTE } from '../../utils/consts'
import { Alert } from '../../components/myBootstrap'
import { Context } from '../..'


const LoginPage = observer((props) => {

    const { user } = useContext(Context)

    const history = useHistory()

    const [ alertVisible, setAlertVisible ] = useState(false)
    const [ alertMessage, setAlertMessage ] = useState('')
   
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const click = async () => {
        try {
            let data
            data = await login(email, password)
            getUserInfo().then(dat => user.setUser(dat))
            user.setIsAuth(true)
            if (props?.confirm) {
                history.push(CONFIRM_ROUTE + "/" + props?.url)
            }else {
                if (data?.isActivated) {
                    history.push(SHOP_ROUTE)
                }else {
                    history.push(LK_ROUTE)
                }
            }
            scrollUp()
            
        }catch(e) {
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

    return (
        <Container 
            className="d-flex justify-content-center align-items-center"
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">
                    Авторизация
                </h2>
                <Form className="d-flex flex-column">

                    <label>Email:</label>
                    <Form.Control 
                        className=""
                        placeholder="Введите Ваш email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <label>Пароль:</label>
                    <Form.Control 
                        className=""
                        placeholder="Введите пароль"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />

                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {props?.confirm 
                        ? 'Войдите, для подтверждения.'
                        :
                            <div>
                                Нет аккаунта? <NavLink onClick={scrollUp} to={REGISTRATION_ROUTE}>Зарегистрируйтесь!</NavLink>
                            </div>
                        }
                        <Button 
                            variant={"outline-success"} 
                            onClick={click}
                        >
                            Войти
                        </Button>
                    </Row>
                    
                </Form>
            </Card>

            <Alert show={alertVisible} onHide={() => setAlertVisible(false)} message={alertMessage} />

        </Container>
    )
})

export default LoginPage;
