import Head from "next/head";
import { useRouter } from "next/router";
import ComunidadRecuadro from "universe/Component/ComunidadRecuadro";
import Navbar from "universe/Component/NavBar";
import * as TiIcon from 'react-icons/ti';
import * as IoIcon from 'react-icons/io';
import * as AiIcon from 'react-icons/ai';
import { useEffect, useState } from "react";
import { Formik, Form, Field } from 'formik';
import ConfirmacionRecuadro from "universe/Component/ConfirmacionRecuadro";
import Select from 'react-select';
import { GetServerSideProps } from "next/types";
import nookies from 'nookies';
import Cookies from "js-cookie";





export const getServerSideProps: GetServerSideProps = async (context) => {
    // Get the user's session based on the request cookies
    const token = nookies.get(context).token;
    context.res.setHeader('Cache-Control', 'no-store, must-revalidate');
  
    if (!token) {
     //Si no esta logeado lo redirige al home
      return {
        redirect: {
          destination: '/Login',
          permanent: false,
        },
      };
    }
  
    //Si esta logeado le muestra la pagina 
    return {
      props: {}, // will be passed to the page component as props
    };
  };
  
interface Comunidad {

    id: number
    nameComunidad: string
    descripcion: string
    materia: string
}

const colorIcon = "#61EB8D";
var comunityName: string
var description: string
var id_community: number



export default function PestaniaComunidad() {


    //VERIFICAR SI EL USUARIO ESTA LOGEADO


      
    //VARIABLES USE STATE
    const [showFormCrearComunidad, setShowFormCrearComunidad] = useState(false)
    const statusShowFormCrearComunidad = () => {
        setShowFormCrearComunidad(!showFormCrearComunidad)
        toggle()
    }
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<Comunidad[]>([]);
    const [confirmacion, setConfirmacion] = useState(false)
    const stateConfirmacion = () => {
        setConfirmacion(!confirmacion)
        toggle()
    }
    const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            //  API para buscar materias
            const response = await fetch(`/api/search?query=${searchQuery}`);
            const data = await response.json();

            // Actualizar los resultados de materias
            setSearchResults(data.results);
        } catch (error) {
            console.error("Error searching for subjects:", error);
        }
    };



    const [formEditar, setformEditar] = useState(false)
    const stateformEditar = () => setformEditar(!formEditar)

    const [Comunidades, setComunidades] = useState([{
        id: 0,
        name: "",
        description: "",
    }])
    // OBTENCION DE TODAS LAS COMUNIDADES 
    useEffect(() => {
        const fetchData = async () => { // se trae la informacion de los documentos que existen al entrar a la pagina
            //setIsLoading(true)
            try {
                const res = await fetch("http://localhost:3333/api/communities", {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Cookies.get('token')}`
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    setComunidades(data.communities)
                }
            } catch (error: any) {
                console.error('Error:', error);
                alert(error.message);
            }
        }
        fetchData();
    }, []);




    //EDICION DE LA COMUNIDAD
    const editar = (id: number, nameComunidad: string, descripcion: string) => {
        id_community = id
        comunityName = nameComunidad
        description = descripcion
        stateformEditar()
        toggle()
    }

    const cerrarEdicion = () => {
        stateformEditar()
        toggle()
    }

    //CREACION COMUNIDAD

    const crearComunidad = async (values: Comunidad) => {
        try {
            const res = await fetch('http://localhost:3333/api/community', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('token')}`
                },
                body: JSON.stringify({ "name": values.nameComunidad, "description": values.descripcion })
            });

            if (res.ok) {

            } else {
                throw new Error('ha sucedido un error al crear la comunidad');
            }
        } catch (error: any) {
            console.error('Error:', error);
            alert(error.message);
        }
        // try {
        //     const res = await fetch('/api/label_has_community/name/', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': `Bearer ${localStorage.getItem("token")}`
        //         },
        //         body: JSON.stringify({ nombreComunidad: values.nameComunidad, materia: values.materia })
        //     });

        //     if (res.ok) {

        //     } else {
        //         throw new Error('ha sucedido un error al crear la comunidad');
        //     }
        // } catch (error: any) {
        //     console.error('Error:', error);
        //     alert(error.message);
        // }


        statusShowFormCrearComunidad()
    }
    //UPDATE COMUNIDAD
    const updateComunidad = async (values: Comunidad) => {
        try {
            const res = await fetch('http://localhost:3333/api/community/name/' + comunityName, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('token')}`
                },
                body: JSON.stringify({ "name": values.nameComunidad, "description": values.descripcion })
            });

            if (res.ok) {

            } else {
                throw new Error('ha sucedido un error al crear la comunidad');
            }
        } catch (error: any) {
            console.error('Error:', error);
            alert(error.message);
        }
        stateformEditar()
        toggle()
    }
    const eliminar = (comunnuty_ID: number, name: string) => {
        id_community = comunnuty_ID
        comunityName = name
        stateConfirmacion()
    }
    const deleteComunidad = async () => {
        try {
            const res = await fetch('/api/community/name/' + comunityName, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('token')}`
                }

            });

            if (res.ok) {
                console.log('Error:', "Se ha eliminado la comunidad de forma correcta");
                alert("Se ha eliminado la comunidad de forma correcta");
            } else {
                throw new Error('ha sucedido un error al elimianr la comunidad');
            }
        } catch (error: any) {
            console.error('Error:', error);
            alert(error.message);
        }
        stateformEditar()
        toggle()
    }

    // FUNCION TOGGLE  se encarga de desvanecer el fondo cuando se despliega un formulario
    const toggle = () => {
        var blurMain = document.getElementById("main")
        blurMain?.classList.toggle("active")
    }




    //PRIMERA FUNCION EN EJECUTARSE ES TRAERSE LA IFFORMACION DE LAS COMUNIDADES
    //getInfoComunidades()
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
                        {Comunidades.map((item, index) => {
                            return (
                                <ComunidadRecuadro key={item.id} idComunidad={item.id} comunityName={item.name} descripcion={item.description} editar={editar} eliminar={eliminar}></ComunidadRecuadro>
                            )
                        })
                        }
                        <ComunidadRecuadro idComunidad={1} comunityName="FEM" descripcion="Descripcion de la comunidad Fem" editar={editar} eliminar={eliminar}></ComunidadRecuadro>
                        <ComunidadRecuadro idComunidad={2} comunityName="Calculo Integral" descripcion="Descripcion de la comunidad Calculo integral" editar={editar} eliminar={eliminar}></ComunidadRecuadro>

                    </div>

                </div>
                <div className="button_crear" onClick={statusShowFormCrearComunidad}>
                    <IoIcon.IoMdAdd size={'80px'} color={colorIcon} />
                </div>

            </main>
            {confirmacion ? (

                <ConfirmacionRecuadro name={comunityName} eliminar={deleteComunidad} cerrar={stateConfirmacion}></ConfirmacionRecuadro>

            ) : null
            }

            {showFormCrearComunidad ? (
                <div>
                    <Formik
                        initialValues={{
                            id: 0,
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
                                    <IoIcon.IoMdClose size={"25px"} onClick={statusShowFormCrearComunidad} id="close" />

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
                                        <input
                                            name="nameComunidad"
                                            type="text"
                                            placeholder="Nombre de la comunidad"
                                            value={values.nameComunidad}
                                            onChange={handleChange}
                                        />

                                        <h5>Descripcion de la comunidad</h5>
                                        <input
                                            name="descripcion"
                                            type="text"
                                            placeholder="Descripcion de la comunidad"
                                            value={values.descripcion}
                                            onChange={handleChange}
                                        />
                                        <h5>Categoria o materia a la que se refiere la comunidad:</h5>
                                        <div className="searchInputWrapper">
                                            <input
                                                name="materia"
                                                type="text"
                                                placeholder="Buscar"
                                                value={searchQuery}
                                                onChange={handleSearchQueryChange}
                                            />
                                            <button type="submit" className="searchButton">
                                                <IoIcon.IoIosSearch size={20} color="#fff" />
                                            </button>

                                        </div>


                                    </div>

                                </div>
                            </form>
                        )}

                    </Formik>
                </div>
            ) : null}
            {formEditar ? (
                <div>
                    <Formik
                        initialValues={{
                            id: id_community,
                            nameComunidad: comunityName,
                            descripcion: description,
                            materia: "",

                        }}
                        onSubmit={async (values) => {

                            updateComunidad(values)
                            //alert(JSON.stringify(values));
                        }}

                    >
                        {({ handleSubmit, values, handleChange }) => (
                            <form id="login" onSubmit={handleSubmit}>
                                <div id="encabezado">
                                    <IoIcon.IoMdClose size={"25px"} onClick={cerrarEdicion} id="close" />

                                    <div>
                                        <AiIcon.AiFillEdit size={"60px"} color={"#1D3752"} />
                                        <h2>Editar Comunidad</h2>
                                    </div>
                                    <div>
                                        <button type="submit">
                                            <h3>Editar</h3>
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
                                            value={values.materia}
                                            onChange={handleChange}
                                        />


                                    </div>

                                </div>
                            </form>
                        )}

                    </Formik>
                </div>
            ) : null

            }
        </>
    );
}