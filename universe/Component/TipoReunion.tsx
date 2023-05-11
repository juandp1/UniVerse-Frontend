import React, { useEffect, useState } from 'react'
import style from "/styles/ReunionesStyle.module.css";






function TipoReunion():JSX.Element{
    const [menuDesplegable, setMenuDesplegable] = useState(false) 
    
    return (
        <>
            <div className={style.square}>
                <div className={style.head_rectangle}>
                    <img src="./images/camera-meetings.png" alt="camera"/>
                </div>

                <div className={style.bottom_rectangle}>
                    <h1 className={style.bottom_rectangle_text}>Próximas reuniones</h1>

                </div>
            </div>

        </>
    )
}

export default TipoReunion