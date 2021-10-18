const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const multer = require('multer');
//const upload = multer();
const upload = multer({ dest: 'uploads/' })
const dotenv = require("dotenv");
dotenv.config();
const photoRoutes = require('./app/routes/photos.routes');
const categoryRoutes = require('./app/routes/categories.routes');

const corsOptions = {
    origin: "http://localhost:8081"
  };

const db = require("./app/models");
db.mongoose
.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to the database!");
})
.catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended:true}));
//app.use(upload.none());
app.use("/api/photo", photoRoutes );
app.use("/api/category", photoRoutes );

app.post('/upload', function(req, res){
    console.log(req.body.key);
});

// app.post('/profile', upload.single('image'), function (req, res, next) {
//     console.log(req.file);
//     // req.file is the `avatar` file
//     // req.body will hold the text fields, if there were any
//   })
app.use('/uploads', express.static('./uploads'));

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Local: http://localhost:${port}/`);
});