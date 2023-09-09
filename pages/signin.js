import Router from "next/router"
import { useState } from "react"
import styles from "../styles/styles.module.css"

export default function SignIn() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit() {
    const method = 'POST';
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'username': username
        , 'password': password
      })
    }
    const url = "./api/signinHandler"
    const res = await fetch(url, options);
    const data = await res.json();
    const role = data.data.roles[0];


    if (data.status) {
      if (role === 'ROLE_PETANI') {
        Router.push({
          pathname: "/DataProduksiBeras/getDataProduksiBerasByPetani"
        })
      } else {
        Router.push({
          pathname: "/DataProduksiBeras/getDataProduksiBeras"
        })
      }

    } else {
      alert(`gagal login : ${data.data.message}`);
    }

    localStorage.setItem("token", data.header);
    localStorage.setItem("role", data.data.roles[0]);


  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign In</h1>
      <div className={styles.form}>
        <input className={styles.input} type="text" name="username" placeholder="username" onChange={event => setUsername(event.target.value)} autoComplete="off" />
        <input className={styles.input} type="password" name="password" placeholder="password" onChange={event => setPassword(event.target.value)} />
        <button className={styles.btn} onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}
