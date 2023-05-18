import LateralNavBar from '../Component/LateralNavBar'
import Navbar from '../Component/NavBar'
import Head from 'next/head';
import style from "/styles/ForoStyles.module.css";
import TarjetaTemas from "universe/Component/TarjetaTemas";

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
                        <h1 className={style.title}>Foro</h1>
                        <h2 className={style.subtitle}>Selecciona un tema para acceder a su foro.</h2>
                    </div>
                </div>
                <div className="flex flex-wrap " style={{position: 'absolute', left: '120px', top: '210px'}}>
                        {/*Temas.map((item,index)=>{
                            return(
                                <TarjetaTemas name={item.nombreTema} ruta={"/DocumentosTema"}></TarjetaTemas>
                            )
                        })
                        */}
                        <TarjetaTemas name={"Ley de Gauss"} ruta={"/DocumentosTema"}></TarjetaTemas>
                        <TarjetaTemas name={"Ley de Gauss"} ruta={"/DocumentosTema"}></TarjetaTemas>
                        <TarjetaTemas name={"Ley de Gauss"} ruta={"/DocumentosTema"}></TarjetaTemas>
                        <TarjetaTemas name={"Ley de Gauss"} ruta={"/DocumentosTema"}></TarjetaTemas>
                        <TarjetaTemas name={"Ley de Gauss"} ruta={"/DocumentosTema"}></TarjetaTemas>
                        <TarjetaTemas name={"Ley de Gauss"} ruta={"/DocumentosTema"}></TarjetaTemas>
                        <TarjetaTemas name={"Ley de Gauss"} ruta={"/DocumentosTema"}></TarjetaTemas>
                        <TarjetaTemas name={"Ley de Gauss"} ruta={"/DocumentosTema"}></TarjetaTemas>
                        <TarjetaTemas name={"Ley de Gauss"} ruta={"/DocumentosTema"}></TarjetaTemas>
                        <TarjetaTemas name={"Ley de Gauss"} ruta={"/DocumentosTema"}></TarjetaTemas>
                    </div>
            </main>

        </>

    )
}