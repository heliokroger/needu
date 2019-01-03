import socket from 'socket.io-client'
import { API_URL } from '../config'

export default class {
    static connect(query) {
        this.socket = socket(API_URL, { query: query })
    }
}