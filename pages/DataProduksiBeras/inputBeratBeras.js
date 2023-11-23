import Layout from "../../components/layout";
import { useState, useRef, useEffect } from "react";
import { getDatabase, ref, get, child } from "firebase/database";
import firebaseApp from "../../services/firebase-sdk";
import { useRouter } from "next/router";
import Link from "next/link";

export default function InputBeratBeras() {
  const [isLoading, setIsLoading] = useState(true);
  const [refreshToken, setRefreshToken] = useState(Math.random());
  const snapshot = useRef(null);
  const error = useRef(null);
  const router = useRouter();
  const {
    query: { timbangan },
  } = router;

  const getValue = async () => {
    try {
      const database = getDatabase(firebaseApp);
      const rootReference = ref(database);
      const dbGet = await get(child(rootReference, timbangan));
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
        <div className="text-center items-center">
          <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
            <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-24 w-24"></div>
          </div>
        </div>
      </>
    );
  }

  const beratBerasInput = snapshot.current;

  async function onClickHandle() {
    router.push(
      {
        pathname: "/DataProduksiBeras/addDataProduksiBeras",
        query: { beratBerasInput },
      },
      "/DataProduksiBeras/addDataProduksiBeras"
    );
  }

  return (
    <Layout>
      <div className="flex max-md:justify-center">
        <div className="rounded-sm border w-1/2 bg-white shadow">
          <div className="border-b py-4 px-6 flex justify-between">
            <h1 className="font-medium self-center">
              Membaca Input Beras Pada {timbangan}
            </h1>
            <Link
              className="p-1 border rounded-sm hover:bg-gray-500 hover:text-white"
              href="/DataProduksiBeras/pilihTimbangan"
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
            <h1 className="mb-5 font-bold">
              Berat Beras : {beratBerasInput} KG
            </h1>

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
