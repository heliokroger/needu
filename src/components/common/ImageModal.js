import React, { Component } from 'react'
import Rodal from 'rodal'

const customStyles = {
    backgroundPosition: 'center',
    height: 500,
    width: 500,
    boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
    backgroundSize: 'cover',
    borderRadius: 4
}

export default class extends Component {
    render() {
        return <Rodal
            visible={this.props.visible}
            showCloseButton={false}
            customStyles={{ ...customStyles, backgroundImage: `url(${this.props.photo}` }}
            onClose={this.props.onClose}
        />
    }
}