import Head from "next/head";
import ComunidadPerfil from "universe/Component/ComunidadPerfil";
import * as Faicon from 'react-icons/fa';
import * as IoIcon from 'react-icons/io';
import * as AiIcon from 'react-icons/ai';
import LateralNavBar from "universe/Component/LateralNavBar";
import Navbar from "universe/Component/NavBar";
import style from "/styles/homeComunidadStyles.module.css";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { Formik, Form, Field } from 'formik';
import { useFormik } from "formik";
import * as Yup from "yup";
import Recuadro from "universe/Component/Recuadro";
import { GetServerSideProps } from "next/types";
import nookies from 'nookies';
import Cookies from "js-cookie";
import styles from '/styles/loginStyle.module.css';

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






// Define validation schema for the form


const colorIcon = "#61EB8D";
interface ProfileFormValues {
    act_password: string;
    new_password: string;
    token_2fa: string;
}

const EditarPerfil = () => {



    const [showRecuadro, setShowRecuadro] = useState(false);
    const [showRecuadro2, setShowRecuadro2] = useState(false);
    const [showRecuadro3, setShowRecuadro3] = useState(false);
    const [showRecuadro4, setShowRecuadro4] = useState(false);
    const [showRecuadro5, setShowRecuadro5] = useState(false);

    const handleAceptarClick = () => {
        setShowRecuadro(false);
        router.push('/Perfil');
    };

    const handleAceptarClick2 = () => {
        setShowRecuadro2(false);

    };
    const handleAceptarClick3 = () => {
        setShowRecuadro3(false);

    };

    const handleAceptarClick4 = () => {
        setShowRecuadro4(false);

    };

    const handleAceptarClick5 = () => {
        setShowRecuadro5(false);

    };

    const [name, setName] = useState<string | null>(null);
    useEffect(() => {
        setName(localStorage.getItem("name"));
    }, []);

    const [email, setEmail] = useState<string | null>(null);
    useEffect(() => {
        setEmail(localStorage.getItem("email"));
    }, []);


    const initialValues: ProfileFormValues = ({
        act_password: "",
        new_password: "",
        token_2fa: ""
    });

    const router = useRouter();
    const [storedPassword, setStoredPassword] = useState<string | null>(null);

    useEffect(() => {
        setStoredPassword(localStorage.getItem("password"));
    }, []);




    const validationSchema = Yup.object().shape({
        act_password: Yup.string()
            .trim('La contraseña no puede comenzar ni terminar con espacios en blanco')
            .min(8, "La contraseña debe incluir al menos 8 caracteres")
            .max(32, "La contraseña no debe exceder los 32 caracteres")
            .matches(/^\S*$/, 'Los espacios no estan permitidos')
            .required("Campo requerido"),
        new_password: Yup.string()
            .trim('La confirmación de la contraseña no puede comenzar ni terminar con espacios en blanco')
            .oneOf([Yup.ref("act_password")], "Las contraseñas no coinciden")
            .matches(/^\S*$/, 'Los espacios no estan permitidos')
            .required("Campo requerido"),
        token_2fa: Yup.string()
            .matches(/^\S*$/, 'Los espacios no estan permitidos')
            .required("Campo requerido"),
    })


    const onSubmit = async (values: ProfileFormValues) => {
        // Perform authentication logic or send data to the server
        console.log(values);

        try {

            const res = await fetch(`http://127.0.0.1:3333/api/user/${localStorage.getItem("user_ID")}`, {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ "name": name , "email": email, "password": values.new_password, "token_2fa": values.token_2fa })
            });

            if (res.ok) {
                const data = await res.json();
                localStorage.setItem("name", data["name"]);
                localStorage.setItem("email", data["email"]);
                setShowRecuadro(true);
            } else if (res.status === 400) {
                const data = await res.json();
                switch (data.message) {
                    case "A user with that email already exists":
                        setShowRecuadro2(true);
                        break;
                    case "A user with that name already exists":
                        setShowRecuadro3(true);
                        break;
                    default:
                        setShowRecuadro4(true);
                        break;
                }
            } else if (res.status === 401) {
                setShowRecuadro5(true);
            }
        } catch (error: any) {
            console.error('Error:', error);
            alert(error.message);
        }
    };


    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    return (
        <>
            <Head>
                <title>Universe</title>
            </Head>

            <main id="main">
                <Navbar></Navbar>
                <div className="principal_Content_Profile">
                    <div className="flex items-center justify-start space-x-3">
                        <Faicon.FaUserEdit size={"130px"} color={colorIcon} />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <h2 style={{ alignSelf: 'flex-start' }}>Editar perfil</h2>
                        </div>
                    </div>

                    <h3 style={{ alignSelf: 'flex-start', marginTop: '25px', marginLeft: '10px' }}>
                        Edita la información personal de tu cuenta
                    </h3>

                    <form className={style.formProfile} onSubmit={formik.handleSubmit}>
                        <div className={style.inputContainer}>
                            <div className={style.component1}>
                                <h4 style={{ alignSelf: 'flex-start', marginTop: '5px' }}>Nombre de usuario:</h4>
                                <div className={style.textContainer}>
                                    <div>
                                        <h5>{name}</h5> 
                                    </div>
                                </div>

                                <h4 style={{ alignSelf: 'flex-start', marginTop: '20px' }}>Ingrese su nueva contraseña:</h4>
                                <input
                                    type="password"
                                    id="act_password"
                                    placeholder="Nueva contraseña"
                                    className={`${style.inputPassword} ${formik.touched.act_password && formik.errors.act_password ? style.inputError : ""}`}
                                    {...formik.getFieldProps("act_password")}
                                />
                                {formik.touched.act_password && formik.errors.act_password && (
                                    <div className="errorMessage">{formik.errors.act_password}</div>
                                )}


                            </div>
                            <div className={style.component2}>
                                <h4 style={{ alignSelf: 'flex-start', marginTop: '5px' }}>Email registrado:</h4>
                                <div className={style.textContainer}>
                                    <div>
                                        <h5>{email}</h5>
                                    </div>
                                </div>


                                <h4 style={{ alignSelf: 'flex-start', marginTop: '20px' }}>Confirmar contraseña:</h4>
                                <input
                                    type="password"
                                    id="new_password"
                                    placeholder="Confirme su contraseña"
                                    className={`${style.inputPassword} ${formik.touched.new_password && formik.errors.new_password ? style.inputError : ""}`}
                                    {...formik.getFieldProps("new_password")}
                                />
                                {formik.touched.new_password && formik.errors.new_password && (
                                    <div className="errorMessage">{formik.errors.new_password}</div>
                                )}

                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="password">Token 2fa:</label>
                            <input
                            type="password"
                            id="token_2fa"
                            placeholder="Token 2fa"
                            className={`${styles.inputPassword} ${formik.touched.token_2fa && formik.errors.token_2fa ? styles.inputError : ""}`}
                            {...formik.getFieldProps("token_2fa")}
                            />
                            {formik.touched.token_2fa && formik.errors.token_2fa && (
                            <div className={styles.errorMessage}>{formik.errors.token_2fa}</div>
                            )}
                        </div>

                        <button type="submit" className={style.rectangleButton}>
                            <h6>Confirmar cambios</h6>
                        </button>



                    </form>



                </div>




            </main >

            {showRecuadro && (
                <div className="modalOverlay">
                    <Recuadro cerrar={handleAceptarClick} titulo={'Cambios realizados'} descripcion={'Se han realizado los cambios en su informacion personal de manera exitosa'} />
                </div>
            )}

            {showRecuadro2 && (
                <div className="modalOverlay">
                    <Recuadro cerrar={handleAceptarClick2} titulo={'Email ya registrado'} descripcion={'Un usuario con la dirección de correo ingresado ya existe, intentelo de nuevo'} />
                </div>
            )}

            {showRecuadro3 && (
                <div className="modalOverlay">
                    <Recuadro cerrar={handleAceptarClick3} titulo={'Nombre de usuario ya registrado'} descripcion={'Un usuario con el nombre de ususario ingresado ya existe, intentelo de nuevo'} />
                </div>
            )}

            {showRecuadro4 && (
                <div className="modalOverlay">
                    <Recuadro cerrar={handleAceptarClick4} titulo={'Error editando el perfil'} descripcion={'Ha ocurrido un error editando su información personal'} />
                </div>
            )}

            {showRecuadro5 && (
                <div className="modalOverlay">
                    <Recuadro cerrar={handleAceptarClick5} titulo={'Token 2fa Incorrecto'} descripcion={'El token 2fa ingresado no corresponde, intentelo de nuevo'} />
                </div>
            )}




        </>
    )
}

export default EditarPerfil;
