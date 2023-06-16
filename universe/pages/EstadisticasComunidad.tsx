import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import LateralNavBar from '../Component/LateralNavBar'
import Navbar from '../Component/NavBar'
import Head from 'next/head';
import * as Bsicon from 'react-icons/bs';

const colorIcon = "#61EB8D"
export default function EstadisticasComunidad() {

    const [questionsData, setQuestionsData] = useState({ datasets: [] });
    const [usersData, setUsersData] = useState({ datasets: [] });
    const [topicsData, setTopicsData] = useState({ datasets: [] });
    const [chartData, setChartData] = useState<{ labels: string[], datasets: any[] }>({ labels: [], datasets: [] });




    // const fetchData = async () => {
    //     try {
    //         const questionsResponse = await fetch('http://localhost:3333/api/statistics/questions_per_comm');
    //         const questions = await questionsResponse.json();

    //         const usersResponse = await fetch('http://localhost:3333/api/statistics/num_users_per_comm/');
    //         const users = await usersResponse.json();

    //         const topicsResponse = await fetch('http://localhost:3333/api/statistics/topics_per_comm/');
    //         const topics = await topicsResponse.json();

    //         const [questionsData, setQuestionsData] = useState({
    //             labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'],
    //             datasets: [
    //                 {
    //                     label: 'Numero de preguntas hechas en el foro',
    //                     data: [],
    //                     borderColor: ['rgba(75,192,192,1)'],
    //                     backgroundColor: ['rgba(75,192,192,0.2)'],
    //                     borderWidth: 2,
    //                 },
    //             ],
    //         });

    //         const [usersData, setUsersData] = useState({
    //             labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'],
    //             datasets: [
    //                 {
    //                     label: 'Numero de usuarios',
    //                     data: [],
    //                     borderColor: ['rgba(255,99,132,1)'],
    //                     backgroundColor: ['rgba(255,99,132,0.2)'],
    //                     borderWidth: 2,
    //                 },
    //             ],
    //         });

    //         const [topicsData, setTopicsData] = useState({
    //             labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'],
    //             datasets: [
    //                 {
    //                     label: 'Numero de temas en la enciclopedia de la comunidad',
    //                     data: [],
    //                     borderColor: ['rgba(255,206,86,1)'],
    //                     backgroundColor: ['rgba(255,206,86,0.2)'],
    //                     borderWidth: 2,
    //                 },
    //             ],
    //         });


    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };

    // fetchData();




    //PRUEBA DE COMO FUNCIONA:


    useEffect(() => {

        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [
                {
                    label: 'Number of Questions',
                    data: [12, 19, 3, 5, 2, 3],
                    borderColor: ['rgba(75,192,192,1)'],
                    backgroundColor: ['rgba(75,192,192,0.2)'],
                    borderWidth: 2,
                },

            ],
        };
        setChartData(data); // Set the state here

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
                        <Bsicon.BsBarChartFill size={'100px'} color={colorIcon} />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <h2 style={{ alignSelf: 'flex-start' }}>Estadisticas de la comunidad</h2>
                            <h4 style={{ alignSelf: 'flex-start' }}>Conoce los numeros mas importantes de esta comunidad</h4>
                        </div>
                    </div>

                    <h4 style={{ alignSelf: 'flex-start', marginTop: '15px', marginLeft: '10px' }}>
                        Aqui encontraras informacion como el numero de usuarios en la comunidad, cuantas preguntas se han hecho en el foro o el numero de temas en la enciclopedia
                    </h4>


                    <div>

                        {/* <Line
                            data={questionsData}
                            options={{
                                responsive: true,
                                plugins: {
                                    title: {
                                        text: 'Numero de preguntas hechas en el foro',
                                        display: true
                                    }
                                }
                            }}
                        />

                        <Line
                            data={usersData}
                            options={{
                                responsive: true,
                                plugins: {
                                    title: {
                                        text: 'Numero de usuarios en la comunidad',
                                        display: true
                                    }
                                }
                            }}
                        />

                        <Line
                            data={topicsData}
                            options={{
                                responsive: true,
                                plugins: {
                                    title: {
                                        text: 'Numero de temas en la enciclopedia de la comunidad',
                                        display: true
                                    }
                                }
                            }}
                        /> */}


                        {/* <Line
                            data={chartData}
                            options={{
                                responsive: true,
                                plugins: {
                                    title: {
                                        text: 'Numero de pruebas',
                                        display: true
                                    }
                                }
                            }}
                        /> */}




                    </div>

                </div>





            </main>

        </>

    )
}