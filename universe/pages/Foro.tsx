import Head from "next/head";
import * as Faicon from "react-icons/fa";
import * as IoIcon from "react-icons/io";
import * as BsIcon from "react-icons/bs";
import * as HiIcon from "react-icons/hi";
import * as AiIcon from "react-icons/ai";
import LateralNavBar from "universe/Component/LateralNavBar";
import Navbar from "universe/Component/NavBar";
import TarjetaTemas from "universe/Component/TarjetaTemas";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import ConfirmacionRecuadro from "universe/Component/ConfirmacionRecuadro";

const colorIcon = "#61EB8D";
interface Tema {
    name: string;
}

var topicID: number;
var topicName: string;

export default function Foro() {
    const [Temas, setTemas] = useState([
        {
            topic_id: 0,
            topic_name: "",
        },
    ]);
    const [confirmacion, setConfirmacion] = useState(false);
    const stateConfirmacion = () => {
        setConfirmacion(!confirmacion);
        toggle();
    };
    const [actualizacion, setActualizacion] = useState(0);
    const newActualizacion = () => {
        setActualizacion(actualizacion + 1);
    };

    const toggle = () => {
        var blurMain = document.getElementById("main");
        blurMain?.classList.toggle("active");
    };
    //FUNCION PARA TRAER TODOS LOS TEMAS DE LA ENCICLOPEDIA DE LA COMUNIDAD
    useEffect(() => {
        const fetchData = async () => {
            // se trae la informacion de los documentos que existen al entrar a la pagina
            //setIsLoading(true)
            try {
                const res = await fetch("https://universe-backend.azurewebsites.net/api/topics/community/" + localStorage.getItem("comunidad_ID"), {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (res.ok) {
                    const data = await res.json();
                    console.log(data["topics"]);
                    setTemas(data["topics"]);
                }
            } catch (error: any) {
                console.error("Error:", error);
                alert(error.message);
            }
        };
        fetchData();
    }, [actualizacion]);

    const eliminar = (topic_ID: number, topic_Name: string) => {
        topicID = topic_ID;
        topicName = topic_Name;
        stateConfirmacion();
    };

    const eliminarTema = async () => {
        /**funcion para la creacion de un tema en el backend */

        try {
            const res = await fetch("https://universe-backend.azurewebsites.net/api/topic/id/" + topicID, {
                method: "DELETE",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (res.ok) {
                console.log("Success:", "Se ha eliminado el documento de forma correcta ");
                alert("Se ha eliminado el documento de forma correcta");
                newActualizacion();
            } else {
                console.error("Error:", "sucedio un error al eliminar un tema, vuelva a intentarlo");
                alert("sucedio un error al eliminar un tema, vuelva a intentarlo");
            }
        } catch (error: any) {
            console.error("Error:", error);
            alert(error.message);
        }

        stateConfirmacion();
    };

    return (
        <>
            <Head>
                <title>Universe</title>
            </Head>
            <main id="main">
                <Navbar></Navbar>
                <LateralNavBar></LateralNavBar>
                <div className="principal_Content">
                    <div className={`flex items-center space-x-3`}>
                        <AiIcon.AiFillQuestionCircle size={"150px"} color={colorIcon} />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <h1 style={{ alignSelf: 'flex-start' }}>Foro</h1>
                            <h3 style={{ alignSelf: 'flex-start' }}>Selecciona un tema para acceder a su foro</h3>
                        </div>
                    </div>
                    <div className="flex flex-wrap mt-8 ml-6 ">
                        {Temas.map((item, index) => {
                            return (
                                <TarjetaTemas
                                    key={item.topic_id}
                                    id_Topic={item.topic_id}
                                    name={item.topic_name}
                                    ruta={"/ForoPreguntas"}
                                    eliminar={eliminar}
                                ></TarjetaTemas>
                            );
                        })}
                    </div>

                </div>
                {/**aqui empieza el formulario que aparecera sobre todo el contenido de la pagina en ese momento */}
            </main>
            {confirmacion ? (
                <ConfirmacionRecuadro
                    mensaje="Esta seguro de eliminar el tema:"
                    name={topicName}
                    eliminar={eliminarTema}
                    cerrar={stateConfirmacion}
                ></ConfirmacionRecuadro>
            ) : null}

        </>

    )
}