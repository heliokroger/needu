import React, { Component } from 'react'
import injectSheet from 'react-jss'

class Card extends Component {
    constructor() {
        super()
        this.state = { cardImageIndex: 0 }
    }
    componentWillReceiveProps(props) {
        if (Array.isArray(this.props.images) && !props.images[this.state.cardImageIndex]) this.setState({ cardImageIndex: 0 })
    }
    render() {
        let cardImage
        Array.isArray(this.props.images) && this.props.images.length > 1
            ? cardImage = (
                <div style={{ backgroundImage: `url(${this.props.images[this.state.cardImageIndex]})`, backgroundSize: 'cover' }} className={this.props.classes.cardImage}>
                    <button className={this.props.classes.cardImageControlButton} onClick={() => this.setState({ cardImageIndex: this.state.cardImageIndex - 1 })} disabled={this.state.cardImageIndex === 0}>
                        <i className="material-icons" style={{ color: '#fff', cursor: this.state.cardImageIndex === 0 ? 'default' : 'pointer' }}>chevron_left</i>
                    </button>
                    <button className={this.props.classes.cardImageControlButton} onClick={() => this.setState({ cardImageIndex: this.state.cardImageIndex + 1 })} disabled={this.state.cardImageIndex + 1 === this.props.images.length}>
                        <i className="material-icons" style={{ color: '#fff', cursor: this.state.cardImageIndex + 1 === this.props.images.length ? 'default' : 'pointer' }}>chevron_right</i>
                    </button>
                </div>
            )
            : cardImage = <div style={{ ...this.props.imageStyle, backgroundImage: `url(${this.props.images})`, backgroundSize: 'cover' }} className={this.props.classes.cardImage} />
        return (
            <div style={this.props.style} className={this.props.classes.card}>
                {cardImage}
                {this.props.children}
            </div>
        )
    }
}

export default injectSheet({
    card: {
        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
        transition: 'all 0.3s',
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        '&:hover': { boxShadow: '0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.2)' }
    },
    cardImage: {
        borderBottom: '1px solid #e5e5e5',
        minHeight: 250,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
    },
    cardImageControlButton: {
        border: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
        width: 50,
        height: 50,
        borderRadius: '50%',
        transition: 'all 0.3s',
        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.2)' },
        '&:disabled': { cursor: 'default', opacity: 0.5, backgroundColor: 'rgba(0, 0, 0, 0.1)' }
    }
})(Card)