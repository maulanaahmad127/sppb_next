import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Layout from "../../components/layout";

export default function editStok() {
  const [content, setContent] = useState(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPage, setTotalPage] = useState(null);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  let roleSignin = localStorage.getItem("role");
  const [role, setRole] = useState(roleSignin);

  useEffect(() => {
    fetchContent();
  }, [page, search]);

  async function fetchContent() {
    const tokenx = localStorage.getItem("token");
    console.log(tokenx);
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        x: tokenx,
        size: size,
        page: page,
      },
    };
    const url = "../api/PenjualanBeras/getPenjualanBerasHandler";
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

  async function handleSubmit(event) {
    event.preventDefault();
    const tokenx = localStorage.getItem("token");
    const options = {
      method: "GET",
      headers: {
        x: tokenx,
      },
    };
    const url = "/api/PenjualanBeras/getPenjualanBerasPDF";
    try {
      await fetch(url, options);
    } catch (error) {
      console.log(error);
    }
  }

  if (role === "ROLE_ADMIN") {
    return (
      <>
        <Layout>
          <div className="px-6 pt-9 pb-4 rounded-sm border border-stroke bg-white shadow-default">
            <h2 className="font-bold text-2xl my-4">Data Penjualan Beras</h2>
            <div className="container pt-2.5">
              <button
                className="inline-flex rounded bg-green-500 hover:opacity-80 active:bg-green-600 text-center text-white text-xs px-2 py-1 cursor-pointer mb-5"
                onClick={handleSubmit}
              >
                <span className="pr-1.5">
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
                  </svg>
                </span>{" "}
                Download
              </button>
              <div className="w-fit">
                <table className="table-auto border rounded-sm pt-3 mb-2 w-auto overflow-auto">
                  <thead>
                    <tr className="bg-gray-300 border">
                      <th className="px-3 py-2 border" scope="col">
                        ID
                      </th>
                      <th className="px-3 py-2 border" scope="col">
                        Jenis Beras
                      </th>
                      <th className="px-3 py-2 border" scope="col">
                        Terjual
                      </th>
                      <th className="px-3 py-2 border" scope="col">
                        Total (Kilogram)
                      </th>
                      <th className="px-3 py-2 border" scope="col">
                        Bulan
                      </th>
                      <th className="px-3 py-2 border" scope="col">
                        Tahun
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {content &&
                      content.map((content) => (
                        <tr key={content.jenisBerasID}>
                          <td className="px-3 py-2 border">
                            {content.jenisBerasID}{" "}
                          </td>
                          <td className="px-3 py-2 border">
                            {content.jenisBeras}{" "}
                          </td>
                          <td className="px-3 py-2 border">
                            {content.berasTerjual}
                          </td>
                          <td className="px-3 py-2 border">
                            {content.totalBerat}
                          </td>
                          <td className="px-3 py-2 border">{content.bulan}</td>
                          <td className="px-3 py-2 border">{content.tahun}</td>
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
          </div>
        </Layout>
      </>
    );
  } else if (role === "ROLE_PK") {
    return (
      <>
        <Layout>
          <div className="px-6 pt-9 pb-4 rounded-sm border border-stroke bg-white shadow-default">
            <h2 className="font-bold text-2xl my-4">Data Penjualan Beras</h2>
            <div className="container pt-2.5">
              <button
                className="inline-flex rounded bg-green-500 hover:opacity-80 active:bg-green-600 text-center text-white text-xs px-2 py-1 cursor-pointer mb-5"
                onClick={handleSubmit}
              >
                <span className="pr-1.5">
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
                  </svg>
                </span>{" "}
                Download
              </button>
              <div className="w-fit">
                <table className="table-auto border rounded-sm pt-3 mb-2 w-auto overflow-auto">
                  <thead>
                    <tr className="bg-gray-300 border">
                      <th className="px-3 py-2 border" scope="col">
                        ID
                      </th>
                      <th className="px-3 py-2 border" scope="col">
                        Jenis Beras
                      </th>
                      <th className="px-3 py-2 border" scope="col">
                        Terjual
                      </th>
                      <th className="px-3 py-2 border" scope="col">
                        Total (Kilogram)
                      </th>
                      <th className="px-3 py-2 border" scope="col">
                        Bulan
                      </th>
                      <th className="px-3 py-2 border" scope="col">
                        Tahun
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {content &&
                      content.map((content) => (
                        <tr key={content.jenisBerasID}>
                          <td className="px-3 py-2 border">
                            {content.jenisBerasID}{" "}
                          </td>
                          <td className="px-3 py-2 border">
                            {content.jenisBeras}{" "}
                          </td>
                          <td className="px-3 py-2 border">
                            {content.berasTerjual}
                          </td>
                          <td className="px-3 py-2 border">
                            {content.totalBerat}
                          </td>
                          <td className="px-3 py-2 border">{content.bulan}</td>
                          <td className="px-3 py-2 border">{content.tahun}</td>
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
          </div>
        </Layout>
      </>
    );
  }
}
