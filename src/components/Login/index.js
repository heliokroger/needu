import React, { Component } from 'react'
import DocumentTitle from 'react-document-title'
import Card from '../common/Card'
import LoginForm from './LoginForm'

export default class extends Component {
    render() {
        return (
            <DocumentTitle title="NeedU - Entrar">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <div style={{ margin: 'auto', padding: 50 }}>
                        <Card imageStyle={{ display: 'none' }} style={{ height: 'auto', width: 600 }}>
                            <div style={{ padding: 50 }}>
                                <LoginForm />
                            </div>
                        </Card>
                    </div>
                </div>
            </DocumentTitle>
        )
    }
}