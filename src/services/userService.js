import store from '../store'
import socketService from '../services/socketService'
import userActions from '../actions/userActions'

export default class {
    static get() {
        return JSON.parse(window.localStorage.getItem('user'))
    }
    static set(user) {
        store.dispatch(userActions.set(user))
        window.localStorage.setItem('user', JSON.stringify(user))
        console.log('calling')
        socketService.connect(`user=${user._id}`)
    }
    static logout() {
        store.dispatch(userActions.set(null))
        window.localStorage.removeItem('user')
    }
}