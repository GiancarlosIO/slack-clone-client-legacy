const express = require('express');
const path = require('path');

const PORT = 3000 || process.env.PORT;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
  console.log(`> Server is runing in port: ${PORT}`);
});

