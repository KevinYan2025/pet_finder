import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes ,Outlet} from "react-router-dom";
import SideNavBar from './Component/SideNavBar.jsx';
import AnimalInfo from './Component/AnimalInfo.jsx';
import AnimalDetail from './Component/AnimalDetail.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>,
)
