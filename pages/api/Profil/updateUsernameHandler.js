const handler = async (req, res) => {
    const method = 'PATCH';
    const baseUrl = process.env.NEXT_PUBLIC_REST_API;
    const url = baseUrl + `/api/user/changeUsername`
    const token = req.headers.x;
    const username = req.body.username;

      let postbody = {
        'username': username
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