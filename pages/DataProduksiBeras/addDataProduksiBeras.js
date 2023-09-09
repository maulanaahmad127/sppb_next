import Layout from "../../components/layout";
import styles from "../../styles/login.module.css"
import { useEffect, useState } from "react"
import {useRouter} from "next/router"


export default function formBeras() {
    const [petani, setPetani] = useState(null);
    const [idPetani, setIdPetani] = useState(null);
    const [jenisBeras, setJenisBeras] = useState(null);
    const [idJenisBeras, setidJenisBeras] = useState(null);
    const router = useRouter();

    const {query : {beratBerasInput}} = router;
    

    const [beratBeras, setBeratBeras] = useState(beratBerasInput);
    const [hargaBeras, setHargaBeras] = useState(null);

    useEffect(() => {
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
        setIdPetani(listPetani[0].id);


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
        setidJenisBeras(listJenisBeras[0].id);

    }

    async function getItem() {
        console.log(`id petani ${idPetani}`);
        console.log(`id jenis Beras ${idJenisBeras}`);
        console.log(`berat beras ${beratBeras}`)
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
                'berat_beras': beratBeras,
                'petani': idPetani,
                "jenisBeras" : idJenisBeras,
                "harga" : hargaBeras
            })
        }
        const url = "../api/DataProduksiBeras/addDataProduksiBerasHandler"
        const res = await fetch(url, options);
        const data = await res.json();
        const status = data.status;
        if(status){
            router.push("/DataProduksiBeras/getDataProduksiBeras")
            alert('data berhasil diinput');
        }else{
            alert(data.data.message);
        }
    }

    return (

        <>
            <Layout>
                <div className={styles.container}>
                    <h1 className={styles.title}>Form Input Beras</h1>
                    <div className={styles.form}>
                        <label htmlFor='Berat Beras'>Berat Beras</label> <a className={styles.a} href="/DataProduksiBeras/inputBeratBeras">(Timbang Ulang ?)</a>
                        <input className={styles.input} name="Berat Beras" type="number" value={beratBeras} disabled />
                        
                        <label htmlFor="petani">Pilih Petani:</label>
                        <select className={styles.input} name="petani" id="petani" onInputCapture={event => setIdPetani(event.target.value)}>
                            {petani && petani.map((item) => (
                                <option key={item.id} value={item.id}  >{item.id} - {item.nama} </option>
                            ))}
                        </select>
                        <label htmlFor="jenisBeras">Pilih Jenis Beras:</label>
                        <select className={styles.input} name="jenisberas" id="jenisberas" onInputCapture={event => setidJenisBeras(event.target.value)}>
                            {jenisBeras && jenisBeras.map((item) => (
                                <option key={item.id} value={item.id}  >{item.id} - {item.nama} </option>
                            ))}
                        </select>
                        <label htmlFor='Harga Beras'>Harga Beras</label>
                        <input className={styles.input} type="number" name="Harga Beras" placeholder="Harga Beras" onChange={event => setHargaBeras(event.target.value)} />
                        <button className={styles.btn} onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </Layout>
        </>

    )
}