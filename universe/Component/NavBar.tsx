import Link from 'next/link';
import React, { useEffect, useState, useRef } from 'react';
import * as RxIcon from 'react-icons/rx';
import * as TiIcon from 'react-icons/ti';
import * as FaIcon from 'react-icons/fa';
import * as Bsicon from 'react-icons/bs';
import style from "/styles/NavBarsStyles.module.css";
import Image from 'next/image';
import nookies from 'nookies';
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

            const res = await fetch(`${process.env.URL_API_BACKEND}/api/logout`, {

                method: 'DELETE',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('token')}`
                },
            });

            if (res.ok) {
                const data = await res.json();
                setShowRecuadro(false);


                // Borrar el token del almacenamiento local
                localStorage.clear();
                Cookies.remove('token');
                nookies.destroy(null, 'token');
                nookies.destroy(null, 're_token');
                nookies.destroy(null, "user_ID");
                nookies.destroy(null, "name");
                nookies.destroy(null, "email");

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

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            setTimeout(async () => {

                const res = await fetch(`${process.env.URL_API_BACKEND}/api/logout`, {

                    method: 'DELETE',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Cookies.get('token')}`,

                    }
                });

                if (res.ok) {
                    setShowRecuadro(true);

                } else {
                    throw new Error('An error occurred while logging out.');
                }

            }, 3000000);
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
                    <div className='flex flex-wrap' >
                        <div className={style.button_NavBar}>
                            <Link href="/PestaniaComunidad" className='flex space-x-3 '>
                                <TiIcon.TiGroup size={"25px"} />
                                <h4>Comunidades</h4>
                            </Link>
                        </div>
                        <div className={style.button_NavBar}>
                            <Link href="/EstadisticasGenerales" className='w-auto flex space-x-3 content-center'>
                                <Bsicon.BsBarChartFill size={"25px"} />
                                <h4>Estadisticas universe</h4>
                            </Link>

                        </div>






                    </div>

                </div>

                <div className="w-auto flex space-x-3 content-center mr-20">


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
                    <Recuadro cerrar={handleAceptarClick} titulo={'Sesión cerrada'} descripcion={'Su sesión ha sido cerrada debido a inactividad'} />
                </div>
            )}


        </>
    )

}

export default Navbar