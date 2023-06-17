import { useState, useEffect } from 'react';
import LateralNavBar from '../Component/LateralNavBar'
import Navbar from '../Component/NavBar'
import Head from 'next/head';
import * as Bsicon from 'react-icons/bs';
import * as Aiicon from "react-icons/ai";

const colorIcon = "#61EB8D"
export default function EstadisticasComunidad() {

    const fetchData = async () => {
        try {
            const questionsResponse = await fetch('http://localhost:3333/api/statistics/questions_per_comm');
            const questions = await questionsResponse.json();

            const usersResponse = await fetch('http://localhost:3333/api/statistics/num_users_per_comm/');
            const users = await usersResponse.json();

            const topicsResponse = await fetch('http://localhost:3333/api/statistics/topics_per_comm/');
            const topics = await topicsResponse.json();




        } catch (error) {
            console.error('Error:', error);
        }
    };

    fetchData();










    return (
        <>
            <Head>
                <title>Universe</title>
            </Head>
            <main>
                <Navbar></Navbar>

                <div className="principal_Content_withoutLateralNavbar">
                    <div className={`flex items-center space-x-3 ml-10`}>
                        <Aiicon.AiOutlineLineChart size={'170px'} color={colorIcon} />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <h2 style={{ alignSelf: 'flex-start' }}>Estadisticas de la pagina universe</h2>
                            <h4 style={{ alignSelf: 'flex-start' }}>Conoce los numeros mas importantes de universe</h4>
                            
                        </div>
                    </div>

                    <h3 style={{ alignSelf: 'flex-start', marginTop: '15px', marginLeft: '60px', marginBottom: '20px' }}>
                        Aquí encontraras información como el número de usuarios en cada comunidad de universe y las comunidades que hay por cada materia 
                    </h3>


                    <div className="flex flex-wrap justify-center">
                        <div className="container">

                            <h3 style={{ marginTop: '15px', marginLeft: '10px' }}>
                                Número de usuarios en cada comunidad
                            </h3>

                        </div>





                        <div className="container">

                            <h3 style={{ marginTop: '15px', marginLeft: '10px' }}>
                                Comunidades por materia
                            </h3>


                        </div>




                    </div>
                </div>





            </main>

        </>

    )
}