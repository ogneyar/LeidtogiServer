import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import ReactHtmlParser from 'react-html-parser'

import { Alert, Input } from '../../components/myBootstrap'
import { fetchHusqvarnaGetImage, fetchHusqvarnaGetCharcteristic } from '../../http/paserAPI'
import InfoPage from '../info/InfoPage'


const TesterPage = () => {

    const [ showAlert, setShowAlert ] = useState(false)
    const [ message, setMessage ] = useState("")
    const [ article, setArticle ] = useState("9678968-01")

    const onClickButtonGetImage = () => {
        if (article !== "") {
            fetchHusqvarnaGetImage(article).then(data => {
                setMessage(`<img src="${data}" alt="" />`)
                setShowAlert(true)
                setArticle("")
            })
        }
    }

    const onClickButtonGetCharcteristic = () => {
        if (article !== "") {
            fetchHusqvarnaGetCharcteristic(article).then(data => {
            setMessage(data)
                setShowAlert(true)
                setArticle("")
            })
        }
    }

    return (
        <InfoPage>
            <div>
                <Input type="text" value={article} onChange={(e) => setArticle(e.target.value)} />
                <hr />
                <Button onClick={onClickButtonGetImage}>
                    Получить фото товара
                </Button>
                <hr />
                <Button onClick={onClickButtonGetCharcteristic}>
                    Получить характеристики товара
                </Button>
            </div>
            <Alert show={showAlert} onHide={() => setShowAlert(false)}>
                {/* {React.createElement(
                    "img", 
                    {src: `${message}`},
                    null
                )} */}
                {ReactHtmlParser(message)}
            </Alert>
        </InfoPage>
    )
}

export default TesterPage
