import Head from "next/head";
import ComunidadRecuadro from "universe/Component/ComunidadRecuadro";
import Navbar from "universe/Component/NavBar";
import * as TiIcon from 'react-icons/ti';
import * as IoIcon from 'react-icons/io';
import { useState } from "react";

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
    const crearTema = async (values: Comunidad) => {
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
                {showFormCrearComunidad?(
                    <div>
                        {/**aqui se crea el formulario */}
                    </div>
                ):null

                }
            </main>
        </>

    )
}
