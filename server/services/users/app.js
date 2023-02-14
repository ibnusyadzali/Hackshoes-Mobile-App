const express = require("express");
const { runConnection } = require("./config/mongoConnection");
const app = express();
const port = 4001;
const router = require ('./routers/userRouter')
const cors = require("cors");

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use('/',router)

runConnection()
.then(() => {
    app.listen(port, () => {
      console.log(`running user-app on port ${port}`);
    });
})
.catch(error => {
    console.log(error)
})

