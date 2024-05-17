import Image from 'next/image';
import React, { useEffect, useState } from "react";
import styles from 'styles/2fa.module.css';
import QRCode from "react-qr-code";
import { useRouter } from 'next/router';


const TwoFactorAuthentication = () => {
    const [uri, setUri] = useState('' as string)
    const router = useRouter();

    useEffect(() => {
        fetchUri();
    }, []);

    const fetchUri = async () => {
        const res = await fetch('http://127.0.0.1:3333/api/2fa', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        });
        if (res.ok) {
            const data = await res.json();
            setUri(data.uri);
        }
        else {
            console.error('Error fetching uri');
        }
    }

        return (
        <>
            <main className={styles.main}>
                <div className={styles.navbar}>
                    <Image
                    src="/images/universelogo.png"
                    width={300}
                    height={35}
                    alt="logo"
                    priority
                    />
                </div>
                <div className={styles.qrContainer}>
                    <div>
                        <h1>Two Factor Authentication</h1>
                        <h2>Scan the QR code below with your 2FA app</h2>
                    </div>
                    <QRCode
                        size={100}
                        style={{ height: "50%", maxWidth: "100%", width: "60%" }}
                        value={uri} 
                     />
                    <div>
                        <button className={styles.button} onClick={() => {router.push('/Login')}}>Go login</button>   
                    </div>
                </div>
                
            </main>
        </>
    )
}

export default TwoFactorAuthentication