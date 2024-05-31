import Head from "next/head";
import * as Faicon from 'react-icons/fa';
import style from "/styles/homeComunidadStyles.module.css";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import nookies from 'nookies';
import Recuadro from "universe/Component/Recuadro";
import { GetServerSideProps } from "next/types";

export const getServerSideProps: GetServerSideProps = async (context) => {
    context.res.setHeader("Cache-Control", "no-store, must-revalidate");
    const token = nookies.get(context).RecoveryCode;

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

const colorIcon = "#61EB8D";
interface ProfileFormValues {
    act_password: string;
    new_password: string;
}

const ChangePassword = () => {

    const [showRecuadro, setShowRecuadro] = useState(false);
    const [showRecuadro2, setShowRecuadro2] = useState(false);

    const handleAceptarClick = () => {
        setShowRecuadro(false);
        router.push('/Login');
    };

    const handleAceptarClick2 = () => {
        setShowRecuadro2(false);

    };


    const initialValues: ProfileFormValues = ({
        act_password: "",
        new_password: "",
    });

    const router = useRouter();

    const [email, setEmail] = useState<string | null>(null);
    useEffect(() => {
        setEmail(localStorage.getItem("email"));
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
    })


    const onSubmit = async (values: ProfileFormValues) => {
        // Perform authentication logic or send data to the server
        console.log(values, email);

        try {
            const res = await fetch(`http://127.0.0.1:3333/api/changepwd`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "email": email, "password": values.new_password })
            });

            if (res.ok) {
                console.log("Rest ok")
                setShowRecuadro(true);
            } else {
                console.log("Rest fail")
                setShowRecuadro2(true);
            }
        } catch (error: any) {
            console.error('Error:', error);
            setShowRecuadro2(true);
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
                <div className="principal_Content_Profile">
                    <div className="flex items-center justify-start space-x-3">
                        <Faicon.FaUserEdit size={"130px"} color={colorIcon} />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <h2 style={{ alignSelf: 'flex-start' }}>Restablecer contraseña</h2>
                        </div>
                    </div>

                    <h3 style={{ alignSelf: 'flex-start', marginTop: '25px', marginLeft: '10px' }}>
                        Cambia la contraseña de tu cuenta
                    </h3>

                    <form className={style.formProfile} onSubmit={formik.handleSubmit}>
                        <div className={style.inputContainer}>
                            <div className={style.component1}>
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
                    <Recuadro cerrar={handleAceptarClick2} titulo={'Error cambiando la contraseña'} descripcion={'Ha ocurrido un error editando su información personal'} />
                </div>
            )}




        </>
    )
}

export default ChangePassword;
