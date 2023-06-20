import style from "/styles/ComunidadRecuadroStyles.module.css";
import * as TbIcon from 'react-icons/tb';
import * as SlIcon from 'react-icons/sl';
import * as BiIcon from 'react-icons/bi';
import * as AiIcon from 'react-icons/ai';
import * as RiIcon from 'react-icons/ri';
import * as Bsicon from "react-icons/bs";
import * as Ioicon from "react-icons/io";
import { useState } from "react";
import { useRouter } from 'next/router';


interface Props {
    idComunidad: number
    comunityName: string;
    descripcion: string;
    editar: (id: number, nameComunidad: string, descripcion: string) => void;
    eliminar: (id: number, name: string) => void;
    abandonar: (id: number, nameComunidad: string) => void;
}


function ComunidadPerfil({ idComunidad, comunityName, descripcion, editar, eliminar, abandonar }: Props) {

    const router = useRouter();
    const [optionsComunity, setOptionsComunity] = useState(false)
    const stateOptionsComunity = () => setOptionsComunity(!optionsComunity)

    const entrarComunidad = () => {
        localStorage.setItem('comunidad', comunityName)
        console.log(localStorage.getItem('comunidad'))
        router.push('/HomeComunidad');
    }

    return (
        <>
            <div className={style.comunidadPerfil}>
                <div className={style.encabezadoPerfil}>
                    <div className="flex space-x-3">
                        <Ioicon.IoMdSchool size={"35px"} />
                        <h3>{comunityName}</h3>
                    </div>

                    <div className="flex space justify-end">
                        <button className={style.rectangleButton} onClick={stateOptionsComunity}>
                            <h6>OPCIONES DE LA COMUNIDAD</h6>
                        </button>
                    </div>

                    <div>
                        {optionsComunity ? (
                            <div className="desplegableOptions right-20 mt-5">
                                <div className="flex space-x-3 items-center" onClick={() => editar(idComunidad, comunityName, descripcion)}>
                                    <AiIcon.AiOutlineEdit size={"20px"} color="#e5964b" />
                                    <h5>Editar</h5>
                                </div>
                                <div className="flex space-x-3 items-center" onClick={() => abandonar(idComunidad, comunityName)}>
                                    <BiIcon.BiExit size={"20px"} color="#cd3d49" />
                                    <h5>Abandonar</h5>
                                </div>
                                <div onClick={() => eliminar(idComunidad, comunityName)} className="flex space-x-3 items-center">
                                    <RiIcon.RiDeleteBinLine size={"20px"} color="#cd3d49" />
                                    <h5>Eliminar</h5>
                                </div>

                            </div>
                        ) : null

                        }
                    </div>




                </div>



                <div className={style.descripcion}>
                    <h5>{descripcion}</h5>
                </div>
            </div>

        </>
    )
}

export default ComunidadPerfil