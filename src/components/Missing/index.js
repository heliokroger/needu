import React, { Component } from 'react'
import DocumentTitle from 'react-document-title'
import { connect } from 'react-redux'
import axios from 'axios'
import injectSheet from 'react-jss'
import PersonCard from '../common/PersonCard'
import Subheader from './Subheader'
import { API_URL } from '../../config'

class Missing extends Component {
    constructor() {
        super()
        this.state = { people: [] }
    }
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(async position => {
            const response = await axios.get(`${API_URL}/people/${position.coords.latitude},${position.coords.longitude}`)
            console.log(response.data)
            this.setState({
                people: response.data,
                peopleLoaded: true,
                coords: position.coords
            })
        })
    }
    render() {
        let people
        let noPeople
        if (this.state.people.length && this.state.peopleLoaded) people = (
            <div style={{ height: '100%', overflow: 'auto' }}>
                <div className={this.props.classes.container}>
                    {this.state.people.map(person => <PersonCard key={person.id} person={person} />)}
                </div>
            </div>
        )
        if (!this.state.people.length && this.state.peopleLoaded) noPeople = (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, flexDirection: 'column' }}>
                <img src={require('../../static/images/refresh-robot.png')} style={{ width: 600, height: 450 }} alt="Sem resultados" />
                <h2 style={{ textAlign: 'center' }}>Ninguém encontrado. Altere os filtros para encontrar alguém.</h2>
            </div>
        )
        return (
            <DocumentTitle title="NeedU - Pessoas desaparecidas">
                <div style={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <Subheader coords={this.state.coords} setPeople={people => this.setState({ people: people })} />
                    {noPeople}
                    {people}
                    <hr />
                </div>
            </DocumentTitle>
        )
    }
}

export default connect(store => ({ people: store.people }))(injectSheet({
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gridGap: '20px',
        padding: 20,
        '@media (max-width: 2120px)': { gridTemplateColumns: 'repeat(4, 1fr)' },
        '@media (max-width: 1760px)': { gridTemplateColumns: 'repeat(3, 1fr)' },
        '@media (max-width: 1400px)': { gridTemplateColumns: 'repeat(2, 1fr)' },
        '@media (max-width: 1035px)': { gridTemplateColumns: 'repeat(1, 1fr)' }
    }
})(Missing))