
import { BrowserRouter } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/App.css';
import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar'
import { Context } from '.';
import { check } from './http/userAPI';
import { Spinner, Container } from 'react-bootstrap';
import LogoPanel from './components/LogoPanel';
import Footer from './components/footer/Footer';
import End from './components/footer/End';

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
    return (
      <Container      
        className="d-flex justify-content-center align-items-center App" 
      >
        <Spinner
          animation="border" 
          variant="secondary" 
        />
      </Container>
    )
  }

  return (
    <BrowserRouter>
      <NavBar />
      <LogoPanel />
      
      <AppRouter />
      
      <footer>
        <Footer />
        <End />
      </footer>      
    </BrowserRouter>
  );
})

export default App;
