import React, { useEffect, useState } from 'react'
import style from "/styles/RecuadroConfirmacionStyle.module.css";


interface Props {
    name: string,
    mensaje:string
    eliminar: () => void;
    cerrar: () => void;
}
interface Props {
    name: string,
    cerrar: () => void;
}

function ConfirmacionRecuadro({mensaje, name, eliminar, cerrar }: Props) {


    return (

        <>

            <div className={style.principal_Div}>
                <div className={style.first_rectangle}>
                    <h3 style={{ textAlign: 'center' }}>{mensaje} {name}</h3>
                </div>
                <div className={style.second_rectangle}>
                    <h4 style={{ textAlign: 'center', marginTop: -50 }}> Esta accion no puede ser reversada, por favor confirme su decision</h4>
                    <div className='absolute flex flex-wrap justify-center items-center bottom-3 center-2 space-x-3'>
                        <button className={style.button_cancelar} onClick={cerrar}><h4>No</h4></button>
                        <button className={style.button_eliminar} onClick={eliminar}><h4>Si</h4></button>
                    </div>
                </div>
            </div>


        </>
    )
}


export default ConfirmacionRecuadro