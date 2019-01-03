import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import PlacesAutocomplete from 'react-google-autocomplete'
import Button from '../common/Button'
import PersonCard from '../common/PersonCard'
import addPersonService from '../../services/addPersonService'

class PersonLastSeen extends Component {
    constructor() {
        super()
        this.state = { person: addPersonService.person }
    }
    componentDidMount() {
        addPersonService.storeStep(3)
    }
    setLastSeen(place) {
        addPersonService.store({
            geometry: [ place.geometry.location.lat(), place.geometry.location.lng() ],
            address: place.formatted_address
        })
        this.setState({ person: addPersonService.person })
    }
    clearLastSeen() {
        addPersonService.store({ geometry: null, address: null })
    }
    render() {
        return (
            <Fragment>
                <h2 style={{ marginBottom: 15 }}>Última localização conhecida</h2>
                <h3 style={{ marginBottom: 20 }}>A última localização conhecida da pessoa desaparecida é muito importante para as buscas, pois pode ser utilizada como ponto de referência.</h3>
                <form onSubmit={e => this.state.person.geometry ? this.next() : e.preventDefault()} style={{ marginBottom: 20 }}>
                    <PlacesAutocomplete
                        className={this.props.classes.input}
                        placeholder="Escolha um local"
                        autoFocus
                        onPlaceSelected={this.setLastSeen.bind(this)}
                        onChange={this.clearLastSeen.bind(this)}
                        types={[ 'address' ]}
                        componentRestrictions={{ country: 'br' }}
                        defaultValue={this.state.person.address}
                    />
                </form>
                <PersonCard person={{ ...this.state.person, user: this.props.user }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
                    <Button title="Voltar" theme="buttonGrey" onClick={this.props.back} />
                    <div />
                    <Button title="Avançar" theme="buttonGreen" onClick={this.props.next} disabled={!this.state.person.geometry} />
                </div>
            </Fragment>
        )
    }
}

export default connect(store => ({ user: store.user }))(injectSheet({
    input: {
        fontSize: 16,
        backgroundColor: '#f1f1f1',
        padding: 15,
        borderRadius: 5,
        border: 'none',
        width: '100%',
        marginBottom: 5
    }
})(PersonLastSeen))