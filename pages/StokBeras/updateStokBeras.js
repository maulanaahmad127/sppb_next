import { useEffect, useState } from "react"
import Router from "next/router"
import ReactPaginate from 'react-paginate';
import Layout from "../../components/layout";
import styles from "../../styles/dashboard.module.css";


export default function editStok() {
  const [content, setContent] = useState(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPage, setTotalPage] = useState(null);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [isTerjual, setIsTerjual] = useState(false);


  useEffect(() => {

    fetchContent();

  }, [page, search, isTerjual])


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
    const url = "../api/StokBeras/getDataByNotTerjual";
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

  function pagginationHandler (event) {
    const curpage = event.selected;
    console.log(`sekarang ada di page ${curpage}`)
    setPage(curpage);

  }

  function handleSubmit (event){
    event.preventDefault();
      // console.log(jenisBeras);
  }


  async function handleEditStok (event){
    event.preventDefault();
    let idx = event.target.value;
    const tokenx = localStorage.getItem("token")

        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x": tokenx,
                "id" : idx

            }
        }
        const url = "../api/StokBeras/updateStokHandler";
        const res = await fetch(url, options);
        const data = await res.json();
        const status = data.status;
        if(status){
            alert('stok data berhasil dirubah menjadi terjual');
            if(isTerjual){
              setIsTerjual(false);
            }else{
              setIsTerjual(true);
            }
        }else{
            alert(data.data.message);
        }
    
  }

  return (
    <>
      <Layout>
        <h2>Data Produksi Beras yang Belum Terjual</h2>
        <form className={styles.form}>
          <input  type="search" id="query" name="q" placeholder="Search..." onChange={(e) => setSearch(e.target.value)}/>
            <button onClick={handleSubmit}> Search</button>
        </form>
        
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
                <th scope="col">Terjual</th>
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
                  <td>{content.terjual.toString()}</td>
                  <td className="text-center">
                    <button onClick={handleEditStok} value={content.id}>Set Terjual</button>
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
}