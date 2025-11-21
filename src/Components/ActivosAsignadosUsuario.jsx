import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ActivoService from '../Services/ActivoService.jsx';
import '../styles/activosAsignados.css';
import cpu from '../images/cpu.png'
import laptop from '../images/laptop.png'
import impresora from '../images/impresora.png'
import mouse from '../images/mouse.png'
import teclado from '../images/teclado.png'
import pantalla from '../images/pantalla.png'

export const ActivosAsignados = () => {

    const imagesActivos = {
            "CPU"       : cpu,
            "LAPTOP"    : laptop,
            "PANTALLA"  : pantalla,
            "MOUSE"     : mouse,
            "TECLADO"   : teclado,
            "IMPRESORA" : impresora,
    }

    const {usuarioId} = useParams();

    const [activos, setActivos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!usuarioId) {
            setCargando(false);
            return;
        }
        setCargando(true);
        setError(null);        
        ActivoService.getActivosByUsuarioId(usuarioId)
            .then(response => {
                setActivos(response.data); 
            })
            .catch(err => {
                console.error("Error al cargar activos:", err);
                setError("No se pudieron cargar los activos para el usuario " + usuarioIds);
            })
            .finally(() => {
                setCargando(false);
            });

    }, [usuarioId]);

    if (cargando) {
        return <p>Cargando activos del usuario ID: {usuarioId}...</p>;
    }
    
    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }   

    return (
        <div className="detalle-activos-usuario">
            <h2>Activos Asignados</h2>
            {activos.length === 0 ? (
                <p>Este usuario no tiene activos asignados.</p>
            ) : (
                <ul>
                    {activos.map(activo => {
                        const urlImagen = imagesActivos[activo.tipo];
                        return (
                            <li key={activo.id} className="activo-item">
                                <div className="activo-info-imagen">
                                    <img 
                                        src={urlImagen} 
                                        alt={`Imagen de ${activo.tipo}`} 
                                    />
                                    <span>{activo.tipo} - {activo.marca} - {activo.modelo}</span>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}

export default ActivosAsignados;