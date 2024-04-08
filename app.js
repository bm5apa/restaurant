const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send(`Heeeeelloooooo world!`)
})


app.listen(port, () => {
  console.log(`1st express server on http://localhost:${port}`)
})