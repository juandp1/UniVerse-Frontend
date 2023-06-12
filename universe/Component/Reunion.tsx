import React, { useEffect, useState } from 'react'
import style from "/styles/ReunionesStyle.module.css";

import * as FaIcon from 'react-icons/fa';


interface Props {
    idReunion: number
    nombreCreador: String;
    nombreReunion: String;
    Descripcion_reunion: String;
    fecha_reunion: String;
    hora_reunion: String;
    lugar_reunion: String;
}

function Reunion({idReunion, nombreCreador, nombreReunion, Descripcion_reunion, fecha_reunion, hora_reunion, lugar_reunion}: Props):JSX.Element{
    
    return (
        <>
            <div className={style.square_pregunta}>
                <div style={{ position: 'absolute', left: '32px', top: '40px' }}>
                    <FaIcon.FaUserCircle size={'90px'} style={{ position: 'absolute', left: '32px', top: '20px' }}/>
                    <h1 style={{position: "absolute", top: "115px", left: "20px", fontSize: "20px", width: "155px"}}>{nombreCreador}</h1>
                </div>
                <div className={style.minisquare_pregunta}>
                    <div style={{position: "absolute", top: "30px", left: "50%", transform: "translateX(-50%)", width: "628px"}}>
                        <h1 style={{marginBottom: '35px', marginTop: '20px'}}>{nombreReunion}</h1>
                        <h3>{Descripcion_reunion}</h3>
                        <h3>{fecha_reunion}</h3>
                        <h3>{lugar_reunion}</h3>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Reunion