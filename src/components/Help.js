import React, { Component, Fragment } from 'react'
import DocumentTitle from 'react-document-title'
import injectSheet from 'react-jss'
import axios from 'axios'
import Modal from './common/Modal'
import { API_URL } from '../config'

let pristineFaq = []

class Help extends Component {
    constructor() {
        super()
        this.state = { modal: {}, faq: [] }
    }
    componentDidMount = async () => {
        const response = await axios.get(`${API_URL}/faq`)
        pristineFaq = response.data
        this.setState({ faq: response.data })
    }
    search = async word => {
        if (!word) {
            this.setState({ faq: pristineFaq })
        } else {
            const response = await axios.get(`${API_URL}/faq/${word}`)
            this.setState({ faq: response.data })
        }
    }
    render() {
        return (
            <DocumentTitle title="NeedU - Ajuda">
                <Fragment>
                    <Modal
                        title={this.state.modal.title}
                        visible={this.state.modal.visible}
                        onClose={() => this.setState({ modal: { ...this.state.modal, visible: false } })}
                    >
                        <p>{this.state.modal.content}</p>
                    </Modal>
                    <div className={this.props.classes.hero}>
                        <h1 style={{ color: '#fff', textAlign: 'center', marginBottom: 15 }}>Como podemos ajudar?</h1>
                        <div style={{ display: 'flex', alignItems: 'center', minWidth: 600 }}>
                            <div className={this.props.classes.searchField}>
                                <i className="material-icons" style={{ color: '#757575' }}>search</i>
                                <input type="text" className={this.props.classes.searchFieldInput} placeholder="Buscar..." onChange={e => this.search(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div style={{ padding: 50, display: 'flex' }}>
                        {this.state.faq.map(item => (
                            <a
                                key={item.id}
                                onClick={() => this.setState({ modal: { ...item, visible: true } })}
                                className={this.props.classes.faqItem}
                            >
                                {item.title}
                            </a>
                        ))}
                    </div>
                </Fragment>
            </DocumentTitle>
        )
    }
}

export default injectSheet({
    hero: {
        height: 400,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#61bcaa',
        borderBottom: '1px solid #e5e5e5',
        padding: 15,
        flexDirection: 'column'
    },
    searchField: {
        backgroundColor: '#f1f1f1',
        padding: 15,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    },
    searchFieldInput: {
        fontSize: 18,
        paddingLeft: 15,
        border: 'none',
        outline: 'none',
        background: 'transparent',
        width: '100%'
    },
    faqItem: {
        color: 'rgba(0, 0, 0, 0.6)',
        '&:hover': { textDecoration: 'underline' }
    }
})(Help)