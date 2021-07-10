
import { BrowserRouter } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useContext, useState, useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import Head from 'next/head'

import { Context } from '../pages/_app'
import { check } from '../http/userAPI'

import AppRouter from './AppRouter'
import NavBar from './NavBar'
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/App.module.css'


const App = observer(() => {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    check().then(data => {
      user.setUser(data)
      user.setIsAuth(true)
    }).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <Spinner className="d-flex" style={{margin: '100px auto'}} animation={"grow"} />
  }

  return (
    <BrowserRouter>
      <Head>
        <title>LeidTogi - магазин инструментов</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Интернет-магазин инструментов LeidTogi" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />   
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
})

export default App;
