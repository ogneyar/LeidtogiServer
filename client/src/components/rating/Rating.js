import React, { useState, useEffect, useContext } from 'react'
import { Image } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'

import star from '../../assets/star.png'
import RatingModal from './RatingModal'
import { fetchRating } from '../../http/ratingAPI'
import { Context } from '../..'

import './Rating.css'
import Notification from '../myBootstrap/Notification'


const Rating = observer((props) => {

    const { user, rating } = useContext(Context)
    
    const [ratingModalVisible, setRatingModalVisible] = useState(false)
    const [notificationModalVisible, setNotificationModalVisible] = useState(false)

    const [rate, setRate] = useState(0)

    useEffect(() => {
        fetchRating(user.user.id, props?.product.id).then(data => {
            if (data?.rate) setRate(data?.rate)
        })
    // eslint-disable-next-line
    },[])


    return (
        <div
            className="Rating" 
        >

            <label
                className="RatingLabel"
            >
                Общий рейтинг товара
            </label>
            
            <div
                className="RatingBody"
                title="Оценить товар"
                onClick={() => {
                    if (user?.user?.id) setRatingModalVisible(true)
                    else setNotificationModalVisible(true)
                }}
            >
                <Image 
                    className="RatingStar" 
                    src={star} 
                />

                <div
                    className="RatingValue"
                >
                    {rating.rate}
                </div>
            </div>

            <RatingModal 
                show={ratingModalVisible} 
                onHide={() => setRatingModalVisible(false)} 
                rate={rate} 
                setRate={setRate} 
                userId={user.user.id}
                productId={props?.product.id}
            />

            <Notification 
                show={notificationModalVisible}
                onHide={() => setNotificationModalVisible(false)}
                message={"Для выставления оценки товару необходимо зарегистрироваться."}
                time={2500}
            />

        </div>
    )
})

export default Rating
