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
    editar: (id:number,nameComunidad: string, descripcion: string) => void;
    eliminar: (id:number, name:string) => void;
}





function ComunidadRecuadro({ idComunidad, comunityName, descripcion, editar, eliminar}: Props) {

    const router = useRouter();
    const [optionsComunity, setOptionsComunity] = useState(false)
    const stateOptionsComunity = () => setOptionsComunity(!optionsComunity)

    const unirseComunidad = async () => {
        try {
            const res = await fetch('http://localhost:3333/api/enter_community', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ "community_id": idComunidad, "user_id": localStorage.getItem('user_ID') })
            });
            if (res.ok) {
                localStorage.setItem('comunidad_ID', idComunidad.toString())
                console.log(localStorage.getItem('comunidad_ID'))
                router.push('/HomeComunidad');
            } else {
                throw new Error('Ha sucedido un error al entrar a la comunidad');
            }
        } catch (error: any) {
            console.error('Error:', error);
            alert(error.message);
        }

    }
    const entrarComunidad = () => {
        localStorage.setItem('comunidad_ID', idComunidad.toString())
        console.log(localStorage.getItem('comunidad_ID'))
        router.push('/HomeComunidad');
    }

    return (
        <>
            <div className={style.comunidadRecuadro}>
                <div className={style.encabezado}>
                    <div className="flex space-x-3 ">
                        <Bsicon.BsFillLightningFill size={"40px"} />
                        <h2>{comunityName}</h2>
                    </div>
                    <div className="flex space-x-3">
                        <button onClick={entrarComunidad}>
                            <h3>Entrar</h3>
                        </button>
                        <button onClick={unirseComunidad}>
                            <h3>Unirse</h3>
                        </button>

                    </div>


                    <div className="space-y-4">
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
                                    <div className="flex space-x-3 items-center" onClick={() => editar(idComunidad,comunityName, descripcion)}>
                                        <AiIcon.AiOutlineEdit size={"20px"} color="#e5964b" />
                                        <h5>Editar</h5>
                                    </div>
                                    <div className="flex space-x-3 items-center">
                                        <BiIcon.BiExit size={"20px"} color="#cd3d49" />
                                        <h5>Abandonar</h5>
                                    </div>

                                    <div onClick={()=>eliminar(idComunidad,comunityName)} className="flex space-x-3 items-center">
                                        <RiIcon.RiDeleteBinLine size={"20px"} color="#cd3d49" />
                                        <h5>Eliminar</h5>
                                    </div>

                                </div>
                            ) : null

                            }
                        </div>


                    </div>


                </div>
                <div className={style.descripcion}>
                    <h5>{descripcion}</h5>
                </div>
            </div>

        </>
    )
}

export default ComunidadRecuadro