import React, { Component, Fragment } from 'react'
import DocumentTitle from 'react-document-title'
import injectSheet from 'react-jss'
import { GoogleMap, withGoogleMap, Circle } from 'react-google-maps'
import axios from 'axios'
import mapStyles from '../../static/json/mapStyles'
import Header from './Header'
import { API_URL } from '../../config'

class MissingPerson extends Component {
    constructor() {
        super()
        this.state = {
            person: {
                photos: [],
                user: { name: '' }
            }
        }
    }
    componentDidMount = async () => {
        const response = await axios.get(`${API_URL}/people/${this.props.match.params.id}`)
        this.setState({ person: response.data })
    }
    render() {
        let Map = () => null
        if (this.state.person.geometry) Map = withGoogleMap(() => (
            <GoogleMap
                zoom={14}
                defaultCenter={{ lat: this.state.person.geometry[0], lng: this.state.person.geometry[1] }}
                defaultOptions={{ styles: mapStyles, disableDefaultUI: true }}
            >
                <Circle
                    radius={500}
                    center={{ lat: this.state.person.geometry[0], lng: this.state.person.geometry[1] }}
                    options={{ fillColor: '#61bcaa', strokeColor: '#61bcaa' }}
                />
            </GoogleMap>
        ))
        return (
            <DocumentTitle title={this.state.person.name ? `NeedU - ${this.state.person.name}` : 'NeedU - Pessoa desaparecida'}>
                <Fragment>
                    <Header person={this.state.person} />
                    <div style={{ padding: 50 }}>
                        <h1 style={{ marginBottom: 15 }}>Última localização conhecida</h1>
                        <Map
                            loadingElement={<div style={{ height: '100%' }} />}
                            containerElement={<div className={this.props.classes.mapContainer} />}
                            mapElement={<div style={{ height: '100%' }} />}
                        />
                    </div>
                </Fragment>
            </DocumentTitle>
        )
    }
}

export default injectSheet({
    mapContainer: {
        height: 500,
        width: '100%',
        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
        borderRadius: 4
    }
})(MissingPerson)