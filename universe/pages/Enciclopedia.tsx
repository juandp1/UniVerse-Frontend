import Head from "next/head";
import * as Faicon from 'react-icons/fa';
import * as IoIcon from 'react-icons/io';

import * as HiIcon from 'react-icons/hi';
import LateralNavBar from "universe/Component/LateralNavBar";
import Navbar from "universe/Component/NavBar";
import TarjetaTemas from "universe/Component/TarjetaTemas";


import { useState } from "react";
import { Formik } from 'formik'

const colorIcon = "#61EB8D"
interface Tema {
    nombre_Tema: String;
}



export default function Enciclopedia() {
    const [showFormCrearTema, setShowFormCrearTema] = useState(false)
    const statusShowFormCrearTema = () => setShowFormCrearTema(!showFormCrearTema)
    const [Temas, setTemas] = useState([{
        nombreTema: ''
    }])
    const [Materias, setMaterias] = useState([{
        Materia_id: '',
        Materia_nombre: '',
    }])
    const toggle = () => {
        var blurMain = document.getElementById("main")
        blurMain?.classList.toggle("active")
        statusShowFormCrearTema()
    }
    const crearTema = async (values: Tema) => {
        console.log(values)
        toggle()
    }

    return (
        <>
            <Head>
                <title>Universe</title>

            </Head>


            <main id="main">
                <Navbar></Navbar>
                <LateralNavBar></LateralNavBar>
                <div className="principal_Content">

                    <div className="flex space-x-3">
                        <Faicon.FaBookOpen size={"60px"} color={colorIcon} />
                        <h1>Temas</h1>
                    </div>
                    <div className="flex flex-wrap ">
                        {/*Temas.map((item,index)=>{
                            return(
                                <TarjetaTemas name={item.nombreTema} ruta={"/DocumentosTema"}></TarjetaTemas>
                            )
                        })
                        */}
                        <TarjetaTemas name={"Ley de Gauss"} ruta={"/DocumentosTema"}></TarjetaTemas>
                        <TarjetaTemas name={"Ley de Gauss"} ruta={"/DocumentosTema"}></TarjetaTemas>
                        <TarjetaTemas name={"Ley de Gauss"} ruta={"/DocumentosTema"}></TarjetaTemas>
                        <TarjetaTemas name={"Ley de Gauss"} ruta={"/DocumentosTema"}></TarjetaTemas>
                        <TarjetaTemas name={"Ley de Gauss"} ruta={"/DocumentosTema"}></TarjetaTemas>
                        <TarjetaTemas name={"Ley de Gauss"} ruta={"/DocumentosTema"}></TarjetaTemas>
                        <TarjetaTemas name={"Ley de Gauss"} ruta={"/DocumentosTema"}></TarjetaTemas>
                        <TarjetaTemas name={"Ley de Gauss"} ruta={"/DocumentosTema"}></TarjetaTemas>
                    </div>

                    <div className="button_crear" onClick={toggle}>
                        <IoIcon.IoMdAdd size={'80px'} color={colorIcon} />
                    </div>
                </div>
                {/**aqui empieza el formulario que aparecera sobre todo el contenido de la pagina en ese momento */}



            </main>

            {showFormCrearTema ? (
                <div>

                    <Formik
                        initialValues={{
                            nombre_Tema: "",
                            dato_reunion: "",
                            materias: "",

                        }}
                        onSubmit={async (values) => {

                            crearTema(values)
                            //alert(JSON.stringify(values));
                        }}

                    >
                        {({ handleSubmit, values, handleChange }) => (
                            <form id="login" onSubmit={handleSubmit}>
                                <div id="encabezado">
                                    <IoIcon.IoMdClose size={"25px"} onClick={toggle} id="close" />

                                    <div>
                                        <HiIcon.HiFolderAdd size={"60px"} color={"#1D3752"} />
                                        <h2>Nuevo Tema</h2>
                                    </div>
                                    <div>
                                        <button type="submit">
                                            <h3>Crear</h3>
                                        </button>
                                    </div>
                                </div>
                                <div id="inputs">
                                    <div>
                                        <h5>Nombre del tema:</h5>
                                        <input name="nombre_Tema" type="text" placeholder="nombre tema"
                                            value={values.nombre_Tema}
                                            onChange={handleChange}
                                        />

                                    </div>

                                    {/**segunda columna del formulario esi es necesario */}
                                    <div>
                                        <h5>Nombre del tema:</h5>
                                        <input name="nombre_Tema" type="text" placeholder="nombre tema"
                                            value={values.nombre_Tema}
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