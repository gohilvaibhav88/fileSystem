const express = require('express');
const app = express();
const path = require('path')
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine' , "ejs");


app.get('/' , function(req, res){
    fs.readdir(`./files` , function(err , files){
        console.log(files);
        res.render("index",{files:files});
    })
    
})

app.get('/file/:filename' , function(req, res){
    
    fs.readFile(`./files/${req.params.filename}`, "utf-8" , function(err, fileData){
        console.log(fileData);
        res.render('show',{filename : req.params.filename ,fileData : fileData})
    })
    
})

app.get('/edit/:filename' , function(req, res){
    
    res.render('edit', {filename : req.params.filename})
    
})
app.post('/edit' , function(req, res){
    fs.rename(`./files/${req.body.previous}` , `./files/${req.body.newName}` , function(err){
        res.redirect('/')
    });
})

app.post('/create' , function(req, res){
    const fileName = req.body.title.split(' ').join('') + '.txt';
    fs.writeFile(`./files/${fileName}`, req.body.details, function (err) {
        if (err) {
            console.error(err);
            res.status(500).send('Server Error');
        } else {
            res.redirect('/');
        }
    });
    
})





app.listen(3000 , function(){
    console.log("Server running in the port 3000")
});