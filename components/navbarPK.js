import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Disclosure } from "@headlessui/react";

export default function Navbar() {
  return (
    <div>
      <Disclosure as="nav" defaultOpen="true">
        <Disclosure.Button className="absolute top-4 left-4 inline-flex peer cursor-pointer rounded-md md:hidden p-2 hover:bg-indigo-800 active:bg-indigo-800 text-white bg-indigo-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-menu-2"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M4 6l16 0"></path>
            <path d="M4 12l16 0"></path>
            <path d="M4 18l16 0"></path>
          </svg>
        </Disclosure.Button>
        <Disclosure.Panel
          as="div"
          className="h-screen w-2/5 -left-96 bg-indigo-900 z-20 fixed top-0 md:left-0 md:w-60 peer-focus:left-0 peer:transition ease-out delay-150 duration-200"
        >
          <div className="flex-row flex p-3 items-center justify-between">
            <h1 className="text-white font-bold text-center pl-5">SPPB</h1>
            <Disclosure.Button className="md:hidden text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-x"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M18 6l-12 12"></path>
                <path d="M6 6l12 12"></path>
              </svg>
            </Disclosure.Button>
          </div>
        </Disclosure.Panel>
      </Disclosure>

      {/* 
<ul>
          <li><Link href="/">Beranda</Link></li>
          <li><Link href="/DataProduksiBeras/getDataProduksiBeras">Data Beras</Link></li>
          
          <li><Link href="/StokBeras/getStokBeras">Stok Beras </Link>
          </li>
          <li><Link href="/PenjualanBeras/getDataPenjualan">Penjualan Beras </Link></li>
          <li><Link href="/JenisBeras/getJenisBeras">Jenis Beras </Link></li>
          <li><Link href="/Profil/getProfil">Profil</Link>
          <ul>
              <li><Link href="/Profil/updatePassword">Edit Password</Link></li>
              <li><Link href="/Profil/updateEmail">Edit Email</Link></li>
              <li><Link href="/Profil/updateUsername">Edit Username</Link></li>
            </ul>
          </li>
          <li><Link href="/signout">Logout</Link></li>
        </ul>
*/}
    </div>
  );
}
