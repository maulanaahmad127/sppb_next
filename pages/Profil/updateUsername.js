import Layout from "../../components/layout";
import styles from "../../styles/login.module.css"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import LayoutPK from "../../components/layoutPK";
import LayoutPetani from "../../components/layoutPetani";

export default function formEditUsername() {
    const [username, setUsername] = useState(null);
    const router = useRouter();
    let roleSignin = localStorage.getItem("role");
    const [role, setRole] = useState(roleSignin);

    useEffect(() => {

    }, [])

    async function getItem() {

    }

    async function handleSubmit() {
        const method = 'PATCH';
        const tokenx = localStorage.getItem("token")
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                "x": tokenx,
            },
            body: JSON.stringify({
                'username': username
            })
        }
        const url = "../api/Profil/updateUsernameHandler"
        const res = await fetch(url, options);
        const data = await res.json();
        const status = data.status;
        if (status) {
            alert('username berhasil dirubah');
            router.push("/signout")

        } else {
            alert(data.data.message);
        }
    }
    if (role === 'ROLE_ADMIN') {
        return (

            <>
                <Layout>
                    <div className={styles.container}>
                        <h1 className={styles.title}>Form Edit username</h1>
                        <div className={styles.form}>
                            <label htmlFor='nama'>Input username</label>
                            <input className={styles.input} type="text" name="username" placeholder="username" value={username} onChange={event => setUsername(event.target.value)} />
                            <button className={styles.btn} onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                </Layout>
            </>

        )
    } else if (role === 'ROLE_PK') {
        return (
            <>
            <LayoutPK>
                <div className={styles.container}>
                    <h1 className={styles.title}>Form Edit username</h1>
                    <div className={styles.form}>
                        <label htmlFor='nama'>Input username</label>
                        <input className={styles.input} type="text" name="username" placeholder="username" value={username} onChange={event => setUsername(event.target.value)} />
                        <button className={styles.btn} onClick={handleSubmit}>Submit</button>
                    </div>
                </div>

            </LayoutPK>
        </>
        )
       
    }else if (role === 'ROLE_PETANI') {
        return (
            <>
            <LayoutPetani>
                <div className={styles.container}>
                    <h1 className={styles.title}>Form Edit username</h1>
                    <div className={styles.form}>
                        <label htmlFor='nama'>Input username</label>
                        <input className={styles.input} type="text" name="username" placeholder="username" value={username} onChange={event => setUsername(event.target.value)} />
                        <button className={styles.btn} onClick={handleSubmit}>Submit</button>
                    </div>
                </div>

            </LayoutPetani>
        </>
        )
       
    }

}