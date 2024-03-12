import React from 'react'
import ReactDOM from 'react-dom/client'
import i18n from './utils/i18n'
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import reportWebVitals from './reportWebVitals'
import 'react-perfect-scrollbar/dist/css/styles.css'
import '/node_modules/flag-icons/css/flag-icons.min.css'
import 'nprogress/nprogress.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Layout from './Layout'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {/* <React.StrictMode> */}
      <BrowserRouter>
        <Layout />
        {/* <App /> */}
      </BrowserRouter>
      {/* </React.StrictMode> */}
    </PersistGate>
  </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
