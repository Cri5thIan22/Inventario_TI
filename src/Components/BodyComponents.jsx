import React, { useEffect, useState } from "react";
import Bus from '../images/bus.png';
import CrearUsuarioForm from '../Components//CrearUsuario';

export const BodySend = () => {

    const textBtn = [
        { "id": 1, "nombre": "Mision", "descripcion": "Brindar un servicio de transporte de calidad, con el fin de que el usuario se sienta comodo con el servicio." },
        { "id": 2, "nombre": "Vision", "descripcion": "Ser en una de las empresas de transporte lideres del mercado, buscando siempre lo mejor para nuestros usuarios." },
        { "id": 3, "nombre": "Objetivos", "descripcion": "Optimizar los modelos de transporte a nivel interno mejorando la calidad del servicio, garatizando el acceso a nuestros usuarios, ofreciendo alternativas de pago" }
    ];

    const [isTextVisible, setIsTextVisible] = useState('Mision');

    const handleButtonClick = (nombreSeleccionado) => {
        setIsTextVisible(nombreSeleccionado);
    };

    const selectedItem = textBtn.find(item => item.nombre === isTextVisible);

    useEffect(() => {
        console.log(`El contenido activo es ahora: ${isTextVisible}`);
    }, [isTextVisible]);


    const [isTitleVisible, setIsTitleVisible] = useState(true);
    const duracionCiclo = 2000;

    useEffect(() => {
        const timer = setInterval(() => {
            setIsTitleVisible(prev => !prev);
        }, duracionCiclo);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const titleStyle = {
        opacity: isTitleVisible ? 1 : 0,
        transition: 'opacity 0.8s ease-in-out',
    };

    return (
        <section className="content-page">
            <div className="container bienvenido">
                <div className="bienvenido-img"></div>
                <div className="bienvenido-text">
                    <span>Bienvenido a <h1 style={titleStyle}>ETUL<span>4</span>SA</h1></span>
                    <p>Somos una empresa de rubro de transporte
                        con mas de 10 de años de trayectoria siempre
                        buscando lo mejor para nuestros usuarios asegurando
                        la llegada a su destino</p>
                </div>
            </div>

            <div className="container nosotros">
                <div className="content-nosotros">
                    <div className="nosotros-img">
                        <img src={Bus} alt="" />
                    </div>
                    <div className="nosotros-text">
                        <div className="btns">
                            {textBtn.map(item => (
                                <button
                                    key={item.id}
                                    className={item.nombre === isTextVisible ? 'click' : ''}
                                    onClick={() => handleButtonClick(item.nombre)}
                                >
                                    {item.nombre}
                                </button>
                            ))}
                        </div>
                        <div className="text-btn">
                            <h2>{selectedItem?.nombre}</h2>
                            <p>{selectedItem?.descripcion}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="formulario-registro">
                <h2>Crea tu cuenta</h2>
                <CrearUsuarioForm />
            </div>
        </section>
    );
}

export default BodySend
