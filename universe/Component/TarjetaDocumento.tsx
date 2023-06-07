import { useState } from "react";
import { ReactSVG } from 'react-svg';
import { useRouter } from 'next/router';
import style from "/styles/TarjetaDocumentoStyles.module.css";
import * as FaIcon from 'react-icons/fa';
import * as SiIcon from 'react-icons/sl';
import * as RiIcon from 'react-icons/ri';
import * as HiIcon from 'react-icons/hi';
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

interface Props {
    idDocument: number
    DocumentName: string;
    descripcion: string;
    docType: string;

    //editar: (id:number, nameDocumento: string, descripcion: string) => void;

}

function TarjetaDocumento({ idDocument, DocumentName, descripcion, docType }: Props) {
    const [optionsActive, setOptionsActive] = useState(false)
    const stateOptionsActive = () => setOptionsActive(!optionsActive)
    return (
        <>
            <div className={style.tarjeta_Temas}  >
                <div className={style.tarjeta_Temas_Color}>
                    <div className="flex space-x-3 items-center">
                        {
                            docType === "ejercicio" ? <HiIcon.HiPuzzle size={"40px"} color="#5653FE" /> :
                                docType === "examen" ? <ReactSVG src={'/images/Exam.svg'} beforeInjection={(svg) => {
                                    svg.setAttribute('style', 'width: 40px; height: 40px; fill: #2CC0CA;');
                                }} /> :

                                    docType === "libro" ? <RiIcon.RiBookFill size={"40px"} color="#61EB8D" /> :
                                        <FaIcon.FaFile size={"40px"} color="#61EB8D" /> // icono por defecto para otros tipos de documento
                        }

                    </div>
                    <div className="flex space-x-3 items-center">
                        <h5 className={style.titulo_Documento}> {DocumentName}</h5>
                    </div>

                    <div className="space-y-3">
                        <SiIcon.SlOptionsVertical onClick={stateOptionsActive} size={"20px"} className="absolute top-2 left-30 hover:bg-light_blue_hover w-auto h-auto p-2 rounded-md" />
                        {optionsActive ? (
                            <div className='desplegableOptions divide-y left-30'>

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

                </div>

                <div className={style.tarjeta_select}>
                    <h5>{descripcion}</h5>

                </div>

                <div className={style.tarjeta_icono}>
                </div>


            </div>
        </>
    )
}

export default TarjetaDocumento