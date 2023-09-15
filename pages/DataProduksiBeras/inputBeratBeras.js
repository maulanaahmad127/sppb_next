import Layout from "../../components/layout";
import { useState, useRef, useEffect } from "react";
import { getDatabase, ref, get, child } from "firebase/database";
import firebaseApp from "../../services/firebase-sdk";
import Router from "next/router";

export default function inputBeratBeras() {
  const [isLoading, setIsLoading] = useState(true);
  const [refreshToken, setRefreshToken] = useState(Math.random());
  const snapshot = useRef(null);
  const error = useRef(null);

  const getValue = async () => {
    try {
      console.log(process.env.NEXT_PUBLIC_DATABASE_URL);
      const database = getDatabase(firebaseApp);
      const rootReference = ref(database);
      const dbGet = await get(child(rootReference, "timbangan1"));
      const dbValue = dbGet.val();
      snapshot.current = dbValue;
    } catch (getError) {
      error.current = getError.message;
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getValue();
    setTimeout(() => setRefreshToken(Math.random()), 3000);
  }, [refreshToken]);

  if (isLoading) {
    return (
      <>
        <p className="text-center items-center">
          <div class="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
            <div class="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-24 w-24"></div>
          </div>
        </p>
      </>
    );
  }

  const beratBerasInput = snapshot.current;

  async function onClickHandle() {
    Router.push(
      {
        pathname: "/DataProduksiBeras/addDataProduksiBeras",
        query: { beratBerasInput },
      },
      "/DataProduksiBeras/addDataProduksiBeras"
    );
  }

  return (
    <Layout>
      <div className="rounded-sm border w-1/2 bg-white shadow">
        <div className="border-b py-4 px-6">
          <h1 className="font-medium">Berhasil Membaca Input Beras</h1>
        </div>
        <div className="p-5 text-center">
          <h2 className="mb-4 font-bold">{beratBerasInput} Kg</h2>
          <button
            className="flex w-full justify-center rounded bg-blue-500 hover:opacity-80 active:bg-blue-700 p-3 font-medium text-white"
            onClick={onClickHandle}
            type="button"
          >
            Submit
          </button>
        </div>
      </div>
    </Layout>
  );
}
