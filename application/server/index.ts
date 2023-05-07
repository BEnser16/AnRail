//  express main

const express = require('express')
const app = express();
const cors = require("cors");
const authRoute = require("./routes/auth-route");
const infoRoute = require("./routes/info-route");
const recordRoute = require("./routes/record-route.ts")
const breederRoute = require("./routes/breeder-route");
const insurancerRoute = require('./routes/insurancer-route');


require('dotenv').config()

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(8000, () => {
    console.log("sever running on port 8000. ");
});

app.get('/', (req, res) => {
    res.send('Hello World!')
});


// //  連接至 MongoDB
// mongoose
//   .connect(process.env.DB_CONNECT , {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   } as ConnectOptions)
//   .then(() => {
//     console.log("Connect to mongoDB atlas.");
//   })
//   .catch((err) => {
//     console.log(err);
// });



//  Route

app.use("/api/v1/auth" , authRoute);
app.use("/api/v1/info" , infoRoute);
app.use("/api/v1/breeder" , breederRoute);
app.use("/api/v1/record" , recordRoute);
app.use("/api/v1/insurancer" , insurancerRoute);


