const handler = async (req, res) => {
    const method = 'PUT';
    const baseUrl = process.env.NEXT_PUBLIC_REST_API;
    const id = req.headers.id;
    const url = baseUrl + `/api/jenisBeras/${id}`
    const nama = req.body.nama;
    const token = req.headers.x;

      let postbody = {
        'nama': nama,
      }
      const options = {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Cookie" : token
        },
        cors: true,
        credentials: "include",
        body: JSON.stringify(postbody)
      }
      
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        const status = response.ok;
        
        return res.end(JSON.stringify({
            'data' : data,
            'status' : status
        }));
        
      } catch (err ) {
        return res.end(JSON.stringify({'error' : err.message}))
      }
      
}

export default handler;