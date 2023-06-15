import React, { useEffect, useState } from 'react'
import style from "/styles/RecuadroConfirmacionStyle.module.css";


interface Props {
    cerrar: () => void;
}
function Recuadro({cerrar}: Props) {
    return (
      <div className={style.principal_Div}>
        <div className={style.first_rectangle}>
          <h3 style={{ textAlign: 'center' }}>Sesión cerrada</h3>
        </div>
        <div className={style.second_rectangle}>
          <h4 style={{ textAlign: 'center' }}>Su sesión ha sido cerrada debido a inactividad</h4>
          <button className={style.button_aceptar} onClick={cerrar}>
            <h4 style={{ margin: 0 }}>Aceptar</h4>
          </button>
        </div>
      </div>
    );
  }
  


export default Recuadro