import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import style from "/styles/PropuestasDocumentosStyles.module.css";

interface Props {
	//tipoDocumento: String;
	id: number;
	tituloDocumento: String;
	descripcionDocumento: String;
	//documento: String;
}

function PropuestaDocumento({ id, tituloDocumento, descripcionDocumento }: Props): JSX.Element {
	const aceptar = async (idDocumento: number) => {
		try {
			const res = await fetch(

				`${process.env.URL_API_BACKEND}/api/community/` + localStorage.getItem("comunidad_ID") + "/accept_document",

				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
					body: JSON.stringify({ document_id: idDocumento }),
				}
			);
			console.log(idDocumento);
			console.log(await res.json());
			if (res.ok) {
			} else {
				throw new Error("ha sucedido un error al crear la comunidad");
			}
		} catch (error: any) {
			console.error("Error:", error);
			alert(error.message);
		}
	};
	const rechazar = async (idDocumento: number) => {
		try {
			const res = await fetch(

				`${process.env.URL_API_BACKEND}/api/community/` + localStorage.getItem("comunidad_ID") + "/reject_document",

				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
					body: JSON.stringify({ document_id: idDocumento }),
				}
			);

			if (res.ok) {
			} else {
				throw new Error("ha sucedido un error al crear la comunidad");
			}
		} catch (error: any) {
			console.error("Error:", error);
			alert(error.message);
		}
	};
	return (
		<>
			<div className={style.square_documento}>
				<div className="flex justify-center space-x-10" style={{ position: "absolute", left: "70px", top: "55px" }}>
					<img
						src="./images/ejercicioDocumento.png"
						alt="ejercicioDocumento"
						style={{ width: "49px", height: "46px", marginTop: "3px" }}
					/>
					<h1 className={style.font}>{tituloDocumento}</h1>
				</div>
				<div className={style.minisquare_documento}>
					<div className="flex justify-center space-x-10" style={{ gap: "150px", marginTop: "33px" }}>
						<button className={style.botones} onClick={() => aceptar(id)}>
							Aceptar
						</button>
						<button className={style.botones} onClick={() => rechazar(id)}>
							Rechazar
						</button>
					</div>
				</div>

				<div className={style.minisquare_descripcion}>
					<h3 className={style.descripcion}>{descripcionDocumento}</h3>
				</div>
			</div>
		</>
	);
}

export default PropuestaDocumento;
