import { useEffect, useState } from "react";
import { ReactSVG } from 'react-svg';
import router, { useRouter } from 'next/router';
import style from "/styles/TarjetaDocumentoStyles.module.css";
import * as FaIcon from 'react-icons/fa';
import * as SiIcon from 'react-icons/sl';
import * as RiIcon from 'react-icons/ri';
import * as HiIcon from 'react-icons/hi';
import Link from "next/link";



const verDocumento = (): void => {
    console.log("Abrir documento")
}

interface Props {
    idDocument: number
    DocumentName: string;
    descripcion: string;
    docType: string;
    eliminar: (id_document: number, name_documento: string) => void;


    //editar: (id:number, nameDocumento: string, descripcion: string) => void;

}

function TarjetaDocumento({ idDocument, DocumentName, descripcion, docType, eliminar }: Props) {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        setIsAdmin(true);
    }, []);
    const [optionsActive, setOptionsActive] = useState(false)
    const stateOptionsActive = () => setOptionsActive(!optionsActive)

    const verDocumento = async (): Promise<void> => {
        try {
            const res = await fetch(`http://localhost:3333/api/document/${idDocument}`, {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (res.ok) {

                const blob = await res.blob();
                const url = URL.createObjectURL(blob);
                window.open(url, '_blank');
            }

            if (!res.ok) {
                throw new Error("Error fetching document");
            }


        } catch (error) {
            console.error("Error:", error);
        }
    }
    return (
        <>
            <div className={style.tarjeta_Temas} >
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

                    <div className={style.tarjeta_view}>
                        <div onClick={verDocumento} className="flex space-x-3 items-center">
                            <h5 className={style.titulo_Documento}> {DocumentName}</h5>
                        </div>
                    </div>
                    <div>
                        {isAdmin ? (
                            <SiIcon.SlOptionsVertical onClick={stateOptionsActive} size={"25px"} className="absolute top-2 right-0 hover:bg-light_blue_hover w-auto h-auto p-2 rounded-md" />
                        ) : null
                        }
                        {optionsActive ? (
                            <div className='desplegableOptions divide-y left-10'>

                                <div onClick={() => {
                                    eliminar(idDocument, DocumentName)
                                    stateOptionsActive()
                                }} >
                                    <h5>Eliminar</h5>
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