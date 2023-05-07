import React, { useState } from 'react';
import Link from 'next/link';
import { Routes } from './compResource/Routes';
import  style from "/styles/NavBarsStyles.module.css";



function LateralNavBar() {
    return (
        <>
            <nav className={style.lateral_NavBar}>
                <ul >
                    {/*itero sobre la Routes que se importan de comp resources, de ahi creo varios puntos de la lista*/}
                    {/*de la iteracion saco los atributos de cada item para crear la ruta agregar su icono y su css*/}

                    {Routes.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link href={item.path}>
                                    {item.icon}
                                    
                                </Link>
                            </li>

                        )
                    })}
                </ul>
            </nav>

        </>
    )
}

export default LateralNavBar