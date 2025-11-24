import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ActivoService from "../Services/ActivoService";
import '../styles/usuariosAsignados.css'

const UsuariosByActivoId = () => {

    const { activoId } = useParams();
    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(!activoId){
            setCargando(false);
            return;
        }

        ActivoService.getUsuariosByActivoId(activoId).
                      then(response => {setUsuarios(response.data);
                      }).catch(err => {
                        console.log("Error al cargar los usuarios del activo con ID:", err);
                        setError(`No se pudieron cargar los usuarios del activo : ${activoId}`)
                      })
                      .finally(() => {
                         setCargando(false);
                      })

    }, [activoId]);
    
    if(cargando){
        return <div>Cargando los usuarios relacionados con este activo</div>
    }

    return (
        <div className="usuarios-activo">
            <h2>Usuarios asignados</h2>
            {
                usuarios.length === 0 ? (
                    <p>Este activo no tiene usuarios asignadors</p>
                ) : (
                    <ul>
                        {
                            usuarios.map(usuario => {
                                return (
                                    <div className="usuarios">
                                        <div key={usuario.id} className="datos-usuario">
                                            <p>Id: {usuario.id}</p>
                                            <p>Nombres: {usuario.nombres}</p>
                                            <p>Apellidos: {usuario.apellidos}</p>
                                            <p>Area: {usuario.area.areaNombre}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </ul>
                )
            }
        </div>
    )
}

export default UsuariosByActivoId;