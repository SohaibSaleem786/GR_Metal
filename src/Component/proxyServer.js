const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

app.post('/api/addUser', (req, res) => {
  const url = 'https://www.crystalsolutions.com.pk/csres/AddUser.php';
  
  // Forward the request to the PHP API
  axios.post(url, req.body)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.status(error.response.status).json(error.response.data);
    });
});

const port = 3002; // Choose a port number for your proxy server
app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
