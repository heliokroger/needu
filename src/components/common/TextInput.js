import React, { Component } from 'react'
import injectSheet from 'react-jss'

class TextInput extends Component {
    render() {
        let error
        if (this.props.meta.error && this.props.meta.touched) error = <span style={{ color: '#e74c3c', fontSize: 15 }}>{this.props.meta.error}</span>
        return (
            <div style={{ ...this.props.style, width: '100%' }}>
                <input
                    {...this.props.input}
                    type={this.props.type}
                    placeholder={this.props.placeholder}
                    className={this.props.classes.input} 
                    autoFocus={this.props.autoFocus}
                />
                {error}
            </div>
        )
    }
}

export default injectSheet({
    input: {
        fontSize: 16,
        backgroundColor: '#f1f1f1',
        padding: 15,
        borderRadius: 5,
        border: 'none',
        width: '100%',
        marginBottom: 5
    }
})(TextInput)