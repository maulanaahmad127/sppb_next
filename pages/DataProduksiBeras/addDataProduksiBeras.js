import Layout from "../../components/layout";
import styles from "../../styles/login.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function FormBeras() {
  const [petani, setPetani] = useState(null);
  const [idPetani, setIdPetani] = useState(null);
  const [jenisBeras, setJenisBeras] = useState(null);
  const [idJenisBeras, setidJenisBeras] = useState(null);
  const router = useRouter();

  const {
    query: { beratBerasInput },
  } = router;

  const [beratBeras, setBeratBeras] = useState(beratBerasInput);
  const [hargaBeras, setHargaBeras] = useState(null);

  useEffect(() => {
    fetchPetani();
    fetchJenisBeras();
    getItem();
  }, []);

  async function fetchPetani() {
    const tokenx = localStorage.getItem("token");

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        x: tokenx,
      },
    };
    const url = "../api/petaniHandler";
    const res = await fetch(url, options);
    const data = await res.json();
    const listPetani = data.data;
    setPetani(listPetani);
    setIdPetani(listPetani[0].id);
  }

  async function fetchJenisBeras() {
    const tokenx = localStorage.getItem("token");

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        x: tokenx,
      },
    };
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
    console.log(`berat beras ${beratBeras}`);
  }

  async function handleSubmit() {
    const method = "POST";
    const tokenx = localStorage.getItem("token");
    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        x: tokenx,
      },
      body: JSON.stringify({
        berat_beras: beratBeras,
        petani: idPetani,
        jenisBeras: idJenisBeras,
        harga: hargaBeras,
      }),
    };
    const url = "../api/DataProduksiBeras/addDataProduksiBerasHandler";
    const res = await fetch(url, options);
    const data = await res.json();
    const status = data.status;
    if (status) {
      router.push("/DataProduksiBeras/getDataProduksiBeras");
      alert("data berhasil diinput");
    } else {
      alert(data.data.message);
    }
  }

  return (
    <>
      <Layout>
        <div className="flex max-md:justify-center">
          <div className="rounded-sm border w-1/2 bg-white shadow">
            <div className="border-b py-4 px-6 flex justify-between">
              <h1 className="font-medium self-center">Form Input Beras</h1>
              <Link
                className="p-1 border rounded-sm hover:bg-gray-500 hover:text-white"
                href="/DataProduksiBeras/getDataProduksiBeras"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-arrow-left"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l14 0"></path>
                  <path d="M5 12l6 6"></path>
                  <path d="M5 12l6 -6"></path>
                </svg>
              </Link>
            </div>
            <div className="p-5">
              <div className="w-full inline-flex justify-between mb-2.5">
                <label className="flex" htmlFor="Berat Beras">
                  Berat Beras :
                </label>
                <Link
                  className="flex justify-self-end rounded bg-blue-500 hover:opacity-80 active:bg-blue-600 text-center text-white text-xs px-2 py-1 cursor-pointer"
                  href="/DataProduksiBeras/pilihTimbangan"
                >
                  Timbang Ulang ?
                </Link>
              </div>
              <input
                className="w-full rounded border-[1.5px] bg-transparent mb-4 py-3 px-5 font-medium outline-none transition disabled:text-slate-600 disabled:bg-gray-200"
                name="Berat Beras"
                type="number"
                value={beratBeras}
                disabled
              />

              <label className="mb-2.5 block" htmlFor="petani">
                Pilih Petani:
              </label>
              <select
                className="w-full rounded border-[1.5px] border-stroke bg-transparent mb-4 py-3 px-5 font-medium outline-none transition focus:border-blue-500 active:border-blue-500"
                name="petani"
                id="petani"
                onInputCapture={(event) => setIdPetani(event.target.value)}
              >
                {petani &&
                  petani.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.id} - {item.nama}{" "}
                    </option>
                  ))}
              </select>
              <label className="mb-2.5 block" htmlFor="jenisBeras">
                Pilih Jenis Beras:
              </label>
              <select
                className="w-full rounded border-[1.5px] border-stroke bg-transparent mb-4 py-3 px-5 font-medium outline-none transition focus:border-blue-500 active:border-blue-500"
                name="jenisberas"
                id="jenisberas"
                onInputCapture={(event) => setidJenisBeras(event.target.value)}
              >
                {jenisBeras &&
                  jenisBeras.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.id} - {item.nama}{" "}
                    </option>
                  ))}
              </select>
              <label className="mb-2.5" htmlFor="Harga Beras">
                Harga Beras
              </label>
              <input
                className="w-full rounded border-[1.5px] border-stroke bg-transparent mb-4 py-3 px-5 font-medium outline-none transition focus:border-blue-500 active:border-blue-500"
                type="number"
                name="Harga Beras"
                placeholder="Harga Beras"
                onChange={(event) => setHargaBeras(event.target.value)}
              />
              <button
                className="flex w-full justify-center rounded bg-blue-500 hover:opacity-80 active:bg-blue-700 p-3 font-medium text-white"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
