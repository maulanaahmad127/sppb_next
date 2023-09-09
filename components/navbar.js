import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <header>
        <ul>
          <li><Link href="/">Beranda</Link></li>
          <li><Link href="/DataProduksiBeras/getDataProduksiBeras">Data Beras</Link></li>
          
          <li><Link href="/StokBeras/getStokBeras">Stok Beras </Link>
            <ul>
              <li><Link href="/StokBeras/updateStokBeras">Edit Stok Beras</Link></li>
            </ul>
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
          <li style={{ float: "right" }}><Link href="/signout">Logout</Link></li>
        </ul>
      </header>

      <style jsx global>{`
        ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
            overflow: hidden;
            background-color: #ababab;
          }

          li {
            color: white;
            float: left;
          }

          li a {
            display: block;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
          }

          li ul {
            display: none;
            margin: 0;
            padding: 0;
            list-style: none;
            position: absolute;
            width: flex;
            
            box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
            z-index: 1;
        }

        li ul a {
          display: block;
          float: none;
          background-color: inherit;
          font-family: inherit; /* Important for vertical align on mobile phones */
          margin: 0;
        }

        li:hover ul {
          display: block;
      }

          li a:hover {
            color: white;
            background-color: #333;
          }

          li a.active {
            background-color:#680000; 
            color:#a2becf

          }

          li a:hover:not(.active) {
            background-color: #333;
          }

          li:first-child a { border-left:0; }
          li:last-child a { border-right:0; }

          @media screen and (max-width: 400px) {
            li a {
              text-align: center;
              float: none;
            }
          }

          @media screen and (max-width: 900px) {
            ul {
              width: 100%;
              height: auto;
              position: relative;
            }
            
            li a {
              float: left;
              padding: 15px;
            }
          }

        `}</style>

    </>
  )
}