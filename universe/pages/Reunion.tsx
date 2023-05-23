import Link from 'next/link';
import LateralNavBar from '../Component/LateralNavBar'
import Navbar from '../Component/NavBar'
import Head from 'next/head';
import style from "/styles/ReunionesStyle.module.css";
import TipoReunion from 'universe/Component/TipoReunion';

import * as IoIcon from 'react-icons/io';
import * as HiIcon from 'react-icons/hi';
import { useState } from "react";
import { Formik } from 'formik'

interface Reunion {
    nombreReunion: String,
    Descripcion_reunion: String,
    fecha_reunion: String,
    hora_reunion: String,
    lugar_reunion: String;
}
const colorIcon = "#61EB8D"

export default function Reunion() {
    const [showFormCrearReunion, setShowFormCrearReunion] = useState(false)
    const statusShowFormCrearReunion = () => setShowFormCrearReunion(!showFormCrearReunion)
    const [Reuniones, setReuniones] = useState([{
        nombreReunion: '',
        Descripcion_reunion: '',
        fecha_reunion: '',
        hora_reunion: '',
        lugar_reunion: ''
    }])

    const toggle = () => {
        var blurMain = document.getElementById("main")
        blurMain?.classList.toggle("active")
        statusShowFormCrearReunion()
    }
    const CrearReunion = async (values: Reunion) => {
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

                <div className='principal_Content'>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <img src="./images/camera-meetings.png" alt="camera" style={{ marginRight: '10px' }} />
                        <h1>Reuniones</h1>
                    </div>
                    <div className='flex flex wrap space-x-10'>
                        <Link href="/ProximasReuniones" style={{}}>
                            <TipoReunion titulo="Próximas reuniones"></TipoReunion>
                        </Link>
                        <Link href="/ReunionesAnteriores" style={{}}>
                            <TipoReunion titulo="Reuniones anteriores"></TipoReunion>
                        </Link>


                        <div className="button_crear" onClick={toggle}>
                            <IoIcon.IoMdAdd size={'80px'} color={colorIcon} />
                            
                        </div>
                    </div>

                </div>
                {/*Agrego los componentes dentro del header*/}

            </main>


            {showFormCrearReunion ? (
                <div>

                    <Formik
                        initialValues={{
                            nombreReunion: '',
                            Descripcion_reunion: '',
                            fecha_reunion: '',
                            hora_reunion: '',
                            lugar_reunion: ''

                        }}
                        onSubmit={async (values) => {

                            CrearReunion(values)
                            //alert(JSON.stringify(values));
                        }}

                    >
                        {({ handleSubmit, values, handleChange }) => (
                            <form onSubmit={handleSubmit}>
                                <div id="encabezado">
                                    <IoIcon.IoMdClose size={"25px"} onClick={toggle} id="close" />

                                    <div>
                                        <HiIcon.HiFolderAdd size={"60px"} color={"#1D3752"} />
                                        <h2>Crear una nueva reunión</h2>
                                    </div>
                                    <div>
                                        <button type="submit">
                                            <h3>Crear</h3>
                                        </button>
                                    </div>
                                </div>

                                <div id="inputs">
                                    <div>
                                        <h5 >Nombre de la reunión:</h5>
                                        <input name="nombreReunion" type="text" placeholder="Nombre Reunion"
                                            value={values.nombreReunion}
                                            onChange={handleChange}
                                        />

                                        <h5>Descripción de la reunión:</h5>
                                        <input name="Descripcion_reunion" type="text" placeholder="Descripcion reunion"
                                            value={values.Descripcion_reunion}
                                            onChange={handleChange}
                                        />
                                        <h4 className='my-5'>Detalles del encuentro</h4>


                                        <div className={style.Detalles_Reunion}>
                                            <div>
                                                
                                                <input id='Detalles_Encuentro' name="fecha_reunion" type="date" placeholder="Fecha reunion"
                                                    value={values.fecha_reunion}
                                                    onChange={handleChange}
                                                />
                                                <label >Fecha de la reunión:</label>
                                            </div>
                                            <div >


                                                <input  name="hora_reunion" type="time" placeholder="Hora reunion"
                                                    value={values.hora_reunion}
                                                    onChange={handleChange}
                                                />
                                                <label>Hora de la reunión:</label>
                                                

                                            </div>

                                            <div>
                                                <input  name="lugar_reunion" type="text" placeholder="Lugar reunion"
                                                    value={values.lugar_reunion}
                                                    onChange={handleChange}
                                                />
                                                <label>Lugar de la reunión:</label>
                                                
                                            </div>


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