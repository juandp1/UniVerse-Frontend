import LateralNavBar from "../Component/LateralNavBar";
import Navbar from "../Component/NavBar";
import Head from "next/head";
import Reunion from "universe/Component/Reunion";


const colorIcon = "#61EB8D";

export default function ProximasReuniones() {

  return (
    <>
      <Head>
        <title>Universe</title>
      </Head>

      <main id="main">
        <Navbar></Navbar>
        <LateralNavBar></LateralNavBar>

        <div className="principal_Content">
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src="./images/camera-meetings.png"
              alt="camera"
              style={{ marginRight: "10px" }}
            />
            <h1>Próximas Reuniones</h1>
          </div>
          <div>
            <Reunion></Reunion>
            <Reunion></Reunion>
            <Reunion></Reunion>
            <Reunion></Reunion>
            <Reunion></Reunion>
          </div>
        </div>
        {/*Agrego los componentes dentro del header*/}
      </main>
    </>
  );
}
