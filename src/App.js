import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { useStateContext } from './contexts/ContextProvider';
import {Conferencistas} from './pages/Conferencistas';
import Auditorias from './pages/Auditorias';
import Reservas from './pages/Reservas';
import Dashboard from './pages/Dashboard';
import { LadinPage } from './pages/LadinPage';
import Auth from './pages/Auth';


const App = () => {
  

  return (
    <>
        <BrowserRouter>


          <Routes>
            <Route index element={<LadinPage />} />      

            <Route path='auth/*' element={<Auth />}>
              <Route path="clientes" element={<Conferencistas />} />
              <Route path="tecnicos" element={<Auditorias />} />
              <Route path="tickets" element={<Reservas />} />

            </Route>
          </Routes>



        </BrowserRouter>      
    </>
  );
};

export default App;
