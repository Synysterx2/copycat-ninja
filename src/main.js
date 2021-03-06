import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import createStore from './store/createStore'
import './styles/main.scss'


// Store Initialization
// ------------------------------------
const store = createStore(window.__INITIAL_STATE__) // eslint-disable-line

// Render Setup
// ------------------------------------
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  const routes = require('./routes/index').default(store) // eslint-disable-line

  ReactDOM.render(
    <App store={store} routes={routes} />,
    MOUNT_NODE,
  )
}

// Development Tools
// ------------------------------------
if (__DEV__) {
  if (module.hot) {
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default // eslint-disable-line

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    render = () => {
      try {
        renderApp()
      } catch (e) {
        console.error(e)
        renderError(e)
      }
    }

    // Setup hot module replacement
    module.hot.accept([
      './components/App',
      './routes/index',
    ], () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      }),
    )
  }
}

// Let's Go!
// ------------------------------------
if (!__TEST__) render()
