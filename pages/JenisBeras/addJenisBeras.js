import Layout from "../../components/layout";
import styles from "../../styles/login.module.css"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"


export default function formBeras() {
    const [nama, setNama] = useState(null);
    const router = useRouter();

    useEffect(() => {
        getItem();
    }, [])

    async function getItem() {

    }

    async function handleSubmit() {
        const method = 'POST';
        const tokenx = localStorage.getItem("token")
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                "x": tokenx
            },
            body: JSON.stringify({
                'nama': nama,
            })
        }
        const url = "../api/JenisBeras/addJenisBerasHandler"
        const res = await fetch(url, options);
        const data = await res.json();
        const status = data.status;
        if (status) {
            router.push("/JenisBeras/getJenisBeras")
            alert('data berhasil diinput');
        } else {
            alert(data.data.message);
        }
    }

    return (

        <>
            <Layout>
                <div className={styles.container}>
                    <h1 className={styles.title}>Form Input Jenis Beras</h1>
                    <div className={styles.form}>
                        <label htmlFor='nama'>Nama Jenis Beras</label>
                        <input className={styles.input} type="text" name="Nama Jenis Beras" placeholder="Nama Jenis Beras" onChange={event => setNama(event.target.value)} />
                        <button className={styles.btn} onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </Layout>
        </>

    )
}