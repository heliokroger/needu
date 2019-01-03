import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import injectSheet from 'react-jss'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Button from '../common/Button'
import ImageModal from '../common/ImageModal'
import { API_URL } from '../../config'
import socketService from '../../services/socketService'

class Conversation extends Component {
    constructor() {
        super()
        this.state = {
            content: '',
            conversation: {
                messages: [],
                author: {},
                recipient: {}
            }
        }
    }
    componentDidMount() {
        this.getConversation(this.props.match.params.recipient)   
    }
    componentWillReceiveProps(props) {
        if (this.props.match.params.recipient !== props.match.params.recipient) {
            socketService.socket.removeAllListeners()
            this.getConversation(props.match.params.recipient)
        }
    }
    componentWillUnmount() {
        socketService.socket.removeAllListeners()
    }
    getConversation = async recipient => {
        const response = await axios.get(`${API_URL}/conversations/${this.props.user._id}/${recipient}`)
        this.setState({ conversation: response.data })
        const scroll = ReactDOM.findDOMNode(this.refs.scroll)
        scroll.scrollTop = scroll.scrollHeight
        socketService.socket.on('message', message => {
            const conversation = this.state.conversation
            conversation.messages.push(message)
            this.setState({ conversation: conversation })
            this.props.updateConversationLastMessage(message)
            const scroll = ReactDOM.findDOMNode(this.refs.scroll)
            scroll.scrollTop = scroll.scrollHeight
        })
    }
    sendMessage(e) {
        e.preventDefault()
        socketService.socket.emit('message', {
            content: this.state.content,
            author: this.props.user._id,
            recipient: this.props.match.params.recipient
        })
        this.setState({ content: '' })
        ReactDOM.findDOMNode(this.refs.content).value = ''
    }
    render() {
        const conversation = this.state.conversation
        const recipient = this.props.user._id === conversation.recipient._id ? conversation.author : conversation.recipient
        return (
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <ImageModal
                    photo={recipient.avatar}
                    onClose={() => this.setState({ showPhotoModal: false })}
                    visible={this.state.showPhotoModal}
                />
                <div className={this.props.classes.subheader}>
                    <img
                        src={recipient.avatar}
                        style={{ width: 50, height: 50, borderRadius: 25, cursor: 'pointer' }}
                        alt={recipient.name}
                        onClick={() => this.setState({ showPhotoModal: true })}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontWeight: 'bold' }}>{recipient.name}</span>
                    </div>
                    <div style={{ width: 50, height: 50 }} />
                </div>    
                <div style={{ flex: 1, height: '100%', display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                    <div ref="scroll" style={{ overflow: 'auto', height: '100%', padding: 15, display: 'flex', flexDirection: 'column' }}>
                        {conversation.messages.map(message => {
                            const sentByMe = message.sentBy === this.props.user._id
                            return (
                                <div key={message.id} className={`${this.props.classes.balloon} ${sentByMe ? this.props.classes.greenBalloon : this.props.classes.greyBalloon}`}>
                                    <span style={{ color: sentByMe ? '#fff' : '#5f6469', fontSize: 16 }}>{message.content}</span>
                                </div>
                            )
                        })}
                    </div>
                    <form onSubmit={e => this.sendMessage(e)} className={this.props.classes.form}>
                        <input
                            ref="content"
                            type="text"
                            placeholder="Escreva algo..."
                            className={this.props.classes.textField}
                            onChange={e => this.setState({ content: e.target.value })}
                            autoComplete="off"
                        />
                         <Button title="Enviar" theme="buttonGreen" disabled={!this.state.content} />
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(connect(store => ({ user: store.user }))(injectSheet({
    subheader: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        borderBottom: '1px solid #e5e5e5',
        padding: 15,
        alignItems: 'center',
        height: 75
    },
    form: {
        borderTop: '1px solid #e5e5e5',
        display: 'flex',
        padding: 15,
        alignItems: 'center',
        minHeight: 75
    },
    textField: {
        fontSize: 16,
        width: '100%',
        outline: 'none',
        border: 'none',
        paddingRight: 15
    },
    balloon: {
        padding: 15,
        marginBottom: 5,
        borderRadius: 20
    },
    greenBalloon: { backgroundColor: '#61bcaa', alignSelf: 'flex-end', borderBottomRightRadius: 5 },
    greyBalloon: { backgroundColor: 'rgba(0, 0, 0, 0.1)', alignSelf: 'flex-start', borderBottomLeftRadius: 5 }
})(Conversation)))