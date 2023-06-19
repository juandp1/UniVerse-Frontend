import Head from "next/head";
import * as Fcicon from 'react-icons/fc';
import * as Bsicon from "react-icons/bs";
import * as Faicon from 'react-icons/fa';
import * as Ioicon from 'react-icons/io';
import LateralNavBar from "universe/Component/LateralNavBar";
import Navbar from "universe/Component/NavBar";
import style from "/styles/homeComunidadStyles.module.css";
import TarjetaTemas from "universe/Component/TarjetaTemashome";
import Reunion from "universe/Component/Reunionhome";
import PreguntaForo from '../Component/Preguntahome'
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import Preguntahome from "../Component/Preguntahome";


const colorIcon = "#61EB8D"

interface Tema {
    name: string;
}

var topicID: number;
var topicName: string;

interface Reunion {
    nombreReunion: string;
    descripcion_reunion: string;
    fecha_reunion: string;
    hora_reunion: string;
    lugar_reunion: string;
}

var id_reunion: number;

export default function HomeComunidad() {

    const [isMobile, setIsMobile] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const [name, setName] = useState<string | null>(null);
    useEffect(() => {
        setName(localStorage.getItem("community_name"));
    }, []);

    const [description, setDescription] = useState<string | null>(null);
    useEffect(() => {
        setDescription(localStorage.getItem("community_description"));
    }, []);

    const [label, setLabel] = useState<string | null>(null);
    useEffect(() => {
        setLabel(localStorage.getItem("community_label"));
    }, []);

    const toggle = () => {
        var blurMain = document.getElementById("main");
        blurMain?.classList.toggle("active");
    };

    const [confirmacion, setConfirmacion] = useState(false);
    const stateConfirmacion = () => {
        setConfirmacion(!confirmacion);
        toggle();
    };

    // VARIABLES SET ULTIMO TEMA, REUNION Y DUDA

    //TEMA

    const [Temasview, setTemas] = useState([
        {
            id: 0,
            name: "",
        },
    ]);



    //REUNION
    const [Reunionesview, setReuniones] = useState([
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

    //PREGUNTA
    const [Preguntasview, setPreguntas] = useState([{
        id: 0,
        title: "",
        description: "",
        score: 0,
        topic_id: 0,
        community_id: 0,
        user_name: "",
    }])


    // Funcion para determinar si es el usuario que ingresa es admin
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`http://localhost:3333/api/is_admin`, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    },
                    body: JSON.stringify({ "user_id": parseInt(localStorage.getItem("user_ID") ?? '0', 10), "community_id": parseInt(localStorage.getItem("comunidad_ID") ?? '0', 10) })
                });

                localStorage.removeItem("is_Admin")
                console.log(res)

                if (res.status === 200) {
                    setIsAdmin(true);
                    localStorage.setItem("is_Admin", "1");
                } else {
                    localStorage.setItem("is_Admin", "0");
                }
            } catch (error: any) {
                console.error('Error:', error);
                alert(error.message);
            }
        }
        fetchUser();
    }, []);




    //TRAER LA ULTIMA REUNION
    useEffect(() => {
        const fetchNextMeeting = async () => {
            try {
              const res = await fetch("http://localhost:3333/api/community/" + localStorage.getItem("comunidad_ID") + "/next_meeting", {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
              });
          
              if (res.ok) {
                const data = await res.json();
                console.log(data);
                setReuniones([data]);
              } else {
                throw new Error('Meeting not found');
              }
            } catch (error: any) {
              console.error('Error:', error);
              alert(error.message);
            }
          };
          
        fetchNextMeeting();
    }, []);

    //TRAER EL ULTIMO TEMA
    useEffect(() => {
        const fetchNextTopic = async () => {
            try {
              const res = await fetch("http://localhost:3333/api/topics/recent_topic", {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
              });
          
              if (res.ok) {
                const data = await res.json();
                console.log(data.communities);
                setTemas(data.communities);
              } else {
                throw new Error('Meeting not found');
              }
            } catch (error: any) {
              console.error('Error:', error);
              alert(error.message);
            }
          };
          
        fetchNextTopic();
    }, []);

    //TRAER EL ULTIMO TEMA
    useEffect(() => {
        const fetchNextQuestion = async () => {
            try {
              const res = await fetch("http://localhost:3333/api/questions/recent_question", {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
              });
          
              if (res.ok) {
                const data = await res.json();
                console.log(data);
                setPreguntas([data]);
              } else {
                throw new Error('Meeting not found');
              }
            } catch (error: any) {
              console.error('Error:', error);
              alert(error.message);
            }
          };
          
        fetchNextQuestion();
    }, []);
    







    //HACER RESPONSIVE LA PAGINA
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
        };

        handleResize(); // Initial check

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);



    //REDIRECCIONES EN EL HOME DE LA COMUNIDAD
    const router = useRouter();

    const Reuniones = () => {
        router.push('/Reuniones');
    };

    const Foro = () => {
        router.push('/Foro');
    };

    const Enciclopedia = () => {
        router.push('/Enciclopedia');
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
                    <div className={`flex items-center ${isMobile ? 'justify-center' : 'justify-start'} space-x-3`}>
                        <Ioicon.IoMdSchool size={"130px"} color={colorIcon} />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <h2 style={{ alignSelf: 'flex-start' }}>{name}</h2>
                            <h4 style={{ alignSelf: 'flex-start' }}>Descripción: {description}</h4>
                        </div>
                    </div>

                    <h3 style={{ alignSelf: 'flex-start', marginTop: '15px', marginLeft: '10px' }}>
                        Encuentra aqui las principales novedades de esta comunidad, nuevos temas, reuniones y preguntas
                    </h3>


                    <h2 style={{ alignSelf: 'flex-start', marginTop: '20px', marginLeft: '10px' }}>
                        Novedades
                    </h2>

                    <div className={style.container}>
                        <div className={style.leftContainer}>

                            <div className="flex items-center justify-start space-x-3">
                                <Bsicon.BsFillCameraVideoFill size={"60px"} color={colorIcon} />
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <h3 style={{ textAlign: 'center' }}>Proximas reuniones</h3>
                                </div>
                            </div>
                            <div className={style.rectangle}>
                                {Reunionesview.map((item, index) => {
                                    return (
                                        <Reunion
                                            key={item.id}
                                            idReunion={item.id}
                                            idAuthor={item.author_id}
                                            nombreReunion={item.name}
                                            descripcion_reunion={item.description}
                                            lugar_reunion={item.place}
                                            fecha_reunion={item.date}
                                        ></Reunion>
                                    );
                                })}

                                <button className={style.rectangleButton} onClick={Reuniones}>Apuntarse</button>
                            </div>



                            <div className="flex items-center justify-start space-x-3">
                                <Bsicon.BsFillQuestionCircleFill size={"60px"} color={colorIcon} />
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <h3 style={{ textAlign: 'center' }}>Ultima duda añadida</h3>
                                </div>
                            </div>
                            <div className={style.rectangle}>

                                {Preguntasview.map((item, index) => {
                                    return (
                                        <Preguntahome
                                            key={item.id}
                                            id={item.id}
                                            title={item.title}
                                            description={item.description}
                                            topic_id={item.topic_id}
                                            community_id={item.community_id}
                                            user_name={item.user_name}
                                        ></Preguntahome>
                                    );
                                })}

                                <button className={style.rectangleButton} onClick={Foro}>Ver duda</button>
                            </div>
                        </div>



                        <div className={style.rightContainer}>

                            <div className="flex items-center justify-start space-x-3">
                                <Faicon.FaBookOpen size={"70px"} color={colorIcon} />
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <h3 style={{ textAlign: 'center' }}>Ultimo tema añadido</h3>
                                </div>
                            </div>

                            <div className={style.rectangle}>

                                <div className="flex flex-wrap ">
                                    {Temasview.map((item, index) => {
                                        return (
                                            <TarjetaTemas
                                                key={item.id}
                                                id_Topic={item.id}
                                                name={item.name}
                                                ruta={"/DocumentosTema"}
                                            ></TarjetaTemas>
                                        );
                                    })}
                                </div>

                                <button className={style.rectangleButton} onClick={Enciclopedia}>Ver tema</button>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </>
    )
}
