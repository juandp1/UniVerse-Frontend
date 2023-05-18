
import LateralNavBar from '../Component/LateralNavBar'
import Navbar from '../Component/NavBar'
import PreguntaForo from '../Component/PreguntaForo'
import Head from 'next/head';
import style from "/styles/ForoStyles.module.css";
import Link from 'next/link';

export default function ForoPreguntas() {
    return (
        <>
            <Head>
                <title>Universe</title>
            </Head>


            <main>
                <Navbar></Navbar>
                <LateralNavBar></LateralNavBar>
                <div className='principal_Content'>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src="./images/foro.png" alt="camera" className={style.img} />
                        <div>
                            <h1 className={style.title_tema}>Nombre del tema</h1>
                        </div>
                    </div>
                    <div className={style.scroll_container}>
                        <PreguntaForo></PreguntaForo>
                        <PreguntaForo></PreguntaForo>
                        <PreguntaForo></PreguntaForo>
                        <PreguntaForo></PreguntaForo>

                    </div>

                    <Link href='/CrearPregunta' className={style.add}>
                        <img src="./images/add.png" alt="add" className={style.add_image} />
                        <h1 className={style.add_text}>Crear nueva duda</h1>
                    </Link>


                </div>


            </main>

        </>

    )
}
