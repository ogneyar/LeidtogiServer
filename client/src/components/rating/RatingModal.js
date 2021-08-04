import React, { useState, useEffect } from 'react'
import {Modal, Button} from 'react-bootstrap'
import './RatingModal.css'


const RatingModal = ({children, show, onHide, message, rate }) => {

    const [info, setInfo] = useState([])

    useEffect(() => {
        let array = []
        let color, checked
        for(let i = 1; i <= 5; i++) {
            color = "white"
            checked = false
            if (rate && rate >= i) {
                color = "red"
                checked = true
            }
            array = [...array, {
                id:i,
                color,
                checked
            }]
        }
        setInfo(array)
    },[])

    const onMouseEnterLabel = () => {

    }


    return (
        <Modal
            show={show}
            onHide={onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Оцените товар
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="box"
            >
                <div
                    className="rating-box"
                >
                    <div
                        className="rating-box__items"
                    >
                        {info.map(i => 
                            <div key={i.id}>
                                <input
                                    className="rating-box__item" 
                                    type="radio"
                                    id={"rating-box__"+i.id}
                                    value={i.id}
                                    // checked={i.checked}
                                />
                                <label
                                    className="rating-box__label" 
                                    htmlFor={"rating-box__"+i.id}
                                    onMouseEnter={() => onMouseEnterLabel(i.id)}
                                    style={{color:i.color}}
                                ></label>
                            </div>
                        )}
                        

                    </div>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default RatingModal
