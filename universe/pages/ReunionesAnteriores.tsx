import LateralNavBar from "../Component/LateralNavBar";
import Navbar from "../Component/NavBar";
import Head from "next/head";
import Reunion from "universe/Component/Reunion";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { date } from "yup";

const colorIcon = "#61EB8D";

export default function ReunionesAnteriores() {
	const [Reuniones, setReuniones] = useState([
		{
			nombreReunion: "",
		},
	]);

	//FUNCIÓN PARA TRAER TODAS LAS REUNIONES ANTERIORES APENAS CARGA LA PÁGINA
	useEffect(() => {
		const fetchData = async () => {
			// se trae la información de las reuniones que existen al entrar a la página.
			try {
				let referenceDate = new Date();
				const initialDate = `${referenceDate.getFullYear()}-${
					referenceDate.getMonth() // Get Month devuelve de 0 a 11, por eso no se suma nada (indicar desde el mes anterior a la fecha)
				}-${referenceDate.getDate()} ${referenceDate.getHours()}:${referenceDate.getMinutes()}:${referenceDate.getSeconds()}`;
				const finalDate = `${referenceDate.getFullYear()}-${
					referenceDate.getMonth() + 1 // Get Month devuelve de 0 a 11, por eso se le suma 1
				}-${referenceDate.getDate()} ${referenceDate.getHours()}:${referenceDate.getMinutes()}:${referenceDate.getSeconds()}`;

				const res = await fetch(
					"http://localhost:3333/api/meetings/community/" + localStorage.getItem("comunidad_ID"),
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${localStorage.getItem("token")}`,
						},
						body: JSON.stringify({
							community_ID: localStorage.getItem("comunidad_ID"),
							initial_date: initialDate,
							final_date: finalDate,
						}),
					}
				);
				if (res.ok) {
					const data = await res.json();
					setReuniones(data);
					console.log(data);
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
					<div
						style={{
							position: "relative",
							display: "flex",
							alignItems: "center",
						}}
					>
						<img src="./images/camera-meetings.png" alt="camera" style={{ marginRight: "10px" }} />
						<h1>Reuniones Anteriores</h1>
					</div>
					<div>
						<Reunion
							idReunion={1}
							// nombreCreador={"Creador #1"}
							nombreReunion={"Reunion número uno"}
							descripcion_reunion={"Esta es la reunión número uno"}
							fecha_reunion={"2023/01/29"}
							// hora_reunion={"10:50pm"}
							lugar_reunion={"CyT"}
							editar={() => {}}
							eliminar={() => {}}
						></Reunion>
						<Reunion
							idReunion={2}
							// nombreCreador={"Creador #2"}
							nombreReunion={"Reunion número dos"}
							descripcion_reunion={"Esta es la reunión número dos"}
							fecha_reunion={"2023/01/29"}
							// hora_reunion={"10:50pm"}
							lugar_reunion={"CyT"}
							editar={() => {}}
							eliminar={() => {}}
						></Reunion>
						<Reunion
							idReunion={3}
							// nombreCreador={"Creador #3"}
							nombreReunion={"Reunion número tres"}
							descripcion_reunion={"Esta es la reunión número tres"}
							fecha_reunion={"2023/01/29"}
							// hora_reunion={"10:50pm"}
							lugar_reunion={"CyT"}
							editar={() => {}}
							eliminar={() => {}}
						></Reunion>
						<Reunion
							idReunion={4}
							// nombreCreador={"Creador #4"}
							nombreReunion={"Reunion número cuatro"}
							descripcion_reunion={"Esta es la reunión número cuatro"}
							fecha_reunion={"2023/01/29"}
							// hora_reunion={"10:50pm"}
							lugar_reunion={"CyT"}
							editar={() => {}}
							eliminar={() => {}}
						></Reunion>
						<Reunion
							idReunion={5}
							// nombreCreador={"Creador #5"}
							nombreReunion={"Reunion número cinco"}
							descripcion_reunion={"Esta es la reunión número cinco"}
							fecha_reunion={"2023/01/29"}
							// hora_reunion={"10:50pm"}
							lugar_reunion={"CyT"}
							editar={() => {}}
							eliminar={() => {}}
						></Reunion>
					</div>
				</div>
				{/*Agrego los componentes dentro del header*/}
			</main>
		</>
	);
}
