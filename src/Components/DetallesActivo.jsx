import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ActivoService from "../Services/ActivoService";
import { Link } from "react-router-dom";
import '../styles/detallesActivo.css'

const obtenerDetalleEspecifico = (detalles) => {
    if (!detalles || !detalles.especificacionDetalle) return null;

    const tipo = detalles.tipoActivo ? detalles.tipoActivo.toUpperCase() : null;
    const especificaciones = detalles.especificacionDetalle;

    switch (tipo) {
        case "CPU": return especificaciones.detalleCpu;
        case "LAPTOP": return especificaciones.detalleLaptop;
        case "IMPRESORA": return especificaciones.detalleImpresora;
        case "TECLADO": return especificaciones.detalleTeclado;
        case "PANTALLA": return especificaciones.detallePantalla;
        case "MOUSE": return especificaciones.detalleMouse;
        default: return null;
    }
};

// CORRECCIÓN 1: Nombre con Mayúscula inicial
const VistaEspecificaciones = ({ tipo, datos }) => {
    
    // Validación extra por seguridad
    if (!datos) return null; 

    switch (tipo) {
        case "CPU":
            return (
                <div className="detalle detalle-cpu">
                    <p>Estado: {datos.estadoActivo}</p>
                    <p>Sistema: {datos.sistema}</p>
                    <p>Procesador: {datos.procesador}</p>
                    <p>Almacenamiento: {datos.almacenamiento}</p>
                    <p>RAM: {datos.ram}</p>
                    <p>Edad del Equipo: {datos.edadEquipo}  </p>
                </div>
            );
        case "PANTALLA":
            return (
                <div className="detalle detalle-pantalla">
                    <p>Estado: {datos.estadoActivo}</p>
                    <p>Pulgadas: {datos.pulgadas}</p>
                    <p>Resolución: {datos.resolucion}</p>
                </div>
            );
        case "LAPTOP":
            return (
                <div className="detalle detalle-latop">
                    <p>Estado: {datos.estadoActivo}</p>
                    <p>Sistema: {datos.sistema}</p>
                    <p>Procesador: {datos.procesador}</p>
                    <p>Disco: {datos.almacenamiento}</p>
                    <p>RAM: {datos.ram}</p>
                    <p>Serie: {datos.serie}</p>
                    <p>Edad del Equipo: </p>
                </div>
            );
        case "IMPRESORA":
            return (
                <div className="detalle detalle-impresora">
                    <p>Estado: {datos.estadoActivo}</p>
                    <p>Conexión: {datos.conexion}</p>
                </div>
            );
        case "TECLADO":
            return (
                <div className="detalle detalle-teclado">
                    <p>Conexión: {datos.conexion}</p>
                </div>
            );
        case "MOUSE":
            return (
                <div className="detalle detalle-mouse">
                    <p>Conexión: {datos.conexion}</p>
                </div>
            );
        default:
            return null;
    }
};

export const DetallesActivo = () => {

    const { activoId } = useParams();
    const [detalles, setDetalles] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!activoId) {
            setCargando(false);
            return;
        }

        setCargando(true);
        setError(null);

        ActivoService.getDetallesByActivoId(activoId)
            .then(response => {
                setDetalles(response.data);
            }).catch(err => {
                console.error("Error al cargar detalles del activo:", err);
                setError(`No se pudieron cargar los detalles del activo ID: ${activoId}`);
            })
            .finally(() => {
                setCargando(false);
            });

    }, [activoId]);

    // CORRECCIÓN 2: Estas validaciones deben ir ANTES de intentar leer variables de 'detalles'
    if (cargando) {
        return <div>Cargando detalles del activo...</div>;
    }

    if (error) {
        return <div style={{ color: 'red' }}>Error: {error}</div>;
    }

    if (!detalles) {
        return <div>Activo no encontrado o ID inválido.</div>;
    }

    // CORRECCIÓN 3: Ahora que sabemos que 'detalles' existe, podemos leer sus datos
    const detalleEspecifico = obtenerDetalleEspecifico(detalles);
    // CORRECCIÓN 4: Agregar paréntesis () a toUpperCase
    const tipoActivo = detalles.tipoActivo ? detalles.tipoActivo.toUpperCase() : "";

    return (
        <div className="container-detalles">
            <div className="activo-detalle">
                <h1>Datos</h1>
                <div className="activo-datos">
                    <p>Tipo: <span>{detalles.tipoActivo}</span></p>
                    <p>Marca: <span>{detalles.marca}</span></p>
                    <p>Modelo: <span>{detalles.modelo}</span></p>
                </div>
            </div>
            
            <div className="especificaciones">
                <h1>Especificaciones</h1>
                    <VistaEspecificaciones 
                        tipo={tipoActivo} 
                        datos={detalleEspecifico} 
                    />
                <Link to={`/activo/${activoId}/usuarios`}>Asignacion</Link>
            </div>
        </div>
    );
};

export default DetallesActivo;