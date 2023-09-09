import { useEffect, useState } from "react"
import Router from "next/router"
import ReactPaginate from 'react-paginate';
import Layout from "../../components/layout";
import styles from "../../styles/dashboard.module.css";
import LayoutPK from "../../components/layoutPK";
import LayoutPetani from "../../components/layoutPetani";

export default function Dashboard() {
  const [content, setContent] = useState(null);
  let roleSignin = localStorage.getItem("role");
  const [role, setRole] = useState(roleSignin);
  useEffect(() => {

    fetchContent();

  }, [])


  async function fetchContent() {

    const tokenx = localStorage.getItem("token")

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x": tokenx
      }
    }
    const url = "../api/Profil/getProfilHandler";
    const res = await fetch(url, options);
    const data = await res.json();
    const listData = data.data;
    setContent(listData);

  }
console.log(role);
if(role === 'ROLE_ADMIN'){
  return (
    <>
      <Layout>
        <h2>Profil Pengguna</h2>
        <p>Nama : {content && content.nama}</p>
        <p>no_handphone : {content && content.no_handphone}</p>
        <p>jenis_kelamin : {content && content.jenis_kelamin}</p>
        <p>email : {content && content.email}</p>
        <p>roles : {content && content.roles[0].name}</p>
        
      </Layout>
    </>


  )
}else if(role ==='ROLE_PK'){
  return(
    <>
      <LayoutPK>
        <h2>Profil Pengguna</h2>
        <p>Nama : {content && content.nama}</p>
        <p>no_handphone : {content && content.no_handphone}</p>
        <p>jenis_kelamin : {content && content.jenis_kelamin}</p>
        <p>email : {content && content.email}</p>
        <p>roles : {content && content.roles[0].name}</p>
        
      </LayoutPK>
    </>
  )
     
}
else if(role ==='ROLE_PETANI'){
  return(
    <>
      <LayoutPetani>
        <h2>Profil Pengguna</h2>
        <p>Nama : {content && content.nama}</p>
        <p>no_handphone : {content && content.no_handphone}</p>
        <p>jenis_kelamin : {content && content.jenis_kelamin}</p>
        <p>email : {content && content.email}</p>
        <p>roles : {content && content.roles[0].name}</p>
        
      </LayoutPetani>
    </>
  )
     
}
  
}