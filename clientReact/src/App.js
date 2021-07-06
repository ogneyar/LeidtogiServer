
import { BrowserRouter } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar'
import { Context } from '.';
import { check } from './http/userAPI';
import { Spinner } from 'react-bootstrap';
import LogoPanel from './components/LogoPanel';
import Footer from './components/Footer';

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
      <NavBar />
      <LogoPanel />
      <AppRouter />
      <Footer />
    </BrowserRouter>
  );
})

export default App;
