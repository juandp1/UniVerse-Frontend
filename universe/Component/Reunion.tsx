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
  nombreReunion: string;
  descripcion_reunion: string;
  lugar_reunion: string;
  fecha_reunion: string;
  editar: (
    idReunion: number,
  ) => void;
  eliminar: (id: number) => void;
}

//key={item.idReunion}
// idReu={item.idReunion}
// name={item.nombreReunion}
//descripcion={item.descripcion_reunion}
// lugar={item.lugar_reunion}
// fecha={item.fecha_reunion}
// editar={editarReunion}
// eliminar={eliminarReunion}

function Reunion({
    idReunion,
    nombreReunion,
    descripcion_reunion,
    lugar_reunion,
    fecha_reunion,
    editar,
    eliminar,
}: Props): JSX.Element {
  const [optionsMeeting, setOptionsMeeting] = useState(false);
  const stateOptionsMeeting = () => setOptionsMeeting(!optionsMeeting);

  return (
    <>
      <div className={style.square_pregunta}>
        <div style={{ position: "absolute", left: "32px", top: "40px" }}>
          <FaIcon.FaUserCircle
            size={"90px"}
            style={{ position: "absolute", left: "32px", top: "20px" }}
          />
        </div>
        <div className={style.minisquare_pregunta}>
          <div
            style={{
              position: "absolute",
              top: "30px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "628px",
            }}
          >
            <h1 style={{ marginBottom: "35px", marginTop: "20px" }}>
              {nombreReunion}
            </h1>
            <h3>{descripcion_reunion}</h3>
            <h3>{fecha_reunion}</h3>
            <h3>{lugar_reunion}</h3>
          </div>
        </div>
        <div className="absolute top-10 right-0">
          <div>
            <SlIcon.SlOptionsVertical
              size={"40px"}
              onClick={stateOptionsMeeting}
              className=" hover:bg-light_blue_hover w-auto h-auto p-2 rounded-md"
            />
          </div>

          <div>
            {optionsMeeting ? (
              <div className="desplegableOptionsReunion right-4">
                <div
                  className="flex space-x-3 items-center"
                  onClick={() =>
                    editar(
                      idReunion
                    )
                  }
                >
                  <AiIcon.AiOutlineEdit size={"27px"} color="#e5964b" />
                  <h4>Editar detalles la reunión</h4>
                </div>

                <div
                  onClick={() => eliminar(idReunion)}
                  className="flex space-x-3 items-center"
                >
                  <RiIcon.RiDeleteBinLine size={"27px"} color="#cd3d49" />
                  <h4>Eliminar la reunión</h4>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default Reunion;
