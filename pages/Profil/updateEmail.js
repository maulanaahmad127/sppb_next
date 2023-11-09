import Layout from "../../components/layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LayoutPetani from "../../components/layoutPetani";
import Link from "next/link";

export default function FormEditPassword() {
  const [email, setEmail] = useState(null);
  const router = useRouter();
  let roleSignin = localStorage.getItem("role");
  const [role, setRole] = useState(roleSignin);

  useEffect(() => {}, []);

  async function getItem() {}

  async function handleSubmit() {
    const method = "PATCH";
    const tokenx = localStorage.getItem("token");
    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        x: tokenx,
      },
      body: JSON.stringify({
        email: email,
      }),
    };
    const url = "../api/Profil/updateEmailHandler";
    const res = await fetch(url, options);
    const data = await res.json();
    const status = data.status;
    if (status) {
      router.push("/Profil/getProfil");
      alert("email berhasil dirubah");
    } else {
      alert(data.data.message);
    }
  }
  if (role === "ROLE_PETANI") {
    return (
      <>
        <LayoutPetani>
          <div className="flex max-md:justify-center max-md:mt-12">
            <div className="rounded-sm border w-1/2 bg-white shadow">
              <div className="border-b py-4 px-6 flex justify-between">
                <h1 className="font-medium self-center">Form Edit Email</h1>
                <Link
                className="p-1 border rounded-sm hover:shadow-md"
                href="/Profil/getProfil"
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
                <label className="mb-2.5 block" htmlFor="email">
                  Input Email
                </label>
                <input
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent mb-4 py-3 px-5 font-medium outline-none transition focus:border-blue-500 active:border-blue-500"
                  type="text"
                  name="Email"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
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
        </LayoutPetani>
      </>
    );
  } else if (role === "ROLE_ADMIN" || "ROLE_PK") {
    return (
      <>
        <Layout>
          <div className="flex max-md:justify-center max-md:mt-12">
            <div className="rounded-sm border w-1/2 bg-white shadow">
              <div className="border-b py-4 px-6 flex justify-between">
                <h1 className="font-medium self-center">Form Edit Email</h1>
                <Link
                className="p-1 border rounded-sm hover:shadow-md"
                href="/Profil/getProfil"
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
                <label className="mb-2.5 block" htmlFor="email">
                  Input Email
                </label>
                <input
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent mb-4 py-3 px-5 font-medium outline-none transition focus:border-blue-500 active:border-blue-500"
                  type="text"
                  name="Email"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
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
}
