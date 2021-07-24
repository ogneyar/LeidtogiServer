import React, { useContext, useState } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import { fetchCategories, deleteCategory, updateCategory } from '../http/categoryAPI'
import CategoryAddService from './CategoryAddService'


const CategoryService = observer(({information, idName, offset, sub_id}) => {
    
    const { category } = useContext(Context)
    const [info, setInfo] = useState(information)

    const [state, setState] = useState(information.map(i => {
        return {id:i.id,readOnly:true,cursor:"pointer",bEdit:"flex",bApply:"none",divSub:"none"}
    }))
   

    const updateInfo = (sub, data, inform, offset) => {
        if (inform === "state") {
            if (offset === "null") {
                setState([...state, {id:data[0].id,readOnly:true,cursor:"pointer",bEdit:"flex",bApply:"none",divSub:"none"}])
                setInfo([...info, ...data])
            }else if (offset === "yes") {
                setInfo(info.map(i => {
                    return reMap(i, sub, data)
                }))
            }
        }else if (inform === "context") {
            if (sub === 0)  {
                category.setCategories([...category.categories, ...data])
            }else {
                category.setCategories(category.categories.map(i => {                    
                    return reMap(i, sub, data)
                }))
            }
        }        
        function reMap(i, sub, data) { // рекурсивная функция
            if (i.id === undefined) return i
            if (i.id === sub) {
                if (i.sub === undefined){
                    return {...i, sub:data}
                }else {
                    return {...i, sub:[...i.sub, ...data]}
                }
            }else if (i.sub !== undefined) {
                return {...i, sub:i.sub.map(k => {
                    return reMap(k, sub, data)
                })}
            }
            return i
        }
    }
        
    const delCategory = async (id, name) => {
        let yes = window.confirm(`Вы уверены, что хотите удалить категорию ${name}? Вместе с ней удалятся и подкатегории, если в ней таковые имеются! Будьте внимательны!!! Удаляем?!`)
        if (yes) {
            
            reDelete(id)
            
            category.setCategories(reFilter(category.categories, id))
            setInfo(reFilter(info, id))
        }
        function reFilter(array, id) { // рекурсивная функция удаления вложеных состояний
            return array.filter(i => {
                if (i.sub !== undefined) {
                    reFilter(i.sub, id)
                    return true
                }else if (i.id !== id){
                    return true
                }
                return false
            })
        }
        async function reDelete(id) { // рекурсивная функция удаления вложенных категорий
            let response = await deleteCategory(id)
            if (response) {
                let categories = await fetchCategories(id)
                if (categories) {
                    if (categories[0] !== undefined) {
                        categories.map(async (i) => {
                            reDelete(i.id)
                        })
                    }
                }
                return true
            }else return false
        }
    }
    
    const editCategory = (id) => {
        setState(
            state.map(i => i.id === id 
                ? {...i, readOnly:false,cursor:"text",bEdit:"none",bApply:"flex"} 
                : i
            )
        )
    }

    const editCategoryApply = async (id, name) => {
        setState(
            state.map(i => i.id === id 
                ? {...i, readOnly:true,cursor:"pointer",bEdit:"flex",bApply:"none"} 
                : i 
            )
        )
        await updateCategory(id, name)
    }

    const openSubCategory = async (id) => {
        fetchCategories(id).then(data => {
            if (data.length > 0) {
                category.setCategories(category.categories.map(i => i.id === id ? {...i, sub:data} : i))
                setInfo(info.map(i => i.id === id ? {...i, sub:data} : i))
            }
        })
    }

    const toggleSubCategory = async (id) => {     
        setState(state.map(i => {
            if (i.id === id) {
                if (i.divSub === "flex") {
                    return {...i, divSub:"none"}
                }else if (i.divSub === "none") {                    
                    openSubCategory(id)
                    return {...i, divSub:"flex"}
                }
            }
            return i
        }))
    }

    
    return (
    <div
        className={offset === "null" ? "" : "ml-4"}
    >
        <div>
            {info && info.map((i, number) => {

                if (i.id === undefined) return <div key={42}/>

                return (<Row
                    className='mt-4'
                    key={i.id}
                >
                    <Col md={5}>
                        <Form.Control 
                            className='mt-1'
                            style={{cursor:state[number].cursor}}
                            value={i.name}
                            readOnly={state[number].readOnly}
                            id={idName + i.id}
                            onChange={e => {
                                setInfo(info.map(k => i.id === k.id ? {...k, name:e.target.value} : k))
                            }}
                            onClick={e => {
                                if (state[number].readOnly) toggleSubCategory(i.id)
                            }}
                            title="Показать подкатегории"
                        />
                    </Col>
                    
                    <Col md={3}>
                        <Button
                            variant="outline-primary"
                            onClick={() => editCategory(i.id)}
                            style={{display:state[number].bEdit}}
                            className='mt-1'
                            id={"button_" + idName + i.id}
                        >
                            Изменить...
                        </Button>

                        <Button
                            variant="outline-warning"
                            onClick={() => editCategoryApply(i.id, i.name)}
                            style={{display:state[number].bApply}}
                            className='mt-1'
                            id={"button_warning_" + idName + i.id}
                        >
                            Применить
                        </Button>
                    </Col>

                    <Col md={3}>
                        <Button
                            variant="outline-danger"
                            onClick={() => delCategory(i.id, i.name)}
                            className='mt-1'
                        >
                            Удалить
                        </Button>
                    </Col>


                    {/* изначально не видимая форма для добавления подкатегории */}
                    <div 
                        id={"sub_"+ idName + i.id}
                        style={{display:state[number].divSub}}
                        className="flex-column "
                    >
                        {i.sub !== undefined 
                        ?
                            <CategoryService information={i.sub} idName={"sub_"+idName} sub_id={i.id} />
                        : 
                            <CategoryAddService sub_id={i.id} offset={"yes"} updateInfo={(sub, data, inform, offset) => updateInfo(sub, data, inform, offset)} />
                            // <CategoryService information={[]} idName={"sub_"+idName} sub_id={i.id} />
                        }
                    </div>

                </Row>)}
            )}
        </div>

        <CategoryAddService sub_id={sub_id} offset={"null"} updateInfo={(sub, data, inform, offset) => updateInfo(sub, data, inform, offset)} />

    </div>
                
    )
})

export default CategoryService
