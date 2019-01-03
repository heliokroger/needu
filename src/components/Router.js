import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './Home'
import Help from './Help'
import Login from './Login'
import Download from './Download'
import Messaging from './Messaging'
import FacialRecognition from './FacialRecognition'
import Terms from './Terms'
import Missing from './Missing'
import MissingPerson from './MissingPerson'
import Profile from './Profile'
import AddPerson from './AddPerson'
import Register from './Register'
import ForgotPassword from './ForgotPassword'
import userService from '../services/userService'

class PrivateRoute extends Component {
    render() {
        const user = userService.get()
        if (!user) return <Redirect to="/" />
        return <Route {...this.props} />
    }
}

class AuthRoute extends Component {
    render() {
        const user = userService.get()
        if (user) return <Redirect to="/app" />
        return <Route {...this.props} />
    }
}

export default class extends Component {
    render() {
        return (
            <Switch>
                <Route path="/" component={Home} exact={true} />
                <Route path="/help" component={Help} exact={true} />
                <AuthRoute path="/login" component={Login} exact={true} />
                <AuthRoute path="/register" component={Register} exact={true} />
                <AuthRoute path="/forgot-password" component={ForgotPassword} exact={true} />
                <Route path="/facial-recognition" component={FacialRecognition} exact={true} />
                <Route path="/download" component={Download} exact={true} />
                <Route path="/terms" component={Terms} exact={true} />
                <PrivateRoute path="/app/missing" component={Missing} exact={true} />
                <PrivateRoute path="/app/missing/:id" component={MissingPerson} exact={true} />
                <PrivateRoute path="/app/profile" component={Profile} exact={true} />
                <PrivateRoute path="/app/profile/:id" component={Profile} exact={true} />
                <PrivateRoute path="/app/add-person" component={AddPerson} exact={true} />
                <PrivateRoute path="/app/messaging" component={Messaging} exact={true} />
                <PrivateRoute path="/app/messaging/:recipient" component={Messaging} exact={true} />
                <Redirect path="/app" to="/app/missing" />
            </Switch>
        )
    }
}