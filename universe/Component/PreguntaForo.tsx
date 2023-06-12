import React, { useEffect, useState } from 'react'
import style from "/styles/ForoStyles.module.css";
import * as FaIcon from 'react-icons/fa';
import { number } from 'yup';

interface Props {
    nombreCreador: String;
    tituloPregunta: String;
    contenidoPregunta: String;
    fechaPregunta: String;
    contenidoRespuesta: String;
    upvotesPregunta: Number;
    downvotesPregunta: Number;
    upvotesRespuesta: Number;
    downvotesRespuesta: Number;
}


function PreguntaForo({nombreCreador, tituloPregunta, contenidoPregunta, fechaPregunta, contenidoRespuesta, upvotesPregunta, downvotesPregunta, upvotesRespuesta, downvotesRespuesta}: Props):JSX.Element{
    
    return (
        <>
            <div className={style.pregunta_box}>
                <div className={style.pregunta}>
                    <FaIcon.FaUserCircle size={'85px'} style={{ position: 'absolute', left: '32px', top: '20px' }}/>
                    <h1 className={style.título_pregunta}>{tituloPregunta}</h1>
                    <h2 className={style.detalles_pregunta}>{nombreCreador} preguntó hace {fechaPregunta}</h2>
                    <p className={style.contenido_pregunta}>{contenidoPregunta}</p>
                    
                    <div className={style.votos}>
                        <div className={style.upvote}>
                            <img src="./images/upvote.png" alt="upvote" className={style.img_votos} />
                            <h1 className={style.count_text}>{upvotesPregunta.toString()}</h1>
                        </div>
                        <div className={style.downvote}>
                            <img src="./images/downvote.png" alt="downvote" className={style.img_votos} />
                            <h1 className={style.count_text}>{downvotesPregunta.toString()}</h1>
                        </div>
                    </div>
                </div>
                <div className={style.respuesta}>
                    <FaIcon.FaUserCircle size={'85px'} style={{ position: 'absolute', left: '32px', top: '20px' }}/>
                    <h1 className={style.título_pregunta}>Mejor Respuesta</h1>
                    <p className={style.contenido_respuesta}>{contenidoRespuesta}</p>
                    <div className={style.votos}>
                        <div className={style.upvote}>
                            <img src="./images/upvote.png" alt="upvote" className={style.img_votos} />
                            <h1 className={style.count_text}>{upvotesRespuesta.toString()}</h1>
                        </div>
                        <div className={style.downvote}>
                            <img src="./images/downvote.png" alt="downvote" className={style.img_votos} />
                            <h1 className={style.count_text}>{downvotesRespuesta.toString()}</h1>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default PreguntaForo