import LateralNavBar from "../Component/LateralNavBar";
import Navbar from "../Component/NavBar";
import Head from "next/head";
import Reunion from "universe/Component/Reunion";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAuth } from "universe/hooks/useAuth";


const colorIcon = "#61EB8D";

export default function ProximasReuniones() {
  const { isLoading } = useAuth();

  if (isLoading) {
      // Render a loading state or null if you don't want to show anything during loading
      return null;
  }
  const [Reuniones, setReuniones] = useState([{
    nombreReunion: ''
  }])


//FUNCIÓN PARA TRAER TODAS LAS PRÓXIMAS REUNIONES APENAS CARGA LA PÁGINA
useEffect(() => {
  const fetchData = async () => { // se trae la información de las reuniones que existen al entrar a la página.
      try {
          const res = await fetch('http://localhost:3333/api/meetings/community/' + localStorage.getItem("comunidad_ID"), {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({'community_ID': localStorage.getItem("comunidad_ID"), 'initial_date': Date.now() , 'final_date': Date.now()+30})
          });
          if (res.ok) {
              const data = await res.json();
              setReuniones(data)
          }
      } catch (error: any) {
          console.error('Error:', error);
          alert(error.message);
      }

  }
  fetchData();
}, []);


  return (
    <>
      <Head>
        <title>Universe</title>
      </Head>

      <main id="main">
        <Navbar></Navbar>
        <LateralNavBar></LateralNavBar>

        <div className="principal_Content">
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src="./images/camera-meetings.png"
              alt="camera"
              style={{ marginRight: "10px" }}
            />
            <h1>Próximas Reuniones</h1>
          </div>
          <div>
            <Reunion idReunion={1} nombreCreador={"Creador #1"} nombreReunion={"Reunion número uno"} Descripcion_reunion={"Esta es la reunión número uno"} fecha_reunion={"2023/11/29"} hora_reunion={"10:50pm"} lugar_reunion={"CyT"}></Reunion>
            <Reunion idReunion={2} nombreCreador={"Creador #2"} nombreReunion={"Reunion número dos"} Descripcion_reunion={"Esta es la reunión número dos"} fecha_reunion={"2023/11/29"} hora_reunion={"10:50pm"} lugar_reunion={"CyT"}></Reunion>
            <Reunion idReunion={3} nombreCreador={"Creador #3"} nombreReunion={"Reunion número tres"} Descripcion_reunion={"Esta es la reunión número tres"} fecha_reunion={"2023/11/29"} hora_reunion={"10:50pm"} lugar_reunion={"CyT"}></Reunion>
            <Reunion idReunion={4} nombreCreador={"Creador #4"} nombreReunion={"Reunion número cuatro"} Descripcion_reunion={"Esta es la reunión número cuatro"} fecha_reunion={"2023/11/29"} hora_reunion={"10:50pm"} lugar_reunion={"CyT"}></Reunion>
            <Reunion idReunion={5} nombreCreador={"Creador #5"} nombreReunion={"Reunion número cinco"} Descripcion_reunion={"Esta es la reunión número cinco"} fecha_reunion={"2023/11/29"} hora_reunion={"10:50pm"} lugar_reunion={"CyT"}></Reunion>
          </div>
        </div>
        {/*Agrego los componentes dentro del header*/}
      </main>
    </>
  );
}
