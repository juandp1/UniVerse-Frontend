import Head from "next/head";
import * as Fcicon from 'react-icons/fc';
import * as Bsicon from "react-icons/bs";
import * as Faicon from 'react-icons/fa';
import LateralNavBar from "universe/Component/LateralNavBar";
import Navbar from "universe/Component/NavBar";
import style from "/styles/homeComunidadStyles.module.css";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";


const colorIcon = "#61EB8D"

export default function HomeComunidad() {

    const [isMobile, setIsMobile] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
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
                    body: JSON.stringify({ "user_id": parseInt(localStorage.getItem("user_ID") ?? '0', 10), "community_id": parseInt(localStorage.getItem("comunidad_ID")  ?? '0', 10)})
                });

                localStorage.removeItem("is_Admin")
                console.log(res)
    
                if (res.status === 200) {
                    setIsAdmin(true);
                    localStorage.setItem("is_Admin","1");
                } else {
                    localStorage.setItem("is_Admin","0");
                }
            } catch (error: any) {
                console.error('Error:', error);
                alert(error.message);
            }
        }
        fetchUser();
    }, []);

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
                        <Bsicon.BsFillLightningFill size={"100px"} color={colorIcon} />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <h2 style={{ alignSelf: 'flex-start' }}>Fundamentos de electricidad y magnetismo</h2>
                            <h4 style={{ alignSelf: 'flex-start' }}>Categoría/materia: (Categoría de la comunidad)</h4>
                        </div>
                    </div>

                    <h3 style={{ alignSelf: 'flex-start', marginTop: '15px', marginLeft: '10px' }}>
                        Descripción: (Descripción de la comunidad)
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
                                <button className={style.rectangleButton} onClick={Reuniones}>Apuntarse</button>
                            </div>



                            <div className="flex items-center justify-start space-x-3">
                                <Bsicon.BsFillQuestionCircleFill size={"60px"} color={colorIcon} />
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <h3 style={{ textAlign: 'center' }}>Ultima duda añadida</h3>
                                </div>
                            </div>
                            <div className={style.rectangle}>

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
                                <button className={style.rectangleButton} onClick={Enciclopedia}>Ver tema</button>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </>
    )
}
