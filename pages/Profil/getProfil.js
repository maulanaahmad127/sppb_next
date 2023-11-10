import { useEffect, useState, useRef } from "react";
import Layout from "../../components/layout";
import LayoutPetani from "../../components/layoutPetani";
import Link from "next/link";

export default function Dashboard() {
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const snapshot = useRef(null);
  useEffect(() => {
    fetchContent();
  }, []);

  async function fetchContent() {
    const tokenx = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    snapshot.current = role;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        x: tokenx,
      },
    };
    const url = "../api/Profil/getProfilHandler";
    const res = await fetch(url, options);
    const data = await res.json();
    const listData = data.data;
    setContent(listData);
  }

  async function verivEmailHandler(event) {
    event.preventDefault();
    const tokenx = localStorage.getItem("token");
    setIsLoading(true);
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        x: tokenx
      },
    };
    const url = "../api/Profil/verivEmailHandler";
    const res = await fetch(url, options);
    const data = await res.json();
    const status = data.status;
    if (status) {
      setIsLoading(false);
      alert(data.data.message);
      
    } else {
      alert(data.data.message);
      setIsLoading(false);
    }
    setIsLoading(false);
  }

  const role = snapshot.current;
  console.log(`role profile : ${role}`)
  if (role === "ROLE_PETANI") {
    return (
      <>
        <LayoutPetani>
        <div className="px-6 md:pt-9 pt-12 pb-4 rounded-sm border border-stroke bg-white shadow-default">
            <h2 className="font-bold pt-3 md:pt-0 text-2xl mt-4">Profil Pengguna</h2>
            <div className="max-lg:my-3">
              <div className="flex justify-end items-strecth rounded-lg">
                <a className="inline-flex rounded-l-lg border border-stroke py-2.5 px-4 font-medium bg-blue-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-settings"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="white"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"></path>
                    <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                  </svg>
                </a>
                <Link
                  href={{
                    pathname: "/Profil/updateUsername",
                    query: {
                      role: role
                    }
                  }}
                  as="/Profil/updateUsername"
                  className="inline-flex border border-stroke py-2.5 px-4  font-medium hover:bg-blue-500 hover:text-white "
                >
                  Ubah Username
                </Link>
                <Link
                   href={{
                    pathname: "/Profil/updatePassword",
                    query: {
                      role: role
                    }
                  }}
                  as="/Profil/updatePassword"
                  className="inline-flex border-y border-stroke py-2.5 px-4  font-medium hover:bg-blue-500 hover:text-white "
                >
                  Ubah Password
                </Link>
                <Link
                  href={{
                    pathname: "/Profil/updateEmail",
                    query: {
                      role: role
                    }
                  }}
                  as="/Profil/updateEmail"
                  className="inline-flex rounded-r-lg border border-stroke py-2.5 px-4  font-medium hover:bg-blue-500 hover:text-white"
                >
                  Ubah Email
                </Link>
              </div>
            </div>
            <div className="container px-4">
              <label className="mb-2.5 block font-semibold text-lg text-black">
                Nama
              </label>
              <p className="pl-3 pb-4">{content && content.nama}</p>
              <label className="mb-2.5 block font-semibold text-lg text-black">
                Username
              </label>
              <p className="pl-3 pb-4">{content && content.username}</p>
              <label className="mb-2.5 block font-semibold text-lg text-black">
                Nomor telepon
              </label>
              <p className="pl-3 pb-4">{content && content.no_handphone}</p>
              <label className="mb-2.5 block font-semibold text-lg text-black">
                Jenis Kelamin
              </label>
              <p className="pl-3 pb-4">{content && content.jenis_kelamin}</p>
              <div className="flex flex-row mb-2.5 ">
                <label className="block font-semibold text-lg text-black">
                  Email
                </label>
                {(content && content.emailActivated)
                  ? <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400 ml-3">Email sudah terverivikasi</span>
                  :
                  <div>
                    <span class="pb-2 bg-red-100 text-red-800 text-xs font-medium  px-3.5 py-1.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400 ml-3">Email belum terverivikasi</span>
                  </div>


                }
              </div>
              <div className="flex flex-row justify-items-center">
                <p className="pl-3 pt-1 pb-1">{content && content.email}</p>
                {(content && content.emailActivated)
                  ? <></>
                  :
                  <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ml-3 pl-2 pr-2 pb-1 pt-1" onClick={verivEmailHandler}>
                    Verivikasi Email
                  </button>

                }
              </div>
              <label className="mb-2.5 block font-semibold text-lg text-black">
                Roles
              </label>
              <p className="pl-3 pb-4">{content && content.roles[0].name}</p>
            </div>
          </div>
          {isLoading ? 
          <div class="absolute bottom-0 right-0 h-16 w-16">
          <div role="status">
            <svg aria-hidden="true" class="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        : 
        <></>
        }
        </LayoutPetani>
      </>
    );
  } else if (role === "ROLE_ADMIN" || "ROLE_PK") {
    return (
      <>
        <Layout>
          <div className="px-6 md:pt-9 pt-12 pb-4 rounded-sm border border-stroke bg-white shadow-default">
            <h2 className="font-bold pt-3 md:pt-0 text-2xl mt-4">Profil Pengguna</h2>
            <div className="max-lg:my-3">
              <div className="flex justify-end items-strecth rounded-lg">
                <a className="inline-flex rounded-l-lg border border-stroke py-2.5 px-4 font-medium bg-blue-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-settings"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="white"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"></path>
                    <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                  </svg>
                </a>
                <Link
                  href="/Profil/updateUsername"
                  className="inline-flex border border-stroke py-2.5 px-4  font-medium hover:bg-blue-500 hover:text-white "
                >
                  Ubah Username
                </Link>
                <Link
                  href="/Profil/updatePassword"
                  className="inline-flex border-y border-stroke py-2.5 px-4  font-medium hover:bg-blue-500 hover:text-white "
                >
                  Ubah Password
                </Link>
                <Link
                  href="/Profil/updateEmail"
                  className="inline-flex rounded-r-lg border border-stroke py-2.5 px-4  font-medium hover:bg-blue-500 hover:text-white"
                >
                  Ubah Email
                </Link>
              </div>
            </div>
            <div className="container px-4">
              <label className="mb-2.5 block font-semibold text-lg text-black">
                Nama
              </label>
              <p className="pl-3 pb-4">{content && content.nama}</p>
              <label className="mb-2.5 block font-semibold text-lg text-black">
                Username
              </label>
              <p className="pl-3 pb-4">{content && content.username}</p>
              <label className="mb-2.5 block font-semibold text-lg text-black">
                Nomor telepon
              </label>
              <p className="pl-3 pb-4">{content && content.no_handphone}</p>
              <label className="mb-2.5 block font-semibold text-lg text-black">
                Jenis Kelamin
              </label>
              <p className="pl-3 pb-4 ">{content && content.jenis_kelamin}</p>
              <div className="flex flex-row mb-2.5 ">
                <label className="block font-semibold text-lg text-black">
                  Email
                </label>
                {(content && content.emailActivated)
                  ? <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400 ml-3">Email sudah terverivikasi</span>
                  :
                  <div>
                    <span class="pb-2 bg-red-100 text-red-800 text-xs font-medium  px-3.5 py-1.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400 ml-3">Email belum terverivikasi</span>
                  </div>


                }
              </div>
              <div className="flex flex-row justify-items-center">
                <p className="pl-3 pt-1 pb-1">{content && content.email}</p>
                {(content && content.emailActivated)
                  ? <></>
                  :
                  <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ml-3 pl-2 pr-2 pb-1 pt-1" onClick={verivEmailHandler}>
                    Verivikasi Email
                  </button>

                }
              </div>

              <label className="mb-2.5 block font-semibold text-lg text-black">
                Roles
              </label>
              <p className="pl-3 pb-4">{content && content.roles[0].name}</p>
            </div>
          </div>
          {isLoading ? 
          <div class="absolute bottom-0 right-0 h-16 w-16">
          <div role="status">
            <svg aria-hidden="true" class="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        : 
        <></>
        }
          
        </Layout>
      </>
    );
  }
}
