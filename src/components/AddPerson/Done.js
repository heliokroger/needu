import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Button from '../common/Button'
import addPersonService from '../../services/addPersonService'

class Done extends Component {
    componentWillUnmount() {
        addPersonService.clear()
    }
    render() {
        return (
            <Fragment>
                <h2 style={{ marginBottom: 15 }}>Pronto!</h2>
                <p>Lamentamos pela situação, {this.props.user.name.split(' ')[0]}. Mas a equipe do NeedU fará de tudo para levar {addPersonService.person.name.split(' ')[0]} de volta para casa.</p>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={require('../../static/images/searching-robot.png')} style={{ width: 300, height: 225 }} alt="Concluído" />
                </div>
                <Button to="/app" title="Voltar para o início" theme="buttonGreen" />
            </Fragment>
        )
    }
}

export default connect(store => ({ user: store.user }))(Done)