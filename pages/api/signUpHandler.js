const handler = async (req, res) => {
    const method = 'POST';
    const baseUrl = process.env.NEXT_PUBLIC_REST_API;
    const username = req.body.username;
    const nama = req.body.nama;
    const no_handphone = req.body.no_handphone;
    const jenis_kelamin = req.body.jenis_kelamin;
    const email = req.body.email;
    const role = req.body.role;
    const password = req.body.password;

      let postbody = {
        'username': username,
        'nama' : nama,
        'no_handphone' : no_handphone,
        'jenis_kelamin' : jenis_kelamin,
        'email' : email,
        'role' : [role],
        'password': password
      }
      const options = {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
        },
        cors: true,
        credentials: "include",
        body: JSON.stringify(postbody)
      }
      const url = baseUrl+"/api/auth/signup"
      
      
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