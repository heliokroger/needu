import React, { Component, Fragment } from 'react'
import DocumentTitle from 'react-document-title'
import injectSheet from 'react-jss'
import Button from './common/Button'

class Home extends Component {
    render() {
        return (
            <DocumentTitle title="NeedU - Bem-vindo ao NeedU!">
                <Fragment>
                    <div className={this.props.classes.hero}>
                        <img src={require('../static/images/logo-white.png')} style={{ width: 250, height: 139 }} alt="NeedU" />
                        <h1 style={{ color: '#fff', textAlign: 'center', maxWidth: 600 }}>A plataforma inteligente para busca de pessoas desaparecidas.</h1>
                        <Button to="/download" title="Baixe agora grátis" style={{ marginTop: 20 }} />
                    </div>
                    <div style={{ margin: 50 }}>
                        <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                            <h1 style={{ textAlign: 'center', marginBottom: 15 }}>Nosso objetivo</h1>
                            <p style={{ textAlign: 'center', maxWidth: 650 }}>NeedU é um plataforma criada com o intuito de levar pessoas desaparecidas de volta aos seus lares. Para isso, utilizamos tudo o que há de mais moderno no mundo da computação.</p>
                        </div>
                    </div>
                </Fragment>
            </DocumentTitle>
        )
    }
}

export default injectSheet({
    hero: {
        height: 400,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#61bcaa',
        borderBottom: '1px solid #e5e5e5',
        padding: 15,
        flexDirection: 'column'
    },
    card: {
        width: '20%',
        marginRight: 15,
        marginBottom: 15,
        '@media (max-width: 2120px)': { width: '25%' },
        '@media (max-width: 1760px)': { width: '33.33%' },
        '@media (max-width: 1400px)': { width: '50%' },
        '@media (max-width: 1035px)': { width: '100%', marginRight: 0 }
    }
})(Home)