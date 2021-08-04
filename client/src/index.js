import React, { createContext } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import UserStore from './store/UserStore'
import ProductStore from './store/ProductStore'
import CategoryStore from './store/CategoryStore'
import BrandStore from './store/BrandStore'
import RatingStore from './store/RatingStore'
import './styles/index.css'


export const Context = createContext(null)


ReactDOM.render(
  <Context.Provider value={{
    user: new UserStore(),
    product: new ProductStore(),
    category: new CategoryStore(),
    brand: new BrandStore(),
    rating: new RatingStore()
  }}>
    <App />
  </Context.Provider>,
  document.getElementById('root')
)
