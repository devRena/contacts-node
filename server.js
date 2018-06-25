require('dotenv').config();
var express = require('express');
var app = express();
var path = require('path');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var fs = require("fs");
const fileUpload = require('express-fileupload'); 
app.use(cookieParser());
app.use(cors({credentials:true,exposedHeaders:["Location"],methods:'GET,HEAD,PUT,PATCH,POST,DELETE'}));  
app.use(require('body-parser').json({
      extended: true,
      defer: true,
      inflate : true,
      strict:false,
      type: '*/json',
      limit: '20mb'
    }));
app.use(require('body-parser').urlencoded({
      extended: true,
      defer: true,
      limit: '20mb'
    }));
	

app.use(require('morgan')('tiny'));
app.engine('mustache', require('mustache-express4'));
app.set('view engine', 'mustache');
app.set('partials', path.join(__dirname, 'views'));
app.set('view cache', false); 
app.use('/views', express.static('views'));
app.use(express.static('img'));

app.use(require('connect-flash')());
app.use(fileUpload());

app.get('/', function(req, res) {
	res.render('index');
});
app.get('/contacts', function(req, res) {
		var data = '';
		var readerStream = fs.createReadStream('views/contacts.txt');
		readerStream.setEncoding('UTF8');
		readerStream.on('data', function(chunk) {
		   data += chunk;
		 });
		readerStream.on('end',function(){
			res.send(data);
		});
		readerStream.on('error', function(err){
			res.send(data);
		});
});

app.post('/inputcontact', function(req, res) {
	var data = JSON.stringify(req.body);
	fs.writeFile('views/contacts.txt',data, function(err) {        
        if (err) throw err;
        console.log("Data is written to file successfully.")
	});
	//res.sendFile("/img/image.png"));
});


app.post('/upload', function (req, res) { 
 console.log(req.files.input);
	if (!req.files)     
		return res.status(400).send('No files were uploaded.');
	let sampleFile = req.files.input;
	console.log(sampleFile);
	  sampleFile.mv('img/'+sampleFile.name, function(err) {
			if (err)       return res.status(500).send(err);
			res.send('File uploaded!');
  });

}); 

app.listen(process.env.PORT);
console.log('Starting Server on Port ', process.env.PORT); 