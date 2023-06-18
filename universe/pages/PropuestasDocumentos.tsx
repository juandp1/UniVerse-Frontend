import LateralNavBar from "../Component/LateralNavBar";
import Navbar from "../Component/NavBar";
import Head from "next/head";
import PropuestaDocumento from "universe/Component/PropuestaDocumento";
import style from "/styles/PropuestasDocumentosStyles.module.css";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Cookies from "js-cookie";

interface DocumentResponse {
	name: string;
	id: number;
	description: string;
	file: string;
	type: string;
	administrator_id: number;
}


export default function PropuestasDocumentos() {
  
  const [PropuestasDocumentos, setPropuestasDocumentos] = useState<DocumentResponse[]>([])

//FUNCIÓN PARA TRAER TODAS LAS PROPUESTAS DE DOCUMENTOS APENAS CARGA LA PÁGINA
  useEffect(() => {
    const fetchData = async () => { // se trae la información de las propuestas de documentos que existen al entrar a la página.
        try {
            const res = await fetch('http://localhost:3333/api/community/<int:comm_id>/propouse', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('token')}`
                }
            });
            if (res.ok) {
                const data = await res.json();
                setPropuestasDocumentos(data["documents"])
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
          {PropuestasDocumentos.map((item, index) => {
							return (
                <PropuestaDocumento key={index} id={item.id} tituloDocumento={item.name} descripcionDocumento={item.description}></PropuestaDocumento>
								
							);
						})}

            <PropuestaDocumento id={50} tituloDocumento={"Ejercicio 8.8"} descripcionDocumento={"Ejercicio de ley de Gauss"}></PropuestaDocumento>
          </div>
        </div>
        {/*Agrego los componentes dentro del header*/}
      </main>
    </>
  );
}