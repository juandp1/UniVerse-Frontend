import LateralNavBar from '../Component/LateralNavBar'
import Navbar from '../Component/NavBar'
import Head from 'next/head';
import style from "/styles/ForoStyles.module.css";
import TarjetaTemas from "universe/Component/TarjetaTemas";
import { useState } from 'react';
import ConfirmacionRecuadro from 'universe/Component/ConfirmacionRecuadro';

var topicID: number
var topicName: string

export default function Foro() {
    const [confirmacion, setConfirmacion] = useState(false)
    const stateConfirmacion = () => {
        setConfirmacion(!confirmacion)
        toggle()
    }
    const eliminar = (topic_ID: number, topic_Name: string) => {
        topicID = topic_ID
        topicName = topic_Name
        stateConfirmacion()

    }
    const toggle = () => {
        var blurMain = document.getElementById("main")
        blurMain?.classList.toggle("active")
    }
    const eliminarTema = async () => {
        /**funcion para la creacion de un tema en el backend */

        try {
            const res = await fetch("http://localhost:3333/api/topic", {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ "topicID": topicID, "comunidad_ID": localStorage.getItem("comunidad_iD") })
            });
            if (res.ok) {
                console.log('Error:', "Se ha eliminado el documento de forma correcta ");
                alert("Se ha eliminado el documento de forma correcta");
            } else {
                console.error('Error:', "sucedio un error al eliminar un tema, vuelva a intentarlo");
                alert("sucedio un error al eliminar un tema, vuelva a intentarlo");

            }
        } catch (error: any) {
            console.error('Error:', error);
            alert(error.message);
        }

        stateConfirmacion()
    }

    return (
        <>
            <Head>
                <title>Universe</title>
            </Head>
            <main id='main'>
                <Navbar></Navbar>
                <LateralNavBar></LateralNavBar>
                <div className="principal_Content">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src="./images/foro.png" alt="camera" className={style.img} />
                        <div>
                            <h1 className={style.title}>Foro</h1>
                            <h2 className={style.subtitle}>Selecciona un tema para acceder a su foro.</h2>
                        </div>
                    </div>
                    <div className="flex flex-wrap " style={{ position: 'absolute', left: '120px', top: '210px' }}>
                        {/*Temas.map((item,index)=>{
                            return(
                                <TarjetaTemas id_Topic={1} name={item.nombreTema} ruta={"/DocumentosTema"} eliminar={eliminar} ></TarjetaTemas>
                            )
                        })
                        */}
                        <TarjetaTemas id_Topic={1} name={"Ley de Gauss"} ruta={"/ForoPreguntas"} eliminar={eliminar} ></TarjetaTemas>
                        <TarjetaTemas id_Topic={1} name={"Ley de Gauss"} ruta={"/ForoPreguntas"} eliminar={eliminar} ></TarjetaTemas>
                        <TarjetaTemas id_Topic={1} name={"Ley de Gauss"} ruta={"/ForoPreguntas"} eliminar={eliminar} ></TarjetaTemas>
                        <TarjetaTemas id_Topic={1} name={"Ley de Gauss"} ruta={"/ForoPreguntas"} eliminar={eliminar} ></TarjetaTemas>

                    </div>


                </div>





            </main>
            {confirmacion ? (
                <ConfirmacionRecuadro name={topicName} eliminar={eliminarTema} cerrar={stateConfirmacion}></ConfirmacionRecuadro>

            ) : null
            }

        </>

    )
}