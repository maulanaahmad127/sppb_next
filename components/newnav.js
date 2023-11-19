import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useState, useRef, useEffect } from "react";

function MobileNav({ open, setOpen }) {
  const router = useRouter();

  return (
    <div 
      className={`absolute top-0 left-0 h-screen w-64 bg-indigo-900 transform ${
        open ? "-translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out filter drop-shadow-md `}
    >
      <div className="flex items-center px-6 justify-between filter drop-shadow-md bg-indigo-900 h-16">
        {" "}
        {/*logo container*/}
        <a className="text-white font-bold text-base">SPPB</a>
        <button
          className="text-white"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-x"
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
            <path d="M18 6l-12 12"></path>
            <path d="M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div className="flex flex-col mx-4">
        <ul className="flex flex-col w-full gap-1 pt-3">
          <li>
            <Link
              href="/DataProduksiBeras/getDataProduksiBeras"
              className={`flex items-center py-2 px-3 rounded-lg text-white text-base cursor-pointer hover:bg-indigo-500  ${
                router.pathname == "/DataProduksiBeras/getDataProduksiBeras"
                  ? "bg-indigo-700"
                  : ""
              } `}
            >
              Data Beras
            </Link>
          </li>
          <li>
            <Link
              href="/StokBeras/getStokBeras"
              className={`flex items-center py-2 px-3 rounded-lg text-white text-base cursor-pointer hover:bg-indigo-500  ${
                router.pathname == "/StokBeras/getStokBeras"
                  ? "bg-indigo-700"
                  : ""
              } `}
            >
              Stok Beras
            </Link>
          </li>
          <li>
            <Link
              href="/PenjualanBeras/getDataPenjualan"
              className={`flex items-center py-2 px-3 rounded-lg text-white text-base cursor-pointer hover:bg-indigo-500  ${
                router.pathname == "/PenjualanBeras/getDataPenjualan"
                  ? "bg-indigo-700"
                  : ""
              } `}
            >
              Penjualan Beras
            </Link>
          </li>
          <li>
            <Link
              href="/JenisBeras/getJenisBeras"
              className={`flex items-center py-2 px-3 rounded-lg text-white text-base cursor-pointer hover:bg-indigo-500  ${
                router.pathname == "/JenisBeras/getJenisBeras"
                  ? "bg-indigo-700"
                  : ""
              } `}
            >
              Jenis Beras
            </Link>
          </li>
          <li>
            <Link
              href="/Profil/getProfil"
              className={`flex items-center py-2 px-3 rounded-lg text-white text-base cursor-pointer hover:bg-indigo-500  ${
                router.pathname == "/Profil/getProfil" ? "bg-indigo-700" : ""
              } `}
            >
              Profil
            </Link>
          </li>
          <li>
            <Link
              href="/signout"
              className="flex items-center py-2 px-3 rounded-lg text-white text-base cursor-pointer hover:bg-red-600"
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  
  return (
    <nav>
      {/* mobile menu header */}
      <div className="md:hidden flex fixed top-0 filter drop-shadow-md bg-indigo-900 px-4 py-4 h-14 w-screen">
        <MobileNav open={open} setOpen={setOpen} />
        <div className="left-0 top-0 flex items-center">
          {/* hamburger button */}
          <button
            className="cursor-pointer rounded-md md:hidden p-2 hover:bg-indigo-700 hover:border-white active:bg-indigo-800 text-white"
            onClick={() => {
              setOpen(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-menu-2"
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
              <path d="M4 6l16 0"></path>
              <path d="M4 12l16 0"></path>
              <path d="M4 18l16 0"></path>
            </svg>
          </button>
          <h1 className="font-bold text-white ml-4 text-base">SPPB</h1>
        </div>
      </div>

      {/* default sidebar */}
      <div className="max-md:hidden h-screen w-60 bg-indigo-900 z-20 fixed top-0 px-4">
        {/* sidebar head */}
        <div className="flex items-center justify-between h-fit py-5 w-full">
          <h1 className="text-white font-bold text-center text-base ml-20">
            SPPB
          </h1>
        </div>

        {/* sidebar item */}
        <div className="flex pt-5">
          <ul className="flex flex-col w-full gap-1">
            <li>
              <Link
                href="/DataProduksiBeras/getDataProduksiBeras"
                className={`flex items-center py-2 px-3 rounded-lg text-white text-base cursor-pointer hover:bg-indigo-500  ${
                  router.pathname == "/DataProduksiBeras/getDataProduksiBeras"
                    ? "bg-indigo-700"
                    : ""
                } `}
              >
                Data Beras
              </Link>
            </li>
            <li>
              <Link
                href="/StokBeras/getStokBeras"
                className={`flex items-center py-2 px-3 rounded-lg text-white text-base cursor-pointer hover:bg-indigo-500  ${
                  router.pathname == "/StokBeras/getStokBeras"
                    ? "bg-indigo-700"
                    : ""
                } `}
              >
                Stok Beras
              </Link>
            </li>
            <li>
              <Link
                href="/PenjualanBeras/getDataPenjualan"
                className={`flex items-center py-2 px-3 rounded-lg text-white text-base cursor-pointer hover:bg-indigo-500  ${
                  router.pathname == "/PenjualanBeras/getDataPenjualan"
                    ? "bg-indigo-700"
                    : ""
                } `}
              >
                Penjualan Beras
              </Link>
            </li>
            <li>
              <Link
                href="/JenisBeras/getJenisBeras"
                className={`flex items-center py-2 px-3 rounded-lg text-white text-base cursor-pointer hover:bg-indigo-500  ${
                  router.pathname == "/JenisBeras/getJenisBeras"
                    ? "bg-indigo-700"
                    : ""
                } `}
              >
                Jenis Beras
              </Link>
            </li>
            <li>
              <Link
                href="/Profil/getProfil"
                className={`flex items-center py-2 px-3 rounded-lg text-white text-base cursor-pointer hover:bg-indigo-500  ${
                  router.pathname == "/Profil/getProfil" ? "bg-indigo-700" : ""
                } `}
              >
                Profil
              </Link>
            </li>
            <li>
              <Link
                href="/signout"
                className="flex items-center py-2 px-3 rounded-lg text-white text-base cursor-pointer hover:bg-red-600"
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
