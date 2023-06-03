import LateralNavBar from "../Component/LateralNavBar";
import Navbar from "../Component/NavBar";
import Head from "next/head";
import PropuestaDocumento from "universe/Component/PropuestaDocumento";
import style from "/styles/PropuestasDocumentosStyles.module.css";

export default function PropuestasDocumentos() {

  return (
    <>
      <Head>
        <title>Universe</title>
      </Head>

      <main id="main">
        <Navbar></Navbar>
        <LateralNavBar></LateralNavBar>

        <div className="principal_Content">
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src="./images/Documentos_verde.png" alt="Documentos" style={{ marginRight: "10px", width: "100px", height: "auto" }}/>
                <div>
                    <h1 className={style.font}>Propuestas de Documentos</h1>
                    <h3 className={style.font_subtitulo}>5 documentos pendientes por verificar.</h3>
                </div>
            </div>
          <div>
            <PropuestaDocumento></PropuestaDocumento>
            <PropuestaDocumento></PropuestaDocumento>
            <PropuestaDocumento></PropuestaDocumento>
            <PropuestaDocumento></PropuestaDocumento>
            <PropuestaDocumento></PropuestaDocumento>
          </div>
        </div>
        {/*Agrego los componentes dentro del header*/}
      </main>
    </>
  );
}