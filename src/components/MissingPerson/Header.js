import React, { Component, Fragment } from 'react'
import injectSheet from 'react-jss'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Button from '../common/Button'
import ImageModal from '../common/ImageModal'

class Header extends Component {
    constructor() {
        super()
        this.state = { showPhotoModal: false }
    }
    render() {
        const photos = this.props.person.photos.map((photo, i) => (
            <div
                key={i}
                onClick={() => this.setState({ showPhotoModal: true, photo: photo })}
                style={{ backgroundImage: `url(${photo})` }}
                className={this.props.classes.photo}
            />
        ))
        let talkTo
        if (this.props.person.user.id !== this.props.user.id) talkTo = <Button
            to={`/app/messaging/${this.props.person.user._id}`}
            title={`Conversar com ${this.props.person.user.name.split(' ')[0]}`}
            theme="buttonGreen"
            style={{ marginRight: 15 }}
        />
        return (
            <Fragment>
                <ImageModal
                    photo={this.state.photo}
                    onClose={() => this.setState({ showPhotoModal: false })}
                    visible={this.state.showPhotoModal}
                />
                <div className={this.props.classes.hero}>
                    <h1 style={{ color: '#fff', marginBottom: 20 }}>{this.props.person.name}</h1>
                    <div className={this.props.classes.photosContainer}>
                        {photos}
                    </div>
                </div>
                <div className={this.props.classes.subheader}>
                    <Link to={`/app/profile/${this.props.person.user._id}`} className={this.props.classes.profileButton}>
                        <img
                            src={this.props.person.user.avatar}
                            style={{ borderRadius: 20, width: 40, height: 40 }}
                            alt={this.props.person.user.name}
                        />
                        <p className={this.props.classes.profileButtonText}>{this.props.person.user.name}</p>
                    </Link>
                    {talkTo}
                </div>
            </Fragment>
        )
    }
}

export default connect(store => ({ user: store.user }))(injectSheet({
    hero: {
        height: 'auto',
        display: 'flex',
        backgroundColor: '#61bcaa',
        borderBottom: '1px solid #e5e5e5',
        padding: 50,
        flexDirection: 'column'
    },
    subheader: {
        minHeight: 75,
        height: 75,
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottom: '1px solid #e5e5e5',
        justifyContent: 'space-between'
    },
    photosContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gridGap: '20px',
        '@media (max-width: 2120px)': { gridTemplateColumns: 'repeat(4, 1fr)' },
        '@media (max-width: 1760px)': { gridTemplateColumns: 'repeat(3, 1fr)' },
        '@media (max-width: 1400px)': { gridTemplateColumns: 'repeat(2, 1fr)' },
        '@media (max-width: 1035px)': { gridTemplateColumns: 'repeat(1, 1fr)' }
    },
    photo: {
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: 4,
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 5,
        cursor: 'pointer',
        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
        height: 400,
        transition: 'all 0.3s',
        '&:hover': { boxShadow: '0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.2)' }
    },
    profileButton: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        paddingLeft: 15,
        paddingRight: 15,
        border: 'none',
        transition: 'all 0.3s',
        width: 175,
        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.05)' }
    },
    profileButtonText: {
        marginLeft: 10,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        fontWeight: 'bold'
    }
})(Header))