import LateralNavBar from "../Component/LateralNavBar";
import Navbar from "../Component/NavBar";
import Head from "next/head";
import Reunion from "universe/Component/Reunion";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Cookies from "js-cookie";




interface Reunion {
  id: number;
  nombreReu: string;
  descripcion_reu: string;
  fecha_reu: string;
  hora_reu: string;
  lugar_reu: string;
}

const colorIcon = "#61EB8D";
var idReunion: number
var nombreCreador: string;
var nombreReunion: string;
var descripcion_reunion: string;
var fecha_reunion: string;
var hora_reunion: string;
var lugar_reunion: string;




export default function ProximasReuniones() {

  const [Reuniones, setReuniones] = useState([{
    idReunion: 0,
    nombreReunion: "",
    descripcion_reunion: "",
    fecha_reunion: "",
    hora_reunion: "",
    lugar_reunion: "",
  }])

    //VARIABLES USE STATE

    const [confirmacion, setConfirmacion] = useState(false)
    const stateConfirmacion = () => {
        setConfirmacion(!confirmacion)
        toggle()
    }
    const [formEditar, setformEditar] = useState(false)
    const stateformEditar = () => setformEditar(!formEditar)


    
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


    // OBTENCION DE TODAS LAS COMUNIDADES 
    useEffect(() => {
        const fetchData = async () => { // se trae la informacion de los documentos que existen al entrar a la pagina
            //setIsLoading(true)
            try {
                const res = await fetch("http://localhost:3333/api/meetings", {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Cookies.get('token')}`
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    setReuniones(data.meetings)
                }
            } catch (error: any) {
                console.error('Error:', error);
                alert(error.message);
            }
        }
        fetchData();
    }, []);




    //EDICION DE LA COMUNIDAD
    const editar = (id: number,  nombreReu: String, descripcion_reu: String, fecha_reu: String, hora_reu: String, lugar_reu: String) => {
      idReunion =   id
      nombreReunion = nombreReu
      descripcion_reunion = descripcion_reu
      fecha_reunion = fecha_reu
      hora_reunion = hora_reu
      lugar_reunion =  lugar_reu
        stateformEditar()
        toggle()
    }

    const cerrarEdicion = () => {
        stateformEditar()
        toggle()
    }

    //UPDATE REUNION
    const updateReunion = async (values: Comunidad) => {
        try {
            const res = await fetch('http://localhost:3333/api/community/name/' + comunityName, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('token')}`
                },
                body: JSON.stringify({ "name": values.nameComunidad, "description": values.descripcion, "label": values.materia })
            });

            if (res.ok) {

            } else {
                throw new Error('ha sucedido un error al crear la comunidad');
            }
        } catch (error: any) {
            console.error('Error:', error);
            alert(error.message);
        }
        stateformEditar()
        toggle()
    }
    const eliminar = (comunnuty_ID: number, name: string) => {
        id_community = comunnuty_ID
        comunityName = name
        stateConfirmacion()
    }
    const deleteReunion = async () => {
        try {
            const res = await fetch('http://localhost:3333/api/community/name/' + comunityName, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('token')}`
                }

            });

            if (res.ok) {
                console.log('Error:', "Se ha eliminado la comunidad de forma correcta");
                alert("Se ha eliminado la comunidad de forma correcta");
            } else {
                throw new Error('ha sucedido un error al elimianr la comunidad');
            }
        } catch (error: any) {
            console.error('Error:', error);
            alert(error.message);
        }
        stateformEditar()
        toggle()
    }

    // FUNCION TOGGLE  se encarga de desvanecer el fondo cuando se despliega un formulario
    const toggle = () => {
        var blurMain = document.getElementById("main")
        blurMain?.classList.toggle("active")
    }




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
            <Reunion idReunion={1} nombreCreador={"Creador #1"} nombreReunion={"Reunion número uno"} descripcion_reunion={"Esta es la reunión número uno"} fecha_reunion={"2023/11/29"} hora_reunion={"10:50pm"} lugar_reunion={"CyT"} editar={editar} eliminar={eliminar}></Reunion>
            <Reunion idReunion={2} nombreCreador={"Creador #2"} nombreReunion={"Reunion número dos"} descripcion_reunion={"Esta es la reunión número dos"} fecha_reunion={"2023/11/29"} hora_reunion={"10:50pm"} lugar_reunion={"CyT"}></Reunion>
            <Reunion idReunion={3} nombreCreador={"Creador #3"} nombreReunion={"Reunion número tres"} descripcion_reunion={"Esta es la reunión número tres"} fecha_reunion={"2023/11/29"} hora_reunion={"10:50pm"} lugar_reunion={"CyT"}></Reunion>
            <Reunion idReunion={4} nombreCreador={"Creador #4"} nombreReunion={"Reunion número cuatro"} descripcion_reunion={"Esta es la reunión número cuatro"} fecha_reunion={"2023/11/29"} hora_reunion={"10:50pm"} lugar_reunion={"CyT"}></Reunion>
            <Reunion idReunion={5} nombreCreador={"Creador #5"} nombreReunion={"Reunion número cinco"} descripcion_reunion={"Esta es la reunión número cinco"} fecha_reunion={"2023/11/29"} hora_reunion={"10:50pm"} lugar_reunion={"CyT"}></Reunion>
          </div>
        </div>
        {/*Agrego los componentes dentro del header*/}
      </main>
    </>
  );
}
