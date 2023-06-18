import LateralNavBar from "../Component/LateralNavBar";
import Navbar from "../Component/NavBar";
import Head from "next/head";
import Reunion from "universe/Component/Reunion";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { GetServerSideProps } from "next/types";
import nookies from "nookies";
import { Formik } from "formik";
import style from "/styles/ReunionesStyle.module.css";
import * as IoIcon from "react-icons/io";
import * as HiIcon from "react-icons/hi";
import ConfirmacionRecuadro from "universe/Component/ConfirmacionRecuadro";
import { number } from "yup";

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

interface Reunion {
	nombreReunion: string;
	descripcion_reunion: string;
	fecha_reunion: string;
	hora_reunion: string;
	lugar_reunion: string;
}

const colorIcon = "#61EB8D";
var id_reunion: number;

export default function ProximasReuniones() {
	//VARIABLES USE STATE

	const [confirmacion, setConfirmacion] = useState(false);
	const stateConfirmacion = () => {
		setConfirmacion(!confirmacion);
		toggle();
	};
	const [formEditar, setformEditar] = useState(false);
	const stateformEditar = () => setformEditar(!formEditar);

	const [Community_id, setCommunity_id] = useState<string | null>("");
	useEffect(() => {
		setCommunity_id(localStorage.getItem("comunidad_ID"));
	}, []);

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

	//FUNCIÓN PARA TRAER TODAS LAS PRÓXIMAS REUNIONES APENAS CARGA LA PÁGINA
	useEffect(() => {
		const fetchData = async () => {
			// se trae la información de las reuniones que existen al entrar a la página.
			try {
				let referenceDate = new Date();
				const initialDate = `${referenceDate.getFullYear()}-${
					referenceDate.getMonth() + 1 // Get Month devuelve de 0 a 11, por eso se le suma 1
				}-${referenceDate.getDate()} ${referenceDate.getHours()}:${referenceDate.getMinutes()}:${referenceDate.getSeconds()}`;
				const finalDate = `${referenceDate.getFullYear()}-${
					referenceDate.getMonth() + 2 // Get Month devuelve de 0 a 11, por eso se le suma 2 (indicar hasta el mes siguiente a la fecha)
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

	//EDICION DE LA REUNIÓN
	const editarReunion = (id: number) => {
		id_reunion = id;
		stateformEditar();
		toggle();
	};

	const cerrarEdicion = () => {
		stateformEditar();
		toggle();
	};

	//UPDATE REUNION
	const updateReunion = async (values: Reunion) => {
		const dateTime = values.fecha_reunion + " " + values.hora_reunion + ":00.000000";
		try {
			const res = await fetch("http://localhost:3333/api/meetings/community/" + Community_id, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${Cookies.get("token")}`,
				},
				body: JSON.stringify({
					name: values.nombreReunion,
					description: values.descripcion_reunion,
					place: values.lugar_reunion,
					date: dateTime,
				}),
			});

			if (res.ok) {
			} else {
				throw new Error("ha sucedido un error al editar la reunión");
			}
		} catch (error: any) {
			console.error("Error:", error);
			alert(error.message);
		}
		stateformEditar();
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
						<h1>Próximas Reuniones</h1>
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

			{formEditar ? (
				<div>
					<Formik
						initialValues={{
							nombreReunion: "",
							descripcion_reunion: "",
							fecha_reunion: "",
							hora_reunion: "",
							lugar_reunion: "",
						}}
						onSubmit={async (values) => {
							updateReunion(values);
							//alert(JSON.stringify(values));
						}}
					>
						{({ handleSubmit, values, handleChange }) => (
							<form onSubmit={handleSubmit}>
								<div id="encabezado">
									<IoIcon.IoMdClose size={"25px"} onClick={toggle} id="close" />

									<div>
										<HiIcon.HiFolderAdd size={"60px"} color={"#1D3752"} />
										<h2>Editar una reunión</h2>
									</div>
									<div>
										<button type="submit">
											<h3>Editar</h3>
										</button>
									</div>
								</div>

								<div id="inputs">
									<div>
										<h5>Nombre de la reunión:</h5>
										<input
											name="nombreReunion"
											type="text"
											placeholder="Nombre Reunion"
											value={values.nombreReunion}
											onChange={handleChange}
										/>

										<h5>Descripción de la reunión:</h5>
										<input
											name="descripcion_reunion"
											type="text"
											placeholder="descripcion reunion"
											value={values.descripcion_reunion}
											onChange={handleChange}
										/>
										<h4 className="my-5">Detalles del encuentro</h4>

										<div className={style.Detalles_Reunion}>
											<div>
												<input
													id="Detalles_Encuentro"
													name="fecha_reunion"
													type="date"
													placeholder="Fecha reunion"
													value={values.fecha_reunion}
													onChange={handleChange}
												/>
												<label>Fecha de la reunión:</label>
											</div>
											<div>
												<input
													name="hora_reunion"
													type="time"
													placeholder="Hora reunion"
													value={values.hora_reunion}
													onChange={handleChange}
												/>
												<label>Hora de la reunión:</label>
											</div>

											<div>
												<input
													name="lugar_reunion"
													type="text"
													placeholder="Lugar reunion"
													value={values.lugar_reunion}
													onChange={handleChange}
												/>
												<label>Lugar de la reunión:</label>
											</div>
										</div>
									</div>
								</div>
							</form>
						)}
					</Formik>
				</div>
			) : null}
		</>
	);
}
