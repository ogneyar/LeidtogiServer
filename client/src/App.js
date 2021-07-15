import { useContext, useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Spinner, Container } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import AppRouter from './components/AppRouter'
import { Context } from '.';
import { check } from './http/userAPI';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

import 'bootstrap/dist/css/bootstrap.css';
import './styles/App.css';


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

      <Header />
      
      <AppRouter />
      
      <Footer />

    </BrowserRouter>
  );
})

export default App;
