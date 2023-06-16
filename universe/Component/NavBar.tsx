import Link from 'next/link';
import React, { useEffect, useState, useRef } from 'react';
import * as RxIcon from 'react-icons/rx';
import * as TiIcon from 'react-icons/ti';
import * as FaIcon from 'react-icons/fa';
import style from "/styles/NavBarsStyles.module.css";
import Image from 'next/image';
import { Stint_Ultra_Expanded } from 'next/font/google';
import { useRouter } from 'next/router';
import Recuadro from "universe/Component/Recuadro";
import Cookies from 'js-cookie';





function Navbar() {
    const router = useRouter();
    const [menuDesplegable, setMenuDesplegable] = useState(false)
    const stateMenuDesplegable = () => setMenuDesplegable(!menuDesplegable)
    const [name, setName] = useState<string | null>(null);
    useEffect(() => {
        setName(localStorage.getItem("name"));
    }, []);
    const [showRecuadro, setShowRecuadro] = useState(false); 
    const logoutTimer = useRef<NodeJS.Timeout | null>(null);
    {/*con este useState se controla para que aparezca las opciones de perfil y de cerrar sesion*/ }

    const handleLogoutClick = async () => {
        try {
            // Obtener el token del almacenamiento local
            const token = localStorage.getItem('token');

            // Realizar la petición al backend para cerrar la sesión
            const res = await fetch('http://127.0.0.1:3333/api/logout', {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (res.ok) {
                const data = await res.json();
                setShowRecuadro(false);


                // Borrar el token del almacenamiento local
                localStorage.removeItem('token');
                localStorage.removeItem('user_ID');
                localStorage.removeItem('name');
                Cookies.remove('token');

                // Redirigir al usuario a la página de inicio 
                router.push('/');
            }
            if (!res.ok) {
                throw new Error('No se pudo cerrar la sesión');
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleAutomaticLogout = async () => {
        try {
            // Obtener el token del almacenamiento local
            const token = localStorage.getItem('token');

            // Realizar la petición al backend para cerrar la sesión
            const res = await fetch('http://127.0.0.1:3333/api/logout', {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (res.ok) {
                const data = await res.json();
                setShowRecuadro(true);


                // Borrar el token del almacenamiento local
                localStorage.removeItem('token');
                localStorage.removeItem('user_ID');
                localStorage.removeItem('name');
                Cookies.remove('token');

            }
            if (!res.ok) {
                throw new Error('No se pudo cerrar la sesión');
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };


    // Contar el tiempo desde que se activo el token
    const resetLogoutTimer = () => {
        if (logoutTimer.current) {
            clearTimeout(logoutTimer.current);
        }

        logoutTimer.current = setTimeout(() => {
            handleAutomaticLogout();
            setShowRecuadro(true); 
        }, 1800000); //30 minutos despues de iniciar sesion 
    };

    //Reiniciar el temporizador si el usuario presnta actividad, de lo contrario se hace el cierre se sesion automatico 
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            resetLogoutTimer();

            
            window.addEventListener('mousemove', resetLogoutTimer);
            window.addEventListener('keydown', resetLogoutTimer);
            return () => {
                window.removeEventListener('mousemove', resetLogoutTimer);
                window.removeEventListener('keydown', resetLogoutTimer);
                if (logoutTimer.current) {
                    clearTimeout(logoutTimer.current);
                }
            };
        }
    }, []);

    const handleAceptarClick = () => {
        setShowRecuadro(false); 
        router.push('/'); 
    };


    return (
        <>
            <nav className={style.NavBar}>




                <div className='w-auto px-5'>
                    <Image src="/images/universelogo.png"
                        width={130}
                        height={70}

                        alt="logo"
                        priority
                    />
                </div>
                <div className="flex grow space-x-3 ">
                    <div className={style.button_NavBar}>

                        <Link href="/PestaniaComunidad" className='flex space-x-3 '>
                            <TiIcon.TiGroup size={"25px"} />
                            <h4>Comunidades</h4>
                        </Link>

                    </div>

                </div>

                <div className="w-auto flex space-x-3 content-center">
                    <h4>{name}</h4>
                    <FaIcon.FaUserCircle size={"25px"} />

                    <RxIcon.RxTriangleDown size={"20px"} onClick={stateMenuDesplegable} className='cursor-pointer hover:bg-light_blue_hover' />


                    {/* se verifica si es verdadedo el menu desplegable, y si asi es se ejecuta el html en el return*/}
                    {/*si es falso va a null y no muestra nada*/}
                    {menuDesplegable ? (

                        <div className='desplegableOptions absolute top-16 '>
                            <div>


                                <Link href="/Perfil">
                                    <h5>Mi Perfil</h5>
                                </Link>
                            </div>
                            <div >


                                <a onClick={handleLogoutClick}><h5>Cerrar Sesion</h5></a>

                            </div>


                        </div>
                    ) : null

                    }
                </div>
            </nav>

            {showRecuadro && (
                <div className="modalOverlay">
                    <Recuadro cerrar={handleAceptarClick} titulo={'Sesión cerrada'} descripcion={'Su sesión ha sido cerrada debido a inactividad'}/>
                </div>
            )}


        </>
    )

}

export default Navbar