import { useEffect, useState, useRef } from "react";
import Router from "next/router";
import ReactPaginate from "react-paginate";
import Layout from "../../components/layout";
import { Dialog } from "@headlessui/react";
import FileSaver from "file-saver";

export default function GetDataProduksiBeras() {
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [detail, setDetail] = useState(null);
  const [statusEmail, setStatusEmail] = useState(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPage, setTotalPage] = useState(null);
  const [search, setSearch] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const snapshot = useRef(null);
  let [isOpen, setIsOpen] = useState(false);
  let [isOpenDetail, setIsOpenDetail] = useState(false);
  const [targetId, setTargetId] = useState();

  useEffect(() => {
    fetchContent();
    fetchProfile();
  }, [page, search, isDeleted]);

  async function fetchProfile() {
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
    const listData = data.data.emailActivated;
    console.log(`status email = ${listData.emailActivated}`);
    setStatusEmail(listData);
  }

  async function fetchContent() {
    const tokenx = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    snapshot.current = role;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        x: tokenx,
      },
      body: JSON.stringify({
        page: page,
        size: size,
        search: search,
      }),
    };
    const url = "../api/DataProduksiBeras/getDataProduksiBerasHandler";
    const res = await fetch(url, options);
    const data = await res.json();
    const listData = data.content;
    const totalPage = data.data.totalPages;
    const currentPage = data.pageable.pageNumber;
    setPage(currentPage);
    setTotalPage(totalPage);
    setContent(listData);
  }

  // async function fetchDataProduksiBerasByID() {

  // }

  const pagginationHandler = async ({ selected }) => {
    console.log(selected);
    setPage(selected);
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  function handleInput(event) {
    event.preventDefault();
    if (statusEmail == false) {
      alert('email belum teraktivasi, silahkan aktivasi email terlebih dahulu');
      Router.push({
        pathname: "/Profil/getProfil",
      });
    }
    else {
      Router.push({
        pathname: "/DataProduksiBeras/pilihTimbangan",
      });
    }


  }

  function handleModal(event) {
    setIsOpen(true);
    setTargetId(event.currentTarget.value);
  }

  async function handleDetail(event) {

    let idx = event.target.value;
    try {
      const tokenx = localStorage.getItem("token");

      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          x: tokenx,
          id: idx,
        },
      };
      const url = "../api/DataProduksiBeras/getDataProduksiBersaByIDHandler";
      const res = await fetch(url, options);
      const data = await res.json();
      const det = await data.data.payload;

      console.log(det);
      setDetail(det);

    } catch (error) {
      console.log(error.message);
    }
    setIsOpenDetail(true);
    setIsLoading(false);

  }

  function closeDetail() {
    setIsOpenDetail(false);
    setTargetId(null);
    setDetail(null);
  }

  function closeModal() {
    setIsOpen(false);
    setTargetId(null);
  }

  async function handleDownload(event) {
    event.preventDefault();
    if (statusEmail == false) {
      alert('email belum teraktivasi, silahkan aktivasi email terlebih dahulu');
      Router.push({
        pathname: "/Profil/getProfil",
      });
    }
    else {
      const tokenx = localStorage.getItem("token");
      const options = {
        method: "GET",
        headers: {
          x: tokenx,
        },
      };
      const url = "../api/DataProduksiBeras/getDataProduksiBerasPDF";
      try {
        const pdf = await fetch(url, options);
        const file = await pdf.blob();
        let currentDate = `lastSync=${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}@${new Date().getHours()}-${new Date().getMinutes()}-${new Date().getSeconds()}`;
        let fileName = `data_produksi_beras${currentDate}`;
        FileSaver(file, fileName);
      } catch (error) {
        console.log(error);
      }
    }

  }

  function handleEdit(event) {
    event.preventDefault();
    if (statusEmail == false) {
      alert('email belum teraktivasi, silahkan aktivasi email terlebih dahulu');
      Router.push({
        pathname: "/Profil/getProfil",
      });
    }
    else {
      let idx = event.target.value;

      Router.push(
        {
          pathname: "/DataProduksiBeras/updateDataProduksiBeras",
          query: { idx },
        },
        "/DataProduksiBeras/updateDataProduksiBeras"
      );
    }

  }


  async function handleDelete(event) {
    event.preventDefault();
    if (statusEmail == false) {
      alert('email belum teraktivasi, silahkan aktivasi email terlebih dahulu');
      Router.push({
        pathname: "/Profil/getProfil",
      });
    }
    else {
      let idx = event.target.value;
      const tokenx = localStorage.getItem("token");

      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          x: tokenx,
          id: idx,
        },
      };
      const url = "../api/DataProduksiBeras/deleteDataProduksiBerasHandler";
      const res = await fetch(url, options);
      const data = await res.json();
      const status = data.status;
      if (status) {
        alert("Data berhasil dihapus");
        if (isDeleted) {
          setIsDeleted(false);
        } else {
          setIsDeleted(true);
          closeModal();
        }
      } else {
        alert(data.data.message);
      }
    }

  }
  const role = snapshot.current;
  console.log(`role nya seusuai${role}`);
  if (role === "ROLE_ADMIN") {
    return (
      <>
        {/* delete alert */}
        <Dialog
          as="div"
          className="relative z-50"
          open={isOpen}
          onClose={closeModal}
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true">
            <div className="fixed inset-0 flex w-auto items-center justify-center p-4">
              <Dialog.Panel className="w-auto max-w-142.5 rounded-lg bg-white py-12 px-8 text-center md:py-15 md:px-17.5">
                <span className="mx-auto inline-block">
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 60 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      opacity="0.1"
                      width="60"
                      height="60"
                      rx="30"
                      fill="#DC2626"
                    ></rect>
                    <path
                      d="M30 27.2498V29.9998V27.2498ZM30 35.4999H30.0134H30ZM20.6914 41H39.3086C41.3778 41 42.6704 38.7078 41.6358 36.8749L32.3272 20.3747C31.2926 18.5418 28.7074 18.5418 27.6728 20.3747L18.3642 36.8749C17.3296 38.7078 18.6222 41 20.6914 41Z"
                      stroke="#DC2626"
                      stroke-width="2.2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </span>
                <Dialog.Title className="mt-5.5 pb-2 text-xl font-bold sm:text-2xl">
                  Hapus Entri?
                </Dialog.Title>
                <p className="mb-10">
                  Data yang dihapus tidak dapat dipulihkan lagi
                </p>
                <div className="flex justify-between gap-y-6">
                  <button
                    className="block w-2/5 rounded border bg-gray-400 p-3 text-center font-medium text-white transition hover:border-meta-1 hover:bg-red-500 hover:text-white"
                    onClick={closeModal}
                  >
                    Batal
                  </button>
                  <button
                    className="block w-2/5 rounded border bg-red-500 p-3 text-center font-medium text-white transition hover:bg-opacity-80"
                    onClick={handleDelete}
                    value={targetId}
                  >
                    Hapus
                  </button>
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
        {/* detail menu */}
        {isOpenDetail && (
          <>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}

                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      Detail Data Produksi Beras
                    </h3>
                    <button
                      className=" ml-10 bg-transparent border-0 text-black  float-right text-2xl leading-none outline-none focus:outline-none"
                      onClick={() => closeDetail(false)}
                    >x

                    </button>
                  </div>
                  {/*body*/}
                  {isLoading ?
                  <div className="relative p-3 flex-auto">
                    <div className="text-center items-center">
                      <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
                        <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-24 w-24"></div>
                      </div>
                    </div>
                  </div>
                    : 
                    <div className="relative p-3 flex-auto">
                    <table class="table-auto ">
                      <tbody>
                        <tr className="px-12 py-2 ">

                          <td className="px-3 py-2 border-r my-4 text-blueGray-500 text-lg leading-relaxed font-bold">ID</td>
                          <td className="px-3 py-2  my-4 text-blueGray-500 text-lg leading-relaxed">{detail && detail.id}</td>
                        </tr>
                        <tr className="px-12 py-2 ">
                          <td className="px-3 py-2 border-r my-4 text-blueGray-500 text-lg leading-relaxed font-bold">Jenis Beras</td>
                          <td className="px-3 py-2  my-4 text-blueGray-500 text-lg leading-relaxed">{detail && detail.jenisBeras.nama}</td>
                        </tr>
                        <tr className="px-12 py-2 ">
                          <td className="px-3 py-2 border-r my-4 text-blueGray-500 text-lg leading-relaxed font-bold">Nama Petani </td>
                          <td className="px-3 py-2  my-4 text-blueGray-500 text-lg leading-relaxed">{detail && detail.petani.nama}</td>
                        </tr>
                        <tr className="px-12 py-2 ">
                          <td className="px-3 py-2 border-r my-4 text-blueGray-500 text-lg leading-relaxed font-bold">Berat Beras</td>
                          <td className="px-3 py-2  my-4 text-blueGray-500 text-lg leading-relaxed">{detail && detail.berat_beras} Kg</td>
                        </tr>
                        <tr className="px-12 py-2 ">
                          <td className="px-3 py-2 border-r my-4 text-blueGray-500 text-lg leading-relaxed font-bold">Harga</td>
                          <td className="px-3 py-2  my-4 text-blueGray-500 text-lg leading-relaxed">Rp. {detail && detail.harga}</td>
                        </tr>
                        <tr className="px-12 py-2 ">
                          <td className="px-3 py-2 border-r my-4 text-blueGray-500 text-lg leading-relaxed font-bold">Tanggal Masuk</td>
                          <td className="px-3 py-2  my-4 text-blueGray-500 text-lg leading-relaxed">{detail && detail.tanggal_masuk}</td>
                        </tr>
                        <tr className="px-12 py-2 ">
                          <td className="px-3 py-2 border-r my-4 text-blueGray-500 text-lg leading-relaxed font-bold">Terjual</td>
                          <td className="px-3 py-2  my-4 text-blueGray-500 text-lg leading-relaxed">{detail && detail.terjual ? "Sudah Terjual" : "Belum Terjual"}</td>
                        </tr>

                      </tbody>
                    </table>
                  </div>
                  }
                  
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => closeDetail(false)}
                    >
                      Close
                    </button>

                  </div>
                </div>


              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        )}

        <Layout>
          <div className="px-6 pt-8 pb-4 rounded-sm border border-stroke bg-white shadow-default">
            <h2 className="font-bold text-2xl">Log Data Produksi Beras</h2>
            <div className="container pt-2.5">
              <div className="inline-flex justify-between w-full mt-3 mb-5 gap-3">
                {/* button & search */}
                <div className="flex gap-2.5">
                  <button
                    className="inline-flex items-stretch rounded bg-blue-500 hover:opacity-80 active:bg-blue-600 text-center text-white text-xs px-2 py-1 cursor-pointer"
                    onClick={handleInput}
                  >
                    <span className="pr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-text-plus"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path d="M19 10h-14"></path>
                        <path d="M5 6h14"></path>
                        <path d="M14 14h-9"></path>
                        <path d="M5 18h6"></path>
                        <path d="M18 15v6"></path>
                        <path d="M15 18h6"></path>
                      </svg>
                    </span>
                    Input
                  </button>
                  <button
                    className="inline-flex items-stretch rounded bg-green-500 hover:opacity-80 active:bg-green-600 text-center text-white text-xs px-2 py-1 cursor-pointer"
                    onClick={handleDownload}
                  >
                    <span className="pr-2">
                      <svg
                        className="pr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-download"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
                        <path d="M7 11l5 5l5 -5"></path>
                        <path d="M12 4l0 12"></path>
                      </svg>
                    </span>
                    Download
                  </button>
                </div>

                {/* search */}
                <div className="flex justify-self-end items-strecth">
                  <input
                    className="rounded-l-md border bg-transparent p-1 outline-none focus:border-blue-600 focus-visible:shadow-none"
                    type="search"
                    id="query"
                    name="q"
                    placeholder="Search..."
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button
                    className="inline-flex rounded-r-lg border border-stroke cursor-pointer bg-gray-300 active:bg-gray-500 p-1"
                    onClick={handleSubmit}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-search"
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
                      <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
                      <path d="M21 21l-6 -6"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <table className="table-auto border rounded-sm pt-3 mb-2 w-full overflow-auto">
                  <thead>
                    <tr className="bg-gray-300 border">
                      <th scope="col" className="px-3 py-2 border">
                        No
                      </th>
                      <th scope="col" className="px-3 py-2 border">
                        Berat Beras
                      </th>
                      <th scope="col" className="px-3 py-2 border">
                        Harga Beras
                      </th>
                      <th scope="col" className="px-3 py-2 border">
                        Petani
                      </th>
                      <th scope="col" className="px-3 py-2 border">
                        Jenis Beras
                      </th>
                      <th scope="col" className="px-3 py-2 border">
                        Tanggal Input
                      </th>
                      <th scope="col" className="px-3 py-2 border">
                        AKSI
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {content &&
                      content.map((content) => (
                        <tr key={content.id}>
                          <td className="px-3 py-2 border">{content.id} </td>
                          <td className="px-3 py-2 border">
                            {content.berat_beras}{" "}
                          </td>
                          <td className="px-3 py-2 border">{content.harga}</td>
                          <td className="px-3 py-2 border">
                            {content.petani.nama}
                          </td>
                          <td className="px-3 py-2 border">
                            {content.jenisBeras.nama}
                          </td>
                          <td className="px-3 py-2 border">
                            {content.tanggal_masuk}
                          </td>
                          <td className="px-3 py-2 border justify-between align-baseline">
                            <button
                              className="inline-flex rounded mr-2 bg-green-500 hover:opacity-80 active:bg-green-600 text-center text-white text-xs px-2 py-1 cursor-pointer"
                              onClick={handleDetail}
                              value={content.id}
                            >
                              <span className="mr-1.5">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                  class="icon icon-tabler icon-tabler-eye"
                                  width="20" height="20" viewBox="0 0 24 24"
                                  stroke-width="2" stroke="currentColor"
                                  fill="none" stroke-linecap="round"
                                  stroke-linejoin="round">
                                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                  <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                                  <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                                </svg>
                              </span>
                              DETAILS
                            </button>
                            <button
                              className="inline-flex rounded mr-2 bg-blue-500 hover:opacity-80 active:bg-blue-600 text-center text-white text-xs px-2 py-1 cursor-pointer"
                              onClick={handleEdit}
                              value={content.id}
                            >
                              <span className="mr-1.5">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="icon icon-tabler icon-tabler-edit"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  stroke-width="2"
                                  stroke="currentColor"
                                  fill="none"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                >
                                  <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                  ></path>
                                  <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
                                  <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
                                  <path d="M16 5l3 3"></path>
                                </svg>
                              </span>
                              EDIT
                            </button>
                            <button
                              className="inline-flex rounded bg-red-500 hover:opacity-80 active:bg-red-600 text-center text-white text-xs px-2 py-1 cursor-pointer"
                              onClick={handleModal}
                              value={content.id}
                            >
                              <span className="mr-1.5">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="icon icon-tabler icon-tabler-trash"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  stroke-width="2"
                                  stroke="currentColor"
                                  fill="none"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                >
                                  <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                  ></path>
                                  <path d="M4 7l16 0"></path>
                                  <path d="M10 11l0 6"></path>
                                  <path d="M14 11l0 6"></path>
                                  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                                  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                                </svg>
                              </span>
                              DELETE
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <ReactPaginate
                  activeClassName={"item active"}
                  breakClassName={"item break-me"}
                  breakLabel={"..."}
                  containerClassName={"pagination"}
                  disabledClassName={"disabled-page"}
                  nextClassName={"item next "}
                  pageClassName={"item pagination-page"}
                  nextLabel={">"}
                  previousLabel={"<"}
                  previousClassName={"item previous"}
                  pageCount={totalPage}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={pagginationHandler}
                />
              </div>
            </div>
          </div>
        </Layout>
      </>
    );
  } else if (role === "ROLE_PK") {
    return (
      <>
      {/* detail menu */}
      {isOpenDetail && (
          <>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}

                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      Detail Data Produksi Beras
                    </h3>
                    <button
                      className=" ml-10 bg-transparent border-0 text-black  float-right text-2xl leading-none outline-none focus:outline-none"
                      onClick={() => closeDetail(false)}
                    >x

                    </button>
                  </div>
                  {/*body*/}
                  {isLoading ?
                  <div className="relative p-3 flex-auto">
                    <div className="text-center items-center">
                      <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
                        <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-24 w-24"></div>
                      </div>
                    </div>
                  </div>
                    : 
                    <div className="relative p-3 flex-auto">
                    <table class="table-auto ">
                      <tbody>
                        <tr className="px-12 py-2 ">

                          <td className="px-3 py-2 border-r my-4 text-blueGray-500 text-lg leading-relaxed font-bold">ID</td>
                          <td className="px-3 py-2  my-4 text-blueGray-500 text-lg leading-relaxed">{detail && detail.id}</td>
                        </tr>
                        <tr className="px-12 py-2 ">
                          <td className="px-3 py-2 border-r my-4 text-blueGray-500 text-lg leading-relaxed font-bold">Jenis Beras</td>
                          <td className="px-3 py-2  my-4 text-blueGray-500 text-lg leading-relaxed">{detail && detail.jenisBeras.nama}</td>
                        </tr>
                        <tr className="px-12 py-2 ">
                          <td className="px-3 py-2 border-r my-4 text-blueGray-500 text-lg leading-relaxed font-bold">Nama Petani </td>
                          <td className="px-3 py-2  my-4 text-blueGray-500 text-lg leading-relaxed">{detail && detail.petani.nama}</td>
                        </tr>
                        <tr className="px-12 py-2 ">
                          <td className="px-3 py-2 border-r my-4 text-blueGray-500 text-lg leading-relaxed font-bold">Berat Beras</td>
                          <td className="px-3 py-2  my-4 text-blueGray-500 text-lg leading-relaxed">{detail && detail.berat_beras} Kg</td>
                        </tr>
                        <tr className="px-12 py-2 ">
                          <td className="px-3 py-2 border-r my-4 text-blueGray-500 text-lg leading-relaxed font-bold">Harga</td>
                          <td className="px-3 py-2  my-4 text-blueGray-500 text-lg leading-relaxed">Rp. {detail && detail.harga}</td>
                        </tr>
                        <tr className="px-12 py-2 ">
                          <td className="px-3 py-2 border-r my-4 text-blueGray-500 text-lg leading-relaxed font-bold">Tanggal Masuk</td>
                          <td className="px-3 py-2  my-4 text-blueGray-500 text-lg leading-relaxed">{detail && detail.tanggal_masuk}</td>
                        </tr>
                        <tr className="px-12 py-2 ">
                          <td className="px-3 py-2 border-r my-4 text-blueGray-500 text-lg leading-relaxed font-bold">Terjual</td>
                          <td className="px-3 py-2  my-4 text-blueGray-500 text-lg leading-relaxed">{detail && detail.terjual ? "Sudah Terjual" : "Belum Terjual"}</td>
                        </tr>

                      </tbody>
                    </table>
                  </div>
                  }
                  
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => closeDetail(false)}
                    >
                      Close
                    </button>

                  </div>
                </div>


              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        )}
        <Layout>
          <div className="px-6 pt-8 pb-4 rounded-sm border border-stroke bg-white shadow-default">
            <h2 className="font-bold text-2xl">Log Data Produksi Beras</h2>

            <div className="container pt-2.5">
              <div className="inline-flex justify-between w-full mt-3 mb-5 gap-3">
                {/* button & search */}
                <div className="flex gap-2.5">
                  <button
                    className="inline-flex items-stretch rounded bg-green-500 hover:opacity-80 active:bg-green-600 text-center text-white text-xs px-2 py-1 cursor-pointer"
                    onClick={handleDownload}
                  >
                    <span className="pr-2">
                      <svg
                        className="pr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-download"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
                        <path d="M7 11l5 5l5 -5"></path>
                        <path d="M12 4l0 12"></path>
                      </svg>
                    </span>
                    Download
                  </button>
                </div>

                {/* search */}
                <div className="flex justify-self-end items-strecth">
                  <input
                    className="rounded-l-md border bg-transparent p-1 outline-none focus:border-blue-600 focus-visible:shadow-none"
                    type="search"
                    id="query"
                    name="q"
                    placeholder="Search..."
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button
                    className="inline-flex rounded-r-lg border border-stroke cursor-pointer bg-gray-300 active:bg-gray-500 p-1"
                    onClick={handleSubmit}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-search"
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
                      <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
                      <path d="M21 21l-6 -6"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <table className="table-auto border rounded-sm pt-3 mb-2 w-full overflow-auto">
                  <thead>
                    <tr className="bg-gray-300 border">
                      <th scope="col" className="px-3 py-2 border">
                        No
                      </th>
                      <th scope="col" className="px-3 py-2 border">
                        Berat Beras
                      </th>
                      <th scope="col" className="px-3 py-2 border">
                        Harga Beras
                      </th>
                      <th scope="col" className="px-3 py-2 border">
                        Petani
                      </th>
                      <th scope="col" className="px-3 py-2 border">
                        Jenis Beras
                      </th>
                      <th scope="col" className="px-3 py-2 border">
                        Tanggal Input
                      </th>
                      <th scope="col" className="px-3 py-2 border">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {content &&
                      content.map((content) => (
                        <tr key={content.id}>
                          <td className="px-3 py-2 border">{content.id} </td>
                          <td className="px-3 py-2 border">
                            {content.berat_beras}{" "}
                          </td>
                          <td className="px-3 py-2 border">{content.harga}</td>
                          <td className="px-3 py-2 border">
                            {content.petani.nama}
                          </td>
                          <td className="px-3 py-2 border">
                            {content.jenisBeras.nama}
                          </td>
                          <td className="px-3 py-2 border">
                            {content.tanggal_masuk}
                          </td>
                          <td className="px-3 py-2 border align-baseline">
                            <button
                              className="inline-flex rounded mr-2 bg-green-500 hover:opacity-80 active:bg-blue-600 text-center text-white text-xs px-2 py-1 cursor-pointer"
                              onClick={handleDetail}
                              value={content.id}
                            >
                              <span className="mr-1.5">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                  class="icon icon-tabler icon-tabler-eye"
                                  width="24" height="24" viewBox="0 0 24 24"
                                  stroke-width="2" stroke="currentColor"
                                  fill="none" stroke-linecap="round"
                                  stroke-linejoin="round">
                                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                  <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                                  <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                                </svg>
                              </span>
                              DETAILS
                            </button>
                            </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <ReactPaginate
                  activeClassName={"item active"}
                  breakClassName={"item break-me"}
                  breakLabel={"..."}
                  containerClassName={"pagination"}
                  disabledClassName={"disabled-page"}
                  nextClassName={"item next "}
                  pageClassName={"item pagination-page"}
                  nextLabel={">"}
                  previousLabel={"<"}
                  previousClassName={"item previous"}
                  // initialPage={page}
                  pageCount={totalPage}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={pagginationHandler}
                  disableInitialCallback={true}
                />
              </div>
            </div>
          </div>
        </Layout>
      </>
    );
  }
}
