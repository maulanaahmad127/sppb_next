import Layout from "../../components/layout";
import styles from "../../styles/login.module.css"
import { useEffect, useState } from "react"
import {useRouter} from "next/router"
import LayoutPK from "../../components/layoutPK";
import LayoutPetani from "../../components/layoutPetani";

export default function formEditPassword() {
    const [passwordLama, setPasswordLama] = useState(null);
    const [passwordBaru, setPasswordBaru] = useState(null);
    let roleSignin = localStorage.getItem("role");
    const [role, setRole] = useState(roleSignin);
    const router = useRouter();
    

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
                'passwordLama': passwordLama,
                'passwordBaru': passwordBaru
            })
        }
        const url = "../api/Profil/updatePasswordHandler"
        const res = await fetch(url, options);
        const data = await res.json();
        const status = data.status;
        if(status){
            router.push("/Profil/getProfil")
            alert('password berhasil dirubah');
        }else{
            alert(data.data.message);
        }
    }
    if(role === 'ROLE_ADMIN'){
        return (

        <>
            <Layout>
                <div className={styles.container}>
                    <h1 className={styles.title}>Form Input Jenis Beras</h1>
                    <div className={styles.form}>
                        <label htmlFor='nama'>Input Password Lama</label>
                        <input className={styles.input} type="password" name="Password Lama" placeholder="Password Lama" value={passwordLama} onChange={event => setPasswordLama(event.target.value)} />
                        <label htmlFor='nama'>Input Password Baru</label>
                        <input className={styles.input} type="password" name="Password Baru" placeholder="Password Baru" value={passwordBaru} onChange={event => setPasswordBaru(event.target.value)} />
                        <button className={styles.btn} onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </Layout>
        </>

    )
    }else if(role ==='ROLE_PK'){
        return(
            <>
            <LayoutPK>
                      <div className={styles.container}>
                          <h1 className={styles.title}>Form Input Jenis Beras</h1>
                          <div className={styles.form}>
                              <label htmlFor='nama'>Input Password Lama</label>
                              <input className={styles.input} type="password" name="Password Lama" placeholder="Password Lama" value={passwordLama} onChange={event => setPasswordLama(event.target.value)} />
                              <label htmlFor='nama'>Input Password Baru</label>
                              <input className={styles.input} type="password" name="Password Baru" placeholder="Password Baru" value={passwordBaru} onChange={event => setPasswordBaru(event.target.value)} />
                              <button className={styles.btn} onClick={handleSubmit}>Submit</button>
                          </div>
                      </div>
              
            </LayoutPK>
          </>
        )
    
}else if(role ==='ROLE_PETANI'){
        return(
            <>
            <LayoutPetani>
                      <div className={styles.container}>
                          <h1 className={styles.title}>Form Input Jenis Beras</h1>
                          <div className={styles.form}>
                              <label htmlFor='nama'>Input Password Lama</label>
                              <input className={styles.input} type="password" name="Password Lama" placeholder="Password Lama" value={passwordLama} onChange={event => setPasswordLama(event.target.value)} />
                              <label htmlFor='nama'>Input Password Baru</label>
                              <input className={styles.input} type="password" name="Password Baru" placeholder="Password Baru" value={passwordBaru} onChange={event => setPasswordBaru(event.target.value)} />
                              <button className={styles.btn} onClick={handleSubmit}>Submit</button>
                          </div>
                      </div>
              
            </LayoutPetani>
          </>
        )
    
}
    
}