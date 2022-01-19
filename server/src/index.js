const express = require("express");
const path = require("path");
const cors = require("cors");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const route = require("./routes");
const db = require("./configs/db.config");
const dotenv = require("dotenv");
const compression = require("compression");
const morgan = require("morgan");
const helmet = require("helmet");
// Config dotenv
dotenv.config();
// Connect to the database
db.connectDatabase();

const app = express();
const port = process.env.PORT || 3333;
// khai báo compresion để giảm dung lượng truyền tải
app.use(
  compression({
    level: 6, // server phải tốn cpu nên tối đa là 6
    threshold: 100 * 1000, // chỉ combine những dữ liệu trả về lớn hơn 100kb (100 KB * 1000 byte = 100 KB)
    filter: (req, res) => {
      // có router không cần compress thì xử lý như bên dưới
      if (req.headers["x-no-compression"]) {
        return false;
      }
      return compression.filter(req, res);
    },
  })
);
// Allow permission for PUT DELETE
app.use(methodOverride("_method"));
app.use(cors());
app.use(express.json()); // gửi từ code javascript
app.use(helmet()); // helper để bảo vệ server
app.use(express.static(path.join(__dirname, "public"))); // Cấp quyền cho phép người dùng có thể xem được những thứ trong folder public
app.use(bodyParser.urlencoded({ extended: true })); // gửi từ code html
app.use(morgan("dev"));
//Routes init
route(app);

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
