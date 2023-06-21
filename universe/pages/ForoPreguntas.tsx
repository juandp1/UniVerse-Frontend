import LateralNavBar from '../Component/LateralNavBar'
import Navbar from '../Component/NavBar'
import PreguntaForo from '../Component/PreguntaForo'
import Head from 'next/head';
import style from "/styles/ForoStyles.module.css";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import * as IoIcon from 'react-icons/io';
import * as HiIcon from 'react-icons/hi';
import * as Faicon from 'react-icons/fa';
import { Formik } from 'formik'
import * as Yup from "yup";


interface Pregunta {
    tituloPregunta: String;
    descripcionPregunta: String;
}

const colorIcon = "#61EB8D"

export default function ForoPreguntas() {

    const [showFormCrearPregunta, setShowFormCrearPregunta] = useState(false)
    const [Topic_id, setTopic_id]= useState<string | null>("")
    useEffect(() => {
        setTopic_id(localStorage.getItem("Topic"))
    }, []);
    const statusShowFormCrearPregunta = () => setShowFormCrearPregunta(!showFormCrearPregunta)

    const [Preguntas, setPreguntas] = useState([{
        id:0,
        title: "",
        description:"",
        score:0,
        topic_id: 0,
        community_id: 0,
        user_name:"",
    }])

    const toggle = () => {
        var blurMain = document.getElementById("main")
        blurMain?.classList.toggle("active")
        statusShowFormCrearPregunta()
    }
    useEffect(() => {
        const fetchData = async () => { // se trae la información de las preguntas que existen al entrar a la página./api/community/<int:community_id>/topic/<int:topic_id>/questions
            try {
                const res = await fetch('https://universe-backend.azurewebsites.net/api/community/' + localStorage.getItem("comunidad_ID") + '/topic/' + localStorage.getItem("Topic")+ '/questions', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
    
                });
                if (res.ok) {
                    const data = await res.json();
                    console.log(data)
                    setPreguntas(data["questions"])
                }
            } catch (error: any) {
                console.error('Error:', error);
                alert(error.message);
            }
    
        }
        fetchData();
      }, []);
    
    
    const CrearPregunta = async (values: Pregunta) => {
        /**funcion para crear una pregunta y llevarla al backend */
        try {
            const res = await fetch('https://universe-backend.azurewebsites.net/api/questions', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({"title": values.tituloPregunta, "description": values.descripcionPregunta, "topic_id": localStorage.getItem("Topic"), "community_id": localStorage.getItem("comunidad_ID")})
            })
            if (res.ok) {
                console.log(await res.json)
                statusShowFormCrearPregunta()
                toast.success('Tu Pregunta ha sido publicada', {
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
                toggle()
            }
        } catch (error: any) {
            console.error('Error:', error);
            alert(error.message);
        }
    }
   

    

    const validationSchema = Yup.object({
        tituloPregunta: Yup.string()
            .max(40, "El título de la pregunta no debe sobrepasar los 30 caracteres")
            .required("Campo requerido"),
        descripcionPregunta: Yup.string()
            .max(100, "La descripción de la pregunta no debe sobrepasar los 100 caracteres")
            .required("Campo requerido"),
    });

    return (
        <>
            <Head>
                <title>Universe</title>
            </Head>


            <main id='main'>
                <Navbar></Navbar>
                <LateralNavBar></LateralNavBar>
                <div className='principal_Content'>
                    <div className="flex space-x-3">
                        <Faicon.FaQuestionCircle size={"85px"} color={"#61EB8D"}/>
                        <h1>Preguntas</h1>

                    </div>


                    
                        {Preguntas.map((item, index) => {
                            return (
                                <PreguntaForo 
                                    key={item.id}
                                    id={item.id}
                                    title ={item.title}
                                    description={item.description}
                                    score={item.score}
                                    topic_id={item.topic_id}
                                    community_id={item.community_id}
                                    user_name={item.user_name}
                                ></PreguntaForo>
                            );
                        })}
                

                </div>

                <div className="button_crear" onClick={toggle}>
                    <IoIcon.IoMdAdd size={'80px'} color={colorIcon} />
                </div>

            </main>

            <ToastContainer position="top-right" className="success_notification" />

            {showFormCrearPregunta ? (
                <div>

                    <Formik
                        initialValues={{
                            tituloPregunta: '',
                            descripcionPregunta: ''

                        }}
                        onSubmit={async (values) => {

                            CrearPregunta(values)
                            //alert(JSON.stringify(values));
                        }}

                    >
                        {({ handleSubmit, values, handleChange }) => (
                            <form id="login" onSubmit={handleSubmit}>
                                <div id="encabezado">
                                    <IoIcon.IoMdClose size={"25px"} onClick={toggle} id="close" />

                                    <div>
                                        <HiIcon.HiFolderAdd size={"60px"} color={"#1D3752"} />
                                        <h2>Crear una nueva duda</h2>
                                    </div>
                                    <div>
                                        <button type="submit">
                                            <h3>Crear</h3>
                                        </button>
                                    </div>
                                </div>

                                <div id="inputs">
                                    <div>
                                        <h5>Título de la pregunta:</h5>
                                        <input name="tituloPregunta" type="text" placeholder="titulo Pregunta"
                                            value={values.tituloPregunta}
                                            onChange={handleChange}
                                        />
                                        <h5>Descripción detallada de la pregunta:</h5>
                                        <input name="descripcionPregunta" type="text" placeholder="descripcion Pregunta"
                                            value={values.descripcionPregunta}
                                            onChange={handleChange}
                                        />

                                    </div>
                                    
                                </div>

                                

                                    

                                
                            </form>
                        )}
                    </Formik>
                </div>
            ) : null}
        </>
    )
}