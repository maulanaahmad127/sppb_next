const handler = async (req, res) => {
    const baseUrl = process.env.NEXT_PUBLIC_REST_API;
    
    const page = req.body.page;
    const size = req.body.size;
    const search = req.body.search;
    const token = req.headers.x;
    let postbody = {
      nama: search
    }

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Cookie" : token
        },
        body: JSON.stringify(postbody),
        cors: true,
        credentials: "include"
    }

    const url = baseUrl + `/api/beras/petani/${size}/${page}`

    
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