import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ActivoService from '../Services/ActivoService.jsx';
import '../styles/listaActivos.css'
import etul from '../images/bus.png' // Usaremos 'etul' como imagen por defecto
import cpu from '../images/cpu.png'
import laptop from '../images/laptop.png'
import impresora from '../images/impresora.png'
import mouse from '../images/mouse.png'
import teclado from '../images/teclado.png'
import pantalla from '../images/pantalla.png'


export const ListaActivo = () => {

    const imagesActivos = {
        "CPU"       : cpu,
        "LAPTOP"    : laptop,
        "PANTALLA"  : pantalla,
        "MOUSE"     : mouse,
        "TECLADO"   : teclado,
        "IMPRESORA" : impresora,
    }


    const [activos, setActivos] = useState([]);

    useEffect(() => {
        ActivoService.getAllService().then(response => {
            setActivos(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }, [])

    return (
        <div className='container container-activos'>
            <h1 className='titulo' >Lista de Activos</h1>

            <div className="lista lista-activos">
                {
                    activos.map(
                        activo => {
                            // 💡 PASO 1: Determinar la URL de la imagen.
                            // 1. Busca la clave 'activo.tipo' en el mapa 'imagesActivos'.
                            // 2. Si no la encuentra (||), usa 'etul' como imagen de respaldo.
                            const imageUrl = imagesActivos[activo.tipo] || etul;

                            return (
                                <div key={activo.id} className='activo'>
                                    <h1>Activo Nº {activo.id}</h1>
                                    <div className='activo-informacion'>
                                        <div className="activo-imagen">
                                            <img 
                                                src={imageUrl} 
                                                alt={`Imagen de ${activo.tipo}`} 
                                            />
                                        </div>
                                        <div className="activo-detalles">
                                            <span>Id: {activo.id}</span>
                                            <span>Tipo: {activo.tipo}</span>
                                            <span>Marca: {activo.marca}</span>
                                            <span>Modelo: {activo.modelo}</span>
                                        </div>
                                    </div>
                                    <div className="activo-accion">
                                        <Link to={`/activo/${activo.id}/detalles`}>Ver especificaciones</Link>
                                        <Link>Ver informes</Link>
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

export default ListaActivo;