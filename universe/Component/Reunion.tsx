import React, { useEffect, useState } from 'react'
import style from "/styles/ReunionesStyle.module.css";

import * as FaIcon from 'react-icons/fa';

function Reunion():JSX.Element{
    
    return (
        <>
            <div className={style.square_pregunta}>
                <div style={{ position: 'absolute', left: '32px', top: '40px' }}>
                    <FaIcon.FaUserCircle size={'90px'} style={{ position: 'absolute', left: '32px', top: '20px' }}/>
                    <h1 style={{position: "absolute", top: "115px", left: "0px", fontSize: "20px", width: "155px"}}>Nombre creador</h1>
                </div>
                <div className={style.minisquare_pregunta}>
                    <div style={{position: "absolute", top: "30px", left: "50%", transform: "translateX(-50%)", width: "628px"}}>
                        <h1 style={{marginBottom: '35px', marginTop: '20px'}}>Nombre o identificador de la reunión</h1>
                        <h3>Tema y descripción de la reunión</h3>
                        <h3>Lugar: ubicación o link de la reunión</h3>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Reunion