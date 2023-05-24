import Head from "next/head";
import * as Fcicon from 'react-icons/fc';
import * as Bsicon from "react-icons/bs";
import * as Faicon from 'react-icons/fa';
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
                        <Bsicon.BsFillLightningFill size={"100px"} color={colorIcon} />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <h2 style={{ alignSelf: 'flex-start' }}>Fundamentos de electricidad y magnetismo</h2>
                            <h4 style={{ alignSelf: 'flex-start' }}>Categoría/materia: (Categoría de la comunidad)</h4>
                        </div>
                    </div>

                    <h3 style={{ alignSelf: 'flex-start', marginTop: '15px', marginLeft: '10px' }}>
                        Descripción: (Descripción de la comunidad)
                    </h3>


                    <h2 style={{ alignSelf: 'flex-start', marginTop: '20px', marginLeft: '10px' }}>
                        Novedades
                    </h2>
                </div>
                <div className={style.container}>
                    <div className={style.leftContainer}>

                        <div className="flex items-center justify-start space-x-3">
                            <Bsicon.BsFillCameraVideoFill size={"60px"} color={colorIcon} />
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <h3 style={{  textAlign: 'center' }}>Proximas reuniones</h3>
                            </div>
                        </div>
                        <div className={style.rectangle}>
                            <button className={style.rectangleButton} onClick={Reuniones}>Apuntarse</button>
                        </div>



                        <div className="flex items-center justify-start space-x-3">
                            <Bsicon.BsFillQuestionCircleFill size={"60px"} color={colorIcon} />
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <h3 style={{ textAlign: 'center' }}>Ultima duda añadida</h3>
                            </div>
                        </div>
                        <div className={style.rectangle}>

                            <button className={style.rectangleButton} onClick={Foro}>Ver</button>
                        </div>
                    </div>



                    <div className={style.rightContainer}>

                        <div className="flex items-center justify-start space-x-3">
                            <Faicon.FaBookOpen size={"70px"} color={colorIcon} />
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <h3 style={{ textAlign: 'center' }}>Ultimo tema añadido por el administrador de la comunidad</h3>
                            </div>
                        </div>

                        <div className={style.rectangle}>
                            <button className={style.rectangleButton} onClick={Enciclopedia}>Ver tema y documentos añadidos</button>
                        </div>
                    </div>
                </div>

            </main>
        </>
    )
}
