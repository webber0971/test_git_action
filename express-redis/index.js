const express = require('express')
const redis = require('ioredis');

const port = process.env.PORT || 8080
const redisUrl= process.env.REDIS_URL

const app = express()

app.use(express.text())
console.log(redisUrl,"---")

const client = redis.createClient({
//   url: "redis://127.0.0.1:6379"
    // url:redisUrl
    host:"redis1"   //這好的

});

console.log(client.get("bob",(error,reply)=>{
    if(error){
        console.log(error)
    }else{
        console.log("連接測試成功，用key 為 bob 取得資料")
        console.log(reply)
    }
}))

client.on("error", function(error) {
  console.error(error);
});

app.get("/", (req, res) => {
  console.log("request at URL")
  res.send("hello nabeeel from port " + port)
})

app.get("/:key", (req, res) => {
  const key = req.params.key
  client.get(key, (error, reply) => {
    if (error) res.send("Error")
    else res.send(reply)
  })
})

app.post("/:key", (req, res) => {
  const key = req.params.key
  const data = req.body
  client.set(key, data, (error, reply) => {
    if (error) res.send("Error")
    else res.send(reply)
  })
})

app.posts

app.listen(port, () => {
  console.log("app is listening on port " + port)
})