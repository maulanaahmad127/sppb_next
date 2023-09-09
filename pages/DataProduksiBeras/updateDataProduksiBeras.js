import Layout from "../../components/layout";
import styles from "../../styles/login.module.css"
import { useEffect, useState } from "react"
import {useRouter} from "next/router"


export default function formBeras() {
    const [petani, setPetani] = useState(null);
    const [idPetani, setIdPetani] = useState(null);
    const [jenisBeras, setJenisBeras] = useState(null);
    const [idJenisBeras, setidJenisBeras] = useState(null);
    const [detail, setDetail] = useState(null);
    const router = useRouter();

    const {query : {idx}} = router;
    

    const [beratBeras, setBeratBeras] = useState();
    const [hargaBeras, setHargaBeras] = useState(null);

    useEffect(() => {
        fetchDataProduksiBerasByID();
        fetchPetani();
        fetchJenisBeras();
        
        getItem();
    }, [])


    async function fetchPetani() {
        
        const tokenx = localStorage.getItem("token")

        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x": tokenx
            }
        }
        const url = "../api/petaniHandler";
        const res = await fetch(url, options);
        const data = await res.json();
        const listPetani = data.data;
        setPetani(listPetani);
        


    }

    async function fetchJenisBeras() {

        const tokenx = localStorage.getItem("token")

        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x": tokenx
            }
        }
        const url = "../api/jenisBerasHandler";
        const res = await fetch(url, options);
        const data = await res.json();
        const listJenisBeras = data.data;

        setJenisBeras(listJenisBeras);
        

    }

    async function fetchDataProduksiBerasByID() {

        const tokenx = localStorage.getItem("token")

        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x": tokenx,
                "id" : idx

            }
        }
        const url = "../api/DataProduksiBeras/getDataProduksiBersaByIDHandler";
        const res = await fetch(url, options);
        const data = await res.json();
        const det = data.data.payload;
        console.log(`det ${det.id}`)
        setDetail(det);
        
        setidJenisBeras(det.jenisBeras.id);
        setIdPetani(det.petani.id);
        setBeratBeras(det.berat_beras);
        setHargaBeras(det.harga);

        

    }

    async function getItem() {
        console.log(`id jenis ${idJenisBeras}`)

    }

    async function handleSubmit() {
        const method = 'POST';
        const tokenx = localStorage.getItem("token")
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                "x": tokenx,
                "id" : idx
            },
            body: JSON.stringify({
                'berat_beras': beratBeras,
                'petani': idPetani,
                "jenisBeras" : idJenisBeras,
                "harga" : hargaBeras
            })
        }
        const url = "../api/DataProduksiBeras/updateDataProduksiBerasHandler"
        const res = await fetch(url, options);
        const data = await res.json();
        const status = data.status;
        if(status){
            router.push("/DataProduksiBeras/getDataProduksiBeras")
            alert('data berhasil dirubah');
        }else{
            alert(data.data.message);
        }
    }

    return (

        <>
            <Layout>
                <div className={styles.container}>
                    <h1 className={styles.title}>Form Update Data Beras</h1>
                    <div className={styles.form}>
                        <label htmlFor='Berat Beras'>Berat Beras</label> 
                        <input className={styles.input} name="Berat Beras" type="number" value={beratBeras} disabled />
                        
                        <label htmlFor="petani">Pilih Petani:</label>
                        <select className={styles.input} name="petani" id="petani" value={idPetani}  onInputCapture={event => setIdPetani(event.target.value)}>
                            {petani && petani.map((item) => (
                                <option key={item.id} value={item.id}  >{item.id} - {item.nama} </option>
                            ))}
                        </select>
                        <label htmlFor="jenisBeras">Pilih Jenis Beras:</label>
                        <select className={styles.input} name="jenisberas" id="jenisberas" value={idJenisBeras} onInputCapture={event => setidJenisBeras(event.target.value)}>
                            {jenisBeras && jenisBeras.map((item) => (
                                <option key={item.id} value={item.id}  >{item.id} - {item.nama} </option>
                            ))}
                        </select>
                        <label htmlFor='username'>Harga Beras</label>
                        <input className={styles.input} type="number" name="Harga Beras" placeholder="Harga Beras" value={hargaBeras} onChange={event => setHargaBeras(event.target.value)} />
                        <button className={styles.btn} onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </Layout>
        </>

    )
}