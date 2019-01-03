import React, { Component } from 'react'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'
import injectSheet from 'react-jss'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import sort from 'fast-sort'
import { API_URL } from '../../config'
import Conversation from './Conversation'

class Messaging extends Component {
    constructor() {
        super()
        this.state = { conversations: [] }
    }
    componentDidMount = async () => {
        const response = await axios.get(`${API_URL}/users/${this.props.user._id}/conversations`)
        this.setState({ conversations: response.data, conversationsLoaded: true })
    }
    updateConversationLastMessage(message) {
        let conversations = this.state.conversations
        conversations = this.state.conversations.map(conversation => {
            if (conversation.id === message.conversation) conversation.lastMessage = message
            return conversation
        })
        conversations = sort(conversations).desc(conversation => conversation.lastMessage.sentAt)
        this.setState({ conversations: conversations })
    }
    render() {
        let content
        if (this.props.match.params.recipient) {
            content = <Conversation updateConversationLastMessage={message => this.updateConversationLastMessage(message)} />
        } else {
            content = (
                <div className={this.props.classes.noConversationContainer}>
                    <img src={require('../../static/images/puzzle-robot.png')} style={{ width: 600, height: 450 }} alt="Selecione uma conversa" />
                    <h2 style={{ textAlign: 'center' }}>Selecione uma conversa para ver o histórico de mensagens.</h2>
                </div>
            )
        }
        return (
            <DocumentTitle title="NeedU - Mensagens">
                <div style={{ height: '100%', display: 'flex', overflow: 'hidden' }}>
                    {content}
                    <div className={this.props.classes.conversations}>
                        {this.state.conversations.map(conversation => {
                            const recipient = this.props.user._id === conversation.recipient._id ? conversation.author : conversation.recipient
                            return (
                                <NavLink
                                    key={conversation.id}
                                    to={`/app/messaging/${recipient._id}`}
                                    className={this.props.classes.conversationItem}
                                    activeStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
                                >
                                    <img
                                        src={recipient.avatar}
                                        style={{ width: 50, height: 50, borderRadius: 25 }}
                                        alt={recipient.name}
                                    />
                                    <div style={{ marginLeft: 10 }}>
                                        <h3 style={{ fontWeight: 'bold' }}>{recipient.name}</h3>
                                        <p style={{ fontSize: 14 }}>{conversation.lastMessage.content}</p>
                                    </div>
                                </NavLink>
                            )
                        })}
                    </div>
                </div>
            </DocumentTitle>
        )
    }
}

export default connect(store => ({ user: store.user, }))(injectSheet({
    noConversationContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column'
    },
    conversations: {
        height: '100%',
        width: 250,
        borderLeft: '1px solid #e5e5e5',
        overflow: 'auto',
        backgroundColor: '#fff'
    },
    conversationItem: {
        padding: 15,
        display: 'flex',
        alignItems: 'center',
        transition: 'all 0.3s',
        borderBottom: '1px solid #e5e5e5',
        height: 75,
        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.05)' }
    }
})(Messaging))