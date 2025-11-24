import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UsuarioService from '../Services/UsuarioService';
import '../styles/listaUsuarios.css'

export const ListaUsuario = () => {
    const [usuarios, SetUsuarios] = useState([]);

    useEffect(() => {
        UsuarioService.getAllService().then(response => {
            SetUsuarios(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }, [])

    return (
        <div className='container container-usuarios'>
            <h1 className='titulo'>Lista de Usuarios</h1>

            <div className="lista lista-usuarios">
                {
                    usuarios.map(
                        usuario => {
                            return (
                                <div key={usuario.id} className="usuario">
                                    <div className='imagen-usuario'>
                                        <img src="" alt="" />
                                    </div>
                                    <div className="informacion-usuario">
                                        <span>Usuario: {usuario.nombres}</span>
                                        <span>Apellidos: {usuario.apellidos}</span>
                                        <span>Email: {usuario.email}</span>
                                        <span>Contraseña: {usuario.contraseña}</span>
                                        <span>Area: {usuario.area.areaNombre}</span>
                                    </div>
                                    <div className="usuario-accion">
                                        <Link to={`/usuario/${usuario.id}/activos`}>Activos</Link>
                                        <Link>Informes</Link>
                                    </div>
                                </div>
                            )
                        }
                    )
                }
            </div>

        </div>
    )
}

export default ListaUsuario;