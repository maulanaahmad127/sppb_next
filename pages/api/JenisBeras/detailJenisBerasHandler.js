const handler = async (req, res) => {
    const baseUrl = process.env.NEXT_PUBLIC_REST_API;
    const id = req.headers.id;
    const url = baseUrl + `/api/jenisBeras/${id}`
    const token = req.headers.x;


    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Cookie" : token
        },
        cors: true,
        credentials: "include"
    }

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        
        
        return res.end(JSON.stringify({
            data
        }));
        
      } catch (err ) {
        return res.end(JSON.stringify({'error' : err.message}))
      }
}

export default handler;