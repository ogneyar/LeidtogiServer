// eslint-disable-next-line 
import React, { useEffect, useContext, useState } from 'react'
// import { Container } from 'react-bootstrap'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import Container from '../../components/myBootstrap/container/Container'
// import { API_URL } from '../../utils/consts'
import { Context } from '../..'
import './Aside.css'

import { authRoutes, publicRoutes } from '../../utils/routes'
import { fetchOneProduct } from '../../http/productAPI'


const Aside = observer(() => {

    const { category } = useContext(Context)

    const history = useHistory()

// это не баг, а фича
console.log(useParams())

    // хлебные крошки
    const [ breadCrumbsState, setBreadCrumbsState ] = useState([])
    let breadCrumbs = [] 


    function recursiveFunction(path) {
        if (path === "") {
            setBreadCrumbsState([])
        }else if (category?.allCategories && category?.allCategories.length > 0) {
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
        // eslint-disable-next-line
        breadCrumbs = []

        let path = history.location.pathname.replace(/\//,"") 

        let number = path.indexOf(`/`)
        if (number === -1) {

            let yes = false

            authRoutes.forEach(i => {
                let pathAuth = i.path.replace(/\//,"")
                let numberAuth = pathAuth.indexOf(`/`)
                if (numberAuth !== -1) pathAuth = pathAuth.substring(0, numberAuth)
                // console.log(pathAuth)
                if (pathAuth === path) yes = true
            })
            publicRoutes.forEach(i => {
                let pathPublic = i.path.replace(/\//,"")
                let numberPublic = pathPublic.indexOf(`/`)
                if (numberPublic !== -1) pathPublic = pathPublic.substring(0, numberPublic)
                // console.log(pathPublic)
                if (pathPublic === path) yes = true
            })

            if (yes) {
                setBreadCrumbsState([])
            }else {
                recursiveFunction(path)
            }
        }else {
            let string = path.substring(0, number)
            if (string === "product") {
                let id = Number(path.substring(number + 1, path.length))

                fetchOneProduct(id).then(data => {
                    if (category?.allCategories && category?.allCategories.length > 0) {
                        category.allCategories.forEach(cat => {
                            if (cat?.id === data?.categoryId) {
                                recursiveFunction(cat?.url)
                            }
                        })
                    }
                })

            }else if (string === "confirmation") {

            }
        }
    // eslint-disable-next-line
    },[category?.selectedCategory, history.location.pathname])
    // },[category?.selectedCategory, history.location.pathname, product?.allProducts])
   
    const onClickAsideDiv = () => {
        let path = history.location.pathname.replace(/\//,"") 
        if (path === "") {
            setBreadCrumbsState([])
        }else {
            breadCrumbs = []
            recursiveFunction(path)
        }
    }


    return (
        <Container className="Aside">
            <div className="AsideDiv" onClick={onClickAsideDiv}>
                {/* <div className="AsideDivNavLink">
                    <NavLink to={"/"} style={{color:"white"}}>
                        Главная
                    </NavLink>
                </div> */}
                {breadCrumbsState && 
                Array.isArray(breadCrumbsState) && 
                breadCrumbsState.map(i => {
                    return (
                        <div key={i.url+i.name} className="AsideDivNavLink">
                            <NavLink to={"/" + i.url} style={{color:"white"}}>
                                {i.name}
                            </NavLink>
                        </div>
                    )
                })
                } 
            </div>
        </Container>
    )
})

export default Aside
