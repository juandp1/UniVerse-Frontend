import LateralNavBar from "../Component/LateralNavBar";
import Navbar from "../Component/NavBar";
import Head from "next/head";
import Reunion from "universe/Component/Reunion";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { date } from "yup";
import { GetServerSideProps } from "next/types";
import nookies from "nookies";
import { ToastContainer, toast } from "react-toastify";
import style from "/styles/ReunionesStyle.module.css";
import Cookies from "js-cookie";
import ConfirmacionRecuadro from "universe/Component/ConfirmacionRecuadro";

export const getServerSideProps: GetServerSideProps = async (context) => {
	context.res.setHeader("Cache-Control", "no-store, must-revalidate");
	const token = nookies.get(context).token;

	if (!token) {
		//Si no esta logeado lo redirige al Login
		return {
			redirect: {
				destination: "/Login",
				permanent: false,
			},
		};
	}

	//Si esta logeado le muestra la pagina
	return {
		props: {}, // Muestra la pagina
	};
};

const colorIcon = "#61EB8D";
var id_reunion: number;

export default function ReunionesAnteriores() {
	const [confirmacion, setConfirmacion] = useState(false);
	const stateConfirmacion = () => {
		setConfirmacion(!confirmacion);
		toggle();
	};
	const [Reuniones, setReuniones] = useState([
		{
			id: 0,
			name: "",
			description: "",
			place: "",
			date: "",
			community_id: 0,
			author_id: 0,
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
					console.log(data);
					setReuniones(data["meetings"]);
				}
			} catch (error: any) {
				console.error("Error:", error);
				alert(error.message);
			}
		};
		fetchData();
	}, []);


	//MENSAJE AL INTENTAR EDITAR UNA REUNIÓN PASADA
	const editarReunion = () => {
		toast.success("Lo siento, no puedes editar una reunión que ya pasó :(", {
		position: "top-center",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "light",
		className: style.toast_success_doc,
		});
		toggle();
	};


	const eliminarReunion = (reunion_ID: number) => {
		id_reunion = reunion_ID;
		stateConfirmacion();
	};
	const deleteReunion = async () => {
		try {
			const res = await fetch("http://localhost:3333/api/meeting/id/" + id_reunion, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${Cookies.get("token")}`,
				},
			});

			if (res.ok) {
				console.log("Error:", "Se ha eliminado la reunión de forma correcta");
				alert("Se ha eliminado la reunión de forma correcta");
				stateConfirmacion();
			} else {
				throw new Error("ha sucedido un error al elimianr la reunión");
			}
		} catch (error: any) {
			console.error("Error:", error);
			alert(error.message);
		}
		toggle();
	};

	// FUNCION TOGGLE  se encarga de desvanecer el fondo cuando se despliega un formulario
	const toggle = () => {
		var blurMain = document.getElementById("main");
		blurMain?.classList.toggle("active");
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
						{Reuniones.map((item, index) => {
							return (
								<Reunion
									key={index}
									idReunion={item.id}
									nombreReunion={item.name}
									descripcion_reunion={item.description}
									lugar_reunion={item.place}
									fecha_reunion={item.date}
									editar={editarReunion}
									eliminar={eliminarReunion}
								></Reunion>
							);
						})}
					</div>
				</div>
				{/*Agrego los componentes dentro del header*/}
			</main>

			{confirmacion ? (
				<div className="modalOverlay">
					<ConfirmacionRecuadro
						name={"Reunión"}
						eliminar={deleteReunion}
						cerrar={stateConfirmacion}
					></ConfirmacionRecuadro>
				</div>
			) : null}
		</>
	);
}
