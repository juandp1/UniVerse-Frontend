import Head from "next/head";
import ComunidadPerfil from "universe/Component/ComunidadPerfil";
import * as Faicon from 'react-icons/fa';
import * as IoIcon from 'react-icons/io';
import * as AiIcon from 'react-icons/ai';
import LateralNavBar from "universe/Component/LateralNavBar";
import Navbar from "universe/Component/NavBar";
import style from "/styles/homeComunidadStyles.module.css";
import router, { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { Formik, Form, Field } from 'formik';
import { GetServerSideProps } from "next/types";
import nookies from 'nookies';
import Cookies from "js-cookie";
import ConfirmacionRecuadro from "universe/Component/ConfirmacionRecuadro";
import { ToastContainer, toast } from "react-toastify";





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



export default function Perfil() {


    //VERIFICAR SI EL USUARIO ESTA LOGEADO



    //VARIABLES USE STATE
    const [showFormCrearComunidad, setShowFormCrearComunidad] = useState(false)
    const statusShowFormCrearComunidad = () => {
        setShowFormCrearComunidad(!showFormCrearComunidad)
        toggle()
    }

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
                console.error('success:', "se ha abandonado la comunidad con exito ");
            }

            else if (res.status == 400) { //codigo de usuario ya existente 
                const data = await res.json();
                switch (data.message) {
                    case "Admin cannot leave community":
                        toast.error('No puedes abandonar la comunidad porque eres administrador de la misma', {
                            position: "top-right",
                            autoClose: 4000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            className: style.toast_success_doc

                        });
                        break;
                    case "User not in community":
                        toast.error('No puedes abandonar la comunidad porqueno perteneces a ella', {
                            position: "top-right",
                            autoClose: 4000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            className: style.toast_success_doc

                        });
                        break;
                    default:

                        break;
                }
            }


            else {
                toast.error('Ocurrio un error al abandonar la comunidad', {
                    position: "top-right",
                    autoClose: 4000,
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

    }


    const cerrarEdicion = () => {
        stateformEditar()
        toggle()
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
                newActualizacion();

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
            const res = await fetch('https://universe-backend.azurewebsites.net/api/community/name/' + comunityName, {
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



    const [name, setName] = useState<string | null>(null);
    useEffect(() => {
        setName(localStorage.getItem("name"));
    }, []);

    const [email, setEmail] = useState<string | null>(null);
    useEffect(() => {
        setEmail(localStorage.getItem("email"));
    }, []);


    const editarPerfil = () => {
        router.push('/EditarPerfil');
    }



    return (
        <>
            <Head>
                <title>Universe</title>
            </Head>

            <main id="main">
                <Navbar></Navbar>
                <div className="principal_Content_Profile">
                    <div className="flex items-center justify-start space-x-3">
                        <Faicon.FaUser size={"100px"} color={colorIcon} />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <h2 style={{ alignSelf: 'flex-start' }}>Mi perfil</h2>
                        </div>
                    </div>

                    <h3 style={{ alignSelf: 'flex-start', marginTop: '20px', marginLeft: '10px' }}>
                        Información personal
                    </h3>

                    <div className={style.principalContentProfile}>
                        <div className={style.component1}>
                            <h4>Nombre de usuario:</h4>
                            <div className={style.textContainer}>
                                <div>
                                    <h5>{name}</h5>
                                </div>
                            </div>
                        </div>

                        <div className={style.component2}>
                            <h4>Email registrado:</h4>
                            <div className={style.textContainer}>
                                <div>
                                    <h5>{email}</h5>
                                </div>
                            </div>
                        </div>
                    </div>


                    <h3 style={{ alignSelf: 'flex-start', marginTop: '20px', marginLeft: '10px' }}>
                        Comunidades disponibles:
                    </h3>



                    <div className="flex flex-wrap justify-center" style={{ marginLeft: '10px' }} >
                        {Comunidades.map((item, index) => {
                            return (
                                <ComunidadPerfil key={item.id} idComunidad={item.id} comunityName={item.name} descripcion={item.description} editar={editar} eliminar={eliminar} abandonar={abandonar}></ComunidadPerfil>
                            )
                        })
                        }


                        <button className={style.rectangleButton} style={{ marginBottom: '10px' }} onClick={editarPerfil}>
                            <h6>EDITAR PERFIL</h6>
                        </button>


                    </div>
                </div>


            </main>
            <ToastContainer position="top-right" className={style.success_notification} />
            {confirmacion ? (
                <div className="modalOverlay">
                    <ConfirmacionRecuadro mensaje={"Se eliminara la comunidad"} name={comunityName} eliminar={deleteComunidad} cerrar={stateConfirmacion}></ConfirmacionRecuadro>
                </div>

            ) : null

            }
            {confirmacionAbandonar ? (
                <div className="modalOverlay">
                    <ConfirmacionRecuadro
                        mensaje="Esta apunto de abandonar la comunidad:"
                        name={comunityName}
                        eliminar={abandonarComunidad}
                        cerrar={stateConfirmacionAbandonar}
                    ></ConfirmacionRecuadro>
                </div>
            ) : null}

            {confirmacion ? (
                <div className="modalOverlay">
                    <ConfirmacionRecuadro mensaje="Esta seguro de eliminar la comunidad" name={comunityName} eliminar={deleteComunidad} cerrar={stateConfirmacion}></ConfirmacionRecuadro>
                </div>
            ) : null
            }

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
                            <div className="modalOverlay">
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
                            </div>
                        )}

                    </Formik>
                </div>
            ) : null

            }

        </>
    )
}
