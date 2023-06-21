import Head from "next/head";
import style from "/styles/DocumentosTema.module.css";
import * as Faicon from "react-icons/fa";
import * as IoIcon from "react-icons/io";
import * as HiIcon from "react-icons/hi";
import LateralNavBar from "universe/Component/LateralNavBar";
import Navbar from "universe/Component/NavBar";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Formik } from "formik";
import TarjetaDocumento from "universe/Component/TarjetaDocumento";
import { ReactSVG } from "react-svg";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { type } from "os";
import ConfirmacionRecuadro from "universe/Component/ConfirmacionRecuadro";

const colorIcon = "#61EB8D";
interface Documento {
	name: string;
	description: string;
	file: string;
	type: string;
}
interface Options {
	value: string;
	text: string;
}
interface DocumentResponse {
	name: string;
	id: number;
	description: string;
	file: string;
	type: string;
	administrator_id: number;
}

const optionsType: Options[] = [
	{
		value: "libro",
		text: "Libro",
	},
	{
		value: "examen",
		text: "Examen",
	},
	{
		value: "ejercicio",
		text: "Ejercicio",
	},
];
var document_id:number
var document_name:string

export default function DocumentosTema() {
	const [Topic_id, setTopic_id] = useState<string | null>("");
	const [Community_id, setCommunity_id] = useState<string | null>("");
	const [isAdmin, setIsAdmin] = useState(false);
	const [showFormAñadirDocumento, setShowFormAñadirDocumento] = useState(false);
	const statusShowFormAñadirDocumento = () => {
		setShowFormAñadirDocumento(!showFormAñadirDocumento);
		toggle()
	}


	const [file, setFile] = useState<File | null>(null);
	const [Documentos, setDocumentos] = useState<DocumentResponse[]>([]);
	const [optionType, setOptionType] = useState<string | null>("libro");
	const [confirmacionEliminacion, setConfirmacionEliminacion] = useState(false)
	const [actualizacion, setActualizacion] = useState(0);
	const newActualizacion = () => {
		setActualizacion(actualizacion + 1);
	};
	const stateConfirmacionEliminacion = () => {
		setConfirmacionEliminacion(!confirmacionEliminacion)
		toggle()
	}
	const toggle = () => {
		var blurMain = document.getElementById("main");
		blurMain?.classList.toggle("active");
		
	};
	const eliminarDocumento = (id: number,name_documento: string) => {
        document_id = id
        document_name = name_documento
        stateConfirmacionEliminacion()
    }

	useEffect(() => {
		setTopic_id(localStorage.getItem("Topic"));
	}, []);
	useEffect(() => {
		setIsAdmin(localStorage.getItem("is_Admin") == "1");
	}, []);
	useEffect(() => {
		setCommunity_id(localStorage.getItem("comunidad_ID"));
	}, []);

	//FUNCION PARA TRAER TODOS LOS DOCUMENTOS APENAS CARGA LA PAGINA
	useEffect(() => {
		const fetchData = async () => {
			// se trae la informacion de los documentos que existen al entrar a la pagina
			//setIsLoading(true)
			try {
				const res = await fetch(
					"https://universe-backend.azurewebsites.net/api/topic/" + (localStorage.getItem("Topic") ?? "0") + "/documents",
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${localStorage.getItem("token")}`,
						},
					}
				);
				if (res.ok) {
					const data = await res.json();

					setDocumentos(data["documents"]);
				} else {
					console.log(await res.json());
				}
			} catch (error: any) {
				console.error("Error:", error);
				alert(error.message);
			}
		};
		fetchData();
	}, [actualizacion]);

	const deleteDocumento = async () => {
		/**funcion para la creacion de un tema en el backend */
		try {
			const res = await fetch("https://universe-backend.azurewebsites.net/api/community/"+localStorage.getItem("comunidad_ID")+"/delete_document/"+document_id, {
				method: "DELETE",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				}
			});
			if (res.ok) {
				console.log("Success:", "se ha eliminado el documento de forma correcta ");
				toast.success('El documento ha sido eliminado', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    className: "toast_success_doc"

                });
                newActualizacion();
			} else {
				console.log(res.json())
				
			}
		} catch (error: any) {
			console.error("Error:", error);
			alert(error.message);
		}
		stateConfirmacionEliminacion()

		
	};

	const crearDocumento = async (values: Documento) => {
		if (file === null) {
			console.error("Error: no ha ingresado ningun archivo");
			toast.warning("No ha subido cargado ningun archivo", {
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
			return;
		}

		let reader = new FileReader();
		reader.readAsText(file);
		reader.onload = async () => {
			try {
				const res = await fetch("https://universe-backend.azurewebsites.net/api/community/" + Community_id + "/documents", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
					body: JSON.stringify({
						name: values.name,
						description: values.description,
						file: reader.result,
						type: optionType,
						topic_id: Topic_id,
						administrator_id: null,
					}),
				});
				if (res.ok) {
					statusShowFormAñadirDocumento();
					toast.success("El documento ha sido añadido correctamente", {
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
					
				} else {
					console.log(await res.json());
				}
			} catch (error: any) {
				console.error("Error:", error);
				alert(error.message);
			}
		};

		reader.onerror = () => {
			console.error("Error: " + reader.error);
		};
	};

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const fileList = event.target.files;
		if (fileList) {
			setFile(fileList[0]);
		}
		console.log(file);
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
						<HiIcon.HiDocumentText size={"80px"} color={colorIcon} />
						<div style={{ display: "flex", flexDirection: "column" }}>
							<h2 style={{ alignSelf: "flex-start" }}>Documentos</h2>
							<h5 style={{ alignSelf: "flex-start" }}>
								Selecciona los documentos que quieras ver del tema que seleccionaste
							</h5>
						</div>
					</div>
					<div className="flex flex-wrap " style={{ marginTop: "15px" }}>
						{Documentos.map((item, index) => {
							return (
								<TarjetaDocumento
									key={item.id}
									idDocument={item.id}
									DocumentName={item.name}
									descripcion={item.description}
									docType={item.type}
									eliminar={eliminarDocumento}
								></TarjetaDocumento>
							);
						})}
						
				</div>

				<div className="corner_Content">
					<div className="flex items-center justify-end space-x-3">
						<div className="button_crear" onClick={statusShowFormAñadirDocumento}>
							<HiIcon.HiOutlineDocumentAdd size={"60px"} color={colorIcon} />
						</div>
					</div>
				</div>
			</div>
			{/**aqui empieza el formulario que aparecera sobre todo el contenido de la pagina en ese momento */}
		</main >
			<ToastContainer position="top-right" className={style.success_notification} />
			{confirmacionEliminacion ? (
				<ConfirmacionRecuadro
					mensaje="Estas apunto de eliminar el documento"
					name={document_name}
					eliminar={deleteDocumento}
					cerrar={stateConfirmacionEliminacion}
				></ConfirmacionRecuadro>
			) : null}
	{
		showFormAñadirDocumento ? (
			<div>
				<Formik
					initialValues={{
						name: "",
						description: "",
						file: "",
						type: "",
					}}
					onSubmit={async (values) => {
						crearDocumento(values);

						//alert(JSON.stringify(values));
					}}
				>
					{({ handleSubmit, values, handleChange }) => (
						<form id="login" onSubmit={handleSubmit}>
							<div id="encabezado">
								<IoIcon.IoMdClose size={"25px"} onClick={statusShowFormAñadirDocumento} id="close" />

								<div>
									<HiIcon.HiDocumentText size={"60px"} color={"#1D3752"} />
									{isAdmin ? <h2>Añadir Documento</h2> : <h2>Proponer Documento</h2>}
								</div>
								<div>
									{isAdmin ? (
										<button type="submit">
											<h3>Añadir</h3>
										</button>
									) : (
										<button type="submit">
											<h3>Proponer</h3>
										</button>
									)}
								</div>
							</div>
							<div id="inputs">
								<div>
									<h5>Titulo:</h5>
									<input name="name" type="text" placeholder="Titulo" value={values.name} onChange={handleChange} />
									<h5>Descripcion:</h5>
									<input
										name="description"
										type="text"
										placeholder="Descripcion"
										value={values.description}
										onChange={handleChange}
									/>
								</div>
								{/**segunda columna del formulario esi es necesario */}
								<div>
									<h5>Archivo:</h5>
									<input
										name="file"
										type="file"
										//value={values.file}
										onChange={handleFileChange}
										placeholder="Subir"
										content="Subir"
									/>

									<h5>Tipo de Archivo:</h5>
									<div className={style.SelectType}>
										<Select
											// If you don't need a state you can remove the two following lines value & onChange
											placeholder="Tipo"
											onChange={(option: Options | null) => {
												if (option != null) {
													setOptionType(option.value);
												}
											}}
											getOptionLabel={(option: Options) => option.text}
											getOptionValue={(option: Options) => option.value}
											options={optionsType}
											isSearchable={false}
										/>
									</div>
								</div>
							</div>
						</form>
					)}
				</Formik>
			</div>
		) : null
	}
		</>
	);
}
