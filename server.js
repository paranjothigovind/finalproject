const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const users = require("./routes/api/users");
const path = require("path");
const httpProxy = require('http-proxy');
const proxy = httpProxy.createServer({});

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.use(cors(corsOptions));

var corsOptions = {
  origin: "https//localhost:3000"
};

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

  app.get('/', (req, res) => {
    proxy.web(req, res, { target: 'https://virtual-tutoring.herokuapp.com/Student/home' });
  });


const client = require('twilio')('ACbfef47e0db424666d0855e4e5780fc3d', 'd998b79d9373de193d77c599bc73a98d')

app.get('/login',cors(), (req,res) => {
    if (req.query.phonenumber) {
       client
       .verify 
       .services('VA5dd3b7725d6901ed5f5927be7a748d03')
       .verifications
       .create({
           to: `+${req.query.phonenumber}`,
           channel: req.query.channel==='call' ? 'call' : 'sms' 
       })
       .then(data => {
           res.status(200).send({
               message: "SENT",
               phonenumber: req.query.phonenumber,
               data
           })
       }) 
    } else {
       res.status(400).send({
           message: "WRONG",
           phonenumber: req.query.phonenumber,
           data// comment the data as the error occurs due to it
       })
    }
  })


  app.get('/verify', cors(), (req, res) => {
    if (req.query.phonenumber && (req.query.code).length > 0) {
        client
            .verify
            .services('VA5dd3b7725d6901ed5f5927be7a748d03')
            .verificationChecks
            .create({
                to: `+${req.query.phonenumber}`,
                code: req.query.code
            })
            .then(data => {
                if (data.status === "approved") {
                    res.status(200).send({
                        message: "VERIFIED",
                        data
                    })
                }
            })
    } else {
        res.status(400).send({
            message: "WRONGCODE(",
            phonenumber: req.query.phonenumber,
            data
        })
    }
  })

  if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
  }

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
