import Image from 'next/image';
import React from "react";
import { useFormik } from "formik";
import { useRouter } from 'next/router';
import * as Yup from "yup";
import styles from '/styles/loginStyle.module.css';

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
      const res = await fetch('https://decorisaserver.azurewebsites.net/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data["access_token"]);
        localStorage.setItem("user_ID", data["ID"]);

        router.push('/PestaniaComunidad'); // Redirect to PestaniaComunidad.tsx
      } else {
        throw new Error('El usuario/email y/o contraseña son incorrectos, intentelo de nuevo');
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

      <div className={styles.rightContainer}>
        <Image
          src="/images/group.png"
          className={styles.desktopOnly}
          width={150}
          height={400}
          style={{marginTop: '6rem'}}
          alt="icon"
          priority
        />

        <h2 style={{color: '#1d3752', textAlign: 'center', marginTop: '2.7rem', marginBottom: '1rem'  }}>
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
  );
}

export default Login;








