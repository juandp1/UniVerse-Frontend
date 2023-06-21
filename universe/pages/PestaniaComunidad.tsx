import Head from "next/head";
import { useRouter } from "next/router";
import ComunidadRecuadro from "universe/Component/ComunidadRecuadro";
import Navbar from "universe/Component/NavBar";
import * as TiIcon from 'react-icons/ti';
import * as IoIcon from 'react-icons/io';
import * as AiIcon from 'react-icons/ai';
import * as BiIcon from 'react-icons/bi';
import { useEffect, useState } from "react";
import { Formik, Form, Field } from 'formik';
import ConfirmacionRecuadro from "universe/Component/ConfirmacionRecuadro";
import Select from 'react-select';
import { GetServerSideProps } from "next/types";
import nookies from 'nookies';
import Cookies from "js-cookie";
import style from "/styles/pestaniaStyle.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";





export const getServerSideProps: GetServerSideProps = async (context) => {
    context.res.setHeader('Cache-Control', 'no-store, must-revalidate');
    const token = nookies.get(context).token;

    if (!token) {
        //Si no esta logeado lo redirige al Login
        return {
            redirect: {
                destination: '/Login',
                permanent: false,
            },
        };
    }

    //Si esta logeado le muestra la pagina 
    return {
        props: {}, // Muestra la pagina 
    };
};

interface Comunidad {

    id: number
    nameComunidad: string
    descripcion: string
    materia: string
}

interface Options {
    id: number,
    name: string;

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
    const [confirmacionAbandonar, setConfirmacionAbandonar] = useState(false)
    const stateConfirmacionAbandonar = () => {
        setConfirmacionAbandonar(!confirmacionAbandonar)
        toggle()
    }

    const [optionType, setOptionType] = useState<string | null>("");


    const [actualizacion, setActualizacion] = useState(0);
    const newActualizacion = () => {
        setActualizacion(actualizacion + 1);
    };



    const [formEditar, setformEditar] = useState(false)
    const stateformEditar = () => setformEditar(!formEditar)

    const [Comunidades, setComunidades] = useState([{
        id: 0,
        name: "",
        description: "",
    }])
    const [Labels, setLabels] = useState<Options[]>([])


    // OBTENCION DE TODAS LAS COMUNIDADES 
    useEffect(() => {
        const fetchData = async () => { // se trae la informacion de las comunidades que existen al entrar a la pagina
            //setIsLoading(true)
            try {
                const res = await fetch("https://universe-backend.azurewebsites.net/api/communities", {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Cookies.get('token')}`
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    setComunidades(data.communities);
                }
            } catch (error: any) {
                console.error('Error:', error);
                alert(error.message);
            }
        }
        fetchData();
    }, [actualizacion]);

    useEffect(() => {
        const fetchData = async () => { // se trae la informacion de los labels que existen al entrar a la pagina
            //setIsLoading(true)
            try {
                const res = await fetch("https://universe-backend.azurewebsites.net/api/labels", {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    console.log(data)
                    setLabels(data["labels"]);
                } else {
                    console.log(await res.json())
                }
            } catch (error: any) {
                console.error('Error:', error);
                alert(error.message);
            }
        }
        fetchData();
    }, []);


    useEffect(() => {
        if (Labels.length > 0) {
            setOptionType(Labels[0].name);
        }
    }, [Labels]);


    //EDICION DE LA COMUNIDAD
    const editar = (id: number, nameComunidad: string, descripcion: string) => {
        id_community = id
        comunityName = nameComunidad
        description = descripcion
        stateformEditar()
        toggle()
    }
    const abandonar = (id: number, nameComunidad: string) => {
        id_community = id
        comunityName = nameComunidad
        stateConfirmacionAbandonar()

    }
    const abandonarComunidad = async () => {
        try {
            const res = await fetch('https://universe-backend.azurewebsites.net/api/leave_community', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ "community_id": id_community, "user_id": localStorage.getItem('user_ID') })
            });
            if (res.ok) {
                toast.success('Ha abandonado la comunidad', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    className: "toast_success_doc"


                }
                );
                stateConfirmacionAbandonar();
                console.error('succes:', "se ha abandonado la comunidad con exito ");
            } else {
                throw new Error('Ha sucedido un error al abandonar la comunidad');
            }
        } catch (error: any) {
            console.error('Error:', error);
            alert(error.message);
        }

    }

    const cerrarEdicion = () => {
        stateformEditar()
        toggle()
    }

    //CREACION COMUNIDAD

    const crearComunidad = async (values: Comunidad) => {
        console.log(JSON.stringify({ "name": values.nameComunidad, "description": values.descripcion, "label": optionType }))
        try {
            const res = await fetch('https://universe-backend.azurewebsites.net/api/community', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('token')}`
                },
                body: JSON.stringify({ "name": values.nameComunidad, "description": values.descripcion, "label": optionType })
            });

            if (res.ok) {
                toast.success('Felicidades tu comunidad fue creada con exito', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    className: style.toast_success_doc

                });

                newActualizacion();


            } else {
                throw new Error('ha sucedido un error al crear la comunidad');
            }
        } catch (error: any) {
            console.error('Error:', error);
            alert(error.message);
        }
        statusShowFormCrearComunidad()
    }
    //UPDATE COMUNIDAD
    const updateComunidad = async (values: Comunidad) => {
        try {
            const res = await fetch('https://universe-backend.azurewebsites.net/api/community/name/' + comunityName, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('token')}`
                },
                body: JSON.stringify({ "name": values.nameComunidad, "description": values.descripcion, "label": values.materia })
            });

            if (res.ok) {
                toast.success('La comunidad ha sido editada de forma correcta', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    className: style.toast_success_doc
    
                });
                newActualizacion()
            } else {
                toast.error('No puedes editar esta comunida ya que no eres admin', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    className: style.toast_success_doc
    
                });
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
            const res = await fetch('https://universe-backend.azurewebsites.net/api/community/name/' + comunityName, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('token')}`
                }

            });

            if (res.ok) {
                console.log(await res.json());
                toast.success('La comunidad ha sido eliminada de forma correcta', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    className: style.toast_success_doc
    
                });
                newActualizacion()
            }else if( res.status === 401) {
                toast.error('No puedes eliminar esta comunida ya que no eres admin', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    className: style.toast_success_doc
    
                });
                
            }
        } catch (error: any) {
            console.error('Error:', error);
            alert(error.message);
        }
        stateformEditar()
        toggle()
    }
    const buscarComunidad = async (name: string) => {
        if(name === "" || name==null){
            toast.warning('Debes de ingresar algun input', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                className: style.toast_success_doc

            });
            
        }else{
            try {
                const res = await fetch('https://universe-backend.azurewebsites.net/api/community/similar_name/' + name, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Cookies.get('token')}`
                    },
    
                });
    
                if (res.ok) {
                    const data = await res.json();
                    setComunidades(data.communities);
                    
    
                } else {
                    console.log(await res.json())
                    
                }
            } catch (error: any) {
                console.error('Error:', error);
                alert(error.message);
            }
        }
        

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
                        <Formik
                            initialValues={{
                                name: "",
                            }}
                            onSubmit={async (values) => {
                                buscarComunidad(values.name);
                                //alert(JSON.stringify(values));
                            }}
                        >
                            {({ handleSubmit, values, handleChange }) => (
                                <form onSubmit={handleSubmit} className={style.formSearch}>
                                    <div className="flex flex-wrap space-x-3  items-center">
                                        <input
                                            name="name"
                                            type="text"
                                            placeholder="nombre Comunidad"
                                            value={values.name}
                                            onChange={handleChange}
                                            className={style.inputSearch}
                                        />

                                        <button type="submit" className={style.buttonSearch}>
                                            <BiIcon.BiSearchAlt size={"35px"} color={"#285F76"} />

                                        </button>

                                    </div>


                                    {/**segunda columna del formulario esi es necesario */}

                                </form>
                            )}
                        </Formik>



                    </div>

                    <div className="flex flex-wrap justify-center">
                        {Comunidades.map((item, index) => {
                            return (
                                <ComunidadRecuadro key={item.id} idComunidad={item.id} comunityName={item.name} descripcion={item.description} editar={editar} eliminar={eliminar} abandonar={abandonar}></ComunidadRecuadro>
                            )
                        })
                        }

                    </div>

                </div>
                <div className="button_crear" onClick={statusShowFormCrearComunidad}>
                    <IoIcon.IoMdAdd size={'80px'} color={colorIcon} />
                </div>

            </main>
            <ToastContainer position="top-right" className={style.success_notification} />
            {confirmacion ? (
                <div className="modalOverlay">
                    <ConfirmacionRecuadro mensaje={"se va a eliminar la comunidad"} name={comunityName} eliminar={deleteComunidad} cerrar={stateConfirmacion}></ConfirmacionRecuadro>
                </div>

            ) : null
            }
            {confirmacionAbandonar ? (
                <ConfirmacionRecuadro
                    mensaje="Esta apunto de abandonar la comunidad:"
                    name={comunityName}
                    eliminar={abandonarComunidad}
                    cerrar={stateConfirmacionAbandonar}
                ></ConfirmacionRecuadro>
            ) : null}

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
                            <div className= "modalOverlay">
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


                                        <div className={style.SelectType}>
                                            <Select
                                                // If you don't need a state you can remove the two following lines value & onChange
                                                placeholder="Materia"
                                                onChange={(option: Options | null) => {
                                                    if (option != null) {
                                                        setOptionType(option.name);
                                                    }
                                                }}
                                                getOptionLabel={(option: Options) => option.name}
                                                getOptionValue={(option: Options) => option.name}
                                                options={Labels}
                                                defaultValue={Labels[0]}
                                                isSearchable={true}
                                            />
                                        </div>
                                    </div>

                                </div>
                            </form>
                            </div>
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
                                        <input name="nameComunidad" type="text" placeholder="Nombre de la comunidad"
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