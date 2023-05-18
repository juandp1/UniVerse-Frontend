
import { Inter } from 'next/font/google'
import Navbar from '../Component/NavBar'
import Head from 'next/head';
import style from "/styles/homeStyle.module.css";
import LateralNavBar from 'universe/Component/LateralNavBar';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
      <>
          <div className={style.Home}>

              <Head>
                <title>Universe</title>
              </Head>
              <header>
                <Navbar></Navbar>
                {/*Agrego los componentes dentro del header*/}
              </header>

              <div className={style.imagen_logo}>
                  <img src="/images/universelogo.png" alt='logo'/>
              </div>

              <div className={style.rectangle}>
                <h1 className={style.rectangle_text}>¿Sobre qué quieres aprender hoy?</h1>
              </div>

              <div className={style.info_rectangle}>
                <div className={style.info_rectangle_head}>
                  <h1 className={style.info_rectangle_head_text}>¡Únete a comunidades de estudio!</h1>
                </div>
                <div className={style.info_space}>
                  <p className={style.info}>Busca o crea comunidades con tus mismos intereses y haz parte de ellas para participar de actividades y tener acceso a material que definitivamente te resultará útil en tu aprendizaje.</p>
                </div>
                <div className={style.imagen_info}>
                  <img src="/images/Group.png" alt='Group'/>
                </div>
              </div>

              <div className={style.info_rectangle}>
                <div className={style.info_rectangle_head}>
                  <h1 className={style.info_rectangle_head_text}>¡Organiza reuniones!</h1>
                </div>
                <div className={style.info_space}>
                  <p className={style.info}>Cuadra con otros integrantes de la comunidad encuentros o reuniones donde puedan socializar sus conocimientos y resolver dudas. Ten en cuenta que estas reuniones pueden ser tanto virtuales como presenciales. ¡Busca la opción que más se te acomode!</p>
                </div>
                <div className={style.imagen_info}>
                  <img src="/images/Meeting.png" alt='Group'/>
                </div>
              </div>

              <div className={style.info_rectangle}>
                <div className={style.info_rectangle_head}>
                  <h1 className={style.info_rectangle_head_text}>¡Comparte documentos y ejercicios!</h1>
                </div>
                <div className={style.info_space}>
                  <p className={style.info}>Comparte documentos que consideres que pueden ser de provecho para que otros estudiantes puedan aprender o practicar un tema en específico y aprovecha aquellos que otros compañeros compartieron. Nuestros administradores se encargarán de verificar que estos documentos cumplan con nuestras políticas de uso.</p>
                </div>
                <div className={style.imagen_info}>
                  <img src="/images/Docs.png" alt='Group'/>
                </div>
              </div>

              <div className={style.info_rectangle}>
                <div className={style.info_rectangle_head}>
                  <h1 className={style.info_rectangle_head_text}>¡Resuelve tus dudas!</h1>
                </div>
                <div className={style.info_space}>
                  <p className={style.info}>Haz uso de un foro donde podrás encontrar preguntas y respuestas sobre un tema en específico, de esta manera podrás resolver tus dudas y ayudar a otros. Interactúa con otros usuarios mientras aprenden juntos</p>
                </div>
                <div className={style.imagen_info}>
                  <img src="/images/Forum.png" alt='Group'/>
                </div>
              </div>


          </div>

      </>

  )
}