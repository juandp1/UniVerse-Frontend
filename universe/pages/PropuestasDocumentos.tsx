import LateralNavBar from "../Component/LateralNavBar";
import Navbar from "../Component/NavBar";
import Head from "next/head";
import PropuestaDocumento from "universe/Component/PropuestaDocumento";
import style from "/styles/PropuestasDocumentosStyles.module.css";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { GetServerSideProps } from "next/types";
import nookies from 'nookies';
import Cookies from "js-cookie";


export const getServerSideProps: GetServerSideProps = async (context) => {
    context.res.setHeader('Cache-Control', 'no-store, must-revalidate');
    const token = nookies.get(context).token;

    if (!token) {
        //Si no esta logeado lo redirige al Login
        return {
            redirect: {
                destination: '/Login',
                permanent: false,
            },
        };
    }

    //Si esta logeado le muestra la pagina 
    return {
        props: {}, // Muestra la pagina 
    };
};



interface DocumentResponse {
	name: string;
	id: number;
	description: string;
	file: string;
	type: string;
	administrator_id: number;
}

export default function PropuestasDocumentos() {
	const [PropuestasDocumentos, setPropuestasDocumentos] = useState<DocumentResponse[]>([]);

	//FUNCIÓN PARA TRAER TODAS LAS PROPUESTAS DE DOCUMENTOS APENAS CARGA LA PÁGINA
	useEffect(() => {
		const fetchData = async () => {
			// se trae la información de las propuestas de documentos que existen al entrar a la página.
			try {
				const res = await fetch(`https://universe-backend.azurewebsites.net/api/community/${localStorage.getItem("comunidad_ID")}/propose`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
				});

				if (res.ok) {
					const data = await res.json();
					console.log(data);
					console.log(data["documents"]);
					setPropuestasDocumentos(data["documents"]);
				}
			} catch (error: any) {
				console.error("Error:", error);
				alert(error.message);
			}
		};
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
					<div style={{ display: "flex", alignItems: "center" }}>
						<img
							src="./images/Documentos_verde.png"
							alt="Documentos"
							style={{ marginRight: "10px", width: "100px", height: "auto" }}
						/>
						<div>
							<h1 className={style.font}>Propuestas de Documentos</h1>
							<h3 className={style.font_subtitulo}>5 documentos pendientes por verificar.</h3>
						</div>
					</div>
					<div>
						{PropuestasDocumentos.map((item, index) => {
							return (
								<PropuestaDocumento
									key={index}
									id={item.id}
									tituloDocumento={item.name}
									descripcionDocumento={item.description}
								></PropuestaDocumento>
							);
						})}

					</div>
				</div>
				{/*Agrego los componentes dentro del header*/}
			</main>
		</>
	);
}
