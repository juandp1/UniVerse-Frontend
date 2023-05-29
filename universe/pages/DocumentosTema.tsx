import Head from "next/head";
import * as Faicon from 'react-icons/fa';
import * as IoIcon from 'react-icons/io';
import * as HiIcon from 'react-icons/hi';
import LateralNavBar from "universe/Component/LateralNavBar";
import Navbar from "universe/Component/NavBar";
import TarjetaTemas from "universe/Component/TarjetaTemas";
import { useState } from "react";
import { Formik } from 'formik'
import TarjetaDocumento from "universe/Component/TarjetaDocumento";



const colorIcon = "#61EB8D"
interface Documento {
    nombre_Documento: String;
}

export default function DocumentosTema() {
    const [showFormAñadirDocumento, setShowFormAñadirDocumento] = useState(false)
    const statusShowFormAñadirDocumento = () => setShowFormAñadirDocumento(!showFormAñadirDocumento)
    const [Documentos, setDocumentos] = useState([{
        nombreDocumentos: ''
    }])
    
    const toggle = () => {
        var blurMain = document.getElementById("main")
        blurMain?.classList.toggle("active")
        statusShowFormAñadirDocumento()
    }
    const GetInfoTemas = async (values: Documento) => { // se trae la informacion de los documentos que existen al entrar a la pagina
        //setIsLoading(true)
        let url: string = 'https://decorisaserver.azurewebsites.net/api/cita/key/'//+ nombreComunidad 
        fetch(url, {

        })
            .then(response => response.json()).then(data => {
                console.log(data)

                setDocumentos(data)
                //setIsLoading(false)
                //setShowDetallesCita(true)
            })

    }
    const añadirDocumento = async (values: Documento) => {
        /**funcion para añadir un documento y llevarlo al backend */

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
                        <HiIcon.HiDocument size={"60px"} color={colorIcon} />
                        <h1>Documentos</h1>
                    </div>
                    <div className="flex flex-wrap ">
                        {/*Temas.map((item,index)=>{
                            return(
                                <TarjetaTemas name={item.nombreTema} ruta={"/DocumentosTema"}></TarjetaTemas>
                            )
                        })
                        */}
                        <TarjetaDocumento name={"Ley de Gauss"} ruta={"/DocumentosTema"}></TarjetaDocumento>
                        <TarjetaDocumento name={"Ley de Gauss"} ruta={"/DocumentosTema"}></TarjetaDocumento>
                        <TarjetaDocumento name={"Ley de Gauss"} ruta={"/DocumentosTema"}></TarjetaDocumento>
                        <TarjetaDocumento name={"Ley de Gauss"} ruta={"/DocumentosTema"}></TarjetaDocumento>
                        <TarjetaDocumento name={"Ley de Gauss"} ruta={"/DocumentosTema"}></TarjetaDocumento>
                        <TarjetaDocumento name={"Ley de Gauss"} ruta={"/DocumentosTema"}></TarjetaDocumento>
                        <TarjetaDocumento name={"Ley de Gauss"} ruta={"/DocumentosTema"}></TarjetaDocumento>
                    </div>

                    <div className="button_crear" onClick={toggle}>
                        <HiIcon.HiDocument size={'80px'} color={colorIcon} />
                    </div>
                </div>
                {/**aqui empieza el formulario que aparecera sobre todo el contenido de la pagina en ese momento */}



            </main>

            {showFormAñadirDocumento ? (
                <div>

                </div>
            ) : null}
        </>

    )
}