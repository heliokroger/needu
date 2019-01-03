import ReactDOM from 'react-dom'
import React from 'react'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'

registerServiceWorker()

ReactDOM.render(<App />, document.getElementById('root'))