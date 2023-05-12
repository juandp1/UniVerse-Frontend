import React, { useEffect, useState } from 'react'
import style from "/styles/ForoStyles.module.css";
import * as FaIcon from 'react-icons/fa';


function PreguntaForo():JSX.Element{
    
    return (
        <>
            <div className={style.pregunta_box}>
                <div className={style.pregunta}>
                    <FaIcon.FaUserCircle size={'85px'} style={{ position: 'absolute', left: '32px', top: '20px' }}/>
                    <h1 className={style.título_pregunta}>¿Cuál es la expresión matemática de la ley de Gauss y qué representa cada término en ella?</h1>
                    <h2 className={style.detalles_pregunta}>UserName preguntó hace n días/ semanas/ meses/ años</h2>
                    <p className={style.contenido_pregunta}>La Ley de Gauss es una de las leyes fundamentales de la física que se aplica en el estudio del campo eléctrico. Esta ley establece que el flujo eléctrico
total a través de cualquier superficie cerrada es proporcional a la carga neta encerrada dentro de esa superficie. Matemáticamente, la ley de Gauss
se expresa como: S E·dA = Q/ε0 donde ∮S representa la integral de superficie cerrada, E es el campo eléctrico en la superficie S, dA es un elemento de
área en la superficie S, Q es la carga neta encerrada dentro de la superficie S y ε0 es la constante dieléctrica del vacío. ... Leer más</p>

                </div>
                <div className={style.respuesta}>
                    <FaIcon.FaUserCircle size={'85px'} style={{ position: 'absolute', left: '32px', top: '20px' }}/>
                    <h1 className={style.título_pregunta}>Mejor Respuesta</h1>
                    <p className={style.contenido_respuesta}>La Ley de Gauss es una de las leyes fundamentales de la física que se aplica en el estudio del campo eléctrico. Esta ley establece que el flujo eléctrico
total a través de cualquier superficie cerrada es proporcional a la carga neta encerrada dentro de esa superficie. Matemáticamente, la ley de Gauss
se expresa como: S E·dA = Q/ε0 donde ∮S representa la integral de superficie cerrada, E es el campo eléctrico en la superficie S, dA es un elemento de
área en la superficie S, Q es la carga neta encerrada dentro de la superficie S y ε0 es la constante dieléctrica del vacío. ... Leer más</p>
                </div>
            </div>

        </>
    )
}

export default PreguntaForo