import Head from "next/head";
import ComunidadRecuadro from "universe/Component/ComunidadRecuadro";
import Navbar from "universe/Component/NavBar";
import * as TiIcon from 'react-icons/ti';
import * as IoIcon from 'react-icons/io';
import { useState } from "react";
import { Formik, Form, Field } from 'formik';

interface Comunidad{
    nameComunidad:string
    materia:string
    descripcion:string 
}
const colorIcon = "#61EB8D";

export default function PestaniaComunidad() {
    const [showFormCrearComunidad, setShowFormCrearComunidad] = useState(false)
    const statusShowFormCrearComunidad = () => setShowFormCrearComunidad(!showFormCrearComunidad)

    const toggle = () => {
        var blurMain = document.getElementById("main")
        blurMain?.classList.toggle("active")
        statusShowFormCrearComunidad()
    }
    const crearComunidad = async (values: Comunidad) => {
        toggle()
    }

    return (
        <>
            <Head>
                <title>Comunidades</title>
            </Head>
            <main id="main">
                <Navbar></Navbar>
                <div className="principal_Content_withoutLateralNavbar">
                    <div className="flex space-x-3 items-center px-16">
                        <TiIcon.TiGroup size={"80px"} color={colorIcon} />
                        <h1>Comunidades</h1>
                    </div>

                    <div className="flex flex-wrap justify-center">

                        <ComunidadRecuadro comunityName="Calculo Integral" descripcion="bueno esto es una prueba a ve como queda"></ComunidadRecuadro>
                        <ComunidadRecuadro comunityName="Calculo Integral" descripcion="bueno esto es una prueba a ver como queda"></ComunidadRecuadro>
                        <ComunidadRecuadro comunityName="Calculo Integral" descripcion="bueno esto es una prueba a ver como queda"></ComunidadRecuadro>
                        <ComunidadRecuadro comunityName="Calculo Integral" descripcion="bueno esto es una prueba a ver como queda"></ComunidadRecuadro>
                    </div>

                </div>
                <div className="button_crear" onClick={toggle}>
                    <IoIcon.IoMdAdd size={'80px'} color={colorIcon} />
                </div>

            </main>
            
            {showFormCrearComunidad?(
                <div>
                    <Formik
                        initialValues={{
                            nameComunidad: "",
                            descripcion: "",
                            materia: "",

                        }}
                        onSubmit={async (values) => {

                            crearComunidad(values)
                            //alert(JSON.stringify(values));
                        }}

                    >
                        {({ handleSubmit, values, handleChange }) => (
                            <form id="login" onSubmit={handleSubmit}>
                                <div id="encabezado">
                                    <IoIcon.IoMdClose size={"25px"} onClick={toggle} id="close" />

                                    <div>
                                        <TiIcon.TiGroup size={"60px"} color={"#1D3752"} />
                                        <h2>Crear una nueva comunidad</h2>
                                    </div>
                                    <div>
                                        <button type="submit">
                                            <h3>Crear</h3>
                                        </button>
                                    </div>
                                </div>
                                <div id="inputs">

                                    <div>
                                        <h5>Nombre de la comunidad:</h5>
                                        <input name="NombreComunidad" type="text" placeholder="Nombre de la comunidad"
                                            value={values.nameComunidad}
                                            onChange={handleChange}
                                        />

                                        <h5>Descripcion de la comunidad</h5>
                                        <input name="descripcion" type="text" placeholder="Descripcion de la comunidad"
                                            value={values.descripcion}
                                            onChange={handleChange}
                                        />

                                        <h5>Categoria o materia a la que se refiere la comunidad:</h5>
                                        <input name="materia" type="text" placeholder="Buscar"
                                            value={values.descripcion}
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
