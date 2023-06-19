import React, { useEffect, useState } from "react";
import * as SlIcon from "react-icons/sl";
import * as BiIcon from "react-icons/bi";
import * as AiIcon from "react-icons/ai";
import * as RiIcon from "react-icons/ri";
import * as Bsicon from "react-icons/bs";
import style from "/styles/ReunionesStyle.module.css";

import * as FaIcon from "react-icons/fa";

interface Props {
  idReunion: number;
  idAuthor: number;
  nombreReunion: string;
  descripcion_reunion: string;
  lugar_reunion: string;
  fecha_reunion: string;

}

function Reunion({
    idReunion,
    idAuthor,
    nombreReunion,
    descripcion_reunion,
    lugar_reunion,
    fecha_reunion,

}: Props): JSX.Element {
  const [optionsMeeting, setOptionsMeeting] = useState(false);
  const stateOptionsMeeting = () => setOptionsMeeting(!optionsMeeting);


  return (
    <>
      <div className={style.square_preguntaview}>
        <div className={style.minisquare_preguntaview}>

        <Bsicon.BsCameraVideoFill
            size={"35px"}
            color= {"#1D3752"}
            style={{ position: "absolute", left: "32px", top: "20px" }}
          />
   
            <h2 style={{ marginBottom: "10px", marginTop: "20px" }}>
              {nombreReunion}
            </h2>
            <h4>{descripcion_reunion}</h4>
            <h4>{fecha_reunion}</h4>
            <h4>{lugar_reunion}</h4>
         
        </div>
      </div>
    </>
  );
}

export default Reunion;
