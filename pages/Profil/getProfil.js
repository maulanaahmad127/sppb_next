import { useEffect, useState } from "react";
import Router from "next/router";
import ReactPaginate from "react-paginate";
import Layout from "../../components/layout";
import LayoutPetani from "../../components/layoutPetani";
import Link from "next/link";

export default function Dashboard() {
  const [content, setContent] = useState(null);
  let roleSignin = localStorage.getItem("role");
  const [role, setRole] = useState(roleSignin);
  useEffect(() => {
    fetchContent();
  }, []);

  async function fetchContent() {
    const tokenx = localStorage.getItem("token");

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
  console.log(role);
  if (role === "ROLE_PETANI") {
    return (
      <>
        <LayoutPetani>
        <div className="px-6 pt-9 pb-4 rounded-sm border border-stroke bg-white shadow-default">
            <h2 className="font-bold text-2xl mt-4">Profil Pengguna</h2>
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
              <p className="pl-3 pb-4">{content && content.jenis_kelamin}</p>
              <label className="mb-2.5 block font-semibold text-lg text-black">
                Email
              </label>
              <p className="pl-3 pb-4">{content && content.email}</p>
              <label className="mb-2.5 block font-semibold text-lg text-black">
                Roles
              </label>
              <p className="pl-3 pb-4">{content && content.roles[0].name}</p>
            </div>
          </div>
        </LayoutPetani>
      </>
    );
   } else if (role === "ROLE_ADMIN" || "ROLE_PK") {
    return (
      <>
        <Layout>
          <div className="px-6 pt-9 pb-4 rounded-sm border border-stroke bg-white shadow-default">
            <h2 className="font-bold text-2xl mt-4">Profil Pengguna</h2>
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
              <p className="pl-3 pb-4">{content && content.jenis_kelamin}</p>
              <label className="mb-2.5 block font-semibold text-lg text-black">
                Email
              </label>
              <p className="pl-3 pb-4">{content && content.email}</p>
              <label className="mb-2.5 block font-semibold text-lg text-black">
                Roles
              </label>
              <p className="pl-3 pb-4">{content && content.roles[0].name}</p>
            </div>
          </div>
        </Layout>
      </>
    );
  }
}
