const express = require("express")

const PORT = 3000
const app = express()

app.use(express.json())

app.get("/", (req, res) => {
  return res.send("Hello");
})

app.post("/", (req, res) => {
    let ret = {}
    ret.bodyParam = req.body
    ret.urlParam  = req.query
    res.json(ret)
})

app.listen(PORT, () => {
  console.log(`Our first express app is listening on port ${PORT}`)
})