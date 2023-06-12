import React, { useEffect, useState } from 'react'
import style from "/styles/RecuadroConfirmacionStyle.module.css";


interface Props {
    name: string,
    eliminar: () => void;
    cerrar: () => void;
}

function ConfirmacionRecuadro({ name, eliminar,cerrar }: Props) {
    

    return (
        <>
            <div className={style.principal_Div}>

                <h2>Eliminacion de {name}</h2>


                <h5 className='mt-6'>"{name}" sera eliminado y no podra ser restaurado</h5>



                <div className='absolute flex flex-wrap bottom-3 right-2 space-x-3'>
                    <button className={style.button_cancelar} onClick={cerrar}><h4>Cancelar</h4></button>
                    <button className={style.button_eliminar} onClick={eliminar}><h4>Eliminar</h4></button>
                </div>


            </div>

        </>
    )
}

export default ConfirmacionRecuadro