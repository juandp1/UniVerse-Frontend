
import { Inter } from 'next/font/google'
import Navbar from '../Component/NavBar'
import Head from 'next/head';
import style from "/styles/homeStyle.module.css";

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

          </div>

      </>

  )
}