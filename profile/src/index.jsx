import React from 'react'
import {render} from 'react-dom'
import {Provider} from "react-redux";
import {store} from "@store";
import {BrowserRouter as Router} from "react-router-dom";
import App from './components/App.jsx';
import {locale} from "moment";
import "antd/dist/antd.less";
import './styles/style.scss'

locale('ru')

render(
   <Router>
      <Provider store={store}>
         <App/>
      </Provider>
   </Router>,
   document.getElementById('root')
)

