import { useEffect, useState } from "react";
import Router from "next/router";
import ReactPaginate from "react-paginate";
import Layout from "../../components/layout";

export default function Dashboard() {
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
    const url = "../api/JenisBeras/getJenisBerasHandler";
    const res = await fetch(url, options);
    const data = await res.json();
    const listData = data.content;
    const totalPage = data.data.totalPages;
    const currentPage = data.pageable.pageNumber;
    setPage(currentPage);
    setTotalPage(totalPage);
    data.data;
    setContent(listData);
  }

  function pagginationHandler(event) {
    const curpage = event.selected;
    console.log(`sekarang ada di page ${curpage}`);
    setPage(curpage);
  }

  function handleSubmit(event) {
    event.preventDefault();
    // console.log(jenisBeras);
  }

  function addJenisBerasHandler(event) {
    event.preventDefault();
    Router.push("/JenisBeras/addJenisBeras");
  }

  function handleEdit(event) {
    event.preventDefault();
    let idx = event.target.value;

    Router.push(
      {
        pathname: "/JenisBeras/updateJenisBeras",
        query: { idx },
      },
      "/JenisBeras/updateJenisBeras"
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
    const url = "../api/JenisBeras/deleteJenisBerasHandler";
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
  if (role === "ROLE_ADMIN") {
    return (
      <>
        <Layout>
          <div className="px-6 pt-9 pb-4 rounded-sm border border-stroke bg-white shadow-default">
            <h2 className="font-bold text-2xl my-4">Log Data Jenis Beras</h2>

            <div className="container pt-2.5 mb-2.5">
              <div className="inline-flex justify-between w-full mb-5 gap-3">
                <button
                  className="inline-flex items-stretch rounded bg-blue-500 hover:opacity-80 active:bg-blue-600 text-center text-white text-xs px-2 py-1 cursor-pointer"
                  onClick={addJenisBerasHandler}
                >
                  <span className="pr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-plus"
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
                      <path d="M12 5l0 14"></path>
                      <path d="M5 12l14 0"></path>
                    </svg>
                  </span>
                  Tambah Jenis Beras Baru
                </button>

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

              <table className="table-auto border rounded-sm pt-2 mb-3 w-auto overflow-auto">
                <thead>
                  <tr className="bg-gray-300 border">
                    <th className="px-3 py-2 border" scope="col">
                      No
                    </th>
                    <th className="px-3 py-2 border" scope="col">
                      Jenis Beras
                    </th>
                    <th className="px-3 py-2 border" scope="col">
                      AKSI
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {content &&
                    content.map((content) => (
                      <tr key={content.id}>
                        <td className="px-3 py-2 border">{content.id} </td>
                        <td className="px-3 py-2 border">{content.nama} </td>
                        <td className="px-3 py-2 border align-baseline justify-end">
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
        <Layout>
          <div className="px-6 pt-9 pb-4 rounded-sm border border-stroke bg-white shadow-default">
            <h2 className="font-bold text-2xl my-4">Log Data Jenis Beras</h2>

            <div className="container pt-2.5 mb-2.5">
              <div className="flex justify-end items-strecth mb-5">
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
              <table className="table-auto border rounded-sm pt-2 mb-3 w-auto overflow-auto">
                <thead>
                  <tr className="bg-gray-300 border">
                    <th className="px-3 py-2 border" scope="col">
                      No
                    </th>
                    <th className="px-3 py-2 border" scope="col">
                      Jenis Beras
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {content &&
                    content.map((content) => (
                      <tr key={content.id}>
                        <td className="px-3 py-2 border">{content.id} </td>
                        <td className="px-3 py-2 border">{content.nama} </td>
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
  }
}
