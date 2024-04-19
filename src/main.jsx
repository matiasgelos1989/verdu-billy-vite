import React from 'react'
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Application } from './Application'
import './index.css'
import './App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Application />
  </BrowserRouter>,
)
