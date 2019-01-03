import React, { Component } from 'react'
import DocumentTitle from 'react-document-title'
import injectSheet from 'react-jss'
import Button from './common/Button'

class Download extends Component {
    render() {
        return (
            <DocumentTitle title="NeedU - Baixar">
                <div className={this.props.classes.background}>
                    <div className={this.props.classes.backgroundLayer}>
                        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginBottom: 50 }}>
                            <img src={require('../static/images/logo-white.png')} alt="NeedU" style={{ width: 250, height: 139 }} />
                            <h1 style={{ color: '#fff', textAlign: 'center', maxWidth: 600, marginTop: 20 }}>Participe agora mesmo da comunidade do NeedU.</h1>
                        </div>
                        <div>
                            <a href="" target="_blank" style={{ marginRight: 2.5 }}>
                                <img src={require('../static/images/apps-applestore.svg')} alt="Baixar na Apple Store" style={{ width: 174, height: 50 }} />
                            </a>
                            <a href="" target="_blank" style={{ marginLeft: 2.5 }}>
                                <img src={require('../static/images/apps-googleplay.png')} alt="Baixar no Google Play" style={{ width: 174, height: 50 }} />
                            </a>
                        </div>
                        <Button to="/login" title="Usar versão para navegador" style={{ marginTop: 50, marginBottom: 50 }} />
                    </div>
                </div>
            </DocumentTitle>
        )
    }
}

export default injectSheet({
    background: {
        backgroundImage: `url(${require('../static/images/crowd.jpg')})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100%'
    },
    backgroundLayer: {
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(97, 188, 170, 0.5)',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
    }
})(Download)