const express = require("express")
const fs = require("fs")
const PORT = 3000
const app = express()

app.use(express.json())

const DB_PATH = "./listdb.json"

app.get("/", (req, res) => {
  let todolist = {listItems: []} 
  if (fs.existsSync(DB_PATH)) {
    todolist = JSON.parse(fs.readFileSync(DB_PATH));
  } else {
    fs.writeFileSync(DB_PATH, JSON.stringify(todolist))
  }
  return res.json(todolist);
})

app.post("/", (req, res) => {
  if(!req.body.listItems)  {
    return res.status(422).json({
      success: false,
      message: "Body must contains listItems"
    })
  }
  fs.writeFileSync(DB_PATH, JSON.stringify(req.body));
  return res.json({"success": true})
})

app.listen(PORT, () => {
  console.log(`Our first express app is listening on port ${PORT}`)
})