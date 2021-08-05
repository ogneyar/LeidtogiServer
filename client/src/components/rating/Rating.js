import React, { useState, useEffect, useContext } from 'react'
import { Image } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'

import star from '../../assets/star.png'
import RatingModal from './RatingModal'
import { fetchRating } from '../../http/ratingAPI'
import { Context } from '../..'

import './Rating.css'


const Rating = observer((props) => {

    const { user, rating } = useContext(Context)
    
    const [ratingModalVisible, setRatingModalVisible] = useState(false)
    const [rate, setRate] = useState(0)

    useEffect(() => {
        fetchRating(user.user.id, props?.product.id).then(data => {
            if (data?.rate) setRate(data?.rate)
        })
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
                onClick={() => setRatingModalVisible(true)}
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

        </div>
    )
})

export default Rating
