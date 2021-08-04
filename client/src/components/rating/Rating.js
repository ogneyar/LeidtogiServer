import React, { useState, useEffect, useContext } from 'react'
import { Image } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'

import star from '../../assets/star.png'
import RatingModal from './RatingModal'
import { fetchRating } from '../../http/ratingAPI'
import { Context } from '../..'

import './Rating.css'


const Rating = observer((props) => {

    const { user } = useContext(Context)
    
    const [ratingModalVisible, setRatingModalVisible] = useState(false)
    const [rate, setRate] = useState(0)

    useEffect(() => {
        fetchRating(user.user.id, props?.product.id).then(data => {
            setRate(data)
            console.log(data);
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
                    {props?.rating}
                </div>
            </div>

            <RatingModal show={ratingModalVisible} onHide={() => setRatingModalVisible(false)} rate={rate} />

        </div>
    )
})

export default Rating
