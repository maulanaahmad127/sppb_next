import { useEffect, useState } from "react"
import Router from "next/router"
import ReactPaginate from 'react-paginate';
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

  }, [page, search, isDeleted])


  async function fetchContent() {

    const tokenx = localStorage.getItem("token")

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x": tokenx
      },
      body: JSON.stringify({
        'page': page,
        'size': size,
        'search': search
      })
    }
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
      pathname: "/DataProduksiBeras/inputBeratBeras"
    })
  }

  async function handleDownload(event) {
    event.preventDefault();
    const tokenx = localStorage.getItem("token")
    const options = {
      method: "GET",
      headers: {
        "x": tokenx
      }
    }
    const url = "../api/DataProduksiBeras/getDataProduksiBerasPDF";
    try {
      await fetch(url, options);
    } catch (error) {
      console.log(error)
    }

  }

  function handleEdit(event) {
    event.preventDefault();
    let idx = event.target.value;

    Router.push({
      pathname: "/DataProduksiBeras/updateDataProduksiBeras",
      query: { idx }
    }, "/DataProduksiBeras/updateDataProduksiBeras")
  }

  async function handleDelete(event) {
    event.preventDefault();
    let idx = event.target.value;
    const tokenx = localStorage.getItem("token")

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x": tokenx,
        "id": idx

      }
    }
    const url = "../api/DataProduksiBeras/deleteDataProduksiBerasHandler";
    const res = await fetch(url, options);
    const data = await res.json();
    const status = data.status;
    if (status) {
      alert('data berhasil dihapus');
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
  if (role === 'ROLE_ADMIN') {
    return (
      <>
        <Layout>
          <h2>Log Data Produksi Beras</h2>
          <form className={styles.form}>
            <input type="search" id="query" name="q" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
            <button onClick={handleSubmit}> Search</button>
          </form>
          <button className={styles.buttonn} onClick={handleDownload}> Download</button>

          <div className="container">
            <button onClick={handleInput}> Input</button>
            <table className="table table-bordered mb-0">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Berat Beras</th>
                  <th scope="col">Harga Beras</th>
                  <th scope="col">Petani</th>
                  <th scope="col">Jenis Beras</th>
                  <th scope="col">Tanggal Input</th>
                  <th scope="col">AKSI</th>
                </tr>
              </thead>
              <tbody>
                {content && content.map((content) => (
                  <tr key={content.id}>
                    <td>{content.id} </td>
                    <td>{content.berat_beras} </td>
                    <td>{content.harga}</td>
                    <td>{content.petani.nama}</td>
                    <td>{content.jenisBeras.nama}</td>
                    <td>{content.tanggal_masuk}</td>
                    <td className="text-center">
                      <button onClick={handleEdit} value={content.id}>EDIT</button>
                      <button onClick={handleDelete} value={content.id}>DELETE</button>
                    </td>
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
  } else if (role === 'ROLE_PK') {
    return (
      <>
        <LayoutPK>
          <h2>Log Data Produksi Beras</h2>
          <form className={styles.form}>
            <input type="search" id="query" name="q" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
            <button onClick={handleSubmit}> Search</button>
          </form>
          <button className={styles.buttonn} onClick={handleDownload}> Download</button>

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
                {content && content.map((content) => (
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