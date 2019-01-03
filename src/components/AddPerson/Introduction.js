import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Button from '../common/Button'

class Introduction extends Component {
    render() {
        return (
            <Fragment>
                <h2 style={{ marginBottom: 15 }}>Estamos aqui para ajudar!</h2>
                <h3 style={{ marginBottom: 20 }}>{this.props.user.name.split(' ')[0]}, sentimos muito que você tenha perdido alguém. Vamos te guiar por um passo-a-passo simples para que você consiga cadastrar quem você procura no NeedU.</h3>
                <Button title="Começar" theme="buttonGreen" style={{ alignSelf: 'flex-end' }} onClick={this.props.next} />
            </Fragment>
        )
    }
}

export default connect(store => ({ user: store.user }))(Introduction)