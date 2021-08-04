import { useContext, useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import AppRouter from './components/AppRouter'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Loading from './components/Loading'
import Error from './components/Error'
import { check } from './http/userAPI'
import { Context } from '.'

import 'bootstrap/dist/css/bootstrap.css'
import './styles/App.css'


const App = observer(() => {

  const { user } = useContext(Context)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    check().then(data => {
      user.setUser(data)
      user.setIsAuth(true)
    },err => {
      if (err.response?.status !== 401)
        setError(true)
    }).finally(() => setLoading(false))
  }, [])

  
  if (loading) return <Loading />
  

  return (
    <BrowserRouter>
      <Header />

      {error 
        ? <Error /> 
        : <AppRouter />}

      <Footer />
    </BrowserRouter>
  )
})

export default App
