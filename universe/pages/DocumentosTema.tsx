import Head from "next/head";
import style from "/styles/DocumentosTema.module.css";
import * as Faicon from 'react-icons/fa';
import * as IoIcon from 'react-icons/io';
import * as HiIcon from 'react-icons/hi';
import LateralNavBar from "universe/Component/LateralNavBar";
import Navbar from "universe/Component/NavBar";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Formik } from 'formik';
import TarjetaDocumento from "universe/Component/TarjetaDocumento";
import { ReactSVG } from 'react-svg';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";




import { type } from "os";



const colorIcon = "#61EB8D"
interface Documento {
    namestring;
    descriptionstring;
    filestring;
    typestring;
}
interface Options {
    value: string;
    text: string;
}

const optionsType: Options[] = [
    {
        value: "libro",
        text: "Libro"
    },
    {
        value: "examen",
        text: "Examen"
    },
    {
        value: "ejercicio",
        text: "Ejercicio"
    }
]



export default function DocumentosTema() {


    const [isAdmin, setIsAdmin] = useState(false)
    const [showFormAñadirDocumento, setShowFormAñadirDocumento] = useState(false)
    const statusShowFormAñadirDocumento = () => setShowFormAñadirDocumento(!showFormAñadirDocumento)
    const [file, setFile] = useState<File | null>(null);
    const [Documentos, setDocumentos] = useState([{
        nombreDocumentos: ''
    }])
    const [optionType, setOptionType] = useState<string | null>("libro");

    const toggle = () => {
        var blurMain = document.getElementById("main")
        blurMain?.classList.toggle("active")
        statusShowFormAñadirDocumento()
    }


    //FUNCION PARA TRAER TODOS LOS DOCUMENTOS APENAS CARGA LA PAGINA
    useEffect(() => {
        const fetchData = async () => { // se trae la informacion de los documentos que existen al entrar a la pagina
            //setIsLoading(true)
            try {
                const res = await fetch('/api/document', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    setDocumentos(data)
                }
            } catch (error: any) {
                console.error('Error:', error);
                alert(error.message);
            }

        }
        fetchData();
    }, []);

    const crearDocumento = async (values: Documento) => {
        /**funcion para añadir un documento y llevarlo al backend */


        if (file != null) {

            try {
                const res = await fetch('http://127.0.0.1:3333/api/document', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'

                    },
                    body: JSON.stringify({ "name": values.name, "description": values.description, "file": file, "type": optionType })
                })
                if (res.ok) {
                    statusShowFormAñadirDocumento()
                    toast.success('El documento ha sido añadido correctamente', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        className: style.toast_success_doc

                    });
                    toggle()


                }
            } catch (error: any) {
                console.error('Error:', error);
                alert(error.message);
            }

        } else {
            console.error('Error:', "no ha ingresado ningun archivo");
        }



    }
    const proponerDocumento = async (values: Documento) => {

        if (file != null) {

            try {
                const res = await fetch('http://127.0.0.1:3333/api/document', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ "name": values.name, "description": values.description, "file": file, "type": optionType })
                })
                if (res.ok) {
                    statusShowFormAñadirDocumento()
                    toast.success(' Tu propuesta de documento ha sido enviada al administrador para ser revisada', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        className: style.toast_success_doc

                    });
                    toggle()
                }
            } catch (error: any) {
                console.error('Error:', error);
                alert(error.message);
            }

        } else {
            console.error('Error:', "no ha ingresado ningun archivo");
        }



    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if (fileList) {
            setFile(fileList[0]);
        }
        console.log(file)
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

                    <div className="flex items-center justify-start space-x-3">
                        <HiIcon.HiDocumentText size={"80px"} color={colorIcon} />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <h2 style={{ alignSelf: 'flex-start' }}>Documentos</h2>
                            <h5 style={{ alignSelf: 'flex-start' }}>Selecciona los documentos que quieras ver del tema que seleccionaste</h5>
                        </div>
                    </div>
                    <div className="flex flex-wrap " style={{ marginTop: '15px' }}>
                        {/*Temas.map((item,index)=>{
                            return(
                                <TarjetaTemas name={item.nombreTema} ruta={"/DocumentosTema"}></TarjetaTemas>
                            )
                        })
                        */}
                        <TarjetaDocumento idDocument={1} DocumentName="Libro 1" descripcion="Descripcion del documento" docType={"libro"}></TarjetaDocumento>
                        <TarjetaDocumento idDocument={2} DocumentName="Ejercicio 1.2" descripcion="Descripcion del documento" docType={"ejercicio"}></TarjetaDocumento>
                        <TarjetaDocumento idDocument={3} DocumentName="Parcial 1" descripcion="Descripcion del documento" docType={"examen"}></TarjetaDocumento>
                        <TarjetaDocumento idDocument={4} DocumentName="Ejercicio 2.1" descripcion="Descripcion del documento" docType={"ejercicio"}></TarjetaDocumento>
                        <TarjetaDocumento idDocument={5} DocumentName="Parcial 2" descripcion="Descripcion del documento" docType={"examen"}></TarjetaDocumento>
                        <TarjetaDocumento idDocument={6} DocumentName="Libro 2" descripcion="Descripcion del documento" docType={"libro"}></TarjetaDocumento>
                        <TarjetaDocumento idDocument={7} DocumentName="Ejercicio pre-parcial" descripcion="Descripcion del documento" docType={"ejercicio"}></TarjetaDocumento>
                    </div>
                    <div className="corner_Content">
                        <div className="flex items-center justify-end space-x-3">


                            <div className="button_crear" onClick={toggle}>
                                <HiIcon.HiOutlineDocumentAdd size={'60px'} color={colorIcon} />
                            </div>
                        </div>
                    </div>
                </div>
                {/**aqui empieza el formulario que aparecera sobre todo el contenido de la pagina en ese momento */}



            </main>
            <ToastContainer
                position="top-right"
                className={style.success_notification} />
            {showFormAñadirDocumento ? (
                <div>
                    <Formik
                        initialValues={{
                            name: "",
                            description: "",
                            file: "",
                            type: "",
                        }}
                        onSubmit={async (values) => {

                            isAdmin ? (crearDocumento(values)) : (proponerDocumento(values))

                            //alert(JSON.stringify(values));
                        }}
                    >
                        {({ handleSubmit, values, handleChange }) => (
                            <form id="login" onSubmit={handleSubmit}>
                                <div id="encabezado">
                                    <IoIcon.IoMdClose size={"25px"} onClick={toggle} id="close" />

                                    <div>

                                        <HiIcon.HiDocumentText size={"60px"} color={"#1D3752"} />
                                        {isAdmin ? (
                                            (
                                                <h2>Añadir Documento</h2>

                                            )
                                        ) : (
                                            <h2>Proponer Documento</h2>

                                        )}

                                    </div>
                                    <div>
                                        {isAdmin ? (
                                            (
                                                <button type="submit">
                                                    <h3>Añadir</h3>
                                                </button>

                                            )
                                        ) : (
                                            <button type="submit">
                                                <h3>Proponer</h3>
                                            </button>

                                        )}

                                    </div>
                                </div>
                                <div className="inputContainer">
                                    <div className="component1">
                                        <h5>Titulo:</h5>
                                        <input name="name" type="text" placeholder="Titulo"
                                            value={values.name}
                                            onChange={handleChange}
                                        />
                                        <h5>Descripcion:</h5>
                                        <input name="description" type="text" placeholder="Descripcion"
                                            value={values.description}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {/**segunda columna del formulario esi es necesario */}
                                    <div className="component2">
                                        <h5>Archivo:</h5>
                                        <input name="file" type="file"
                                            //value={values.file}
                                            onChange={handleFileChange}
                                            placeholder="Subir"
                                            content="Subir"
                                        />



                                        <h5>Tipo de Archivo:</h5>
                                        <div className={style.SelectType}>
                                            <Select
                                                // If you don't need a state you can remove the two following lines value & onChange

                                                placeholder="Tipo"
                                                onChange={(option: Options | null) => {
                                                    if (option != null) {
                                                        setOptionType(option.value);
                                                    }
                                                }}
                                                getOptionLabel={(option: Options) => option.text}
                                                getOptionValue={(option: Options) => option.value}
                                                options={optionsType}
                                                isSearchable={false}

                                            />
                                        </div>
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