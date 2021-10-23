import { useContext, useState, useEffect } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'
import { observer } from 'mobx-react-lite'

import AppRouter from './components/AppRouter'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Loading from './components/Loading'
import Error from './pages/error/ErrorPage'
import { getUserInfo } from './http/userAPI'
import { fetchAllProducts } from './http/productAPI'
import { fetchAllCategories } from './http/categoryAPI'
import { fetchBrands } from './http/brandAPI'
import { Context } from '.'

import 'bootstrap/dist/css/bootstrap.css'
import './styles/App.css'


const App = observer(() => {

    const { user, product, category, brand } = useContext(Context)
    const [loading, setLoading] = useState(false)
    // eslint-disable-next-line
    const [error, setError] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setLoading(true)
            getUserInfo()
                .then(
                    data => {
                        if (data?.id) {
                            user.setUser({...data,activationLink:null,password:null})
                            user.setIsAuth(true)
                        }
                    },
                    err => console.log(err))
                .finally(() => setLoading(false))
        }
        
        fetchAllProducts()
            .then(
                data => product.setAllProducts(data),
                err => console.log(err))
        fetchAllCategories()
            .then(
                data => category.setAllCategories(data),
                err => {
                    alert("Не удалось загрузить категории. "+err)
                    console.log("Не удалось загрузить категории",err)
                    category.setAllCategories([{}])
                })
        fetchBrands()
            .then(data => brand.setAllBrands(data),
                err => console.log(err))
  }, [brand, category, product, user])

  
  if (loading) return <Loading />
  

    return (
        <BrowserRouter>
            <QueryParamProvider ReactRouterRoute={Route}>
                <Header />

                {error 
                ? <Error /> 
                : <AppRouter />}

                <Footer />
            </QueryParamProvider>
        </BrowserRouter>
    )
})

export default App
