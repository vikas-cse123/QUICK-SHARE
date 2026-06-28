import express from "express"
import { connectDb } from "./config/db.js"
const app = express()
const PORT = process.env.PORT

await connectDb()






app.get("/categories",(req,res) => {
    const categories = ["None","Cryptocurrency","Cybersecurity","Fixit","Food","Gaming","Haike","Help","History","Housing","Jokes","Legal",'Money','Movies',"Music","Pets","Photo","Science","Software","Source Code","Spirit","Sports","Travel","TV","Writing"]
    res.status(200).json(categories)
    
})



app.listen(PORT,() => {
    console.log("Server Started")
})