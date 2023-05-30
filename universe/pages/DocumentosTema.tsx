import Head from "next/head";
import * as Faicon from 'react-icons/fa';
import * as IoIcon from 'react-icons/io';
import * as HiIcon from 'react-icons/hi';
import LateralNavBar from "universe/Component/LateralNavBar";
import Navbar from "universe/Component/NavBar";
import { useState } from "react";
import { Formik } from 'formik';
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

                    <div className="flex items-center justify-start space-x-3">
                        <HiIcon.HiDocument size={"100px"} color={colorIcon} />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <h2 style={{ alignSelf: 'flex-start' }}>Documentos</h2>
                            <h5 style={{ alignSelf: 'flex-start' }}>Selecciona los documentos que quieras ver del tema que seleccionaste</h5>
                        </div>
                    </div>
                    <div className="flex flex-wrap "  style={{marginTop: '15px'}}>
                        {/*Temas.map((item,index)=>{
                            return(
                                <TarjetaTemas name={item.nombreTema} ruta={"/DocumentosTema"}></TarjetaTemas>
                            )
                        })
                        */}
                        <TarjetaDocumento idDocument={1} DocumentName="Libro serway" descripcion="Descripcion del documento"></TarjetaDocumento>
                        <TarjetaDocumento idDocument={2} DocumentName="Libro serway" descripcion="Descripcion del documento"></TarjetaDocumento>
                        <TarjetaDocumento idDocument={3} DocumentName="Libro serway" descripcion="Descripcion del documento"></TarjetaDocumento>
                        <TarjetaDocumento idDocument={4} DocumentName="Libro serway" descripcion="Descripcion del documento"></TarjetaDocumento>
                        <TarjetaDocumento idDocument={5} DocumentName="Libro serway" descripcion="Descripcion del documento"></TarjetaDocumento>
                        <TarjetaDocumento idDocument={6} DocumentName="Libro serway" descripcion="Descripcion del documento"></TarjetaDocumento>
                        <TarjetaDocumento idDocument={7} DocumentName="Libro serway" descripcion="Descripcion del documento"></TarjetaDocumento>
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