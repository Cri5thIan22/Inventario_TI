import React from "react";
import { useState } from "react";
import AuthService from "../Services/AuthService";

const LoginUsuario = () => {
    // 1. CORRECCIÓN: 'const' en lugar de 'comst'   
    const [usuariolog, setLogUsuario] = useState({
        email: '',
        contraseña: ''
    });

    const [cargando, setCargando] = useState(false);
    const [mensaje, setMensaje] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setLogUsuario(prevData => ({
            ...prevData,
            [name]: value 
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCargando(true);
        setMensaje('');

        try {
            await AuthService.postLoginUsuario(usuariolog); 
            setMensaje('Inicio Sesion Exitoso');
            setLogUsuario({ email: '', contraseña: '' })
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Verifica tus credenciales o conexión.';
            setMensaje(`❌ Error al iniciar sesion: ${errorMsg}`);
        } finally {
            setCargando(false);
        }
    }

    return (
        <div className="login-usuario">
            <h2>Iniciar Sesion</h2>
            {mensaje &&
                (<p style={{ color: mensaje.startsWith('❌') ? 'red' : 'green', border: '1px solid', padding: '10px' }}>
                    {mensaje}</p>)}
            <form onSubmit={handleSubmit}>

                <input 
                    type="email" 
                    name="email" 
                    placeholder="Correo Electrónico" 
                    value={usuariolog.email} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="password" 
                    name="contraseña" 
                    placeholder="Contraseña" 
                    value={usuariolog.contraseña} 
                    onChange={handleChange} 
                    required 
                />

                <button type="submit" disabled={cargando}>
                    {cargando ? 'Iniciando...' : 'Iniciar Sesion'}
                </button>
            </form>
        </div>
    )
}

export default LoginUsuario;