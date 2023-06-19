import React, { useEffect, useState } from 'react'
import style from "/styles/ForoStyles.module.css";
import * as FaIcon from 'react-icons/fa';
import * as BsIcon from 'react-icons/bs';
import * as TbIcon from 'react-icons/tb';
import { number } from 'yup';
import Cookies from "js-cookie"
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

interface Props {
    id: number
    title: string,
    description: string,
    topic_id: number,
    community_id: number,
    user_name: string,

}



function PreguntaForo({ id, title, description, topic_id, community_id, user_name }: Props): JSX.Element {
    const router = useRouter();
    const irPreguntas = (): void => {
        localStorage.setItem("question_id", id.toString())
        router.push("/PaginaRespuesta");
    }

    
    return (
        <>
            <ToastContainer position="top-right" className="success_notification" />
            <div className={style.preguntaView}>
                <div className='flex flex-wrap justify-center'>
                    <FaIcon.FaUserCircle  size={"70px"} color= {"#1D3752"} />
                </div>
                <div className={style.cuerpo}  style={{ marginLeft: "10px"}}>
                    <div>
                        <h3>{title}</h3>
                        <h4>Autor: {user_name}</h4>
                        <p>{description}</p>
                    </div>
                    
                    <div> 
                        <div className={style.verRespuestasview} onClick={irPreguntas} >
                            <h4 style={{ textDecoration: "underline",  fontSize: "12px"}}>Ver las respuestas</h4>
                        </div>

                    </div>



                </div>
            </div>



        </>
    )
}

export default PreguntaForo