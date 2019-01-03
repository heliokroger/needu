import React, { Component, Fragment } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import injectSheet from 'react-jss'
import 'moment/locale/pt-br'
import socketService from '../services/socketService'
import userService from '../services/userService'
import Header from './Header'
import Sidebar from './Sidebar'
import store from '../store'
import Router from './Router'
import 'normalize.css/normalize.css'
import 'rodal/lib/rodal.css'
import 'animate.css/animate.css'
import '../static/css/App.css'

const user = userService.get()

class App extends Component {
    componentDidMount() {
        if (user) socketService.connect(`user=${user._id}`)
    }
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Fragment>
                        <Header />
                        <div style={{ height: '100%', display: 'flex' }}>
                            <Sidebar />
                            <div style={{ overflow: 'auto', flex: 1 }}>
                                <Router />
                            </div>
                        </div>
                    </Fragment>
                </BrowserRouter>
            </Provider>
        )
    }
}

export default injectSheet({
    advice: {
        backgroundColor: '#6bd8c2',
        width: '100%',
        display: 'flex',
        padding: 10,
        alignItems: 'center'
    },
    adviceCloseButton: {
        display: 'flex',
        backgroundColor: 'transparent',
        border: 'none',
        outline: 'none',
        color: '#fff',
        cursor: 'pointer'
    }
})(App)