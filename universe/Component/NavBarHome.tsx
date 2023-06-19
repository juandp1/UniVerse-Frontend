import Link from 'next/link';
import { useRouter } from 'next/router';
import style from "/styles/NavBarsStyles.module.css";
import Image from 'next/image';


function NavbarHome() {

    const router = useRouter();

    const handleRegisterClick = () => {
    router.push('/Registro');
    };

    const handleLoginClick = () => {
    router.push('/Login');
    };

    return (
        <>
            <nav className={style.NavBar}>
                <div className='w-auto px-5'>
                    <Image src="/images/universelogo.png"
                        width={130}
                        height={70}

                        alt="logo"
                        priority
                    />
                </div>
                <div className="flex grow space-x-3 ">

                </div>

                <div className="w-auto flex space-x-3 content-center">
                        <button onClick={handleRegisterClick}>
                            <h6 style={{ color: '#fffff'}}>REGISTRARSE</h6>
                        </button>

                        <button onClick={handleLoginClick}>
                            <h6 style={{ color: '#fffff' }}>INICIAR SESIÓN</h6>
                        </button>
                

                </div>
            </nav>

        </>
    )
}

export default NavbarHome