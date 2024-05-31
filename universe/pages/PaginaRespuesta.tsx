import LateralNavBar from '../Component/LateralNavBar'
import Navbar from '../Component/NavBar'
import PreguntaForo from '../Component/PreguntaForo'
import Head from 'next/head';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import * as IoIcon from 'react-icons/io';
import * as BiIcon from 'react-icons/bi';
import { Formik } from 'formik';
import Respuesta from 'universe/Component/Respuesta';
import style from "/styles/ForoStyles.module.css";
import { GetServerSideProps } from "next/types";
import nookies from 'nookies';
import Cookies from "js-cookie";


export const getServerSideProps: GetServerSideProps = async (context) => {
	context.res.setHeader("Cache-Control", "no-store, must-revalidate");
	const token = nookies.get(context).token;

	if (!token) {
		//Si no esta logeado lo redirige al Login
		return {
			redirect: {
				destination: "/Login",
				permanent: false,
			},
		};
	}

	//Si esta logeado le muestra la pagina
	return {
		props: {}, // Muestra la pagina
	};
};
interface Respuesta {
    descripcionRespuesta: String;
}


const colorIcon = "#61EB8D"

export default function PaginaRespuestas() {

    const [showFormCrearPregunta, setShowFormCrearPregunta] = useState(false)
    const [Topic_id, setTopic_id]= useState<string | null>("")
    useEffect(() => {
        setTopic_id(localStorage.getItem("Topic"))
    }, []);
    const [question_id, setquestion_id]= useState<string | null>("")
    useEffect(() => {
        setquestion_id(localStorage.getItem("question_id"))
    }, []);
    const statusShowFormCrearPregunta = () => setShowFormCrearPregunta(!showFormCrearPregunta)

    const [Respuestas, setRespuestas] = useState([{
        num_response:0,
        description:"", 
        score:0,
        question_id:0, 
        user_id:0
    }])

    const toggle = () => {
        var blurMain = document.getElementById("main")
        blurMain?.classList.toggle("active")
        statusShowFormCrearPregunta()
    }
    useEffect(() => {
        const fetchData = async () => { // se trae la información de las preguntas que existen al entrar a la página./api/community/<int:community_id>/topic/<int:topic_id>/questions
            try {

                const res = await fetch(`${process.env.URL_API_BACKEND}/api/question/`+ localStorage.getItem("question_id") +'/responses' , {

                    method: 'GET',
                    mode: "cors",
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
    
                });
                if (res.ok) {
                    const data = await res.json();
                    console.log(data)
                    setRespuestas(data["responses"])
                }

                else{
                    console.log(await res.json())
                }
            } catch (error: any) {
                console.error('Error:', error);
                alert(error.message);
            }
    
        }
        fetchData();
      }, []);
    
    
    const CrearRespuesta = async (values: Respuesta) => {
        /**funcion para crear una pregunta y llevarla al backend */
        try {

            const res = await fetch(`${process.env.URL_API_BACKEND}/api/responses`, {

                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({"description": values.descripcionRespuesta, "question_id": localStorage.getItem("question_id")})
            })
            if (res.ok) {
                statusShowFormCrearPregunta()
                toast.success('La pregunta ha sido creada correctamente', {
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
   

    

    const validationSchema = Yup.object({
        tituloPregunta: Yup.string()
            .max(40, "El título de la pregunta no debe sobrepasar los 30 caracteres")
            .required("Campo requerido"),
        descripcionPregunta: Yup.string()
            .max(100, "La descripción de la pregunta no debe sobrepasar los 100 caracteres")
            .required("Campo requerido"),
    });

    return (
        <>
            <Head>
                <title>Universe</title>
            </Head>


            <main id='main'>
                <Navbar></Navbar>
                <LateralNavBar></LateralNavBar>
                <div className='principal_Content'>
                    
                        {Respuestas.map((item, index) => {
                            return (
                                <Respuesta
                                    key={item.num_response}
                                    num_response={item.num_response}
                                    question_id={item.question_id}
                                    description={item.description}
                                    score={item.score}
                                    user_id={item.user_id}
                                    
                                ></Respuesta>
                            );
                        })}
                        
                </div>

                <div className="button_crear" onClick={toggle}>
                    <IoIcon.IoMdAdd size={'80px'} color={colorIcon} />
                </div>

            </main>

            {showFormCrearPregunta ? (
                <div>

                    <Formik
                        initialValues={{
                            
                            descripcionRespuesta: ''

                        }}
                        onSubmit={async (values) => {

                            CrearRespuesta(values)
                            //alert(JSON.stringify(values));
                        }}

                    >
                        {({ handleSubmit, values, handleChange }) => (
                            <form id="login" onSubmit={handleSubmit}>
                                <div id="encabezado">
                                    <IoIcon.IoMdClose size={"25px"} onClick={toggle} id="close" />

                                    <div>
                                        <BiIcon.BiConversation size={"60px"} color={"#1D3752"} />
                                        <h2>Crear una nueva respuesta</h2>
                                    </div>
                                    <div>
                                        <button type="submit">
                                            <h3>Crear</h3>
                                        </button>
                                    </div>
                                </div>

                                <div id="inputs">
                                    <div>
                                        
                                        <h5>Escribe tu respuesta:</h5>
                                        <input name="descripcionRespuesta" type="text" placeholder="Respuesta"
                                            value={values.descripcionRespuesta}
                                            onChange={handleChange}
                                        />

                                    </div>
                                </div>
                                
                            </form>
                        )}
                    </Formik>
                </div>
            ) : null}
        </>
    )
}