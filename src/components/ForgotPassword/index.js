import React, { Component } from 'react'
import DocumentTitle from 'react-document-title'
import Card from '../common/Card'
import ForgotPasswordForm from './ForgotPasswordForm'

export default class extends Component {
    render() {
        return (
            <DocumentTitle title="NeedU - Esqueci minha senha">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Card imageStyle={{ display: 'none' }} style={{ height: 'auto', width: 600 }}>
                        <div style={{ padding: 50 }}>
                            <ForgotPasswordForm />
                        </div>
                    </Card>
                </div>
            </DocumentTitle>
        )
    }
}