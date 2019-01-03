import React, { Component, Fragment } from 'react'
import DocumentTitle from 'react-document-title'
import injectSheet from 'react-jss'

class FacialRecognition extends Component {
    render() {
        return (
            <DocumentTitle title="NeedU - Reconhecimento facial">
                <Fragment>
                    <div className={this.props.classes.hero}>
                        <div className={this.props.classes.heroLayer}>
                            <img src={require('../static/images/logo-white.png')} alt="NeedU" style={{ width: 250, height: 139 }} />
                            <h1 style={{ color: '#fff', textAlign: 'center', maxWidth: 600 }}>Encontrando rostos entre milhões de outros.</h1>
                        </div>
                    </div>
                    <div className={this.props.classes.section}>
                        <h1 style={{ textAlign: 'center', marginBottom: 15 }}>O que é e como fazemos</h1>
                        <p style={{ textAlign: 'center', maxWidth: 650 }}>Cada pessoa no mundo possui traços únicos e característicos nas suas faces. Sabendo disso, o NeedU utiliza o máximo de informações das pessoas cadastradas na plataforma para conseguir criar mapeamentos de características, e utilizá-los para realizar reconhecimento facial.</p>
                        <p style={{ textAlign: 'center', maxWidth: 650 }}>Por isso, termos posse do máximo de informação possível faz toda a diferença para nossa equipe, e provavelmente também fará pra você. Tudo importa, desde as fotos, cor dos olhos, cor do cabelo e até mesmo altura ou peso.</p>
                    </div>
                    <div className={this.props.classes.section}>
                        <h1 style={{ textAlign: 'center', marginBottom: 15 }}>Como funciona</h1>
                        <p style={{ textAlign: 'center', maxWidth: 650 }}>É muito fácil utilizar os recursos de reconhecimento facial do NeedU. Assim que aberta a câmera do aplicativo, já é possível que você aponte para começar a identificar possíveis rostos cadastrados na nossa plataforma.</p>
                    </div>
                </Fragment>
            </DocumentTitle>
        )
    }
}

export default injectSheet({
    hero: {
        backgroundImage: `url(${require('../static/images/facial-recognition.jpg')})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: 400
    },
    heroLayer: {
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(97, 188, 170, 0.5)',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    section: {
        marginTop: 50,
        marginBottom: 50,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column'
    }
})(FacialRecognition)