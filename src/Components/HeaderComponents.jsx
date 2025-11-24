import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../styles/header.css';
import Etul4sa from '../images/bus.png'

const SCROLL_THRESHOLD = 50; 

export const HeaderSend = () => {
    const [isVisible, setIsVisible] = useState(true); 
    const [lastScrollY, setLastScrollY] = useState(0); 

    const handleScroll = () => {
        if (window.scrollY < 10) { 
            setIsVisible(true);
            setLastScrollY(window.scrollY);
            return;
        }

        if (window.scrollY > lastScrollY && window.scrollY > SCROLL_THRESHOLD) {
            setIsVisible(false);
        } 
        
        else if (window.scrollY < lastScrollY) {
            setIsVisible(true);
        }

        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);


    return (
        <header className={`header-inteligente ${isVisible ? 'visible' : 'hidden'}`}>
            <nav>
                <ul>
                    <li className="logo">
                        <img src={Etul4sa} alt="" />
                    </li>
                    <li>
                        <Link className="header-link" to="/">Bienvenido</Link>
                    </li>
                    <li>
                        <Link className="header-link" to="/usuarios">Usuarios</Link>
                    </li>
                    <li>
                        <Link className="header-link" to="/activos">Activos</Link>
                    </li>
                    <li>
                        <Link className="header-link" to="/detalles">Detalles</Link>
                    </li>
                    <li>
                        <Link className="header-link" to="/registrate">Regístrate</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default HeaderSend;