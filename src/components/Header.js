import React, { Component } from 'react'
import injectSheet from 'react-jss'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from './common/Button'

class Header extends Component {
    render() {
        let headerLeft
        if (this.props.history.location.pathname.split('/')[1] === 'app') {
            headerLeft = (
                <Link to="/app/profile" className={this.props.classes.profileButton}>
                    <img
                        src={this.props.user.avatar}
                        style={{ borderRadius: 20, width: 40, height: 40 }}
                        alt={this.props.user.name}
                    />
                    <p className={this.props.classes.profileButtonText}>{this.props.user.name}</p>
                </Link>
            )
        } else {
            this.props.user
                ? headerLeft = <Button title="Voltar ao NeedU" theme="buttonGreen" to="/app" style={{ marginRight: 15 }} />
                : headerLeft = <Button title="Entrar" theme="buttonGreen" to="/login" style={{ marginRight: 15 }} />
        }
        return (
            <div className={this.props.classes.header}>
                <div style={{ display: 'flex', flexDirection: 'row', width: 200 }}>
                    <button className={this.props.classes.button}>
                        <i className="material-icons" style={{ color: '#5f6469', cursor: 'pointer' }}>menu</i>
                    </button>
                </div>
                <Link to="/">
                    <img
                        src={require('../static/images/logo.png')}
                        style={{ width: 126, height: 70 }}
                        alt="NeedU"
                    />
                </Link>
                <div style={{ width: 200, height: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    {headerLeft}
                </div>
            </div>
        )
    }
}

export default withRouter(connect(store => ({ user: store.user, app: store.app }))(injectSheet({
    header: {
        minHeight: 75,
        height: 75,
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottom: '1px solid #e5e5e5',
        justifyContent: 'space-between'
    },
    button: {
        border: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        width: 50,
        height: 50,
        borderRadius: '50%',
        transition: 'all 0.3s',
        marginLeft: 15,
        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.05)' }
    },
    profileButton: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        paddingLeft: 15,
        paddingRight: 15,
        border: 'none',
        transition: 'all 0.3s',
        width: 175,
        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.05)' }
    },
    profileButtonText: {
        marginLeft: 10,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        fontWeight: 'bold'
    }
})(Header)))