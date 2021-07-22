import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { authRoutes, publicRoutes } from '../utils/routes'
import { SHOP_ROUTE } from '../utils/consts'
import { Context } from '..'


const AppRouter = observer(() => {
    
    const {user} = useContext(Context)
    return (
        <Switch> 
            {user.isAuth && authRoutes.map(({path, Component}) => 
                <Route key={path} path={path} component={Component} exact />
            )}
            {publicRoutes.map(({path, Component}) => 
                <Route key={path} path={path} component={Component} exact />
            )}
            <Redirect to={SHOP_ROUTE} /> 
        </Switch>
    )
})

export default AppRouter
