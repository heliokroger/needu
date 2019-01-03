import React, { Component } from 'react'
import injectSheet from 'react-jss'

class TextArea extends Component {
    render() {
        let error
        if (this.props.meta.error && this.props.meta.touched) error = <span style={{ color: '#e74c3c', fontSize: 15 }}>{this.props.meta.error}</span>
        return (
            <div style={{ ...this.props.style, width: '100%' }}>
                <textarea
                    {...this.props.input}
                    placeholder={this.props.placeholder}
                    className={this.props.classes.textarea}
                    autoFocus={this.props.autoFocus}
                    rows={this.props.rows}
                ></textarea>
                {error}
            </div>
        )
    }
}

export default injectSheet({
    textarea: {
        fontSize: 16,
        backgroundColor: '#f1f1f1',
        padding: 15,
        borderRadius: 5,
        border: 'none',
        width: '100%',
        marginBottom: 5,
        resize: 'none',
        outline: 'none'
    }
})(TextArea)