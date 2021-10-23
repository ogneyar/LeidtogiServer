// eslint-disable-next-line 
import React, { useEffect, useContext, useState } from 'react'
// import { Container } from 'react-bootstrap'
import { NavLink, useHistory } from 'react-router-dom'

import Container from '../../components/myBootstrap/container/Container'
// import { API_URL } from '../../utils/consts'
import { Context } from '../..'
import './Aside.css'


const Aside = () => {

    const { category } = useContext(Context)

    const history = useHistory()

    // хлебные крошки
    const [ breadCrumbsState, setBreadCrumbsState ] = useState([])
    let breadCrumbs = [] 

    function recursiveFunction(path) {
        if (category?.allCategories && category?.allCategories.length > 0) {
            // console.log(category?.allCategories.length);
            category.allCategories.forEach(i => {
                if (i?.url === path) {
                    breadCrumbs = [ {name: i?.name, url: i.url}, ...breadCrumbs ]
                    setBreadCrumbsState([...breadCrumbs])
                    if (i?.sub_category_id !== 0) {
                        category.allCategories.forEach(j => {
                            if (i.sub_category_id === j?.id) {
                                recursiveFunction(j?.url)
                            }
                        })
                    }
                }
            })
        }
    }

    useEffect(() => {
        let path = history.location.pathname.replace(/\//g,"") 
        // eslint-disable-next-line
        breadCrumbs = []
        recursiveFunction(path)

    // eslint-disable-next-line        
    },[])

    // useEffect(() => {
    //     // eslint-disable-next-line
    //     breadCrumbs = []
    //     recursiveFunction(history.location.pathname.replace(/\//g,""))
    // // eslint-disable-next-line        
    // },[history.location.pathname])

    const onClickAsideDiv = () => {
        let path = history.location.pathname.replace(/\//g,"") 
        if (path === "") {
            setBreadCrumbsState([])
        }else {
            breadCrumbs = []
            recursiveFunction(path)
        }
        // console.log(history.location.pathname)
    }


    return (
        <Container className="Aside">
            <div className="AsideDiv" onClick={onClickAsideDiv}>
                <div className="AsideDivNavLink">
                    {/* /&nbsp; */}
                    <NavLink to={"/"} style={{color:"white"}}>
                        Главная
                    </NavLink>
                    {/* &nbsp; */}
                </div>
                {breadCrumbsState && 
                Array.isArray(breadCrumbsState) && 
                breadCrumbsState.map(i => {
                    return (
                        <div key={i.url+i.name} className="AsideDivNavLink">
                            {/* /&nbsp; */}
                            <NavLink to={"/" + i.url} style={{color:"white"}}>
                                {i.name}
                            </NavLink>
                            {/* &nbsp; */}
                        </div>
                    )
                })
                } 
            </div>
        </Container>
    )
}

export default Aside
