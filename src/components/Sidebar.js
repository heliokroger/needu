import React, { Component, Fragment } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import injectSheet from 'react-jss'

class Sidebar extends Component {
    render() {
        let items = []
        if (this.props.history.location.pathname.split('/')[1] === 'app') {
            items = [
                { path: '/app/missing', label: 'Desaparecidos' },
                { path: '/app/messaging', label: 'Mensagens' },
                { path: '/app/add-person', label: 'Novo incidente' }
            ]
        } else {
            items = [
                { path: '/', label: 'Início' },
                { path: '/facial-recognition', label: 'Reconhecimento facial' },
                { path: '/download', label: 'Baixar' },
                { path: '/terms', label: 'Termos de uso' },
                { path: '/help', label: 'Ajuda' }
            ]
        }
        items = items.map((item, i) => (
            <NavLink
                key={i}
                to={item.path}
                className={this.props.classes.link}
                activeClassName={this.props.classes.linkActive}
                exact={true}
            >
                {item.label}
            </NavLink>
        ))
        return (
            <Fragment>
                <div className={this.props.classes.sidebar}>
                    {items}
                </div>
            </Fragment>
        )
    }
}

export default withRouter(injectSheet({
    sidebar: {
        height: '100%',
        width: 250,
        borderRight: '1px solid #e5e5e5',
        overflow: 'auto',
        flex: '0 auto',
        backgroundColor: '#fff',
        '@media (max-width: 1280px)': { display: 'none' }
    },
    link: {
        height: 50,
        display: 'flex',
        alignItems: 'center',
        padding: '0 15px',
        borderBottom: '1px solid rgb(229, 229, 229)',
        textDecoration: 'none',
        color: '#5f6469',
        fontSize: 14,
        transition: 'all 0.3s',
        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.05)' }
    },
    linkActive: {
        backgroundColor: 'rgba(97, 188, 170, 0.1)',
        color: '#61bcaa',
        fontWeight: 'bold'
    },
    backdrop: {
        position: 'fixed',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: 0
    }
})(Sidebar))