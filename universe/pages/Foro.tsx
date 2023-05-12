
import LateralNavBar from '../Component/LateralNavBar'
import Navbar from '../Component/NavBar'
import Head from 'next/head';
import style from "/styles/ForoStyles.module.css";

export default function Foro() {
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
                    <img src="./images/foro.png" alt="camera" className={style.img}/>
                    <div>
                        <h1 className={style.title_tema}>Nombre del tema</h1>
                    </div>
                </div>
            </main>

        </>

    )
}
