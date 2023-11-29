import Layout from "../../components/layout";
import styles from "../../styles/login.module.css";
import { useEffect, useState, useRef  } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function FormBeras() {
  const [nama, setNama] = useState("");
  const [detail, setDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const {
    query: { idx },
  } = router;

  useEffect(() => {
    fetchDataJenisBerasByID();
    getItem();
  }, []);

  async function fetchDataJenisBerasByID() {
    const tokenx = localStorage.getItem("token");

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        x: tokenx,
        id: idx,
      },
    };
    const url = "../api/JenisBeras/detailJenisBerasHandler";
    const res = await fetch(url, options);
    const data = await res.json();
    const det = data.data.payload;
    const nama = det?.nama;
    setNama(nama);
    setDetail(det);
    setIsLoading(false);
  }

  async function getItem() {}

  async function handleSubmit() {
    const method = "POST";
    const tokenx = localStorage.getItem("token");
    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        x: tokenx,
        id: idx,
      },
      body: JSON.stringify({
        nama: nama,
      }),
    };
    const url = "../api/JenisBeras/editJenisBerasHandler";
    const res = await fetch(url, options);
    const data = await res.json();
    const status = data.status;
    if (status) {
      router.push("/JenisBeras/getJenisBeras");
      alert("data berhasil dirubah");
    } else {
      alert(data.data.message);
    }
  }

  if (isLoading) {
    return (
      <>
        <div className="text-center items-center">
          <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
            <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-24 w-24"></div>
          </div>
        </div>
      </>
    );
  }


  return (
    <>
      <Layout>
        <div className="flex max-md:justify-center">
          <div className="rounded-sm border w-1/2 bg-white shadow">
            <div className="border-b py-4 px-6 flex justify-between">
              <h1 className="font-medium self-center">Form Edit Jenis Beras</h1>
              <Link
                className="p-1 border rounded-sm hover:bg-gray-500 hover:text-white"
                href="/JenisBeras/getJenisBeras"
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
              <label className="mb-2.5 block" htmlFor="Berat Beras">
                Nama Jenis Beras
              </label>
              <input
                className="w-full rounded border-[1.5px] border-stroke bg-transparent mb-4 py-3 px-5 font-medium outline-none transition focus:border-blue-500 active:border-blue-500"
                type="text"
                name="Nama Jenis Beras"
                placeholder="Nama Jenis Beras"
                value={nama}
                onChange={(event) => setNama(event.target.value)}
              />
              <button
                className="flex w-full justify-center rounded bg-blue-500 hover:opacity-80 active:bg-blue-700 p-3 font-medium text-white"
                onClick={handleSubmit}
              >
                Submit
              </button>{" "}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
