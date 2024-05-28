import { useState, useEffect } from "react";
import LateralNavBar from "../Component/LateralNavBar";
import Navbar from "../Component/NavBar";
import Head from "next/head";
import * as Bsicon from "react-icons/bs";
import * as Aiicon from "react-icons/ai";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label} from 'recharts';

const colorIcon = "#61EB8D";

interface UserPerComm {
	name: string;
	users: number;
}
export default function EstadisticasComunidad() {
	const [numUsersPerComm, setNumUsers] = useState<UserPerComm[]>([]);

	useEffect(() => {
		const fetchNumUsers = async () => {
			try {
				const res = await fetch("http://127.0.0.1:3333/api/statistics/num_users_per_comm", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				});
				if (res.ok) {
					const data = await res.json();
					// Convertir el objeto a un array de objetos para usar con Recharts
					const dataArray = Object.keys(data).map(key => ({ name: key, users: data[key] }));
					setNumUsers(dataArray);
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
						Aquí encontraras el número de usuarios en cada comunidad de universe
					</h3>

					<div className="flex flex-wrap justify-center">
						<div className="containerChart">
							<h3>Número de usuarios en cada comunidad</h3>
							<div className="flex justify-center items-center" style={{ marginTop: "60px" }}>
								<BarChart
									width={1200}
									height={600}
									data={numUsersPerComm}
									margin={{
										top: 5, right: 30, left: 20, bottom: 30,
									}}
								>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="name">
										<Label value="Comunidad" offset={-5} position="insideBottom" style={{ fill: 'black' }} />
									</XAxis>
									<YAxis>
										<Label angle={-90} value="Número de usuarios" position="insideLeft" style={{ textAnchor: 'middle', fill: 'black' }} />
									</YAxis>
									<Tooltip />
									<Bar dataKey="users" fill="#A9E9DF" />
								</BarChart>
							</div>
						</div>

					</div>
				</div>
			</main>
		</>
	);
}
