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
import { Formik } from 'formik'
import * as Yup from "yup";


interface Pregunta {
    tituloPregunta: String;
    descripcionPregunta: String;
}

const colorIcon = "#61EB8D"

export default function ForoPreguntas() {

    const [showFormCrearPregunta, setShowFormCrearPregunta] = useState(false)
    const statusShowFormCrearPregunta = () => setShowFormCrearPregunta(!showFormCrearPregunta)

    const [Preguntas, setPreguntas] = useState([{
        tituloPregunta: '',
        descripcionPregunta: ''
      }])

    const toggle = () => {
        var blurMain = document.getElementById("main")
        blurMain?.classList.toggle("active")
        statusShowFormCrearPregunta()
    }

    //FUNCIÓN PARA TRAER TODAS LAS PREGUNTAS DE UN TEMA ESPECÍFICO APENAS CARGA LA PÁGINA
  useEffect(() => {
    const fetchData = async () => { // se trae la información de las preguntas que existen al entrar a la página.
        try {
            const res = await fetch('http://localhost:3333/api/community/' + localStorage.getItem("comunidad_ID") + '/' + localStorage.getItem("Topic")+ '/questions', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },

            });
            if (res.ok) {
                const data = await res.json();
                setPreguntas(data)
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
        const res = await fetch('http://localhost:3333/api/questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({"title": values.tituloPregunta, "description": values.descripcionPregunta, "topic_id": localStorage.getItem("Topic"), "community_id": localStorage.getItem("comunidad_ID")})
        })
        if (res.ok) {
            statusShowFormCrearPregunta()
            toast.success('La pregunta ha sido creada correctamente', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                className:style.toast_success_doc
    
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
                        <img src="./images/foro.png" alt="camera" className={style.img} />
                        <h1 className={style.title_tema}>Nombre del tema</h1>
                        
                    </div>


                    <div className={style.scroll_container}>
                        <PreguntaForo nombreCreador={"AndruRachi"} tituloPregunta={"¿Cuál es la expresión matemática de la ley de Gauss y qué representa cada término en ella?"} contenidoPregunta={"La Ley de Gauss es una de las leyes fundamentales de la física que se aplica en el estudio del campo eléctrico. Esta ley establece que el flujo eléctrico total a través de cualquier superficie cerrada es proporcional a la carga neta encerrada dentro de esa superficie. Matemáticamente, la ley de Gauss se expresa como: S E·dA = Q/ε0 donde ∮S representa la integral de superficie cerrada, E es el campo eléctrico en la superficie S, dA es un elemento de área en la superficie S, Q es la carga neta encerrada dentro de la superficie S y ε0 es la constante dieléctrica del vacío."} fechaPregunta={"5 días"} contenidoRespuesta={"La Ley de Gauss es una de las leyes fundamentales de la física que se aplica en el estudio del campo eléctrico. Esta ley establece que el flujo eléctrico total a través de cualquier superficie cerrada es proporcional a la carga neta encerrada dentro de esa superficie. Matemáticamente, la ley de Gauss se expresa como: S E·dA = Q/ε0 donde ∮S representa la integral de superficie cerrada, E es el campo eléctrico en la superficie S, dA es un elemento de área en la superficie S, Q es la carga neta encerrada dentro de la superficie S y ε0 es la constante dieléctrica del vacío."} upvotesPregunta={12} downvotesPregunta={4} upvotesRespuesta={5} downvotesRespuesta={2}></PreguntaForo>
                        <PreguntaForo nombreCreador={"MariaSanchez"} tituloPregunta={"¿Cuál es la expresión matemática de la ley de Gauss y qué representa cada término en ella?"} contenidoPregunta={"La Ley de Gauss es una de las leyes fundamentales de la física que se aplica en el estudio del campo eléctrico. Esta ley establece que el flujo eléctrico total a través de cualquier superficie cerrada es proporcional a la carga neta encerrada dentro de esa superficie. Matemáticamente, la ley de Gauss se expresa como: S E·dA = Q/ε0 donde ∮S representa la integral de superficie cerrada, E es el campo eléctrico en la superficie S, dA es un elemento de área en la superficie S, Q es la carga neta encerrada dentro de la superficie S y ε0 es la constante dieléctrica del vacío."} fechaPregunta={"7 días"} contenidoRespuesta={"La Ley de Gauss es una de las leyes fundamentales de la física que se aplica en el estudio del campo eléctrico. Esta ley establece que el flujo eléctrico total a través de cualquier superficie cerrada es proporcional a la carga neta encerrada dentro de esa superficie. Matemáticamente, la ley de Gauss se expresa como: S E·dA = Q/ε0 donde ∮S representa la integral de superficie cerrada, E es el campo eléctrico en la superficie S, dA es un elemento de área en la superficie S, Q es la carga neta encerrada dentro de la superficie S y ε0 es la constante dieléctrica del vacío."} upvotesPregunta={12} downvotesPregunta={4} upvotesRespuesta={5} downvotesRespuesta={2}></PreguntaForo>
                        <PreguntaForo nombreCreador={"JuandaPlacios"} tituloPregunta={"¿Cuál es la expresión matemática de la ley de Gauss y qué representa cada término en ella?"} contenidoPregunta={"La Ley de Gauss es una de las leyes fundamentales de la física que se aplica en el estudio del campo eléctrico. Esta ley establece que el flujo eléctrico total a través de cualquier superficie cerrada es proporcional a la carga neta encerrada dentro de esa superficie. Matemáticamente, la ley de Gauss se expresa como: S E·dA = Q/ε0 donde ∮S representa la integral de superficie cerrada, E es el campo eléctrico en la superficie S, dA es un elemento de área en la superficie S, Q es la carga neta encerrada dentro de la superficie S y ε0 es la constante dieléctrica del vacío."} fechaPregunta={"15 días"} contenidoRespuesta={"La Ley de Gauss es una de las leyes fundamentales de la física que se aplica en el estudio del campo eléctrico. Esta ley establece que el flujo eléctrico total a través de cualquier superficie cerrada es proporcional a la carga neta encerrada dentro de esa superficie. Matemáticamente, la ley de Gauss se expresa como: S E·dA = Q/ε0 donde ∮S representa la integral de superficie cerrada, E es el campo eléctrico en la superficie S, dA es un elemento de área en la superficie S, Q es la carga neta encerrada dentro de la superficie S y ε0 es la constante dieléctrica del vacío."} upvotesPregunta={12} downvotesPregunta={4} upvotesRespuesta={5} downvotesRespuesta={2}></PreguntaForo>
                        <PreguntaForo nombreCreador={"Tilín"} tituloPregunta={"¿Cuál es la expresión matemática de la ley de Gauss y qué representa cada término en ella?"} contenidoPregunta={"La Ley de Gauss es una de las leyes fundamentales de la física que se aplica en el estudio del campo eléctrico. Esta ley establece que el flujo eléctrico total a través de cualquier superficie cerrada es proporcional a la carga neta encerrada dentro de esa superficie. Matemáticamente, la ley de Gauss se expresa como: S E·dA = Q/ε0 donde ∮S representa la integral de superficie cerrada, E es el campo eléctrico en la superficie S, dA es un elemento de área en la superficie S, Q es la carga neta encerrada dentro de la superficie S y ε0 es la constante dieléctrica del vacío."} fechaPregunta={"1 meses"} contenidoRespuesta={"La Ley de Gauss es una de las leyes fundamentales de la física que se aplica en el estudio del campo eléctrico. Esta ley establece que el flujo eléctrico total a través de cualquier superficie cerrada es proporcional a la carga neta encerrada dentro de esa superficie. Matemáticamente, la ley de Gauss se expresa como: S E·dA = Q/ε0 donde ∮S representa la integral de superficie cerrada, E es el campo eléctrico en la superficie S, dA es un elemento de área en la superficie S, Q es la carga neta encerrada dentro de la superficie S y ε0 es la constante dieléctrica del vacío."} upvotesPregunta={12} downvotesPregunta={4} upvotesRespuesta={5} downvotesRespuesta={2}></PreguntaForo>
                    </div>


                </div>

                <div className="button_crear" onClick={toggle}>
                        <IoIcon.IoMdAdd size={'80px'} color={colorIcon} />
                </div>

            </main>

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

                                    </div>
                                </div>

                                <div id="inputs">

                                    <div>
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