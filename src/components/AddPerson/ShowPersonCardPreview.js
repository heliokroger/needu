import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Button from '../common/Button'
import PersonCard from '../common/PersonCard'
import addPersonService from '../../services/addPersonService'

class ShowPersonCardPrewview extends Component {
    componentDidMount() {
        addPersonService.storeStep(1)
    }
    render() {
        return (
            <Fragment>
                <h2 style={{ marginBottom: 15 }}>Antes de começarmos</h2>
                <p style={{ marginBottom: 20 }}>Este aqui é o cartão de divulgação NeedU. Ele será mostrado direto na página inicial do nosso site assim que você terminar o seu cadastro. Ele também irá te acompanhar durante este passo-a-passo, sendo preenchido em tempo real.</p>
                <PersonCard person={{ photos: [], user: this.props.user }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
                    <Button title="Voltar" theme="buttonGrey" onClick={this.props.back} />
                    <div />
                    <Button title="Avançar" theme="buttonGreen" onClick={this.props.next} />
                </div>
            </Fragment>
        )
    }
}

export default connect(store => ({ user: store.user }))(ShowPersonCardPrewview)