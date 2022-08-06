const express = require("express")
const fs = require("fs")
const PORT = 3000
const app = express()

app.use(express.json())
//統一定義DB檔案路徑
const DB_PATH = "./listdb.json"

//取得listItems
app.get("/list", (req, res) => {
  let todolist = {listItems: []}
  //檢查DB檔案是否存在
  if (fs.existsSync(DB_PATH)) {
    todolist = JSON.parse(fs.readFileSync(DB_PATH));
  } else {
    //如果檔案不存在，創建檔案並寫入預設內容
    fs.writeFileSync(DB_PATH, JSON.stringify(todolist))
  }
  return res.json(todolist);
})

//存入listItems
app.post("/list", (req, res) => {
  //檢查request body是否合法
  if(!req.body.listItems)  {
    //
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