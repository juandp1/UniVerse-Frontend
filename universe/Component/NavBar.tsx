import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import * as RxIcon from 'react-icons/rx';
import * as TiIcon from 'react-icons/ti';
import * as FaIcon from 'react-icons/fa';
import style from "/styles/NavBarsStyles.module.css";
import Image from 'next/image';
import { Stint_Ultra_Expanded } from 'next/font/google';
import { useRouter } from 'next/router';





function Navbar() {
    const router = useRouter();
    const [menuDesplegable, setMenuDesplegable] = useState(false)
    const stateMenuDesplegable = () => setMenuDesplegable(!menuDesplegable)
    const [name, setName] = useState(localStorage.getItem("name")) 
    {/*con este useState se controla para que aparezca las opciones de perfil y de cerrar sesion*/ }

    const handleLogoutClick = async () => {
        try {
            // Realizar la petición al backend para cerrar la sesión
            const res = await fetch('http://127.0.0.1:3333/api/logout', {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!res.ok) {
                throw new Error('No se pudo cerrar la sesión');
            }

            // Borrar el token del almacenamiento local
            localStorage.removeItem('token');
            localStorage.removeItem('user_ID');

            // Redirigir al usuario a la página de inicio 
            router.push('/index'); 
        } catch (error) {
            console.error('Error:', error);
        }
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

                            <Link href="">
                                <a onClick={handleLogoutClick}><h5>Cerrar Sesion</h5></a>
                            </Link>
                        </div>


                    </div>
                ) : null

                }
            </div>
        </nav>

    </>
)
            
            }

export default Navbar