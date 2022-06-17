
const express = require("express");
const multer = require("multer");
const app = express();
let http = require("http");
let server = http.Server(app);
app.use('/file', express.static("uploads"))
var fs = require("fs");
const port = process.env.PORT || 5000;

app.post('/upload-documet/:folder', (req, res, next) => {
    var storage = multer.diskStorage({
         destination: (req, file, cb) => {
             setTimeout( () => {
                             fs.mkdir('uploads/document/' + req.params.folder, (err) => {if(err) {cb(null, 'uploads/document/' + req.params.folder );
                                 } else {console.log( ' Success Created!!'); cb(null, 'uploads/document/' + req.params.folder );}})
                         }, 2000)},
         filename: (req, file, cb) => {
             cb(null, `${file.originalname}`)
         }
     });
 const upload = multer({ storage }).single('file');
 upload(req, res , (err) => {
 VID2 = req.params.folder;
 const file = req.file;
 if (!file) {
     const error = new Error('No File');
     return next(error);
 }
 else{
     res.json({
     message: "File Uploaded",
     success: true,
     profile_url:`http://localhost:${port}/document/${req.params.folder}/${req.file.filename}`,
     })
 }
 })
});
server.listen(port, () => {
    console.log(`started on port: ${port}`);
});
