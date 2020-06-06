import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import Point from './pages/Point'
import Success from './pages/Success'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/cadastro' component={Point} />
        <Route path='/success' component={Success} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes