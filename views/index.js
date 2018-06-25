function Person(first, last, phone, email, imgName) {
    this.firstName = first;
    this.lastName = last;
	this.phone = phone;
    this.email = email;
	this.imgName = imgName;
}
Person.prototype.details = function() {
	var dtl = '<table>'+
			    '<tr><td>First Name: </td><td>'+this.firstName+'</td></tr>'+
				'<tr><td>Last Name: </td><td>'+this.lastName+'</td></tr>'+
				'<tr><td>Phone: </td><td>'+this.phone+'</td></tr>'+
				'<tr><td>Email: </td><td>'+this.email+'</td></tr>'+
				'<tr><td>Image: </td><td><img src="'+this.imgName+'" width="150px" height="150px"></td></tr>'+
			  '</table>'
   return dtl
};
var contacts = [];   

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function(){
	
	if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);
		contacts = []; 
		console.log(Object.keys(myObj).length);
		for (var i=0; i<Object.keys(myObj).length; i++){
         contacts.push(myObj[i]);
		}
    
	console.log(contacts);
	console.log(typeof(contacts));
		
	}
	mainfunction(contacts);
	
};
xmlhttp.open("GET", "contacts", true);
xmlhttp.send();


	
	


function clickFunction(con) {
	console.log(con);
	var contact = new Person(con.First, con.Last, con.phone, con.email, con.imgName);
	document.getElementById("demo2").innerHTML =  contact.details()+ "<br>"; 
} 

function newfunction(){
	
}  

function deletefunction(dcon) {
	var index = contacts.indexOf(dcon);
	console.log(dcon);  
	console.log(index);
	if (index > -1) {
	  var delcontacts = contacts.splice(index, 1);
	}
	var data = JSON.stringify(contacts);
	var xhr = new XMLHttpRequest();
	xhr.open("POST", 'inputcontact', true);
	xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
	xhr.onload  = function () {
		if (xhr.readyState == 4 && xhr.status == "200") {
			alert(http.responseText);
		} else {
			console.error(data);
		}
	}
	xhr.send(data);
	console.log(delcontacts);  
	var firstdiv = document.getElementById('demo');
		 while (firstdiv.hasChildNodes()) {   
			firstdiv.removeChild(firstdiv.firstChild);
		}         
	var div = document.createElement('div');
	div.className = "list-group";       
	for(i=0; i<Object.keys(contacts).length; i++){    
		console.log(contacts[i]);
	var dbtn=document.createElement('button');
		dbtn.setAttribute('type', "button");
		dbtn.setAttribute('style', "cursor:pointer;text-align:center");
		dbtn.className = "list-group-item list-group-item-action";
		div.appendChild(dbtn);
		dbtn.innerHTML='<a  onclick="clickFunction(contacts['+i+'])">'+contacts[i].First + ' ' + contacts[i].Last+'</a><button type="button" class="close" onclick="deletefunction(contacts['+i+'])" aria-label="Close"><span aria-hidden="true">&times;</span></button>';	
	}	
		
	   firstdiv.appendChild(div);     
			
}

function inputFunction() {
	var First = document.forms["myForm"]["fname"].value;
	var Last = document.forms["myForm"]["lname"].value;
	var phone = document.forms["myForm"]["phone"].value;
	var email = document.forms["myForm"]["email"].value;
	var file = document.querySelector('#input').files[0];
	var imgName = file.name;
	var formData = new FormData();
	formData.append('input', file);
	console.log(file.name);
	console.log(typeof formData);
	var  xhrimg = new XMLHttpRequest();
	 xhrimg.open("POST", 'upload', true);
	 xhrimg.upload.onprogress = function(e) {
    if (e.lengthComputable) {
      var percentComplete = (e.loaded / e.total) * 100;
      console.log(percentComplete + '% uploaded');
    }
	  };
	  xhrimg.onload = function() {
		if (this.status == 200) {
			console.log(this.response);
		};
	  };
	   xhrimg.send(formData);
	
	var newcontact = contacts.push({First,Last,phone,email,imgName});
	
	var data = JSON.stringify(contacts);

	var xhr = new XMLHttpRequest();
	xhr.open("POST", 'inputcontact', true);
	xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
	xhr.onload  = function () {
		if (xhr.readyState == 4 && xhr.status == "200") {
			alert(http.responseText);
		} else {
			console.error(data);
		}
	}
	xhr.send(data);
	console.log(contacts.length);
	console.log(contacts[newcontact-1]);
	var firstdiv = document.getElementById('demo');
		 while (firstdiv.hasChildNodes()) {   
			firstdiv.removeChild(firstdiv.firstChild);
		}
	var div = document.createElement('div');
	div.className = "list-group";       
	for(i=0; i<Object.keys(contacts).length; i++){    
		console.log(contacts[i]);
	var dbtn=document.createElement('button');
		dbtn.setAttribute('type', "button");
		dbtn.setAttribute('style', "cursor:pointer;text-align:center");
		dbtn.className = "list-group-item list-group-item-action";
		div.appendChild(dbtn);
		dbtn.innerHTML='<a  onclick="clickFunction(contacts['+i+'])">'+contacts[i].First + ' ' + contacts[i].Last+'</a><button type="button" class="close" onclick="deletefunction(contacts['+i+'])" aria-label="Close"><span aria-hidden="true">&times;</span></button>';	
	}
	firstdiv.appendChild(div);     
} 

function previewFile(){
       var preview = document.querySelector('img'); //selects the query named img
       var file    = document.querySelector('input[type=file]').files[0]; //sames as here
       var reader  = new FileReader();

       reader.onloadend = function () {
           preview.src = reader.result;
       }

       if (file) {
           reader.readAsDataURL(file); //reads the data as a URL
       } else {
           preview.src = "";
       }
  }   

function mainfunction(contacts){
var div = document.createElement('div');
div.className = "list-group";
console.log(contacts);
    for(i=0; i<Object.keys(contacts).length; i++)
    {
        var btn=document.createElement('button');
		btn.setAttribute('type', "button");
		btn.setAttribute('style', "cursor:pointer;text-align:center");
		btn.className = "list-group-item list-group-item-action";
		div.appendChild(btn);
        btn.innerHTML='<a onclick="clickFunction(contacts['+i+'])">'+contacts[i].First + ' ' + contacts[i].Last+'</a><button type="button" class="close" onclick="deletefunction(contacts['+i+'])" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
        //btn.setAttribute('onclick', "clickFunction(contacts["+i+"])");
    }  
	document.getElementById('demo').appendChild(div);
	
	document.getElementById("demo3").innerHTML = 
				'<form name="myForm" method="post">'+
				  '<div class="form-group">'+
					'<input type="text" class="form-control" placeholder="Name" name="fname">'+
				  '</div>'+
				  '<div class="form-group">'+
					'<input type="text" class="form-control" placeholder="Last Name" id="lname">'+
				  '</div>'+
				  '<div class="form-group">'+
					'<input type="text" class="form-control" placeholder="Phone" id="phone">'+
				  '</div>'+
				  '<div class="form-group">'+
					'<input type="text" class="form-control" placeholder="Email" id="email">'+
				  '</div>'+
				  '<div class="form-group">'+
					'<input type="file" onchange="previewFile()" name="file" id="input"><br>'+
					'<img src="" height="200" alt="Image preview...">'+
				  '</div>'+
				  '<button type="button" class="btn btn-primary" onclick="inputFunction()" id="upbutton">New</button>'+
				'</form>';
}