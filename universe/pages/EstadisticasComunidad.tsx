import { useState, useEffect } from 'react';
import LateralNavBar from '../Component/LateralNavBar'
import Navbar from '../Component/NavBar'
import Head from 'next/head';
import * as Bsicon from 'react-icons/bs';
import Cookies from 'js-cookie';

const colorIcon = "#61EB8D"
export default function EstadisticasComunidad() {

    const [numUsers, setNumUsers] = useState(0);
    const [numQuestions, setNumQuestions] = useState(0);
    const [numTopics, setNumTopics] = useState(0);

    useEffect(() => {
        const fetchNumUsers = async () => {
            try {
                const res = await fetch('http://localhost:3333/api/statistics/users_per_comm', {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                });
                if (res.ok) {
                    const data = await res.json();
                    setNumUsers(data.users_belongs_to_community.length);
                } else {
                    throw new Error('Error fetching number of users');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        const fetchNumQuestions = async () => {
            try {
                const res = await fetch('http://localhost:3333/api/statistics/questions_per_comm', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                });
                if (res.ok) {
                    const data = await res.json();
                    setNumQuestions(data.questions.length);
                } else {
                    throw new Error('Error fetching number of questions');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        const fetchNumTopics = async () => {
            try {
                const res = await fetch('http://localhost:3333/api/statistics/topics_per_comm', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                });
                if (res.ok) {
                    const data = await res.json();
                    setNumTopics(data.topics_per_community.length);
                } else {
                    throw new Error('Error fetching number of topics');
                }
            } catch (error) {
                console.error('Error:', error);
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
                        <Bsicon.BsBarChartFill size={'150px'} color={colorIcon} />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <h2 style={{ alignSelf: 'flex-start' }}>Estadisticas de la comunidad</h2>
                            <h4 style={{ alignSelf: 'flex-start' }}>Conoce los numeros mas importantes de esta comunidad</h4>
                        </div>
                    </div>

                    <h3 style={{ alignSelf: 'flex-start', marginTop: '15px', marginLeft: '10px', marginBottom: '20px' }}>
                        Aquí encontraras información como el número de usuarios en la comunidad, cuantas preguntas se han hecho en el foro o el numero de temas en la enciclopedia
                    </h3>


                    <div className="flex flex-wrap justify-center">


                        <div className="container">
                            <div className="justify-center items-center">
                                <h3 style={{ marginTop: '15px' }}>
                                    Número de usuarios en la comunidad
                                </h3>

                                <div className="flex justify-center items-center h-60">
                                    <h1>{numUsers}</h1>
                                </div>
                            </div>

                        </div>





                        <div className="container">

                            <div className="justify-center items-center">
                                <h3 style={{ marginTop: '15px' }}>
                                    Número de preguntas en el foro
                                </h3>

                                <div className="flex justify-center items-center h-60">
                                    <h1>{numQuestions}</h1>
                                </div>
                            </div>
                        </div>


                        <div className="container">

                            <div className="justify-center items-center">
                                <h3 style={{ marginTop: '15px' }}>
                                    Número de temas en el foro
                                </h3>

                                <div className="flex justify-center items-center h-60">
                                    <h1>{numTopics}</h1>
                                </div>
                            </div>

                        </div>




                    </div>
                </div>





            </main >

        </>

    )
}