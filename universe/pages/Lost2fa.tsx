import Image from 'next/image';
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useRouter } from 'next/router';
import * as Yup from "yup";
import styles from '/styles/loginStyle.module.css';
import nookies from 'nookies';
import Recuadro from 'universe/Component/Recuadro';


interface LoginFormValues {
  username: string;
  password: string;
}

interface VerificationFormValues {
  email: string;
  verificationCode: string;
}

const Lost2fa = () => {

  const credentialsInitialValues: LoginFormValues = {
    username: "",
    password: "",
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

  const CredentialsValidationSchema = Yup.object({
    username: Yup.string()
      .trim('El email no puede comenzar ni terminar con espacios en blanco')
      .matches(/^(?!\s*$).+$/, 'El email no puede ser solo espacios en blanco')
      .email("El email ingresado no es válido")
      .required("Campo requerido"),
    password: Yup.string()
      .required("Campo requerido"),
  });

  const verificationValidationSchema = Yup.object({
    verificationCode: Yup.string()
      .min(6, 'El código de verificación es de 6 caracteres')
      .required('Campo requerido'),
  });

  const onCredentialSubmit = async (values: LoginFormValues) => {
    // Perform authentication logic or send data to the server
    console.log(values);

    try {
      const res = await fetch(`http://127.0.0.1:3333/api/recover2fa`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ "name": values.username, "email": values.username, "password": values.password })
      });

      if (res.ok) {
        const data = await res.json();
        nookies.set(null, 'token', data["access_token"], { path: '/' });
        nookies.set(null, 're_token', data["refresh_token"], { path: '/' });
        nookies.set(null, "user_ID", data["user"]["id"], { path: '/' });
        nookies.set(null, "name", data["user"]["name"], { path: '/' });
        nookies.set(null, "email", data["user"]["email"], { path: '/' });

        localStorage.setItem("token", data["access_token"]);
        localStorage.setItem("re_token", data["refresh_token"]);
        localStorage.setItem("user_ID", data["user"]["id"]);
        localStorage.setItem("name", data["user"]["name"]);
        localStorage.setItem("email", data["user"]["email"]);

        const email = data["user"]["email"]
        onRecoverSubmit(email)
        // router.push('/2fa');
      } else if (res.status === 401) {
        setShowRecuadro(true)
      } else {
        throw new Error('Ha ocurrido un error en el inicio de sesión');
      }
    } catch (error: any) {
      console.error('Error:', error);
      alert(error.message);
    }
  };

  const onRecoverSubmit = async (email: string) => {
    console.log(email);

    try {
      const res = await fetch(`http://127.0.0.1:3333/api/sendemail`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ "email": email, "mode": "2" })
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
        router.push('/2fa')
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
    finally { setRecoverMessage(false) }
  }

  const Credentialsformik = useFormik({
    initialValues: credentialsInitialValues,
    validationSchema: CredentialsValidationSchema,
    onSubmit: onCredentialSubmit,
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


            <form className={styles.formLogin} onSubmit={Credentialsformik.handleSubmit}>
              <div className={styles.inputGroup}>
                <label htmlFor="username">Email registrado:</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Email registrado"
                  className={`${styles.inputUsername} ${Credentialsformik.touched.username && Credentialsformik.errors.username ? styles.inputError : ""}`}
                  {...Credentialsformik.getFieldProps("username")}
                />
                {Credentialsformik.touched.username && Credentialsformik.errors.username && (
                  <div className={styles.errorMessage}>{Credentialsformik.errors.username}</div>
                )}
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="password">Contraseña:</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Contraseña"
                  className={`${styles.inputPassword} ${Credentialsformik.touched.password && Credentialsformik.errors.password ? styles.inputError : ""}`}
                  {...Credentialsformik.getFieldProps("password")}
                />
                {Credentialsformik.touched.password && Credentialsformik.errors.password && (
                  <div className={styles.errorMessage}>{Credentialsformik.errors.password}</div>
                )}
              </div>
              <button type="submit" className={styles.loginButton}>
                Recuperar Token 2FA
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
          <Recuadro cerrar={handleAceptarClick} titulo={'Datos invalidos'} descripcion={'El email o la contraseña ingresados no existen o son incorrectos, intentalo de nuevo'} />
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

export default Lost2fa;