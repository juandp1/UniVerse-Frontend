import Image from 'next/image';
import React, { useState } from "react";
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

const Login = () => {

  const initialValues: LoginFormValues = {
    username: "",
    password: "",
  };

  const router = useRouter();
  const [showRecuadro, setShowRecuadro] = useState(false);

  const handleAceptarClick = () => {
    setShowRecuadro(false);
    router.push('/Login');
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Campo requerido"),
    password: Yup.string()
      .required("Campo requerido"),
  });

  const onSubmit = async (values: LoginFormValues) => {
    // Perform authentication logic or send data to the server
    console.log(values);

    try {
      const res = await fetch('https://universe-backend.azurewebsites.net/api/login', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
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

        router.push('/PestaniaComunidad'); // Redirect to PestaniaComunidad.tsx

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


  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const handleRegisterClick = () => {
    router.push('/Registro');
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
                <label htmlFor="username">Usuario o email registrado:</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Usuario o email registrado"
                  className={`${styles.inputUsername} ${formik.touched.username && formik.errors.username ? styles.inputError : ""}`}
                  {...formik.getFieldProps("username")}
                />
                {formik.touched.username && formik.errors.username && (
                  <div className={styles.errorMessage}>{formik.errors.username}</div>
                )}
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="password">Contraseña:</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Contraseña"
                  className={`${styles.inputPassword} ${formik.touched.password && formik.errors.password ? styles.inputError : ""}`}
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className={styles.errorMessage}>{formik.errors.password}</div>
                )}
              </div>
              <button type="submit" className={styles.loginButton}>
                INICIAR SESION
              </button>
            </form>
          </div>

          <div className={styles.rightContainer} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Image
              src="/images/group.png"
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

      {showRecuadro && (
        <div className="modalOverlay">
          <Recuadro cerrar={handleAceptarClick} titulo={'Datos invalidos'} descripcion={'El email/usuario o la contraseña ingresados no existen o son incorrectos, intentalo de nuevo'} />
        </div>
      )}

    </>
  );
}

export default Login;