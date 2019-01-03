import React, { Component, Fragment } from 'react'
import DocumentTitle from 'react-document-title'
import { connect } from 'react-redux'
import moment from 'moment'
import injectSheet from 'react-jss'
import capitalize from 'capitalize'
import axios from 'axios'
import Button from './common/Button'
import Card from './common/Card'
import ImageModal from './common/ImageModal'
import { API_URL } from '../config'

class Profile extends Component {
    constructor() {
        super()
        this.state = { user: { name: '' }, showPhotoModal: false }
    }
    componentDidMount = async () => {
        if (this.props.match.params.id) {
            const response = await axios.get(`${API_URL}/users/${this.props.match.params.id}`)
            console.log(response.data)
            this.setState({ user: response.data })
        } else {
            this.setState({ user: this.props.user })
        }
    }
    render() {
        let subheaderRight
        if (this.props.user._id !== this.state.user._id) subheaderRight = (
            <Button
                to={`/app/messaging/${this.state.user._id}`}
                title={`Conversar com ${this.state.user.name.split(' ')[0]}`}
                theme="buttonGreen"
            />
        )
        return (
            <DocumentTitle title="NeedU - Perfil">
                <Fragment>
                    <ImageModal
                        photo={this.state.user.avatar}
                        onClose={() => this.setState({ showPhotoModal: false })}
                        visible={this.state.showPhotoModal}
                    />
                    <div className={this.props.classes.hero}>
                        <img
                            src={this.state.user.avatar}
                            style={{ borderRadius: 60, width: 120, height: 120, cursor: 'pointer' }}
                            alt={this.state.user.name}
                            onClick={() => this.setState({ showPhotoModal: true })}
                        />
                        <h2 style={{ color: '#fff', marginTop: 20 }}>{this.state.user.name}</h2>
                    </div>
                    <div className={this.props.classes.subheader}>
                        <h3 style={{ textAlign: 'center', fontWeight: 'bold' }}>{capitalize(moment(this.state.user.registeredAt).fromNow())} no NeedU</h3>
                        {subheaderRight}
                    </div>
                    <div style={{ display: 'grid', gridGap: '20px', gridTemplateColumns: 'repeat(3, 1fr)', padding: 50 }}>
                        <Card imageStyle={{ display: 'none' }}>
                            <div style={{ padding: 25 }}>
                                <h2 style={{ marginBottom: 15 }}>Informações verificadas</h2>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ marginBottom: 5, display: 'flex', alignItems: 'center' }}>
                                        <i className="material-icons" style={{ fontSize: 18, color: '#61bcaa', marginRight: 5 }}>check</i>
                                        <span style={{ fontWeight: 'bold' }}>Facebook</span>
                                    </div>
                                    <div style={{ marginBottom: 5, display: 'flex', alignItems: 'center' }}>
                                        <i className="material-icons" style={{ fontSize: 18, color: '#61bcaa', marginRight: 5 }}>check</i>
                                        <span style={{ fontWeight: 'bold' }}>Endereço de e-mail</span>
                                    </div>
                                    <div style={{ marginBottom: 5, display: 'flex', alignItems: 'center' }}>
                                        <i className="material-icons" style={{ fontSize: 18, color: '#61bcaa', marginRight: 5 }}>check</i>
                                        <span style={{ fontWeight: 'bold' }}>Telefone</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                        <Card imageStyle={{ display: 'none' }}>
                            <div style={{ padding: 25 }}>
                                <h2>Sobre {this.state.user.name.split(' ')[0]}</h2>
                            </div>
                        </Card>
                        <Card imageStyle={{ display: 'none' }}>
                            <div style={{ padding: 25 }}>
                                <h2>Sobre {this.state.user.name.split(' ')[0]}</h2>
                            </div>
                        </Card>
                    </div>
                </Fragment>
            </DocumentTitle>
        )
    }
}

export default connect(store => ({ user: store.user }))(injectSheet({
    hero: {
        backgroundColor: '#61bcaa',
        height: 250,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        borderBottom: '1px solid #e5e5e5'
    },
    subheader: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        borderBottom: '1px solid #e5e5e5',
        padding: 15,
        alignItems: 'center',
        height: 75,
        minHeight: 75
    }
})(Profile))