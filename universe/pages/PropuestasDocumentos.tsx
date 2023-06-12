import LateralNavBar from "../Component/LateralNavBar";
import Navbar from "../Component/NavBar";
import Head from "next/head";
import PropuestaDocumento from "universe/Component/PropuestaDocumento";
import style from "/styles/PropuestasDocumentosStyles.module.css";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function PropuestasDocumentos() {
  const [PropuestasDocumentos, setPropuestasDocumentos] = useState([{
    tipoDocumento: '',
    tituloDocumento: '',
    descripcionDocumento: '',
    Documento: ''
  }])

//FUNCIÓN PARA TRAER TODAS LAS PROPUESTAS DE DOCUMENTOS APENAS CARGA LA PÁGINA
  useEffect(() => {
    const fetchData = async () => { // se trae la información de las propuestas de documentos que existen al entrar a la página.
        try {
            const res = await fetch('/api/propuestasDocumentos', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res.ok) {
                const data = await res.json();
                setPropuestasDocumentos(data)
            }
        } catch (error: any) {
            console.error('Error:', error);
            alert(error.message);
        }

    }
    fetchData();
  }, []);

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
            <PropuestaDocumento tituloDocumento={"Ejercicio 8.8"} descripcionDocumento={"Ejercicio de ley de Gauss"}></PropuestaDocumento>
            <PropuestaDocumento tituloDocumento={"Ejercicio 8.9"} descripcionDocumento={"Ejercicio de ley de Gauss difícil xd"}></PropuestaDocumento>
            <PropuestaDocumento tituloDocumento={"Libro - ley de Gauss"} descripcionDocumento={"Libro completo"}></PropuestaDocumento>
            <PropuestaDocumento tituloDocumento={"clase ley de Gauss"} descripcionDocumento={"Diapositivas en pdf de la explicación del profe"}></PropuestaDocumento>
          </div>
        </div>
        {/*Agrego los componentes dentro del header*/}
      </main>
    </>
  );
}