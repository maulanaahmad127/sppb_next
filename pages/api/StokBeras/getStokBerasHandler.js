const handler = async (req, res) => {
    const baseUrl = process.env.NEXT_PUBLIC_REST_API;
    
    const page = req.headers.page;
    const size = req.headers.size;
    const search = req.headers.search;
    const token = req.headers.x;
    
    let postbody = {
      nama: search
    }

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

    const url = baseUrl + `/api/beras/getDataBeras/${size}/${page}`

    
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        const body = response.body;
        const content = data.content;
        const pageable = data.pageable;
        
        return res.end(JSON.stringify({
            content,
            pageable,
            data
        }));
        
      } catch (err ) {
        return res.end(JSON.stringify({'error' : err.message}))
      }
}

export default handler;