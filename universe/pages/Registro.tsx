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

  const [showRecuadro2, setShowRecuadro2] = useState(false);

  const [showRecuadro3, setShowRecuadro3] = useState(false);



  const validationSchema = Yup.object({
    username: Yup.string()
      .trim('El nombre de usuario no puede comenzar ni terminar con espacios en blanco')
      .matches(/^(?!\s*$).+$/, 'El nombre de usuario no puede ser solo espacios en blanco')
      .min(5, "El nombre de usuario debe incluir al menos 8 caracteres")
      .max(15, "El nombre de usuario no debe sobrepasar los 15 caracteres")
      .required("Campo requerido"),
    email: Yup.string()
      .trim('El email no puede comenzar ni terminar con espacios en blanco')
      .matches(/^(?!\s*$).+$/, 'El email no puede ser solo espacios en blanco')
      .email("El email ingresado no es válido")
      .required("Campo requerido"),
    password: Yup.string()
      .trim('La contraseña no puede comenzar ni terminar con espacios en blanco')
      .matches(/^(?!\s*$).+$/, 'La contraseña no puede ser solo espacios en blanco')
      .min(8, "La contraseña debe incluir al menos 8 caracteres")
      .max(32, "La contraseña no debe exceder los 32 caracteres")
      .required("Campo requerido"),
    confirmPassword: Yup.string()
      .trim('La confirmación de la contraseña no puede comenzar ni terminar con espacios en blanco')
      .matches(/^(?!\s*$).+$/, 'La confirmación de la contraseña no puede ser solo espacios en blanco')
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


  const handleAceptarClick2 = () => {
    setShowRecuadro(false);
  };

  const handleAceptarClick3 = () => {
    setShowRecuadro(false);
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
      } else if (res.status == 400) { //codigo de usuario ya existente 
        const data = await res.json();
        switch (data.message) {
          case "A user with that email already exists":
            setShowRecuadro2(true);
            break;
          case "A user with that name already exists":
            setShowRecuadro3(true);
            break;
          default:

            break;
        }
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
              src="/images/universelogo.png"
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

      {showRecuadro2 && (
        <div className="modalOverlay">
          <Recuadro cerrar={handleAceptarClick2} titulo={'Email invalido'} descripcion={'El email ingresado ya esta en uso, intentelo de nuevo'} />
        </div>
      )}

      {showRecuadro3 && (
        <div className="modalOverlay">
          <Recuadro cerrar={handleAceptarClick3} titulo={'Usuario invalido'} descripcion={'El usuario ingresado ya esta en uso, intentelo de nuevo'} />
        </div>
      )}




    </>


  );
};

export default Registro;

