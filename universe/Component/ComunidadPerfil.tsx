import style from "/styles/ComunidadRecuadroStyles.module.css";
import * as TbIcon from 'react-icons/tb';
import * as SlIcon from 'react-icons/sl';
import * as BiIcon from 'react-icons/bi';
import * as AiIcon from 'react-icons/ai';
import * as RiIcon from 'react-icons/ri';
import * as Bsicon from "react-icons/bs";
import { useState } from "react";
import { useRouter } from 'next/router';


interface Props {
    idComunidad: number
    comunityName: string;
    descripcion: string;
    editar: (id: number, nameComunidad: string, descripcion: string) => void;
    eliminar: (id: number, name: string) => void;
}


function ComunidadPerfil({ idComunidad, comunityName, descripcion, editar, eliminar }: Props) {

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
                        <Bsicon.BsFillLightningFill size={"25px"} />
                        <h3>{comunityName}</h3>
                    </div>
                    <div className="flex space justify-end">
                        <button className={style.rectangleButton} onClick={entrarComunidad}>
                            <h6>ENTRAR A LA COMUNIDAD</h6>
                        </button>
                    </div>

                    <div>
                        <SlIcon.SlOptionsVertical onClick={stateOptionsComunity} className=" hover:bg-light_blue_hover w-auto h-auto p-2 rounded-md" />
                    </div>

                    <div>
                        {optionsComunity ? (
                            <div className="desplegableOptions right-4">
                                <div className="flex space-x-3 items-center">
                                    <BiIcon.BiInfoCircle size={"20px"} color="#34b83b" />
                                    <h5>Informacion</h5>
                                </div>
                                <div className="flex space-x-3 items-center" onClick={() => editar(idComunidad, comunityName, descripcion)}>
                                    <AiIcon.AiOutlineEdit size={"20px"} color="#e5964b" />
                                    <h5>Editar</h5>
                                </div>
                                <div className="flex space-x-3 items-center">
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