import React, { Component } from 'react'
import Rodal from 'rodal'

const customStyles = {
    boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
    borderRadius: 4,
    padding: 50,
    display: 'inline-table',
    flexDirection: 'column'
}

export default class extends Component {
    render() {
        return (
            <Rodal
                visible={this.props.visible}
                showCloseButton={false}
                width={500}
                customStyles={customStyles}
                onClose={this.props.onClose}
            >
                <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
                    <h2 style={{ fontSize: 30 }}>{this.props.title}</h2>
                    <div style={{ marginTop: 20 }}>
                        {this.props.children}
                    </div>
                </div>
            </Rodal>
        )
    }
}