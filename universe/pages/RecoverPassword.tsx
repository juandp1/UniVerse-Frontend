import Image from 'next/image';
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useRouter } from 'next/router';
import * as Yup from "yup";
import nookies from 'nookies';
import styles from '/styles/loginStyle.module.css';
import Recuadro from 'universe/Component/Recuadro';

interface RecoverFormValues {
    email: string;
}

interface VerificationFormValues {
    email: string;
    verificationCode: string;
}

const RecoverPassword = () => {

    const initialValues: RecoverFormValues = {
        email: "",
    };

    const verificationInitialValues: VerificationFormValues = {
        email: "",
        verificationCode: "",
    };

    const router = useRouter();
    const [showRecuadro, setShowRecuadro] = useState(false);
    const [showRecuadro2, setShowRecuadro2] = useState(false);
    const [showRecuadro3, setShowRecuadro3] = useState(false);
    const [recoverMessage, setRecoverMessage] = useState(false);

    const handleAceptarClick = () => {
        setShowRecuadro(false);
        setRecoverMessage(false);
    };

    const handleAceptarClick2 = () => {
        setShowRecuadro2(false);
    };

    const handleAceptarClick3 = () => {
        setShowRecuadro3(false);
        setRecoverMessage(true);
    };

    const emailValidationSchema = Yup.object({
        email: Yup.string()
            .email("Email inválido")
            .required("Campo requerido"),
    });

    const verificationValidationSchema = Yup.object({
        verificationCode: Yup.string()
            .min(6, 'El código de verificación es de 6 caracteres')
            .required('Campo requerido'),
    });

    const onRecoverSubmit = async (values: RecoverFormValues) => {
        console.log(values);

        try {
            const res = await fetch(`http://127.0.0.1:3333/api/sendemail`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ "email": values.email, "mode": "1" })
            });

            if (res.ok) {
                const data = await res.json();
                localStorage.setItem("email", data["email"]);
                setRecoverMessage(true);
            } else {
                throw new Error('Ha ocurrido un error al enviar el correo de recuperación');
            }
        } catch (error: any) {
            console.error('Error:', error);
            alert(error.message);
        }
    };

    const [email, setEmail] = useState<string | null>(null);
    useEffect(() => {
        setEmail(localStorage.getItem("email"));
    }, []);


    const onVerificationSubmit = async (values: VerificationFormValues) => {
        console.log('Verification code submitted:', values.verificationCode, email);

        try {
            const response = await fetch(`http://127.0.0.1:3333/api/verifycode`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ "email": email, "recoverCode": values.verificationCode })
            });

            if (response.ok) {
                nookies.set(null, 'RecoveryCode', "true", { path: '/' });
                router.push('/ChangePassword')
            } else if (response.status === 400) {
                const data = await response.json();
                switch (data.message) {
                    case "Recovery code has expired":
                        setShowRecuadro2(true);
                        break;
                    default:
                        setShowRecuadro3(true);
                        break;
                }
                console.error('Error verifying recovery code:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            setShowRecuadro3(true);
        }
        finally{setRecoverMessage(false)}
    }

    const formik = useFormik({
        initialValues,
        validationSchema: emailValidationSchema,
        onSubmit: onRecoverSubmit,
    });

    const verificationFormik = useFormik({
        initialValues: verificationInitialValues,
        validationSchema: verificationValidationSchema,
        onSubmit: onVerificationSubmit,
    });

    const handleRegisterClick = () => {
        router.push('/Registro');
    };

    const handleLoginClick = () => {
        router.push('/Login');
    };


    return (
        <>
            <main id='main'>
                <div className={styles.container}>
                    <div className={styles.leftContainer}>
                        <div className={styles.logoContainer}>
                            <Image
                                src="/images/UniVerseLogo.svg"
                                width={400}
                                height={50}
                                alt="logo"
                                priority
                            />
                        </div>

                        <h2 style={{ marginTop: '-4rem', textAlign: 'center' }}>
                            ¡Bienvenido de nuevo!
                        </h2>

                        <form className={styles.formLogin} onSubmit={formik.handleSubmit}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="email">Ingrese el email registrado:</label>
                                <input
                                    type="text"
                                    id="email"
                                    placeholder="Ingrese el email registrado"
                                    className={`${styles.inputUsername} ${formik.touched.email && formik.errors.email ? styles.inputError : ""}`}
                                    {...formik.getFieldProps("email")}
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <div className={styles.errorMessage}>{formik.errors.email}</div>
                                )}
                            </div>
                            <button type="submit" className={styles.loginButton}>
                                Enviar correo
                            </button>

                            <div className={`${styles.loginLink} ${styles.noMargin}`}>
                                ¿Ya tienes una cuenta?{" "}
                                <span
                                    className={styles.loginText}
                                    onClick={handleLoginClick}
                                    role="button"
                                >
                                    Inicia sesión
                                </span>
                            </div>

                        </form>
                    </div>

                    <div className={styles.rightContainer} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Image
                            src="/images/Group.png"
                            className={styles.desktopOnly}
                            width={150}
                            height={400}
                            style={{ marginTop: '5rem' }}
                            alt="icon"
                            priority
                        />

                        <h2 style={{ color: '#1d3752', textAlign: 'center', marginTop: '3.2rem', marginBottom: '1rem' }}>
                            ¿Aún no eres parte?
                        </h2>

                        <p className={styles.registerText}>
                            Regístrate y únete a la red de comunidades de la UN
                        </p>

                        <div className={styles.ButtonGroup}>
                            <button className={styles.registerButton} onClick={handleRegisterClick}>
                                REGISTRATE
                            </button>
                        </div>
                    </div>
                </div >
            </main>

            {recoverMessage && (
                <div className="modalOverlay">
                    <Recuadro cerrar={handleAceptarClick} titulo={'Recuperar token 2af'} descripcion={'Se ha enviado un correo electrónico con un código. Por favor ingréselo a continuación:'}>
                        <form className={styles.formverify} onSubmit={verificationFormik.handleSubmit}>
                            <div className={styles.inputGroup}>
                                <input
                                    type='text'
                                    id='verificationCode'
                                    placeholder='Ingrese el código de verificación'
                                    className={`${styles.inputUsername} ${verificationFormik.touched.verificationCode && verificationFormik.errors.verificationCode ? styles.inputError : ''
                                        }`}
                                    {...verificationFormik.getFieldProps('verificationCode')}
                                />
                                {verificationFormik.touched.verificationCode && verificationFormik.errors.verificationCode && (
                                    <div className={styles.errorMessage}>{verificationFormik.errors.verificationCode}</div>
                                )}
                            </div>
                            <button type='submit' className={styles.loginButton}>
                                Verificar
                            </button>
                            <button onClick={handleAceptarClick} className={styles.loginButton}>Close</button>
                        </form>
                    </Recuadro>
                </div>
            )}

            {showRecuadro && (
                <div className="modalOverlay">
                    <Recuadro cerrar={handleAceptarClick} titulo={'Datos invalidos'} descripcion={'No se pudo enviar correo al email ingresado porque no existe o es incorrecto, intentalo de nuevo'} />
                </div>
            )}

            {showRecuadro2 && (
                <div className="modalOverlay">
                    <Recuadro cerrar={handleAceptarClick2} titulo={'Codigo expirado'} descripcion={'El codigo de recuperación ya expiro, vuelve a generar uno'} />
                </div>
            )}

            {showRecuadro3 && (
                <div className="modalOverlay">
                    <Recuadro cerrar={handleAceptarClick3} titulo={'Datos invalidos'} descripcion={'El codigo de recuperación o el email fueron erroneos'} />
                </div>
            )}

            

        </>
    );
}

export default RecoverPassword;
