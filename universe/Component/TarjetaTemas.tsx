import { useState } from "react";
import style from "/styles/TarjetaTemasStyles.module.css";
import * as FaIcon from 'react-icons/fa';
import * as SiIcon from 'react-icons/sl';
import Link from "next/link";


const eliminarTema = (): void => {
    console.log("eliminar tema")
}
const editarTema = (): void => {
    console.log("editar tema")
}
const irTema = (): void => {
    console.log("ir tema")
}
function TarjetaTemas(props: { name: string, ruta:string }) {
    const [optionsActive, setOptionsActive] = useState(false)
    const stateOptionsActive = () => setOptionsActive(!optionsActive)
    return (
        <>
            <div className={style.tarjeta_Temas}  >
                <div className={style.tarjeta_Temas_Color}>
                    <SiIcon.SlOptionsVertical onClick={stateOptionsActive} size={"25px"} className="absolute top-2 left-0 hover:bg-light_blue_hover w-auto h-auto p-2 rounded-md" />
                    {optionsActive ? (
                        <div className='desplegableOptions divide-y left-10'>

                            <div onClick={eliminarTema} >
                                <h5>Eliminar</h5>
                            </div>
                            <div onClick={editarTema}>
                                <h5>Editar</h5>

                            </div>


                        </div>
                    ) : null

                    }
                </div>
                
                <div className={style.tarjeta_select}>
                    <Link href={props.ruta} className="bg-black">
                        <h2>{props.name}</h2>
                    </Link>
                    
                </div>
                <div  className={style.tarjeta_icono}>

                    <div className="grid justify-items-center">
                        <FaIcon.FaBookOpen size={"80px"}  />
                    </div>
                </div>


            </div>
        </>
    )
}

export default TarjetaTemas