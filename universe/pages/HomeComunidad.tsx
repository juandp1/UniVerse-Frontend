import Head from "next/head";
import * as Fiicon from 'react-icons/fi';
import LateralNavBar from "universe/Component/LateralNavBar";
import Navbar from "universe/Component/NavBar";
import style from "/styles/homeComunidadStyles.module.css";
import { useRouter } from 'next/router';

const colorIcon = "#61EB8D"

export default function HomeComunidad() {
    const router = useRouter();

    const Reuniones = () => {
        router.push('/Reunion');
    };

    const Foro = () => {
        router.push('/Foro');
    };

    const Enciclopedia = () => {
        router.push('/Enciclopedia');
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
                        <Fiicon.FiDatabase size={"100px"} color={colorIcon} />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <h2 style={{ alignSelf: 'flex-start' }}>Bases de datos</h2>
                            <h4 style={{ alignSelf: 'flex-start' }}>Categoría/materia: (Categoría de la comunidad)</h4>
                        </div>
                    </div>

                    <h6 style={{ alignSelf: 'flex-start', marginTop: '15px', marginLeft: '10px' }}>
                        Descripción: (Descripción de la comunidad)
                    </h6>

                    <h2 style={{ alignSelf: 'flex-start', marginTop: '20px', marginLeft: '10px' }}>
                        Novedades
                    </h2>

                    <div className={style.container}>
                        <h3>Proximas reuniones</h3>
                        <div className={style.rectangle}>
                            <div className={style.logo}></div>
                            <button onClick={Reuniones}>Apuntarse</button>
                        </div>
                        <h3>Ultimo tema añadido por el administrador de la comunidad</h3>
                        <div className={style.rectangle}>
                            <div className={style.logo}></div>
                        
                            <button onClick={Enciclopedia}>Ver tema y documentos añadidos</button>
                        </div>
                    </div>

                    <div className={style.container}>
                    <h3>Ultima duda añadida</h3>
                        <div className={style.rectangle}>
                            <div className={style.logo}></div>
                            <button onClick={Foro}>Ver</button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}