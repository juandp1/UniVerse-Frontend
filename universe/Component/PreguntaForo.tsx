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
    score: number,
    topic_id: number,
    community_id: number,
    user_name: string,

}



function PreguntaForo({ id, title, description, score, topic_id, community_id, user_name }: Props): JSX.Element {
    const router = useRouter();
    const VoteQuestion = async (vote: string) => {
        
        try {
            const res = await fetch('https://universe-backend.azurewebsites.net/api/questions/' + id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('token')}`
                },
                body: JSON.stringify({ "vote_type": vote })

            });

            if (res.ok) {
                console.log('success:', "se voto correctamente");
                toast.success('Tu voto ha sido registrado exitosamente', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    className:"toast_success_doc"
        
                });
                
            } else {
                throw new Error('error al votar');
            }
        } catch (error: any) {
            console.error('Error:', error);
            alert(error.message);
        }

    }


    const irPreguntas = (): void => {
        localStorage.setItem("question_id", id.toString())
        router.push("/PaginaRespuesta");
    }
    return (
        <>
            <ToastContainer position="top-right" className="success_notification" />
            <div className={style.pregunta}>
                <div className='flex flex-wrap justify-center'>
                    <FaIcon.FaUserCircle size={'85px'} />
                </div>
                <div className={style.cuerpo}>
                    <div>
                        <h2>{title}</h2>
                        <h4>Autor: {user_name}</h4>
                        
                    </div>
                    <div className='pt-5'>

                        <p >{description}</p>
                    </div>

                    <div>
                    
                        <div className={style.verRespuestas} onClick={irPreguntas} >
                            <TbIcon.TbTriangleInvertedFilled color='#1D3752' size={"25px"}></TbIcon.TbTriangleInvertedFilled>
                            <h3>Ver Respuestas</h3>
                        </div>

                    </div>



                </div>
                <div >
                <h2>Puntuacion {score}</h2>
                    <div className={style.votos}>
                        <div className={style.upvote}>
                            <BsIcon.BsFillHandThumbsUpFill color='#1D3752' onClick={() => VoteQuestion("1")} size={"35px"} />
                        </div>
                        <div className={style.downvote}>
                            <BsIcon.BsFillHandThumbsDownFill color='#1D3752' onClick={() => VoteQuestion("-1")} size={"35px"} />
                        </div>
                    </div>
                </div>



            </div>



        </>
    )
}

export default PreguntaForo