import Image from 'next/image';
import { Formik, Form, Field } from 'formik';
import { useRouter } from 'next/router';
import styles from '/styles/loginStyle.module.css';

interface LoginFormValues {
  username: string;
  password: string;
}

export default function Login(): JSX.Element {
  const router = useRouter();

  const handleSubmit = (values: LoginFormValues) => {
    // Perform authentication logic or send data to the server
    console.log('Username:', values.username);
    console.log('Password:', values.password);
    // Simulating an incorrect username/password
    const error: unknown = 'El usuario/email y/o contraseña son incorrectos, intentelo de nuevo';
    if (typeof error === 'string') {
      alert(error);
    }
    
    router.push('/PestaniaComunidad'); // Redirect to PestaniaComunidad.tsx
  };

  const handleRegisterClick = () => {
    router.push('/registro');
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.logoContainer}>
          <Image
            src="/images/UniVerseLogo.svg"
            className={styles.logoImage}
            width={400}
            height={50}
            alt="logo"
            priority
          />
        </div>

        <h2 className={styles.welcomeText}>¡Bienvenido de nuevo!</h2>

        <div className={styles.formContainer}>
          <Formik
            initialValues={{
              username: '',
              password: ''
            }}
            onSubmit={handleSubmit}
          >
            <Form className={styles.formLogin}>
              <div className={styles.inputGroup}>
                <label htmlFor="username">Usuario:</label>
                <Field
                  type="text"
                  id="username"
                  className={styles.inputUsername}
                  name="username"
                  placeholder="Usuario"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="password">Contraseña:</label>
                <Field
                  type="password"
                  id="password"
                  className={styles.inputPassword}
                  name="password"
                  placeholder="Contraseña"
                  required
                />
              </div>

              <div className={styles.forgotPasswordGroup}>
                <a href="#!" className={styles.forgotPasswordLink}>
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <div className={styles.loginButtonGroup}>
                <button type="submit" className={styles.loginButton}>
                  INICIAR SESIÓN
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>

      <div className={styles.rightContainer}>
        <div className={styles.registerContent}>
          <div className={styles.iconContainer}>
            <Image
              src="/images/group.png"
              className={styles.iconImage}
              width={150}
              height={200}
              alt="icon"
              priority
            />
          </div>

          <h2 className={styles.registerHeading}>¿Aún no eres parte?</h2>
          <p className={styles.registerText}>
            Regístrate y únete a la red de comunidades de la UN
          </p>

          <div className={styles.ButtonGroup}>
            <button className={styles.registerButton} onClick={handleRegisterClick}>
              REGISTRATE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}











