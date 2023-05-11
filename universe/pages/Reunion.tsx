import { Inter } from 'next/font/google'
import LateralNavBar from '../Component/LateralNavBar'
import Navbar from '../Component/NavBar'
import Head from 'next/head';
import style from "/styles/ReunionesStyle.module.css";
import TipoReunion from 'universe/Component/TipoReunion';

export default function Reunion() {
    return (
        <>
            <Head>
                <title>Universe</title>
            </Head>
            <header>
                <Navbar></Navbar>
                <LateralNavBar></LateralNavBar>
                {/*Agrego los componentes dentro del header*/}

            </header>

            <main>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src="./images/camera-meetings.png" alt="camera" style={{ marginRight: '10px' }}/>
                    <h1>Reuniones</h1>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{position: 'absolute', left: '17%', top: '27%'}}>
                        <TipoReunion></TipoReunion>
                    </div>
                    <div style={{position: 'absolute', left: '55%', top: '27%'}}>
                        <TipoReunion></TipoReunion>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src="./images/add.png" alt="add" className={style.add_image}/>
                    <h1 className={style.add_text}>Crear nueva reunión</h1>
                </div>
            </main>
        </>

    )
}