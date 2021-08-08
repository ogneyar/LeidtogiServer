import React, { useContext, useState } from 'react'
// import { Button, Form, Row, Col } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { Context } from '../../index'
import { fetchAllCategories, fetchCategories, deleteCategory, updateCategory } from '../../http/categoryAPI'
import CategoryAddService from './CategoryAddService'
import { Input, Button } from '../../components/myBootstrap'
import translite from '../../utils/translite'


const CategoryService = observer(({information, idName, offset, sub_id}) => {
    
    const { category } = useContext(Context)
    const [info, setInfo] = useState(information)

    const [state, setState] = useState(information.map(i => {
        let cursor
        if (i.is_product) cursor = "text"
        else cursor = "pointer"
        return {id:i.id,readOnly:true,cursor,bEdit:"flex",bApply:"none",divSub:"none"}
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

    const editCategoryApply = (id, name) => {
        setState(
            state.map(i => i.id === id 
                ? {...i, readOnly:true,cursor:"pointer",bEdit:"flex",bApply:"none"} 
                : i 
            )
        )
        fetchAllCategories().then(data => {
            let url = translite(name)
            let yes = false
            data.forEach(i => {
                if (url === i.url) yes = true
            })
            if (yes) {
                let sub_category_id
                data.forEach(i => {
                    if (id === i.id) sub_category_id = i.sub_category_id
                })
                if (sub_category_id) {
                    data.forEach(i => {
                        if (sub_category_id === i.id) url = translite(i.name) + "_" + url
                    })
                }else url = url + "_too"
            }
            updateCategory(id, {name,url})
        })
        
        
    }

    const openSubCategory = (id) => {
        fetchCategories(id).then(data => {
            if (data.length > 0) {
                category.setCategories(category.categories.map(i => i.id === id ? {...i, sub:data} : i))
                setInfo(info.map(i => i.id === id ? {...i, sub:data} : i))
            }
        })
    }

    const toggleSubCategory = (id) => {     
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

    
    const toggleIsProduct = async (id, checked) => {     
        setInfo(info.map(i => i.id === id ? {...i, is_product:checked} : i))
        await updateCategory(id, {is_product:checked})

    }


    
    return (
    <div
        className={offset === "null" ? "" : "ml-4"}
    >
        <div>
            {info && info.map((i, number) => {

                if (i.id === undefined) return <div key={42}/>

                return (<div
                    className='d-flex flex-column'
                    key={i.id}
                >
					<div
						className='mt-4 d-flex flex-row'
					>
                        
						<div
							style={{width:"100%"}}
                            className='ml-2 mr-2'
						>
							<Input 
								className='mt-1'
								style={{cursor:state[number].cursor,width:"100%"}}
								value={i.name}
								readOnly={state[number].readOnly}
								id={idName + i.id}
								onChange={e => {
									setInfo(info.map(k => i.id === k.id ? {...k, name:e.target.value} : k))
								}}
								onClick={e => {
									if (state[number].readOnly) 
                                        if (!i.is_product) 
                                            toggleSubCategory(i.id)
								}}
								title={state[number].bEdit === "flex" 
                                    ? i.is_product 
                                        ? "Категория с продукцией" 
                                        : "Показать подкатегории"
                                    : "Редактировать запись"}
							/>
						</div>
                        
						<div
                            className='ml-2 mr-2'
                        >
							<Button
								variant="outline-primary"
								onClick={() => editCategory(i.id)}
								style={{display:state[number].bEdit}}
								className='mt-1'
								id={"button_" + idName + i.id}
                                title="Изменить название категории"
							>
								Изменить...
							</Button>

							<Button
								variant="outline-warning"
								onClick={() => editCategoryApply(i.id, i.name)}
								style={{display:state[number].bApply}}
								className='mt-1'
								id={"button_warning_" + idName + i.id}
                                title="Применить изменения в названии"
							>
								Применить
							</Button>
						</div>

						<div
                            className='ml-2 mr-2'
                        >
                            
							<Input 
								type="checkbox" 
								className='mt-3'
								checked={i.is_product}
								title="Содержит ли продукцию?"
								style={{cursor:"pointer"}}
                                onChange={e => {
									toggleIsProduct(i.id, e.target.checked)
								}}
							/>
						</div>
                        
						<div
                            className='ml-2 mr-2'
                        >
							<Button
								variant="outline-danger"
								onClick={() => {
                                    if (!i.is_product) delCategory(i.id, i.name)
                                }}
								className='mt-1'
                                title="Удаление категории"
                                readOnly={i.is_product}
							>
								Удалить
							</Button>
						</div>
                        
					</div>
                

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
                        }
                        
                    </div>

                </div>)}
            )}
        </div>

        <CategoryAddService sub_id={sub_id} offset={"null"} updateInfo={(sub, data, inform, offset) => updateInfo(sub, data, inform, offset)} />

    </div>
                
    )
})

export default CategoryService
