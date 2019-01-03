import React, { Component } from 'react'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import { reduxForm, Field, change } from 'redux-form'
import { Slider } from 'material-ui-slider'
import axios from 'axios'
import Modal from '../common/Modal'
import Button from '../common/Button'
import { API_URL } from '../../config'

class Subheader extends Component {
    constructor() {
        super()
        this.state = { showFilterModal: false }
    }
    componentDidMount() {
        this.props.dispatch(change('missingPeopleFilterForm', 'distance', 100))
    }
    submit = async values => {
        this.setState({ submitting: true })
        const response = await axios.get(`${API_URL}/people/${this.props.coords.latitude},${this.props.coords.longitude}/${JSON.stringify(values)}`)
        this.props.setPeople(response.data)
        this.setState({ submitting: false, showFilterModal: false })
    }
    render() {
        const slider = props => (
            <div style={{ marginBottom: 15 }}>
                <label>Distância (em km's)</label>
                <Slider
                    value={props.input.value || 0}
                    onChange={props.input.onChange}
                    color="#61bcaa"
                    scaleLength={50}
                    min={100}
                    max={1000}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <small style={{ color: 'rgba(0, 0, 0, 0.5)', fontWeight: 'bold' }}>{props.input.value}km</small>
                </div>
            </div>
        )
        const filterName = props => (
            <input
                {...props.input}
                type="text"
                className={this.props.classes.searchFieldInput}
                placeholder="Buscar..."
            />
        )
        return (
            <form onSubmit={this.props.handleSubmit(this.submit.bind(this))} className={this.props.classes.subheader}>
                <Modal
                    title="Filtros da busca"
                    visible={this.state.showFilterModal}
                    onClose={() => this.setState({ showFilterModal: false })}
                >
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Field name="distance" component={slider} />
                        <Button
                            title={this.state.submitting ? 'Filtrando...' : 'Filtrar'}
                            theme="buttonGreen"
                            disabled={this.state.submitting}
                            style={{ alignSelf: 'flex-end', marginTop: 15 }}
                        />
                    </div>
                </Modal>
                <div style={{ display: 'flex', alignItems: 'center', minWidth: 600 }}>
                    <div className={this.props.classes.searchField}>
                        <i className="material-icons" style={{ color: '#757575' }}>search</i>
                        <Field name="word" component={filterName} />
                    </div>
                </div>
                <Button
                    type="button"
                    title="Filtros da busca"
                    theme="buttonGrey"
                    onClick={() => this.setState({ showFilterModal: true })}
                />
            </form>
        )
    }
}

export default connect()(reduxForm({ form: 'missingPeopleFilterForm' })(injectSheet({
    subheader: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        borderBottom: '1px solid #e5e5e5',
        padding: 15,
        alignItems: 'center',
        height: 75,
        minHeight: 75
    },
    searchField: {
        backgroundColor: '#f1f1f1',
        padding: 15,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    },
    searchFieldInput: {
        fontSize: 18,
        paddingLeft: 15,
        border: 'none',
        outline: 'none',
        background: 'transparent',
        width: '100%'
    }
})(Subheader)))