const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());
// thông tin đăng nhập admin: userName: admin password: admin123 
 const dichVuRoute = require('./routes/dichVuRoute');
 const baiVietRoute = require('./routes/baiVietRoute');
 const chiTietDichVuRoute = require('./routes/chiTietDichVuRoute');
 const tuVanRoute = require('./routes/tuVanRoute');
 const binhLuanRoute = require('./routes/binhLuanRoute');
 const datLichRoute = require('./routes/datLichRoute');
 const userRoute = require('./routes/userRoute');
 const bookRoute = require('./routes/bookRoute');


app.use(express.json());

const port = 8000;
app.listen(port, () =>{
     console.log(`Server is running on port ${port}`);
});

// app.use('/user', userRoute);
app.use('/chitietdichvu', chiTietDichVuRoute);
app.use('/dichvu', dichVuRoute);
app.use('/baiviet', baiVietRoute);
app.use('/tuvan', tuVanRoute);
app.use('/binhluan', binhLuanRoute);
app.use('/datlich', datLichRoute);
app.use('/user', userRoute);
app.use('/book', bookRoute);











