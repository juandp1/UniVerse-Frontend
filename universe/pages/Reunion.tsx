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
                {/*Agrego los componentes dentro del header*/}
                <div style={{ position: 'absolute', display: 'flex', alignItems: 'center', top: '100px', left: '100px' }}>
                    <img src="./images/camera-meetings.png" alt="camera" style={{ marginRight: '10px' }}/>
                    <h1>Reuniones</h1>
                </div>

                <div style={{position: 'absolute', display: 'flex', justifyContent: 'center', left: '17%', top: '27%'}}>
                    <Link href="/ProximasReuniones" style={{position: 'absolute'}}>
                        <TipoReunion titulo="Próximas reuniones"></TipoReunion>
                    </Link>
                    <Link href="/ReunionesAnteriores" style={{position: 'absolute', left: '650px'}}>
                        <TipoReunion titulo="Reuniones anteriores"></TipoReunion>
                    </Link>
                </div>

                <div className={style.add} onClick={toggle}>
                    <img src="./images/add.png" alt="add" className={style.add_image}/>
                    <h1 className={style.add_text}>Crear nueva reunión</h1>
                </div>
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
                            <form id="login" onSubmit={handleSubmit}>
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
                                        <h5>Nombre de la reunión:</h5>
                                        <input name="nombreReunion" type="text" placeholder="nombre Reunion"
                                            value={values.nombreReunion}
                                            onChange={handleChange}
                                        />

                                    </div>
                                </div>

                                <div id="inputs">                  

                                    <div>
                                        <h5>Descripción de la reunión:</h5>
                                        <input name="Descripcion_reunion" type="text" placeholder="Descripcion reunion"
                                            value={values.Descripcion_reunion}
                                            onChange={handleChange}
                                        />

                                    </div>

                                </div>



                                <div id="inputs">

                                    <div>
                                        <h5>Fecha de la reunión:</h5>
                                        <input name="fecha_reunion" type="text" placeholder="fecha reunion"
                                            value={values.fecha_reunion}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div>
                                        <h5>Hora de la reunión:</h5>
                                        <input name="hora_reunion" type="text" placeholder="hora reunion"
                                            value={values.hora_reunion}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div>
                                        <h5>Lugar de la reunión:</h5>
                                        <input name="lugar_reunion" type="text" placeholder="lugar reunion"
                                            value={values.lugar_reunion}
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