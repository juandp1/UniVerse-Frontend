import Image from 'next/image';
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from './registerStyle.module.css';

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

  const validationSchema = Yup.object({
    username: Yup.string()
      .max(20, "El nombre de usuario no debe sobrepasar los 20 caracteres")
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

  const onSubmit = (values: FormValues) => {
    // Handle form submission here
    console.log(values);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.rectangle}></div>
        <div className={styles.logoContainer}>
          <img
            className={styles.logoImage}
            src="/images/UniVerseLogo.svg"
            alt="Logo Universe"
          />
        </div>
        <h1 className={styles.registerHeading}>Registro</h1>
        <div className={styles.formContainer}>
          <form className={styles.formRegistro} onSubmit={formik.handleSubmit}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                id="username"
                placeholder="Nombre de usuario"
                className={`${styles.inputUsername} ${
                  formik.touched.username && formik.errors.username
                    ? styles.inputError
                    : ""
                }`}
                {...formik.getFieldProps("username")}
              />
              {formik.touched.username && formik.errors.username && (
                <div className={styles.errorMessage}>{formik.errors.username}</div>
              )}
            </div>
            <div className={styles.inputGroup}>
              <input
                type="email"
                id="email"
                placeholder="Email"
                className={`${styles.inputEmail} ${
                  formik.touched.email && formik.errors.email ? styles.inputError : ""
                }`}
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <div className={styles.errorMessage}>{formik.errors.email}</div>
              )}
            </div>
            <div className={styles.inputGroup}>
              <input
                type="password"
                id="password"
                placeholder="Contraseña"
                className={`${styles.inputPassword} ${
                  formik.touched.password && formik.errors.password
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
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirmar contraseña"
                className={`${styles.inputPassword} ${
                  formik.touched.confirmPassword && formik.errors.confirmPassword
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
              Registrarse
            </button>
          </form>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            id="searchSubjects"
            name="searchSubjects"
            placeholder="Selecciona las materias de tu preferencia:"
            className={styles.inputSearch}
          />
          <div className={styles.subjectResults}>
            {/* Display search results here */}
          </div>
        </div>
        <div className={styles.selectedSubjectsContainer}>
          {/* Display selected subjects here */}
        </div>
      </div>
    </div>
  );
};

export default Registro;

