import Head from "next/head";
import * as Faicon from 'react-icons/fa';
import * as IoIcon from 'react-icons/io';
import * as HiIcon from 'react-icons/hi';
import LateralNavBar from "universe/Component/LateralNavBar";
import Navbar from "universe/Component/NavBar";
import TarjetaTemas from "universe/Component/TarjetaTemas";
import { useState } from "react";
import { Formik } from 'formik'



const colorIcon = "#61EB8D"
interface Tema {
    nombre_Tema: String;
}

export default function Enciclopedia() {
    const [showFormCrearTema, setShowFormCrearTema] = useState(false)
    const statusShowFormCrearTema = () => setShowFormCrearTema(!showFormCrearTema)
    const [Temas, setTemas] = useState([{
        nombreTema: ''
    }])
    
    const toggle = () => {
        var blurMain = document.getElementById("main")
        blurMain?.classList.toggle("active")
        statusShowFormCrearTema()
    }
    const GetInfoTemas = async (values: Tema) => { // se trae la informacion de los temas que existen apenas se entra a la pagina
        //setIsLoading(true)
        let url: string = 'https://decorisaserver.azurewebsites.net/api/cita/key/'//+ nombreComunidad 
        fetch(url, {

        })
            .then(response => response.json()).then(data => {
                console.log(data)

                setTemas(data)
                //setIsLoading(false)
                //setShowDetallesCita(true)
            })

    }
    const crearTema = async (values: Tema) => {
        /**funcion para la creacion de un tema en el backend */
        fetch('https://decorisaserver.azurewebsites.net/api/pedido', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(values)

        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response))
            .then(() => {


                //setShowFormCrearPedido(false)
                //setIsLoading(false)
            })


        toggle()
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

                    <div className="flex space-x-3">
                        <Faicon.FaBookOpen size={"60px"} color={colorIcon} />
                        <h1>Temas</h1>
                    </div>
                    <div className="flex flex-wrap ">
                        {/*Temas.map((item,index)=>{
                            return(
                                <TarjetaTemas name={item.nombreTema} ruta={"/DocumentosTema"}></TarjetaTemas>
                            )
                        })
                        */}
                        <TarjetaTemas name={"Ley de Gauss"} ruta={"/DocumentosTema"}></TarjetaTemas>
                        <TarjetaTemas name={"Ley de Gauss"} ruta={"/DocumentosTema"}></TarjetaTemas>
                        <TarjetaTemas name={"Ley de Gauss"} ruta={"/DocumentosTema"}></TarjetaTemas>
                        <TarjetaTemas name={"Ley de Gauss"} ruta={"/DocumentosTema"}></TarjetaTemas>
                        <TarjetaTemas name={"Ley de Gauss"} ruta={"/DocumentosTema"}></TarjetaTemas>
                        <TarjetaTemas name={"Ley de Gauss"} ruta={"/DocumentosTema"}></TarjetaTemas>
                        <TarjetaTemas name={"Ley de Gauss"} ruta={"/DocumentosTema"}></TarjetaTemas>
                        <TarjetaTemas name={"Ley de Gauss"} ruta={"/DocumentosTema"}></TarjetaTemas>
                    </div>

                    <div className="button_crear" onClick={toggle}>
                        <IoIcon.IoMdAdd size={'80px'} color={colorIcon} />
                    </div>
                </div>
                {/**aqui empieza el formulario que aparecera sobre todo el contenido de la pagina en ese momento */}



            </main>

            {showFormCrearTema ? (
                <div>

                    <Formik
                        initialValues={{
                            nombre_Tema: ""
                            

                        }}
                        onSubmit={async (values) => {

                            crearTema(values)
                            //alert(JSON.stringify(values));
                        }}

                    >
                        {({ handleSubmit, values, handleChange }) => (
                            <form id="login" onSubmit={handleSubmit}>
                                <div id="encabezado">
                                    <IoIcon.IoMdClose size={"25px"} onClick={toggle} id="close" />

                                    <div>
                                        <HiIcon.HiFolderAdd size={"60px"} color={"#1D3752"} />
                                        <h2>Nuevo Tema</h2>
                                    </div>
                                    <div>
                                        <button type="submit">
                                            <h3>Crear</h3>
                                        </button>
                                    </div>
                                </div>
                                <div id="inputs">
                                    <div>
                                        <h5>Nombre del tema:</h5>
                                        <input name="nombre_Tema" type="text" placeholder="nombre tema"
                                            value={values.nombre_Tema}
                                            onChange={handleChange}
                                        />

                                    </div>

                                    {/**segunda columna del formulario esi es necesario */}
                                    
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            ) : null}
        </>

    )
}