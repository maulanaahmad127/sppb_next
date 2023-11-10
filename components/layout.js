import Navbar from "./navbar";
import Head from "next/head";

export default function Layout({ children }) {
  
  return (
    <>
    <Head>
        <title>Sistem Pencatatan Produksi Beras</title>
        <meta name="description" content="Full Stack Book JWT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* main body */}
      <div className="flex h-full bg-gray-100 overflow-auto">
        {/* sidebar */}
        <Navbar />
        {/* content */}
        <main className="w-full md:ml-60 md:p-6 overflow-auto">
            {/* children */}
            {children}
        </main>
      </div>
    </>
  );
}
