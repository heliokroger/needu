import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, change } from 'redux-form'
import capitalize from 'capitalize'
import { required } from '../../validators'
import Button from '../common/Button'
import TextInput from '../common/TextInput'
import PersonCard from '../common/PersonCard'
import addPersonService from '../../services/addPersonService'

class PersonName extends Component {
    constructor() {
        super()
        this.state = { person: addPersonService.person }
    }
    componentDidMount() {
        addPersonService.storeStep(2)
        this.props.dispatch(change('addPersonNameForm', 'name', addPersonService.person.name))
    }
    setName(name) {
        addPersonService.store({ name: capitalize.words(name) })
        this.setState({ person: addPersonService.person })
    }
    render() {
        return (
            <Fragment>
                <h2 style={{ marginBottom: 15 }}>Nome completo</h2>
                <h3 style={{ marginBottom: 20 }}>Permitir que as outras pessoas saibam o nome de quem você busca é um requisito para que você consiga cadastrar uma pessoa no NeedU.</h3>
                <form onSubmit={this.props.handleSubmit(this.props.next)}>
                    <div style={{ marginBottom: 20 }}>
                        <Field
                            name="name"
                            placeholder="Preencha aqui"
                            component={TextInput}
                            validate={required}
                            autoFocus
                            onChange={e => this.setName(e.target.value)}
                        />
                    </div>
                    <PersonCard person={{ ...this.state.person, user: this.props.user }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
                        <Button type="button" title="Voltar" theme="buttonGrey" onClick={this.props.back} />
                        <div />
                        <Button title="Avançar" theme="buttonGreen" disabled={this.props.invalid} />
                    </div>
                </form>
            </Fragment>
        )
    }
}

export default reduxForm({ form: 'addPersonNameForm' })(connect(store => ({ user: store.user }))(PersonName))