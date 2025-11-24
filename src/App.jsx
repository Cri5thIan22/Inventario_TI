import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ListaActivo from './Components/ListaActivoComponents.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ListaUsuario from './Components/ListaUsuarioComponents.jsx'
import HeaderSend from './Components/HeaderComponents.jsx'
import { BodySend } from './Components/BodyComponents.jsx'
import ActivosAsignados from './Components/ActivosAsignadosUsuario.jsx'
import DetallesActivo from './Components/DetallesActivo.jsx'
import UsuariosByActivoId from './Components/UsuariosByActivoId.jsx'

function App() {

  return (
      <div>
        <BrowserRouter>
          <div className='container'>
            <HeaderSend />
            <Routes>
              <Route exact path='/' element={<BodySend />}></Route>              
              <Route exact path='/activos' element={<ListaActivo />}></Route>
              <Route exact path='/usuarios' element={<ListaUsuario />}></Route>
              <Route path='/usuario/:usuarioId/activos' element={<ActivosAsignados />}></Route>
              <Route path='/activo/:activoId/detalles' element={<DetallesActivo />}></Route>
              <Route path='/activo/:activoId/usuarios' element={<UsuariosByActivoId />}></Route>
              
            </Routes>
          </div>
        </BrowserRouter>
      </div>
  )
}

export default App
