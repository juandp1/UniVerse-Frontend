import Image from 'next/image';
import React from "react";
import { useFormik } from "formik";
import { useRouter } from 'next/router';
import { useState } from "react";
import * as Yup from "yup";
import styles from 'styles/registerStyle.module.css';
import Link from 'next/link';
import Recuadro from 'universe/Component/Recuadro';


interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Registro = () => {
  const initialValues: FormValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const router = useRouter();
  const [showRecuadro, setShowRecuadro] = useState(false);

  const validationSchema = Yup.object({
    username: Yup.string()
      .max(15, "El nombre de usuario no debe sobrepasar los 15 caracteres") 
      .required("Campo requerido"),
    email: Yup.string()
      .email("El email ingresado no es válido")
      .required("Campo requerido"),
    password: Yup.string()
      .min(8, "La contraseña debe incluir al menos 8 caracteres")
      .max(32, "La contraseña no debe exceder los 32 caracteres")
      .required("Campo requerido"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
      .required("Campo requerido"),
  });

  const handleRegisterClick = () => {
    router.push('/Login');
  };
  const handleAceptarClick = () => {
    setShowRecuadro(false);
    router.push('/Login');
  };
  const onSubmit = async (values: FormValues) => {
    // Perform authentication logic or send data to the server
    console.log(values);

    try {
      const res = await fetch('https://universe-backend.azurewebsites.net/api/register', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "name": values.username, "email": values.email, "password": values.password })
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data["access_token"]);
        setShowRecuadro(true)
      } else if (res.status == 201) { //codigo de usuario ya existente 
        throw new Error('El usuario ingresado ya existe, intentelo de nuevo');
      } else if (res.status == 400) { //codigo error de email ya existente 
        throw new Error('El email ingresado ya existe, intentelo de nuevo');
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
      <main id='main'>

        <div className={styles.container}>
          <div className={styles.rectangle}>
            <Image
              src="/images/UniVerseLogo.png"
              width={300}
              height={35}
              alt="logo"
              priority
            />
          </div>


          <h2 className={styles.welcomeText}>¡Haz parte de nuestra gran comunidad!</h2>


          <form className={styles.formRegistro} onSubmit={formik.handleSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="username">Usuario:</label>
              <input
                type="text"
                id="username"
                placeholder="Nombre de usuario"
                className={`${styles.inputUsername} ${formik.touched.username && formik.errors.username ? styles.inputError : ""

                  }`}
                {...formik.getFieldProps("username")}
              />
              {formik.touched.username && formik.errors.username && (
                <div className={styles.errorMessage}>{formik.errors.username}</div>
              )}
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                className={`${styles.inputEmail} ${formik.touched.email && formik.errors.email ? styles.inputError : ""
                  }`}
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <div className={styles.errorMessage}>{formik.errors.email}</div>
              )}
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                id="password"
                placeholder="Contraseña"
                className={`${styles.inputPassword} ${formik.touched.password && formik.errors.password
                  ? styles.inputError
                  : ""
                  }`}
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password && (
                <div className={styles.errorMessage}>{formik.errors.password}</div>
              )}
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">Confirme su contraseña:</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirmar contraseña"
                className={`${styles.inputPassword} ${formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? styles.inputError
                  : ""
                  }`}
                {...formik.getFieldProps("confirmPassword")}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <div className={styles.errorMessage}>
                  {formik.errors.confirmPassword}
                </div>
              )}
            </div>
            <button type="submit" className={styles.registerButton}>
              REGISTRATE
            </button>
            <div className={styles.loginLink}>
              ¿Ya tienes una cuenta?{" "}
              <span
                className={styles.loginText}
                onClick={handleRegisterClick}
                role="button"
              >
                Inicia sesión
              </span>
            </div>
          </form>



        </div>

      </main>
      {showRecuadro && (
        <div className="modalOverlay">
          <Recuadro cerrar={handleAceptarClick} titulo={'Cuenta creada con exito'} descripcion={'Ya puedes iniciar sesion y disfrutar de universe'} />
        </div>
      )}
    </>


  );
};

export default Registro;

