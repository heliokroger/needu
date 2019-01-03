import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import injectSheet from 'react-jss'

class Button extends Component {
    render() {
        if (this.props.to) {
            if (this.props.target === '_blank') {
                return (
                    <a
                        className={`${this.props.classes.button} ${this.props.classes[this.props.theme ? this.props.theme : 'buttonTransparent']}`}
                        style={this.props.style}
                        href={this.props.to}
                        target="_blank"
                    >
                        {this.props.title}
                    </a>
                )
            } else {
                return (
                    <Link
                        className={`${this.props.classes.button} ${this.props.classes[this.props.theme ? this.props.theme : 'buttonTransparent']}`}
                        style={this.props.style}
                        to={this.props.to}
                    >
                        {this.props.title}
                    </Link>
                )
            }
        } else {
            return (
                <button
                    type={this.props.type}
                    className={`${this.props.classes.button} ${this.props.classes[this.props.theme ? this.props.theme : 'buttonTransparent']}`}
                    style={this.props.style}
                    onClick={this.props.onClick}
                    disabled={this.props.disabled}
                >
                    {this.props.title}
                </button>
            )
        }
    }
}

export default injectSheet({
    button: {
        fontSize: 17,
        height: 50,
        fontWeight: 'bold',
        padding: '12px 40px',
        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
        textTransform: 'uppercase',
        textDecoration: 'none',
        transition: 'all 0.3s',
        border: 'none',
        color: '#fff',
        borderRadius: 24,
        whiteSpace: 'nowrap',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&:active': { boxShadow: '0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.2)' },
        '&:disabled': { cursor: 'not-allowed', opacity: 0.5 }
    },
    buttonGrey: {
        backgroundColor: '#5b6e7f',
        '&:hover': { backgroundColor: '#7990a5' },
        '&:disabled': { backgroundColor: '#5b6e7f' }
    },
    buttonFacebook: {
        backgroundColor: '#4267b2',
        '&:hover': { backgroundColor: '#4c76ca' }
    },
    buttonTransparent: {
        border: 'solid 2px #fff',
        backgroundColor: 'transparent',
        '&:hover': { backgroundColor: '#fff', color: '#000' }
    },
    buttonGreen: {
        backgroundColor: '#61bcaa',
        '&:hover': { backgroundColor: '#6bd8c2' },
        '&:disabled': { backgroundColor: '#61bcaa' }
    }
})(Button)