import { useState, useEffect } from "react";
import LateralNavBar from "../Component/LateralNavBar";
import Navbar from "../Component/NavBar";
import Head from "next/head";
import * as Bsicon from "react-icons/bs";
import Cookies from "js-cookie";
import { GetServerSideProps } from "next/types";
import nookies from 'nookies';

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
export default function EstadisticasComunidad() {
	const [numUsers, setNumUsers] = useState(0);
	const [numQuestions, setNumQuestions] = useState(0);
	const [numTopics, setNumTopics] = useState(0);

	useEffect(() => {
		const fetchNumUsers = async () => {
			try {
				const res = await fetch(
					"http://127.0.0.1:3333/api/statistics/users_per_comm/" + localStorage.getItem("comunidad_ID"),
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
					console.log(data);
					setNumUsers(data.num_users);
				} else {
					throw new Error("Error fetching number of users");
				}
			} catch (error) {
				console.error("Error:", error);
			}
		};

		const fetchNumQuestions = async () => {
			try {
				const res = await fetch(
					"http://127.0.0.1:3333/api/statistics/questions_per_comm/" + localStorage.getItem("comunidad_ID"),
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
					console.log(data);
					setNumQuestions(data.num_questions);
				} else {
					throw new Error("Error fetching number of questions");
				}
			} catch (error) {
				console.error("Error:", error);
			}
		};

		const fetchNumTopics = async () => {
			try {
				const res = await fetch(
					"http://127.0.0.1:3333/api/statistics/topics_per_comm/" + localStorage.getItem("comunidad_ID"),
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
					console.log(data);
					setNumTopics(data.num_topics);
				} else {
					throw new Error("Error fetching number of topics");
				}
			} catch (error) {
				console.error("Error:", error);
			}
		};

		fetchNumUsers();
		fetchNumQuestions();
		fetchNumTopics();
	}, []);

	return (
		<>
			<Head>
				<title>Universe</title>
			</Head>
			<main>
				<Navbar></Navbar>
				<LateralNavBar></LateralNavBar>
				<div className="principal_Content">
					<div className={`flex items-center space-x-3`}>
						<Bsicon.BsBarChartFill size={"150px"} color={colorIcon} />
						<div style={{ display: "flex", flexDirection: "column" }}>
							<h2 style={{ alignSelf: "flex-start" }}>Estadisticas de la comunidad</h2>
							<h4 style={{ alignSelf: "flex-start" }}>Conoce los numeros mas importantes de esta comunidad</h4>
						</div>
					</div>

					<h3 style={{ alignSelf: "flex-start", marginTop: "15px", marginLeft: "10px", marginBottom: "20px" }}>
						Aquí encontraras información como el número de usuarios en la comunidad, cuantas preguntas se han hecho en
						el foro o el numero de temas en la enciclopedia
					</h3>

					<div className="flex flex-wrap justify-center">
						<div className="container">
							<div className="justify-center items-center">
								<h3 style={{ marginTop: "15px" }}>Número de usuarios en la comunidad</h3>

								<div className="flex justify-center items-center h-60">
									<h1>{numUsers}</h1>
								</div>
							</div>
						</div>

						<div className="container">
							<div className="justify-center items-center">
								<h3 style={{ marginTop: "15px" }}>Número de temas en el foro</h3>

								<div className="flex justify-center items-center h-60">
									<h1>{numTopics}</h1>
								</div>
							</div>
						</div>

						<div className="container">
							<div className="justify-center items-center">
								<h3 style={{ marginTop: "15px" }}>Número de preguntas en el foro</h3>

								<div className="flex justify-center items-center h-60">
									<h1>{numQuestions}</h1>
								</div>
							</div>
						</div>


					</div>
				</div>
			</main>
		</>
	);
}
