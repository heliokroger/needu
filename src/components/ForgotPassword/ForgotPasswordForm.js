import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { Link, withRouter } from 'react-router-dom'
import Button from '../common/Button'
import TextInput from '../common/TextInput'
import { required, email } from '../../validators'

class ForgotPasswordForm extends Component {
    submit(values) {

    }
    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.submit.bind(this))} noValidate style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <img src={require('../../static/images/logo.png')} alt="NeedU" style={{ marginBottom: 15, width: 250, height: 139 }} />
                <Field
                    component={TextInput}
                    name="email"
                    placeholder="Email"
                    type="email"
                    validate={[ required, email ]}
                    style={{ marginBottom: 15 }}
                />
                <Button title="Enviar" theme="buttonGrey" style={{ alignSelf: 'flex-end', marginBottom: 30 }} />
                <div style={{ height: 1, backgroundColor: 'rgba(0, 0, 0, 0.1)', width: '100%' }} />
                <small style={{ marginTop: 20, textAlign: 'center' }}>Você pode saber mais sobre recuperar sua conta na nossa área de <Link to="/help" style={{ fontSize: 13 }}>ajuda.</Link></small>
            </form>
        )
    }
}

export default reduxForm({ form: 'forgotPasswordForm' })(withRouter(ForgotPasswordForm))