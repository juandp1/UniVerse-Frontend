import { useState } from "react";
import style from "/styles/TarjetaDocumentoStyles.module.css";
import * as FaIcon from 'react-icons/fa';
import * as SiIcon from 'react-icons/sl';
import Link from "next/link";


const eliminarDocumento = (): void => {
    console.log("Eliminar documento")
}
const editarDocumento = (): void => {
    console.log("Editar documento")
}
const irTema = (): void => {
    console.log("Abrir documento")
}
function TarjetaDocumento(props: { name: string, ruta:string }) {
    const [optionsActive, setOptionsActive] = useState(false)
    const stateOptionsActive = () => setOptionsActive(!optionsActive)
    return (
        <>
            <div className={style.tarjeta_Temas}  >
                <div className={style.tarjeta_Temas_Color}>
                    <SiIcon.SlOptionsVertical onClick={stateOptionsActive} size={"25px"} className="absolute top-2 left-0 hover:bg-light_blue_hover w-auto h-auto p-2 rounded-md" />
                    {optionsActive ? (
                        <div className='desplegableOptions divide-y left-10'>

                            <div onClick={eliminarDocumento} >
                                <h5>Eliminar</h5>
                            </div>
                            <div onClick={editarDocumento}>
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
                        <FaIcon.FaBookOpen size={"40px"}  />
                    </div>
                </div>


            </div>
        </>
    )
}

export default TarjetaDocumento