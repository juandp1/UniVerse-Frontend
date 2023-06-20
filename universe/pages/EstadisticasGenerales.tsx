import { useState, useEffect } from "react";
import LateralNavBar from "../Component/LateralNavBar";
import Navbar from "../Component/NavBar";
import Head from "next/head";
import * as Bsicon from "react-icons/bs";
import * as Aiicon from "react-icons/ai";

const colorIcon = "#61EB8D";
export default function EstadisticasComunidad() {
	const [numUsersPerComm, setNumUsers] = useState(0);

	useEffect(() => {
		const fetchNumUsers = async () => {
			try {
				const res = await fetch("https://universe-backend.azurewebsites.net/api/statistics/num_users_per_comm", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				});
				if (res.ok) {
					const data = await res.json();
					console.log(data);
				} else {
					console.log(await res.json());
					throw new Error("Error fetching number of users");
				}
			} catch (error) {
				console.error("Error:", error);
			}
		};

		fetchNumUsers();
	}, []);

	return (
		<>
			<Head>
				<title>Universe</title>
			</Head>
			<main>
				<Navbar></Navbar>

				<div className="principal_Content_withoutLateralNavbar">
					<div className={`flex items-center space-x-3 ml-10`}>
						<Aiicon.AiOutlineLineChart size={"170px"} color={colorIcon} />
						<div style={{ display: "flex", flexDirection: "column" }}>
							<h2 style={{ alignSelf: "flex-start" }}>Estadisticas de la pagina universe</h2>
							<h4 style={{ alignSelf: "flex-start" }}>Conoce los numeros mas importantes de universe</h4>
						</div>
					</div>

					<h3 style={{ alignSelf: "flex-start", marginTop: "15px", marginLeft: "60px", marginBottom: "20px" }}>
						Aquí encontraras información como el número de usuarios en cada comunidad de universe y las comunidades que
						hay por cada materia
					</h3>

					<div className="flex flex-wrap justify-center">
						<div className="container">
							<h3 style={{ marginTop: "15px", marginLeft: "10px" }}>Número de usuarios en cada comunidad</h3>
							<div className="flex justify-center items-center h-60">
								<h1>{numUsersPerComm}</h1>
							</div>
						</div>

						<div className="container">
							<h3 style={{ marginTop: "15px", marginLeft: "10px" }}>Comunidades por materia</h3>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
