import React, { Component } from 'react'
import DocumentTitle from 'react-document-title'
import Card from '../common/Card'
import RegisterForm from './RegisterForm'

export default class extends Component {
    render() {
        return (
            <DocumentTitle title="NeedU - Criar conta">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Card imageStyle={{ display: 'none' }} style={{ height: 'auto', width: 600 }}>
                        <div style={{ padding: 50 }}>
                            <RegisterForm />
                        </div>
                    </Card>
                </div>
            </DocumentTitle>
        )
    }
}