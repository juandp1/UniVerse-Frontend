
import LateralNavBar from '../Component/LateralNavBar'
import Navbar from '../Component/NavBar'
import PreguntaForo from '../Component/PreguntaForo'
import Head from 'next/head';
import style from "/styles/ForoStyles.module.css";

import * as IoIcon from 'react-icons/io';
import * as HiIcon from 'react-icons/hi';
import { useState } from "react";
import { Formik } from 'formik'

interface Pregunta {
    titulo_pregunta: String,
    descripcion_pregunta: String;
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
    const CrearPregunta = async (values: Pregunta) => {
        console.log(values)
        toggle()
    }
    return (
        <>
            <Head>
                <title>Universe</title>
            </Head>


            <main>
                <Navbar></Navbar>
                <LateralNavBar></LateralNavBar>
                <div className='principal_Content'>
                    <div className="flex space-x-3">
                        <img src="./images/foro.png" alt="camera" className={style.img} />
                        <h1 className={style.title_tema}>Nombre del tema</h1>
                        
                    </div>


                    <div className={style.scroll_container}>
                        <PreguntaForo></PreguntaForo>
                        <PreguntaForo></PreguntaForo>
                        <PreguntaForo></PreguntaForo>
                        <PreguntaForo></PreguntaForo>

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
                            titulo_pregunta: '',
                            descripcion_pregunta: ''

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
                                        <input name="titulo_pregunta" type="text" placeholder="titulo Pregunta"
                                            value={values.titulo_pregunta}
                                            onChange={handleChange}
                                        />

                                    </div>
                                </div>

                                <div id="inputs">

                                    <div>
                                        <h5>Descripción detallada de la pregunta:</h5>
                                        <input name="descripcion_pregunta" type="text" placeholder="descripcion Pregunta"
                                            value={values.descripcion_pregunta}
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
