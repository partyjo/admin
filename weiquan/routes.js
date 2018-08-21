import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Bundle from 'utils/Bundle'

import HomePage from 'bundle-loader?lazy!./pages/home/index'
import WeiquanPage from 'bundle-loader?lazy!./pages/weiquan/index'
import ArticleListPage from 'bundle-loader?lazy!./pages/article/list/index'
import ArticleEditpage from 'bundle-loader?lazy!./pages/article/edit/index'
import SystemPage from 'bundle-loader?lazy!./pages/system/index'

export default (
    <div>
        <Route path='/' exact render={()=> (
               <Redirect to='/home'/>
           )} />
        <Route path='/home' component={Bundle(HomePage)} />
        <Route path='/weiquan' component={Bundle(WeiquanPage)} />
        <Route path='/article/list' component={Bundle(ArticleListPage)} />
        <Route path='/article/edit/:id' component={Bundle(ArticleEditpage)} />
        <Route path='/system' component={Bundle(SystemPage)} />
    </div>
)