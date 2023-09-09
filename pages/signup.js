import Router from "next/router"
import { useState, useEffect } from "react"
import styles from "../styles/login.module.css"

export default function SignUp() {

  const [username, setUsername] = useState('');
  const [nama, setNama] = useState('');
  const [no_handphone, setNo_handphone] = useState('');
  const [jenis_kelamin, setJenis_kelamin] = useState('Laki-laki');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('pk');
  const [password, setPassword] = useState('');
  
  useEffect(() => {

  }, [role, jenis_kelamin])

  async function handleSubmit() {
    const method = 'POST';
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'username': username,
        'nama' : nama,
        'no_handphone' : no_handphone,
        'jenis_kelamin' : jenis_kelamin,
        'email' : email,
        'role' : role,
        'password': password
      })
    }
    const url = "./api/signUpHandler"
    const res = await fetch(url, options);
    const data = await res.json();
    
   
    



    if (data.status) {
      alert(`berhasil signup`);
        Router.push({
          pathname: "/signin"
        })
      }else{
      alert(`gagal signup : ${data.data.message}`);
    }
    localStorage.setItem("token", data.header);


  }

  return (
      <div className={styles.container}>
        <h1 className={styles.title}>Sign Up</h1>
        <div className={styles.form}>
          <input className={styles.input} type="text" name="username" placeholder="username" onChange={event => setUsername(event.target.value)} autoComplete="off" />
          <input className={styles.input} type="text" name="nama" placeholder="nama" onChange={event => setNama(event.target.value)} autoComplete="off" />
          <input className={styles.input} type="text" name="no_handphone" placeholder="no_handphone" onChange={event => setNo_handphone(event.target.value)} autoComplete="off" />
          <select className={styles.input} name="jenisKelamin" id="jenisKelamin" onInputCapture={event => setJenis_kelamin(event.target.value)}>
            <option value={"Laki-laki"}>Laki-laki</option>
            <option value={"Perempuan"}>Perempuan</option>
          </select>
          <input className={styles.input} type="text" name="Email" placeholder="Email" onChange={event => setEmail(event.target.value)} autoComplete="off" />
          <select className={styles.input} name="role" id="role" onInputCapture={event => setRole(event.target.value)}>
            <option value={"pk"}>Pemangku Kebutuhan (User Biasa)</option>
            <option value={"petani"}>Petani</option>
          </select>
          <input className={styles.input} type="password" name="password" placeholder="password" onChange={event => setPassword(event.target.value)} />
          <button className={styles.btn} onClick={handleSubmit}>Submit</button>
        </div>
      </div>
  )
}
