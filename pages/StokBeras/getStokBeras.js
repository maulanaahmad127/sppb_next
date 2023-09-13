import { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';
import Layout from "../../components/layout";
import styles from "../../styles/dashboard.module.css";
import LayoutPK from "../../components/layoutPK";

export default function editStok() {
  const [content, setContent] = useState(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPage, setTotalPage] = useState(null);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [isTerjual, setIsTerjual] = useState(false);
  let roleSignin = localStorage.getItem("role");
  const [role, setRole] = useState(roleSignin);

  useEffect(() => {

    fetchContent();

  }, [page, search, isTerjual])


  async function fetchContent() {

    const tokenx = localStorage.getItem("token");
    console.log(tokenx);
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x": tokenx,
        "size": size,
        "page": page
      }
    }
    const url = "../api/StokBeras/getStokBerasHandler";
    const res = await fetch(url, options);
    const data = await res.json();
    const listData = data.content;
    const totalPage = data.data.totalPages;
    const currentPage = data.pageable.pageNumber;
    setPage(currentPage);
    setTotalPage(totalPage);
    data.data
    setContent(listData);

  }

  function pagginationHandler(event) {
    const curpage = event.selected;
    console.log(`sekarang ada di page ${curpage}`)
    setPage(curpage);

  }

  async function handleSubmit(event) {
    event.preventDefault();
    const tokenx = localStorage.getItem("token")
    const options = {
      method: "GET",
      headers: {
        "x": tokenx
      }
    }
    const url = "../api/StokBeras/getStokBerasPDF";
    try {
      await fetch(url, options);
    } catch (error) {
      console.log(error)
    }
    
  }


if(role === 'ROLE_ADMIN'){
  return (
    <>
      <Layout>
        <h2 className="text-bold text-2xl">Data Stok Beras</h2>
        <div className="container">
          <button className="inline-flex rounded mr-2 bg-blue-500 hover:opacity-80 active:bg-blue-600 text-center text-white text-xs px-2 py-1 cursor-pointer"
           onClick={handleSubmit}>
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
              </svg> Download</button>

          <table className="table-auto border rounded-sm pt-2 mb-0 w-auto overflow-auto">
            <thead>
              <tr className="bg-gray-300 border">
                <th className="px-3 py-2 border" scope="col">ID</th>
                <th className="px-3 py-2 border" scope="col">Jenis Beras</th>
                <th className="px-3 py-2 border" scope="col">Stok (Kilogram)</th>
              </tr>
            </thead>
            <tbody>
              {content && content.map((content) => (
                <tr key={content.jenisBerasID}>
                  <td className="px-3 py-2 border">{content.jenisBerasID} </td>
                  <td className="px-3 py-2 border">{content.jenisBeras} </td>
                  <td className="px-3 py-2 border">{content.stok}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ReactPaginate
            activeClassName={'item active '}
            breakClassName={'item break-me '}
            breakLabel={'...'}
            containerClassName={'pagination'}
            disabledClassName={'disabled-page'}
            nextClassName={"item next "}
            pageClassName={'item pagination-page '}
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

      </Layout>
    </>


  )
}else if (role === 'ROLE_PK'){
  return (
    <>
      <LayoutPK>
        <h2>Data Stok Beras</h2>
        <div className="container">
          <button className={styles.buttonn} onClick={handleSubmit}> Download</button>

          <table className="table table-bordered mb-0">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Jenis Beras</th>
                <th scope="col">Stok (Kilogram)</th>
              </tr>
            </thead>
            <tbody>
              {content && content.map((content) => (
                <tr key={content.jenisBerasID}>
                  <td>{content.jenisBerasID} </td>
                  <td>{content.jenisBeras} </td>
                  <td>{content.stok}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ReactPaginate
            activeClassName={'item active '}
            breakClassName={'item break-me '}
            breakLabel={'...'}
            containerClassName={'pagination'}
            disabledClassName={'disabled-page'}
            nextClassName={"item next "}
            pageClassName={'item pagination-page '}
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


  )
}
  
}