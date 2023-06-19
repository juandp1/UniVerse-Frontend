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
}


function TarjetaTemas({ id_Topic, name, ruta}: Props) {
    const router = useRouter();


    const irTema = (): void => {
        localStorage.setItem("Topic", id_Topic.toString())
        router.push(ruta);
    }

    return (
        <>
            <div className={style.tarjeta_Temas}  >
                <div className={style.tarjeta_Temas_Color}>
                </div>

                <div onClick={irTema} className={style.tarjeta_select}>
                    <h2>{name}</h2>
                </div>
                <div className={style.tarjeta_icono}>

                    <div className="grid justify-items-center">
                        <FaIcon.FaBookOpen size={"80px"} color={"#1D3752"} />
                    </div>
                </div>


            </div>
        </>
    )
}

export default TarjetaTemas