import Link from "next/link";
import LateralNavBar from "../Component/LateralNavBar";
import Navbar from "../Component/NavBar";
import { useRouter } from 'next/router';
import Head from "next/head";
import style from "/styles/ReunionesStyle.module.css";
import TipoReunion from "universe/Component/TipoReunion";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import * as IoIcon from "react-icons/io";
import * as HiIcon from "react-icons/hi";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from "universe/hooks/useAuth";

interface Reunion {
  nombreReunion: String;
  Descripcion_reunion: String;
  fecha_reunion: String;
  hora_reunion: String;
  lugar_reunion: String;
}
const colorIcon = "#61EB8D";

export default function Reuniones() {
  const { isLoading } = useAuth();

  if (isLoading) {
      // Render a loading state or null if you don't want to show anything during loading
      return null;
  }
    const [showFormCrearReunion, setShowFormCrearReunion] = useState(false)
    const statusShowFormCrearReunion = () => setShowFormCrearReunion(!showFormCrearReunion)
    const initialValues: Reunion = {
        nombreReunion: '',
        Descripcion_reunion: '',
        fecha_reunion: '',
        hora_reunion: '',
        lugar_reunion: ''
    };

    const toggle = () => {
      var blurMain = document.getElementById("main")
      blurMain?.classList.toggle("active")
      statusShowFormCrearReunion()
  }

  const crearReunion = async (values: Reunion) => {
    /**funcion para crear una reunión y llevarla al backend */
    const dateTime = values.fecha_reunion + " " + values.hora_reunion + ':00.000000';
    console.log(dateTime)
    try {
        const res = await fetch('http://localhost:3333/api/community/'+ localStorage.getItem('comunidad_ID') + '/meetings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            mode: 'cors',
            body: JSON.stringify({"name": values.nombreReunion, "description": values.Descripcion_reunion, "place": values.lugar_reunion, "date": dateTime})
        })
        if (res.ok) {
            statusShowFormCrearReunion()
            toast.success('La reunión ha sido creada correctamente', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                className:style.toast_success_doc
            });
            toggle()
        }
    } catch (error: any) {
        console.error('Error:', error);
        alert(error.message);
    }
}

    const router = useRouter();

    const validationSchema = Yup.object({
      nombreReunion: Yup.string()
        .max(30, "El nombre de la reunión no debe sobrepasar los 30 caracteres")
        .required("Campo requerido"),
      Descripcion_reunion: Yup.string()
        .max(
          100,
          "La descripción de la reunión no debe sobrepasar los 100 caracteres"
        )
        .required("Campo requerido"),
      fecha_reunion: Yup.date()
        .min(
          new Date(),
          "La fecha de reunión no puede ser anterior a la fecha actual"
        )
        .required("Campo requerido"),
      hora_reunion: Yup.string()
        .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Hora de reunión inválida")
        .required("Campo requerido"),
      lugar_reunion: Yup.string()
        .max(
          50,
          "La descripción del lugar de la reunión no debe sobrepasar los 50 caracteres"
        )
        .required("Campo requerido"),
    });


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
            <h1>Reuniones</h1>
          </div>
          <div className="flex justify-center space-x-10" style={{ gap:'130px'}}>
            <Link href="/ProximasReuniones">
              <TipoReunion titulo="Próximas reuniones"></TipoReunion>
            </Link>
            <Link href="/ReunionesAnteriores">
              <TipoReunion titulo="Reuniones anteriores"></TipoReunion>
            </Link>
          </div>
          <div className="button_crear" onClick={toggle}>
            <IoIcon.IoMdAdd size={"80px"} color={colorIcon} />
          </div>
        </div>
        {/*Agrego los componentes dentro del header*/}
      </main>

      {showFormCrearReunion ? (
        <div>
          <Formik
            initialValues={{
              nombreReunion: "",
              Descripcion_reunion: "",
              fecha_reunion: "",
              hora_reunion: "",
              lugar_reunion: "",
            }}
            onSubmit={async (values) => {
              crearReunion(values);
              //alert(JSON.stringify(values));
            }}
          >
            {({ handleSubmit, values, handleChange }) => (
              <form onSubmit={handleSubmit}>
                <div id="encabezado">
                  <IoIcon.IoMdClose size={"25px"} onClick={toggle} id="close" />

                  <div>
                    <HiIcon.HiFolderAdd size={"60px"} color={"#1D3752"} />
                    <h2>Crear una nueva reunión</h2>
                  </div>
                  <div>
                    <button type="submit">
                      <h3>Crear</h3>
                    </button>
                  </div>
                </div>

                <div id="inputs">
                  <div>
                    <h5>Nombre de la reunión:</h5>
                    <input
                      name="nombreReunion"
                      type="text"
                      placeholder="Nombre Reunion"
                      value={values.nombreReunion}
                      onChange={handleChange}
                    />

                    <h5>Descripción de la reunión:</h5>
                    <input
                      name="Descripcion_reunion"
                      type="text"
                      placeholder="Descripcion reunion"
                      value={values.Descripcion_reunion}
                      onChange={handleChange}
                    />
                    <h4 className="my-5">Detalles del encuentro</h4>

                    <div className={style.Detalles_Reunion}>
                      <div>
                        <input
                          id="Detalles_Encuentro"
                          name="fecha_reunion"
                          type="date"
                          placeholder="Fecha reunion"
                          value={values.fecha_reunion}
                          onChange={handleChange}
                        />
                        <label>Fecha de la reunión:</label>
                      </div>
                      <div>
                        <input
                          name="hora_reunion"
                          type="time"
                          placeholder="Hora reunion"
                          value={values.hora_reunion}
                          onChange={handleChange}
                        />
                        <label>Hora de la reunión:</label>
                      </div>

                      <div>
                        <input
                          name="lugar_reunion"
                          type="text"
                          placeholder="Lugar reunion"
                          value={values.lugar_reunion}
                          onChange={handleChange}
                        />
                        <label>Lugar de la reunión:</label>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      ) : null}
    </>
  );
}
