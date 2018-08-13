import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Bundle from 'utils/Bundle'

import HomePage from 'bundle-loader?lazy!./pages/home/index'
import weiquanPage from 'bundle-loader?lazy!./pages/weiquan/index'

export default (
    <div>
        <Route path='/' exact render={()=> (
               <Redirect to='/home'/>
           )} />
        <Route path='/home' component={Bundle(HomePage)} />
        <Route path='/weiquan/:pid' component={Bundle(weiquanPage)} />
    </div>
)