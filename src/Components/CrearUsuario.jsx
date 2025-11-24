import React, { useState } from "react";
import AuthService from "../Services/AuthService";

const CrearUsuarioForm = () => {
    
    // 1. ESTADO: Debe coincidir con el UsuarioRequest del backend
    const [usuario, setDatosUsuario] = useState({
        nombres: '',
        apellidos: '',
        email: '',
        contraseña: '',
        area: '',
    });

    const[cargando, setCargando] = useState(false);
    const[mensaje, setMensaje] = useState('');
    
    // 2. FUNCIÓN DE CAMBIO: Sincroniza la entrada del input con el estado
    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setDatosUsuario(prevData => ({
            ...prevData,
            [name]: value // [name]: valor asegura que la clave correcta se actualice
        }));
    };
    
    // 3. FUNCIÓN DE ENVÍO: Lógica para llamar al POST
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita la recarga de la página
        setCargando(true);
        setMensaje('');

        try {
            // Llama al servicio, pasando el objeto 'usuario' (que ahora está completo)
            await AuthService.postCrearUsuario(usuario); 

            // Éxito:
            setMensaje("✅ Usuario registrado con éxito!");
            
            // Limpiar formulario
            setDatosUsuario({ nombres: '', apellidos: '', email: '', contraseña: '', area: '' }); 

        } catch (error) {
            // Error:
            const errorMsg = error.response?.data?.message || 'Error de conexión con el servidor.';
            setMensaje(`❌ Error al registrar: ${errorMsg}`);
            console.error("Detalles del error:", error);

        } finally {
            setCargando(false);
        }
    };


    return (
        <div className="registro-usuario">
            <h2>Registrate</h2>
            
            {mensaje && (
                <p style={{ color: mensaje.startsWith('❌') ? 'red' : 'green', border: '1px solid', padding: '10px' }}>
                    {mensaje}
                </p>
            )}

            {/* Enlazar la función handleSubmit al evento onSubmit */}
            <form onSubmit={handleSubmit}>
                
                {/* NOTA: Cada input usa name, value y onChange */}
                
                <input type="text" name="nombres" placeholder="Nombres" value={usuario.nombres} onChange={handleChange} required/>
                <input type="text" name="apellidos" placeholder="Apellidos" value={usuario.apellidos} onChange={handleChange} required/>
                <input type="email" name="email" placeholder="Correo Electrónico" value={usuario.email} onChange={handleChange} required/>
                <input type="password" name="contraseña" placeholder="Contraseña" value={usuario.contraseña} onChange={handleChange} required/>
                <input type="text" name="area" placeholder="Área de Asignación" value={usuario.area} onChange={handleChange} required/>

                <button type="submit" disabled={cargando}>
                    {cargando ? 'Registrando...' : 'Registrar Usuario'}
                </button>
            </form>
        </div>
    );
};

export default CrearUsuarioForm;