
import { Inter } from 'next/font/google'
import LateralNavBar from '../Component/LateralNavBar'
import Navbar from '../Component/NavBar'
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Universe</title>
      </Head>
      <header>
        <Navbar></Navbar>
        <LateralNavBar></LateralNavBar>
        {/*Agrego los componentes dentro del header*/}

      </header>

      <main>

        <h1>Pruebas de posicionamiento</h1>
      </main>
    </>

  )
}