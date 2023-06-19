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
import nookies from 'nookies';
import Cookies from "js-cookie";
import Recuadro from "universe/Component/Recuadro";

// Define validation schema for the form


const colorIcon = "#61EB8D";
interface ProfileFormValues {
    username: string;
    email: string;
    act_password: string;
    new_password: string;
}

const EditarPerfil = () => {



    const [showRecuadro, setShowRecuadro] = useState(false);
    const handleAceptarClick = () => {
        setShowRecuadro(false);
        router.push('/Perfil');
    };

    const initialValues: ProfileFormValues = {
        username: "",
        email: "",
        act_password: "",
        new_password: "",
    };

    const router = useRouter();
    const [storedPassword, setStoredPassword] = useState<string | null>(null);

    useEffect(() => {
        setStoredPassword(localStorage.getItem("password"));
    }, []);

    


    const validationSchema = Yup.object({
        username: Yup.string().required("Campo requerido"),
        email: Yup.string().email("El email ingresado no es válido").required("Campo requerido"),
        act_password: Yup.string().min(8, "La contraseña debe incluir al menos 8 caracteres").max(32, "La contraseña no debe exceder los 32 caracteres").required("Campo requerido"),
        new_password: Yup.string().oneOf([Yup.ref("act_password")], "Las contraseñas no coinciden").required("Campo requerido"),
    });
    const onSubmit = async (values: ProfileFormValues) => {
        // Perform authentication logic or send data to the server
        console.log(values);

        try {
            const res = await fetch(`http://localhost:3333/api/user/${localStorage.getItem("user_ID")}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get("token")}`,
                },
                body: JSON.stringify({ "name": values.username, "email": values.email, "password": values.new_password })
            });

            if (res.ok) {
                const data = await res.json();
                localStorage.setItem("name", data["name"]); 
                localStorage.setItem("email", data["email"]);
                setShowRecuadro(true);
            } else {
                throw new Error("An error occurred while updating the user");
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
                        <Faicon.FaUser size={"100px"} color={colorIcon} />
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
                                <h4 style={{ alignSelf: 'flex-start', marginTop: '5px' }}>Cambiar nombre de usuario:</h4>
                                <input
                                    type="text"
                                    id="username"
                                    placeholder="Nuevo usuario"
                                    className={`${style.inputUsername} ${formik.touched.username && formik.errors.username ? style.inputError : ""}`}
                                    {...formik.getFieldProps("username")}
                                />
                                {formik.touched.username && formik.errors.username && (
                                    <div className="errorMessage">{formik.errors.username}</div>
                                )}

                                <h4 style={{ alignSelf: 'flex-start', marginTop: '20px' }}>Cambiar email registrado:</h4>
                                <input
                                    type="text"
                                    id="email"
                                    placeholder="Usuario o email registrado"
                                    className={`${style.inputEmail} ${formik.touched.email && formik.errors.email ? style.inputError : ""}`}
                                    {...formik.getFieldProps("email")}
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <div className="errorMessage">{formik.errors.email}</div>
                                )}

                            </div>
                            <div className={style.component2}>
                                <h4 style={{ alignSelf: 'flex-start', marginTop: '5px' }}>Contraseña actual:</h4>
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


                                <h4 style={{ alignSelf: 'flex-start', marginTop: '20px' }}>Nueva contraseña:</h4>
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

                        <button type="submit" className={style.rectangleButton}>
                            <h6>CONFIRMAR CAMBIOS</h6>
                        </button>



                    </form>



                </div>




            </main >

            {showRecuadro && (
                <div className="modalOverlay">
                    <Recuadro cerrar={handleAceptarClick} titulo={'Cambios realizados'} descripcion={'Se han realizado los cambios en su informacion personal de manera exitosa'} />
                </div>
            )}




        </>
    )
}

export default EditarPerfil;
