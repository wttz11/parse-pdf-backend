const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();

app.use(cors());


const storage = multer.diskStorage({                        
    destination: function (req, file, cb) {  
      cb(null, 'uploads/'); // 确保这个文件夹已经存在  
    },  

    filename: function (req, file, cb) {  
      cb(null, file.fieldname + '-' + Date.now() + file.originalname);  
    }  
  });  
const fileFilter = (req, file, callback) => {
    // 解决中文名乱码的问题 latin1 是一种编码格式
    file.originalname = Buffer.from(file.originalname, "latin1").toString(
        "utf8"
    );
    callback(null, true);
};
const upload = multer({ storage, fileFilter });  


// 定义端口
const port = 3000;

// 定义一个简单的 GET 路由

app.post('/upload', upload.single('file'), (req, res) => {  
    // 文件信息在 req.file  
    console.log(req.file);

    res.send('File uploaded successfully!');  
  });  

// 启动服务器并监听指定端口
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});