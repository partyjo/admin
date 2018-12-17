import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import routes from './routes'
import Layout from 'layouts/index';

ReactDOM.render(
    <HashRouter>
        <Layout>
            {routes}
        </Layout>
    </HashRouter>,
    document.getElementById('app')
)