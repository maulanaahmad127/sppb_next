import stream from 'stream';
import { promisify } from 'util';
import fetch from 'node-fetch';


const pipeline = promisify(stream.pipeline);
const baseUrl = process.env.NEXT_PUBLIC_REST_API;
const urlRest = baseUrl + `/api/listBeras/export/pdf`;
// const url = baseUrl + `/api/listBeras/export/pdf`;
const url = 'https://w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

const handler = async (req, res) => {
  const x = req.headers.x;
  
  const options = {
    method: "GET",
    headers: {
        "Content-Type": "application/pdf",
        "Access-Control-Allow-Credentials": true,
        "Cookie" : x
    },
    cors: true,
    credentials: "include",
    
    
}
  const response = await fetch(urlRest, options); // replace this with your API call & options
  if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
  let date = new Date();
  let currentDate = `LastSynced_${date.getFullYear()}-${date.getMonth()}-${date.getDate()}@${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}` 
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=listDataProduksiBeras${currentDate}.pdf`);
  await pipeline(response.body, res);
};

export default handler;