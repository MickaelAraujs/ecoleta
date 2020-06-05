import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import Point from './pages/Point'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/cadastro' component={Point} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes