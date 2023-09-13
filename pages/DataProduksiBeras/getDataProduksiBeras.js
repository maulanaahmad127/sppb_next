import { useEffect, useState } from "react";
import Router from "next/router";
import ReactPaginate from "react-paginate";
import Layout from "../../components/layout";
import LayoutPK from "../../components/layoutPK";
import styles from "../../styles/dashboard.module.css";

export default function getDataProduksiBeras() {
  const [content, setContent] = useState(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPage, setTotalPage] = useState(null);
  const [search, setSearch] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  let roleSignin = localStorage.getItem("role");
  const [role, setRole] = useState(roleSignin);

  useEffect(() => {
    fetchContent();
  }, [page, search, isDeleted]);

  async function fetchContent() {
    const tokenx = localStorage.getItem("token");

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

  function pagginationHandler(event) {
    const curpage = event.selected;
    setPage(curpage);
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  function handleInput(event) {
    event.preventDefault();
    Router.push({
      pathname: "/DataProduksiBeras/inputBeratBeras",
    });
  }

  async function handleDownload(event) {
    event.preventDefault();
    const tokenx = localStorage.getItem("token");
    const options = {
      method: "GET",
      headers: {
        x: tokenx,
      },
    };
    const url = "../api/DataProduksiBeras/getDataProduksiBerasPDF";
    try {
      await fetch(url, options);
    } catch (error) {
      console.log(error);
    }
  }

  function handleEdit(event) {
    event.preventDefault();
    let idx = event.target.value;

    Router.push(
      {
        pathname: "/DataProduksiBeras/updateDataProduksiBeras",
        query: { idx },
      },
      "/DataProduksiBeras/updateDataProduksiBeras"
    );
  }

  async function handleDelete(event) {
    event.preventDefault();
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
      alert("data berhasil dihapus");
      if (isDeleted) {
        setIsDeleted(false);
      } else {
        setIsDeleted(true);
      }
    } else {
      alert(data.data.message);
    }
  }

  console.log(`role nya seusuai${role}`);
  if (role === "ROLE_ADMIN") {
    return (
      <>
        <Layout>
          <div className="m-4 rounded-sm border border-stroke bg-white shadow-default">
          <h2 className="font-bold text-2xl my-4">Log Data Produksi Beras</h2>
          <form className="relative inline-block items-end my-3">
            <input
              className="rounded-lg border bg-transparent p-1 outline-none focus:border-blue-600 focus-visible:shadow-none"
              type="search"
              id="query"
              name="q"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="ml-1.5 items-center" onClick={handleSubmit}>
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
          </form>

          <div className="container">
            <div className="inline-block mb-2.5">
            <button
              className="inline-flex rounded mr-2 bg-blue-500 hover:opacity-80 active:bg-blue-600 text-center text-white text-xs px-2 py-1 cursor-pointer"
              onClick={handleInput}
            >
              <svg
                className="mr-1.5"
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
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M19 10h-14"></path>
                <path d="M5 6h14"></path>
                <path d="M14 14h-9"></path>
                <path d="M5 18h6"></path>
                <path d="M18 15v6"></path>
                <path d="M15 18h6"></path>
              </svg>{" "}
              Input
            </button>

            <button
              className="items-end rounded mr-2 bg-blue-500 hover:opacity-80 active:bg-blue-600 text-center text-white text-xs px-2 py-1 cursor-pointer"
              onClick={handleDownload}
            >
              <svg
                className="mr-1.5"
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
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
                <path d="M7 11l5 5l5 -5"></path>
                <path d="M12 4l0 12"></path>
              </svg>{" "}
              Download
            </button>
            </div>

            <table className="table-auto border rounded-sm pt-2 mb-2 w-auto overflow-auto">
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
                      <td className="px-3 py-2 border align-baseline">
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
                          onClick={handleDelete}
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
              activeClassName={"item active "}
              breakClassName={"item break-me "}
              breakLabel={"..."}
              containerClassName={"pagination"}
              disabledClassName={"disabled-page"}
              nextClassName={"item next "}
              pageClassName={"item pagination-page "}
              nextLabel={">"}
              previousLabel={"<"}
              previousClassName={"item previous"}
              initialPage={page}
              pageCount={totalPage}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={pagginationHandler}
            />
          </div>
          </div>
        </Layout>
      </>
    );
  } else if (role === "ROLE_PK") {
    return (
      <>
        <LayoutPK>
          <h2>Log Data Produksi Beras</h2>
          <form className={styles.form}>
            <input
              type="search"
              id="query"
              name="q"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={handleSubmit}> Search</button>
          </form>
          <button className={styles.buttonn} onClick={handleDownload}>
            {" "}
            Download
          </button>

          <div className="container">
            <table className="table table-bordered mb-0">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Berat Beras</th>
                  <th scope="col">Harga Beras</th>
                  <th scope="col">Petani</th>
                  <th scope="col">Jenis Beras</th>
                  <th scope="col">Tanggal Input</th>
                </tr>
              </thead>
              <tbody>
                {content &&
                  content.map((content) => (
                    <tr key={content.id}>
                      <td>{content.id} </td>
                      <td>{content.berat_beras} </td>
                      <td>{content.harga}</td>
                      <td>{content.petani.nama}</td>
                      <td>{content.jenisBeras.nama}</td>
                      <td>{content.tanggal_masuk}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <ReactPaginate
              activeClassName={"item active "}
              breakClassName={"item break-me "}
              breakLabel={"..."}
              containerClassName={"pagination"}
              disabledClassName={"disabled-page"}
              nextClassName={"item next "}
              pageClassName={"item pagination-page "}
              nextLabel={">"}
              previousLabel={"<"}
              previousClassName={"item previous"}
              initialPage={page}
              pageCount={totalPage}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={pagginationHandler}
            />
          </div>
        </LayoutPK>
      </>
    );
  }
}
