import React from 'react'
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute'
import { Routes, Route } from "react-router-dom";
import { Header }  from './components/Header'
import { HomePage } from './pages/HomePage'
import { Footer } from './components/Footer';
import { Cart } from './pages/Cart'
import {PanelPage} from './pages/PanelPage'
import {Login} from './pages/Login'
import { Pedidos } from './pages/Pedidos';
import { RegisterUser } from './pages/RegisterUser';



export const Application = () => {
  
  return (<div>
              <CartProvider>
                <AuthProvider>
                   <Header></Header>
                   <Routes>
                    {console.log('https://nodetiendaverdu-production.up.railway.app')}
                        <Route path="/" element={<HomePage />} />
                        <Route path="/registrar34520082" element={<RegisterUser />} />
                        <Route path="/login" element={<Login />} />
                        <Route element={<PrivateRoute />}>
                            <Route path="/panel" element={<PanelPage />}/>
                            <Route path="/pedidos" element={<Pedidos />}/>
                         </Route>
                        <Route path="/Cart" element={<Cart />} />
                    </Routes>
                   <Footer></Footer>
               </AuthProvider>  
             </CartProvider>
        </div>
  )
}
