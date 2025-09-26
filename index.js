const express = require("express");
const fs = require("fs");
const https = require("https");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const port = process.env.PORT;
app.use(express.json({limit: "10kb"}));
app.use((error,req,res,next)=>{
    if (err instanceof SyntaxError && "body" in err) {
        return res.status(400).json({
          status_cd: 0,
          error: {
            errorCode: "BAD101",
            errorMessage: "Bad request. Invalid JSON payload.",
          },
        });
      }
      next();
});
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.send("This is HTTPS Server");
})
const options ={
    key:fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.crt')
}
https.createServer(options,app).listen(port,()=>{
    console.log(`Server is listening at port ${port}`);
})