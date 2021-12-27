const express = require('express');
const path = require('path');
const cors = require('cors');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const route = require('./routes');
const db = require('./configs/db.config');
const dotenv = require('dotenv');

// Config dotenv
dotenv.config();
// Connect to the database
db.connectDatabase();

const app = express();
const port = process.env.PORT || 3333;
// Allow permission for PUT DELETE
app.use(methodOverride('_method'))
app.use(cors());
app.use(express.json()); // gửi từ code javascript
app.use(express.static(path.join(__dirname, 'public'))); // Cấp quyền cho phép người dùng có thể xem được những thứ trong folder public

app.use(bodyParser.urlencoded({extended: true}))
//Routes init
route(app);

app.get("/", (req, res) => {
    res.json({
        message: "Hello World!" 
    })
})


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})