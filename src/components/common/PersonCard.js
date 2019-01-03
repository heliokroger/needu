import React, { Component } from 'react'
import injectSheet from 'react-jss'
import moment from 'moment'
import { Link } from 'react-router-dom'
import capitalize from 'capitalize'
import Button from './Button'
import Card from './Card'

class PersonCard extends Component {
    render() {
        let name
        this.props.person.name
            ? name = <h2 style={{ marginBottom: 15 }} className={this.props.classes.avoidOverflow}>{capitalize.words(this.props.person.name.toLowerCase())}</h2>
            : name = <div className={this.props.classes.namePlaceholder}></div>
        let address
        this.props.person.address
            ? address = <h3 style={{ marginBottom: 5 }} className={this.props.classes.avoidOverflow}>Visto por último em {this.props.person.address}</h3>
            : address = (
                <div style={{ display: 'flex', marginBottom: 5 }}>
                    <h3>Visto por último em</h3>
                    <div className={this.props.classes.addressPlaceholder}></div>
                </div>
            )
        return (
            <Card
                images={this.props.person.photos.length ? this.props.person.photos : 'https://res.cloudinary.com/needu/image/upload/v1546382254/user-default.jpg'}
            >
                <div className={this.props.classes.cardContent}>
                    <div style={{ marginBottom: 20 }}>
                        {name}
                        {address}
                        <h3>Cadastrado {moment(this.props.person.createdAt).fromNow()}</h3>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <img
                                src={this.props.person.user.avatar}
                                style={{ borderRadius: 20, width: 40, height: 40 }}
                                alt={this.props.person.user.name}
                            />
                            <Link to={`/app/profile/${this.props.person.user._id}`} className={this.props.classes.profileButtonText}>{this.props.person.user.name}</Link>
                        </div>
                        <Button
                            to={this.props.person.id ? this.props.person.url ? this.props.person.url : `/app/missing/${this.props.person.id}` : null}
                            title="Detalhes"
                            theme="buttonGreen"
                            disabled={!this.props.person.id}
                            target={this.props.person.url ? '_blank' : 'local'}
                        />
                    </div>
                </div>
            </Card>
        )
    }
}

export default injectSheet({
    cardContent: {
        padding: 25,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between'
    },
    namePlaceholder: {
        height: 28,
        width: 270,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 4,
        marginBottom: 15
    },
    addressPlaceholder: {
        height: 18,
        width: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 4,
        marginLeft: 5
    },
    avoidOverflow: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
    },
    profileButtonText: {
        marginLeft: 10,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        maxWidth: 100,
        color: 'rgba(0, 0, 0, 0.5)',
        fontWeight: 'bold'
    }
})(PersonCard)