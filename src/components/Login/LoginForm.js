import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { Link, withRouter } from 'react-router-dom'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import axios from 'axios'
import { API_URL, FACEBOOK_LOGIN_CONFIGURATION } from '../../config'
import Button from '../common/Button'
import TextInput from '../common/TextInput'
import { required } from '../../validators'
import userService from '../../services/userService'

class LoginForm extends Component {
    facebookLogin = async user => {
        if (user.status !== undefined) {
            const response = await axios.post(`${API_URL}/authentication/facebook`, user)
            userService.set(response.data)
            this.props.history.push('/app')
        }
    }
    submit(values) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.post(`${API_URL}/authentication/login`, values)
                    resolve()
                    userService.set(response.data)
                    this.props.history.push('/app')
            } catch (err) {
                reject(err)
            }
        })
    }
    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.submit.bind(this))} noValidate style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <img src={require('../../static/images/logo.png')} alt="NeedU" style={{ marginBottom: 15, width: 250, height: 139 }} />
                <Field
                    component={TextInput}
                    name="email"
                    placeholder="Endereço de e-mail"
                    type="email"
                    validate={required}
                    style={{ marginBottom: 15 }}
                />
                <Field
                    component={TextInput}
                    name="password"
                    placeholder="Senha"
                    type="password"
                    validate={required}
                    style={{ marginBottom: 15 }}
                />
                <Button
                    title={this.props.submitting ? 'Entrando...' : 'Entrar'}
                    disabled={this.props.submitting}
                    theme="buttonGrey"
                    style={{ alignSelf: 'flex-end', marginBottom: 20 }}
                />
                <Link to="/forgot-password" style={{ marginBottom: 10, textAlign: 'center' }}>Esqueceu sua senha?</Link>
                <p style={{ marginBottom: 20, textAlign: 'center' }}>Ainda não possui conta? <Link to="/register">Crie uma agora</Link></p>
                <div style={{ height: 1, backgroundColor: 'rgba(0, 0, 0, 0.1)', width: '100%' }} />
                <FacebookLogin
                    {...FACEBOOK_LOGIN_CONFIGURATION}
                    callback={user => this.facebookLogin(user)}
                    render={props => <Button type="button" title="Entrar com o Facebook" theme="buttonFacebook" onClick={props.onClick} style={{ width: '100%', marginBottom: 20, marginTop: 20 }} />}
                />
                <div style={{ height: 1, backgroundColor: 'rgba(0, 0, 0, 0.1)', width: '100%' }} />
                <small style={{ marginTop: 20, textAlign: 'center' }}>Se clicar em "Entrar com o Facebook" e ainda não for usuário do NeedU, você será automaticamente cadastrado aceitando os nossos <Link to="/terms" style={{ fontSize: 13 }}>termos de uso.</Link></small>
            </form>
        )
    }
}

export default reduxForm({ form: 'loginForm' })(withRouter(LoginForm))