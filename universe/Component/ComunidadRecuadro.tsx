import style from "/styles/ComunidadRecuadroStyles.module.css";
import * as TbIcon from 'react-icons/tb';
import * as SlIcon from 'react-icons/sl';
import * as BiIcon from 'react-icons/bi';
import * as AiIcon from 'react-icons/ai';
import * as RiIcon from 'react-icons/ri';
import { useState } from "react";


const unirseComunidad = () => {

}
function ComunidadRecuadro(props: { comunityName: string, descripcion: string }) {
    const [optionsComunity, setOptionsComunity] = useState(false)
    const stateOptionsComunity = () => setOptionsComunity(!optionsComunity)
    return (
        <>
            <div className={style.comunidadRecuadro}>
                <div className={style.encabezado}>
                    <div className="flex space-x-3 ">
                        <TbIcon.TbMathFunction size={"40px"} />
                        <h2>{props.comunityName}</h2>
                    </div>
                    <button onClick={unirseComunidad}>
                        <h3>Unirse</h3>
                    </button>

                    <div className="space-y-4">
                        <div>
                            <SlIcon.SlOptionsVertical onClick={stateOptionsComunity} className=" hover:bg-light_blue_hover w-auto h-auto p-2 rounded-md" />
                        </div>

                        <div>
                            {optionsComunity ? (
                                <div className="desplegableOptions right-4">
                                    <div className="flex space-x-3 items-center">
                                        <BiIcon.BiInfoCircle size={"20px"} color="#34b83b"/>
                                        <h5>Informacion</h5>
                                    </div>
                                    <div className="flex space-x-3 items-center">
                                        <AiIcon.AiOutlineEdit size={"20px"} color="#e5964b"/>
                                        <h5>Editar</h5>
                                    </div>
                                    <div className="flex space-x-3 items-center">
                                        <BiIcon.BiExit size={"20px"} color="#cd3d49"/>
                                        <h5>Abandonar</h5>
                                    </div>
                                    
                                    <div className="flex space-x-3 items-center">
                                        <RiIcon.RiDeleteBinLine size={"20px"} color="#cd3d49"/>
                                        <h5>Eliminar</h5>
                                    </div>

                                </div>
                            ) : null

                            }
                        </div>


                    </div>


                </div>
                <div className={style.descripcion}>
                    <h5>{props.descripcion}</h5>
                </div>
            </div>
        </>
    )
}

export default ComunidadRecuadro