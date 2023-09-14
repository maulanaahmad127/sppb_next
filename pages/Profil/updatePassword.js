import Layout from "../../components/layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LayoutPetani from "../../components/layoutPetani";

export default function formEditPassword() {
  const [passwordLama, setPasswordLama] = useState(null);
  const [passwordBaru, setPasswordBaru] = useState(null);
  let roleSignin = localStorage.getItem("role");
  const [role, setRole] = useState(roleSignin);
  const router = useRouter();

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
        passwordLama: passwordLama,
        passwordBaru: passwordBaru,
      }),
    };
    const url = "../api/Profil/updatePasswordHandler";
    const res = await fetch(url, options);
    const data = await res.json();
    const status = data.status;
    if (status) {
      router.push("/Profil/getProfil");
      alert("password berhasil dirubah");
    } else {
      alert(data.data.message);
    }
  }
  if (role === "ROLE_PETANI") {
    return (
      <>
        <LayoutPetani>
          <div className="rounded-sm border w-1/2 bg-white shadow">
            <div className="border-b py-4 px-6">
              <h1 className="font-medium">Form Edit Password</h1>
            </div>
            <div className="p-5">
              <label className="mb-2.5 block" htmlFor="passold">
                Input Password Lama
              </label>
              <input
                className="w-full rounded border-[1.5px] border-stroke bg-transparent mb-4 py-3 px-5 font-medium outline-none transition focus:border-blue-500 active:border-blue-500"
                type="password"
                name="Password Lama"
                placeholder="Password Lama"
                value={passwordLama}
                onChange={(event) => setPasswordLama(event.target.value)}
              />
              <label className="mb-2.5 block" htmlFor="passnew">
                Input Password Baru
              </label>
              <input
                className="w-full rounded border-[1.5px] border-stroke bg-transparent mb-4 py-3 px-5 font-medium outline-none transition focus:border-blue-500 active:border-blue-500"
                type="password"
                name="Password Baru"
                placeholder="Password Baru"
                value={passwordBaru}
                onChange={(event) => setPasswordBaru(event.target.value)}
              />
              <button
                className="flex w-full justify-center rounded bg-blue-500 hover:opacity-80 active:bg-blue-700 p-3 font-medium text-white"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </LayoutPetani>
      </>
    );
  } else if (role === "ROLE_ADMIN" || "ROLE_PK") {
    return (
      <>
        <Layout>
          <div className="rounded-sm border w-1/2 bg-white shadow">
            <div className="border-b py-4 px-6">
              <h1 className="font-medium">Form Edit Password</h1>
            </div>
            <div className="p-5">
              <label className="mb-2.5 block" htmlFor="passold">
                Input Password Lama
              </label>
              <input
                className="w-full rounded border-[1.5px] border-stroke bg-transparent mb-4 py-3 px-5 font-medium outline-none transition focus:border-blue-500 active:border-blue-500"
                type="password"
                name="Password Lama"
                placeholder="Password Lama"
                value={passwordLama}
                onChange={(event) => setPasswordLama(event.target.value)}
              />
              <label className="mb-2.5 block" htmlFor="passold">
                Input Password Baru
              </label>
              <input
                className="w-full rounded border-[1.5px] border-stroke bg-transparent mb-4 py-3 px-5 font-medium outline-none transition focus:border-blue-500 active:border-blue-500"
                type="password"
                name="Password Baru"
                placeholder="Password Baru"
                value={passwordBaru}
                onChange={(event) => setPasswordBaru(event.target.value)}
              />
              <button
                className="flex w-full justify-center rounded bg-blue-500 hover:opacity-80 active:bg-blue-700 p-3 font-medium text-white"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </Layout>
      </>
    );
  }
}
