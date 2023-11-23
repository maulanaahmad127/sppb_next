import Layout from "../../components/layout";
import { useState, useEffect } from "react";
import { getDatabase, ref, get, child } from "firebase/database";
import firebaseApp from "../../services/firebase-sdk";
import Router from "next/router";
import Link from "next/link";

export default function InputBeratBeras() {
  const [isLoading, setIsLoading] = useState(true);
  const [timbangan, setTimbangan] = useState(null);
  const [listTimbangan, setListTimbangan] = useState(null);

  const getValue = async () => {
    try {
      const database = getDatabase(firebaseApp);
      const rootReference = ref(database);
      const dbGet = await get(rootReference);
      const dbValue = dbGet.val();
      setListTimbangan(dbValue);
      setTimbangan(Object.keys(dbValue).at(0));
    } catch (getError) {
      error.current = getError.message;
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getValue();
  }, []);

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

  async function onClickHandle() {
    Router.push(
      {
        pathname: "/DataProduksiBeras/inputBeratBeras",
        query: { timbangan },
      },
      "/DataProduksiBeras/inputBeratBeras"
    );
  }

  return (
    <Layout>
      <div className="flex max-md:justify-center">
        <div className="rounded-sm border w-1/2 bg-white shadow">
          <div className="border-b py-4 px-6 flex justify-between">
            <h1 className="font-medium self-center">Daftar Timbangan Beras</h1>
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
          <div className="p-5 text-center">
            <label className="mb-2.5 block" htmlFor="petani">
              Pilih Timbangan:
            </label>
            <select
              className="w-full rounded border-[1.5px] border-stroke bg-transparent mb-4 py-3 px-5 font-medium outline-none transition focus:border-blue-500 active:border-blue-500"
              name="timbangan"
              id="timbangan"
              onInputCapture={(event) => setTimbangan(event.target.value)}
            >
              {Object.entries(listTimbangan).map(([key, value], i) => {
                return (
                  <option key={key} value={key}>
                    {key}
                  </option>
                );
              })}
            </select>

            <button
              className="flex w-full justify-center rounded bg-blue-500 hover:opacity-80 active:bg-blue-700 p-3 font-medium text-white"
              onClick={onClickHandle}
              type="button"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
