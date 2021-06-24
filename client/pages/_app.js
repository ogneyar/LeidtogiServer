import '../styles/globals.css'
import React, { createContext } from 'react';
import './index.css';
import UserStore from '../store/UserStore';
import DeviceStore from '../store/DeviceStore';

export const Context = createContext(null)


function MyApp({ Component, pageProps }) {
  return (
    <Context.Provider value={{
      user: new UserStore(),
      device: new DeviceStore()
    }}>
      <Component {...pageProps} />
    </Context.Provider>
  )
}

export default MyApp
