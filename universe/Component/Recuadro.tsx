import React, { useEffect, useState } from 'react'
import style from "/styles/RecuadroConfirmacionStyle.module.css";


interface Props {
  titulo: string;
  descripcion: string;
  cerrar: () => void;
  children?: React.ReactNode;

}
function Recuadro({ titulo, descripcion, cerrar, children }: Props) {
  return (
    <div className={style.principal_Div}>
      <div className={style.first_rectangle}>
        <h3 style={{ textAlign: 'center' }}>{titulo}</h3>
      </div>
      <div className={style.second_rectangle}>
        <h4 style={{ textAlign: 'center' }}>{descripcion}</h4>
        {children && <div className={style.childrenContainer}>{children}</div>}
        {!children && (
          <button className={style.button_aceptar} onClick={cerrar}>
            <h4 style={{ margin: 0 }}>Aceptar</h4>
          </button>
        )}
      </div>
    </div>
  );
}


export default Recuadro