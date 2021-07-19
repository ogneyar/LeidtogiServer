import React, { useContext, useState, useEffect } from 'react'
import {Modal, Button} from 'react-bootstrap'
import { Context } from '../..'
import { fetchCategories } from '../../http/categoryAPI'
import { observer } from 'mobx-react-lite'
import CategoryService from '../../service/CategoryService'


const Category = observer(({show, onHide}) => {

    const { category } = useContext(Context)
    const [info, setInfo] = useState([])

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchCategories().then(data => {
            category.setCategories(data)
            setInfo(category.categories)
        })
        
        // fetchAll(0).then(data => {
        //     console.log(data);

        //     category.setCategories(data)
        //     setInfo(category.categories)

        //     console.log(info);
        // }).finally(() => setLoading(false))

        
    },[])

    // const fetchAll = (id) => {
    //     let data = fetchCategories(id)
    //     if (data) {
    //         return data.map(i => {
    //             let response = fetchAll(i.id)
    //             if (response != null) {
    //                 return {...i, sub:response}
    //             }else  return i
    //         })
    //     }else return null
    // }
    

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Редактирование категорий
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                {loading === false 
                ?
                    <CategoryService information={info} idName={"category_"} offset={null} sub_id={0} />
                :
                    ""
                }

            </Modal.Body>
            <Modal.Footer>
                
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>

            
        </Modal>
    )
})

export default Category
