const handler = async (req, res) => {
  const method = 'POST';
  const baseUrl = process.env.NEXT_PUBLIC_REST_API;
  const usernameInput = req.body.username;
  const passwordInput = req.body.password;

  let postbody = {
    username: usernameInput,
    password: passwordInput
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

  const url = baseUrl + "/api/auth/signin"

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    const header = response.headers.get('set-cookie');
    const status = response.ok;

    return res.end(JSON.stringify({
      'data': data,
      'header': header,
      'status': status
    }));

  } catch (err) {
    return res.end(JSON.stringify({ 'error': err.message }))
  }

}

export default handler;