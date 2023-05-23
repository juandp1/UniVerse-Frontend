import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import * as RxIcon from 'react-icons/rx';
import * as TiIcon from 'react-icons/ti';
import * as FaIcon from 'react-icons/fa';
import style from "/styles/NavBarsStyles.module.css";
import Image from 'next/image';
import { Stint_Ultra_Expanded } from 'next/font/google';






function Navbar() {
    const [menuDesplegable, setMenuDesplegable] = useState(false)
    const stateMenuDesplegable = () => setMenuDesplegable(!menuDesplegable)
    {/*con este useState se controla para que aparezca las opciones de perfil y de cerrar sesion*/ }

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
                    <h4>Nombre de usuario</h4>
                    <FaIcon.FaUserCircle size={"25px"} />

                    <RxIcon.RxTriangleDown size={"20px"} onClick={stateMenuDesplegable} className='cursor-pointer hover:bg-light_blue_hover'/>


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

                                <Link href="/Perfil"> {/*agregar un onClick*/}
                                    <h5>Cerrar Sesion</h5>
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