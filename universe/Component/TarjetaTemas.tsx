import { useEffect, useState } from "react";
import style from "/styles/TarjetaTemasStyles.module.css";
import * as FaIcon from 'react-icons/fa';
import * as SiIcon from 'react-icons/sl';
import Link from "next/link";
import { useRouter } from "next/router";


interface Props {
    id_Topic: number;
    name: string;
    ruta: string;
    eliminar: (topic_ID: number, topic_Name: string) => void;
}


function TarjetaTemas({ id_Topic, name, ruta, eliminar }: Props) {
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        setIsAdmin(localStorage.getItem("is_Admin") == "1");
    }, []);




    const [optionsActive, setOptionsActive] = useState(false)
    const stateOptionsActive = () => setOptionsActive(!optionsActive)

    const irTema = (): void => {
        localStorage.setItem("Topic", id_Topic.toString())
        router.push(ruta);
    }

    return (
        <>
            <div className={style.tarjeta_Temas}  >
                <div className={style.tarjeta_Temas_Color}>
                    {isAdmin ? (
                        <SiIcon.SlOptionsVertical onClick={stateOptionsActive} size={"25px"} className="absolute top-2 left-0 hover:bg-light_blue_hover w-auto h-auto p-2 rounded-md" />
                    ) : null
                    }
                    {optionsActive ? (
                        <div className='desplegableOptions divide-y left-10'>

                            <div onClick={() => {
                                eliminar(id_Topic, name)
                                stateOptionsActive()
                            }} >
                                <h5>Eliminar</h5>
                            </div>

                        </div>
                    ) : null

                    }
                </div>

                <div onClick={irTema} className={style.tarjeta_select}>
                    <h2>{name}</h2>
                </div>
                <div className={style.tarjeta_icono}>

                    <div className="grid justify-items-center">
                        <FaIcon.FaBookOpen size={"80px"} />
                    </div>
                </div>


            </div>
        </>
    )
}

export default TarjetaTemas