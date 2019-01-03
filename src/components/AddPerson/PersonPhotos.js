import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import axios from 'axios'
import Button from '../common/Button'
import PersonCard from '../common/PersonCard'
import addPersonService from '../../services/addPersonService'
import { API_URL } from '../../config'

class PersonPhotos extends Component {
    constructor() {
        super()
        this.state = { person: addPersonService.person }
    }
    componentDidMount() {
        addPersonService.storeStep(4)
    }
    openPhotoPicker() {
        document.getElementById('photo-picker').click()
    }
    selectPhoto(e) {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onload = e =>  {
            const photos = this.state.person.photos
            photos.push(`data:image/png;base64,${btoa(e.target.result)}`)
            document.getElementById('photo-picker').value = null
            addPersonService.store({ photos: photos })
            this.setState({ person: addPersonService.person })
        }
        reader.readAsBinaryString(file)
    }
    removePhoto(index) {
        const person = addPersonService.person
        person.photos.splice(index, 1)
        addPersonService.store({ photos: person.photos })
        this.setState({ person: person })
    }
    create = async () => {
        this.setState({ submitting: true })
        await axios.post(`${API_URL}/people`, { ...addPersonService.person, user: this.props.user._id })
        this.setState({ submitting: false })
        this.props.done()
    }
    render() {
        return (
            <Fragment>
                <h2 style={{ marginBottom: 15 }}>Fotos do desaparecido</h2>
                <h3 style={{ marginBottom: 20 }}>Você precisa adicionar pelo menos uma foto para prosseguir. De preferência, escolha fotos onde se tenha boa visão do rosto da pessoa desaparecida.</h3>
                <input id="photo-picker" type="file" style={{ display: 'none' }} accept="image/*" onChange={e => this.selectPhoto(e)} />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridGap: '20px', marginBottom: 20 }}>
                    {this.state.person.photos.map((photo, i) => (
                        <div key={i} style={{ height: 200 }}>
                            <div style={{ backgroundImage: `url(${photo})` }} className={this.props.classes.photo}>
                                <button className={this.props.classes.removePhotoButton} onClick={() => this.removePhoto(i)}>
                                    <i className="material-icons" style={{ color: '#fff', fontSize: 25, cursor: 'pointer' }}>close</i>
                                </button>
                            </div>
                        </div>
                    ))}
                    <div style={{ height: 200 }}>
                        <button className={this.props.classes.addPhotoButton} onClick={() => this.openPhotoPicker()} disabled={this.state.person.photos.length === 3}>
                            <i className="material-icons" style={{ color: 'rgba(0, 0, 0, 0.7)', fontSize: 35, cursor: 'pointer' }}>add</i>
                        </button>
                    </div>
                </div>
                <PersonCard person={{ ...this.state.person, user: this.props.user }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
                    <Button title="Voltar" theme="buttonGrey" onClick={() => this.back()} />
                    <div />
                    <Button
                        title={this.state.submitting ? 'Finalizando...' : 'Finalizar'}
                        theme="buttonGreen"
                        onClick={() => this.create()}
                        disabled={!this.state.person.photos.length || this.state.submitting}
                    />
                </div>
            </Fragment>
        )
    }
}

export default connect(store => ({ user: store.user }))(injectSheet({
    addPhotoButton: {
        width: '100%',
        height: '100%',
        display: 'flex',
        borderRadius: 4,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        border: 'none',
        transition: 'all 0.3s',
        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.05)' },
        '&:disabled': { opacity: 0.5, cursor: 'not-allowed' }
    },
    removePhotoButton: {
        border: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
        width: 35,
        height: 35,
        borderRadius: '50%',
        transition: 'all 0.3s',
        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.2)' }
    },
    photo: {
        backgroundSize: 'cover',
        borderRadius: 4,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 5,
        transition: 'all 0.3s',
        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
        '&:hover': { boxShadow: '0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.2)' }
    }
})(PersonPhotos))